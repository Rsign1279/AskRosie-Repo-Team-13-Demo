import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
const headers = Object.fromEntries((config.headers || []).flatMap((rule) => rule.headers.map((header) => [header.key.toLowerCase(), header.value])))
for (const name of ['content-security-policy', 'permissions-policy', 'x-content-type-options', 'x-frame-options', 'referrer-policy']) assert.ok(headers[name], `Missing ${name}`)
assert.match(headers['content-security-policy'], /default-src 'self'/)
assert.match(headers['content-security-policy'], /frame-ancestors 'none'/)
assert.match(headers['permissions-policy'], /camera=\(self\)/)
console.log('PASS: Vercel static security headers are present and restrictive')
