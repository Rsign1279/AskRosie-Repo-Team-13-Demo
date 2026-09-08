import assert from 'node:assert/strict'
import { exampleArtworks } from '../src/exampleArtworks.js'
import { verifiedSample } from '../api/_rosie.js'

assert.equal(exampleArtworks.length, 10, 'The auditorium gallery must contain exactly ten examples')
assert.equal(new Set(exampleArtworks.map((artwork) => artwork.slug)).size, 10, 'Examples must be unique official works')
for (const artwork of exampleArtworks) {
  assert.match(artwork.slug, /\S/, 'Each example needs an official slug')
  assert.match(artwork.title, /\S/, 'Each example needs an official title')
  assert.match(artwork.artist, /\S/, 'Each example needs an official artist')
  assert.match(artwork.image, /^\/artworks\/.+\.jpg$/, 'Each example must use a bundled JPEG')
  assert.match(artwork.sourceUrl, /^https:\/\/crystalbridges\.org\/artworks\//, 'Each example needs an official source URL')
  const verified = verifiedSample(artwork.slug)
  assert.equal(verified?.slug, artwork.slug, 'Each sample slug must validate against the full official collection')
  assert.equal(verified?.title, artwork.title, 'Each sample title must agree with the official collection')
}
console.log(`PASS: ${exampleArtworks.length} verified official auditorium examples`)
