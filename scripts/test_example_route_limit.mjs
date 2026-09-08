import assert from 'node:assert/strict'
import classify from '../api/classify.js'

for (let index = 0; index < 12; index += 1) {
  let payload
  const req = { method: 'POST', url: '/api/classify', headers: { host: 'ask-rosie-team-13.vercel.app', origin: 'https://ask-rosie-team-13.vercel.app' }, body: { verifiedArtworkSlug: '2007-178' }, socket: { remoteAddress: '198.51.100.44' } }
  const res = { code: 200, status(code) { this.code = code; return this }, json(body) { payload = body } }
  await classify(req, res)
  assert.equal(res.code, 200, 'Verified auditorium examples must not exhaust camera-analysis quota')
  assert.equal(payload?.artwork?.slug, '2007-178')
}
console.log('PASS: verified examples have a separate presentation-safe route allowance')
