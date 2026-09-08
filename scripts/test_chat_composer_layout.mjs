import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
assert.doesNotMatch(css, /\.chat-form\{position:sticky/, 'The composer must not stick across the demo footer while the page scrolls')
assert.match(css, /\.chat-form\{position:static;bottom:auto;padding:10px;background:var\(--cream\)\}/, 'The mobile composer must remain in the conversation flex layout')
console.log('PASS: mobile composer stays inside the conversation panel')
