import { exampleArtworks } from '../src/exampleArtworks.js'

const base = 'https://ask-rosie-team-13.vercel.app'
const origin = base
const results = []

for (const example of exampleArtworks) {
  const [asset, classified] = await Promise.all([
    fetch(`${base}${example.image}`),
    fetch(`${base}/api/classify`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin },
      body: JSON.stringify({ verifiedArtworkSlug: example.slug }),
    }),
  ])
  const result = await classified.json().catch(() => ({}))
  results.push({
    slug: example.slug,
    asset: asset.status,
    classify: classified.status,
    matched: result.matched === true,
    identity: result.artwork?.slug === example.slug,
  })
}

const passed = results.every((result) => result.asset === 200 && result.classify === 200 && result.matched && result.identity)
console.log(JSON.stringify({ passed, count: results.length, results }, null, 2))
process.exitCode = passed ? 0 : 1
