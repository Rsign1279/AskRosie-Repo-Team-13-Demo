import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
assert.ok(source.includes('Use your camera live, choose a photo already on this device, or choose 1 of 10 example Crystal Bridges artworks.'))
console.log('PASS: capture screen explains every artwork-entry option')
