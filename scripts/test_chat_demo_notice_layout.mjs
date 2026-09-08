import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
assert.match(source, /screen !== 'chat' && <p className="demo-notice">This application is for demo purposes only\.<\/p>/)
assert.match(source, /<form className="chat-form"[\s\S]*?<\/form><p className="chat-demo-notice"/)
assert.match(css, /\.chat-demo-notice\{[^}]*flex:0 0 auto[^}]*border-top:1px solid/)
console.log('PASS: chat demo notice is structurally separated from the composer')
