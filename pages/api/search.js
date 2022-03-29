import { search } from "services/search";

export default async function handler (req, res) {
  const { query: { q } } = req

  const { results } = await search({ query: q })
  console.log(results);

  return res.status(200).json(results)
}
