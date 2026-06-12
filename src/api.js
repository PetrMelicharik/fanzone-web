// URL backendu – při nasazení na Vercel změň na URL svého Render backendu
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getArticlesForClub(clubSlug) {
  const res = await fetch(`${BASE_URL}/api/articles/${clubSlug}`)
  if (!res.ok) throw new Error('Nepodařilo se načíst články')
  const data = await res.json()
  return data.articles
}
