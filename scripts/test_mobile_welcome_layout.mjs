import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
assert.match(css, /html,body,#root\{[^}]*max-width:100%[^}]*overflow-x:clip/)
assert.match(css, /\.welcome-new\{[^}]*width:min\(100%,840px\)[^}]*min-width:0/)
assert.ok(css.includes('@media(max-width:600px)'))
assert.ok(css.includes('.welcome-new h1{font-size:clamp(42px,12vw,50px)}'))
console.log('PASS: welcome layout is bounded for narrow phone screens')
