// reorg/update-imports.js - safely update import paths according to reorg/mapping.json
// Creates .bak backups for modified files and logs changes to reorg/changes.log

const fs = require('fs')
const path = require('path')

const REORG_DIR = __dirname
const REPO_ROOT = path.resolve(REORG_DIR, '..')
const MAPPING_FILE = path.join(REORG_DIR, 'mapping.json')
const LOG_FILE = path.join(REORG_DIR, 'changes.log')
const MANUAL_REVIEW = path.join(REORG_DIR, 'REORG_MANUAL_REVIEW.md')

function loadMapping() {
  if (!fs.existsSync(MAPPING_FILE)) {
    console.error('Mapping file not found:', MAPPING_FILE)
    process.exit(1)
  }
  const raw = fs.readFileSync(MAPPING_FILE, 'utf8')
  return JSON.parse(raw)
}

function walkDirs(dirs, exts = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = []
  for (const d of dirs) {
    const abs = path.join(REPO_ROOT, d)
    if (!fs.existsSync(abs)) continue
    const stack = [abs]
    while (stack.length) {
      const cur = stack.pop()
      const stat = fs.statSync(cur)
      if (stat.isDirectory()) {
        const names = fs.readdirSync(cur)
        for (const n of names) stack.push(path.join(cur, n))
      } else if (stat.isFile()) {
        if (exts.includes(path.extname(cur))) files.push(cur)
      }
    }
  }
  return files
}

function stripExt(p) {
  return p.replace(/\.(js|jsx|ts|tsx)$/, '')
}

function posix(p) {
  return p.split(path.sep).join('/')
}

function ensureDir(filePath) {
  const d = path.dirname(filePath)
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
}

function logChange(entry) {
  ensureDir(LOG_FILE)
  fs.appendFileSync(LOG_FILE, `${new Date().toISOString()} ${entry}\n`)
}

function safeReplaceContent(filePath, newContent, originalContent) {
  // create backup
  const bak = filePath + '.bak'
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, originalContent, 'utf8')
  fs.writeFileSync(filePath, newContent, 'utf8')
}

function run() {
  const mapping = loadMapping()

  // Build a map of absolute source paths -> absolute dest paths
  const absMap = {}
  for (const [oldRel, newRel] of Object.entries(mapping)) {
    const oldAbs = path.resolve(REPO_ROOT, oldRel)
    const newAbs = path.resolve(REPO_ROOT, newRel)
    absMap[oldAbs] = newAbs
  }

  const targetDirs = ['pages', 'components', 'lib', 'src']
  const files = walkDirs(targetDirs)

  let totalReplacements = 0
  const ambiguous = []

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8')
    let original = content
    let changed = false

    // Handle import ... from '...'
    const importFromRegex = /import\s+[\s\S]*?from\s+(['"])([^'"]+)\1/g
    const requireRegex = /require\(\s*(['"])([^'"]+)\1\s*\)/g
    const dynamicImportRegex = /import\(\s*(['"])([^'"]+)\1\s*\)/g

    function treatMatch(importPath, quote) {
      // 1) Absolute style starting with components/
      if (importPath.startsWith('components/')) {
        // try to match mapping keys without extension
        const candidateNoExt = path.resolve(REPO_ROOT, stripExt(importPath))
        // try a few possible file forms
        const variants = [candidateNoExt, candidateNoExt + '.js', candidateNoExt + '.jsx', candidateNoExt + '.ts', candidateNoExt + '.tsx']
        let matched = null
        for (const v of variants) {
          if (absMap[v]) { matched = v; break }
        }
        if (matched) {
          const newAbs = absMap[matched]
          // produce new import path keeping whether original had an extension
          const originalHasExt = /\.(js|jsx|ts|tsx)$/.test(importPath)
          let newRel = posix(path.relative(path.resolve(REPO_ROOT), newAbs))
          if (!originalHasExt) newRel = stripExt(newRel)
          return {from: importPath, to: newRel}
        }
      }

      // 2) Relative imports that reference components/ inside them
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        // Resolve the absolute path of the imported module (try with extensions)
        const importAbsBase = path.resolve(path.dirname(file), importPath)
        const tryPaths = [importAbsBase, importAbsBase + '.js', importAbsBase + '.jsx', importAbsBase + '.ts', importAbsBase + '.tsx', path.join(importAbsBase, 'index.js'), path.join(importAbsBase, 'index.jsx')]
        let matchedKey = null
        for (const t of tryPaths) {
          if (absMap[t]) { matchedKey = t; break }
        }
        if (matchedKey) {
          const newAbs = absMap[matchedKey]
          let newRel = path.relative(path.dirname(file), newAbs)
          newRel = posix(newRel)
          if (!newRel.startsWith('.')) newRel = './' + newRel
          // strip extension if original didn't have one
          const originalHasExt = /\.(js|jsx|ts|tsx)$/.test(importPath)
          if (!originalHasExt) newRel = stripExt(newRel)
          return {from: importPath, to: newRel}
        }
      }

      return null
    }

    function performRegexReplace(regex) {
      let m
      // Using replace with function allows us to inspect each match
      content = content.replace(regex, function (match, q, importPath) {
        try {
          const res = treatMatch(importPath, q)
          if (res) {
            changed = true
            totalReplacements++
            const newImport = match.replace(importPath, res.to)
            // Log change
            const logEntry = `${file} | ${importPath} => ${res.to}`
            console.log(logEntry)
            logChange(logEntry)
            return newImport
          }
        } catch (err) {
          console.error('Error processing import', file, importPath, err)
        }
        return match
      })
    }

    performRegexReplace(importFromRegex)
    performRegexReplace(requireRegex)
    performRegexReplace(dynamicImportRegex)

    if (changed) {
      // write backup and save
      safeReplaceContent(file, content, original)
    } else {
      // collect ambiguous import patterns that we could not confidently change
      // (for now we push any unresolved 'components/' absolute imports that matched prefix but had no mapping)
      const absCompRegex = /(['"])components\/(.+?)\1/g
      let amb
      while ((amb = absCompRegex.exec(original))) {
        const importPath = amb[2]
        // if it wasn't changed (no mapping), add to ambiguous list
        ambiguous.push(`${file} | components/${importPath}`)
      }
    }
  }

  // write ambiguous items to MANUAL_REVIEW
  if (ambiguous.length) {
    const header = `# REORG manual review - ambiguous imports\n# Generated: ${new Date().toISOString()}\n\n`
    fs.writeFileSync(MANUAL_REVIEW, header + ambiguous.map(a => `- ${a}`).join('\n') + '\n', 'utf8')
    console.log('\nAmbiguous imports written to', MANUAL_REVIEW)
  }

  console.log('\nDone. Total replacements:', totalReplacements)
}

function logChange(entry) {
  const line = `${new Date().toISOString()} ${entry}\n`
  fs.appendFileSync(LOG_FILE, line, 'utf8')
}

run()
