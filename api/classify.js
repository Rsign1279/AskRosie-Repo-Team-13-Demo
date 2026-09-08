import { apiGuard, classify, readBody, verifiedSample } from './_rosie.js'
export default async function handler(req, res) {
  const body = readBody(req)
  if (!apiGuard(req, res, { limit: body.verifiedArtworkSlug ? 60 : 10 })) return
  const sample = verifiedSample(body.verifiedArtworkSlug)
  if (sample) return res.status(200).json({ matched: true, artwork: sample, needsConfirmation: false, source: 'official-example' })
  const result = await classify(String(body.imageDataUrl || ''))
  res.status(200).json(result)
}
