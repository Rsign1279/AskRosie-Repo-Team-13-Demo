import { apiGuard, classify, readBody, verifiedSample } from './_rosie.js'
export default async function handler(req, res) {
  if (!apiGuard(req, res, { limit: 10 })) return
  const body = readBody(req)
  const sample = verifiedSample(body.verifiedArtworkSlug)
  if (sample) return res.status(200).json({ matched: true, artwork: sample, needsConfirmation: false, source: 'official-example' })
  const result = await classify(String(body.imageDataUrl || ''))
  res.status(200).json(result)
}
