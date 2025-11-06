// reorg/run-moves.js - run git mv for mappings and log results
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const repo = path.resolve(__dirname, '..');
const mapping = require('./mapping.json');
const logPath = path.join(__dirname, 'moves.log');
fs.writeFileSync(logPath, '# moves log\n', 'utf8');
let moved = 0;
for (const [oldRel, newRel] of Object.entries(mapping)) {
  const old = path.resolve(repo, oldRel);
  const dest = path.resolve(repo, newRel);
  const destDir = path.dirname(dest);
  try {
    if (!fs.existsSync(old)) {
      const msg = `WARN: source missing ${oldRel}`;
      console.warn(msg);
      fs.appendFileSync(logPath, msg + '\n');
      continue;
    }
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    // run git mv
    console.log(`git mv "${oldRel}" "${newRel}"`);
    cp.execSync(`git mv "${oldRel}" "${newRel}"`, { cwd: repo, stdio: 'pipe' });
    fs.appendFileSync(logPath, `git mv "${oldRel}" "${newRel}"\n`);
    moved++;
  } catch (e) {
    console.error('ERROR moving', oldRel, '->', newRel, e.message);
    fs.appendFileSync(logPath, `ERROR moving ${oldRel} -> ${newRel}: ${e.message}\n`);
  }
}
console.log('Moved count:', moved);
process.exit(0);
