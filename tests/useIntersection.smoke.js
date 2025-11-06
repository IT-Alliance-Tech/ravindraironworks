const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, '../lib/useIntersection.js')

if (!fs.existsSync(filePath)) {
  console.error('FAIL: lib/useIntersection.js not found at', filePath)
  process.exit(2)
}

const src = fs.readFileSync(filePath, 'utf8')

// Basic sanity checks: file should export a default function and import useInView
if (!/export\s+default/.test(src)) {
  console.error('FAIL: lib/useIntersection.js does not contain an export default')
  process.exit(3)
}

if (!/useInView/.test(src)) {
  console.error('WARN: lib/useIntersection.js does not reference useInView; double-check implementation')
}

console.log('PASS: lib/useIntersection.js exists and looks valid')
process.exit(0)
