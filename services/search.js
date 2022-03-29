import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('HOV9DHYNL5', '89e055c2423984ab4ef093b963f1e7b5')
const index = client.initIndex('prod_comics')

const CACHE = {}

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] }

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10,
  })

  CACHE[query] = hits

  return { results: hits }
}