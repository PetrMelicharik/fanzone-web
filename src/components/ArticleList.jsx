import { useState, useEffect } from 'react'
import { getArticlesForClub } from '../api.js'
import { SOURCE_STYLES, SOURCES } from '../clubs.js'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/cs'
import './ArticleList.css'

dayjs.extend(relativeTime)
dayjs.locale('cs')

export default function ArticleList({ club }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState('Vše')

  useEffect(() => {
    setLoading(true)
    setError(null)
    setSource('Vše')
    getArticlesForClub(club.slug)
      .then(setArticles)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [club.slug])

  const filtered = source === 'Vše' ? articles : articles.filter(a => a.source === source)

  return (
    <div>
      {/* Hlavička klubu */}
      <div className="club-header" style={{ borderLeft: `4px solid ${club.color}` }}>
        <div className="club-header-logo-wrap" style={{ background: club.bg }}>
          <img
            src={club.logo}
            alt={`Logo ${club.name}`}
            className="club-header-logo"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="club-header-fallback" style={{ color: club.color, display: 'none' }}>
            {club.short.slice(0, 3)}
          </div>
        </div>
        <div>
          <h1 className="club-header-name">{club.name}</h1>
          <div className="club-header-meta">
            {loading ? 'Načítám…' : `${filtered.length} článků · ${club.city}`}
          </div>
        </div>
      </div>

      {/* Filtry zdrojů */}
      <div className="source-filters">
        {['Vše', ...SOURCES].map(s => (
          <button
            key={s}
            className={`source-chip ${source === s ? 'active' : ''}`}
            onClick={() => setSource(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Stavy */}
      {loading && (
        <div className="state-wrap">
          <div className="spinner" />
          <p>Načítám aktuální články…</p>
        </div>
      )}

      {error && !loading && (
        <div className="state-wrap error">
          <p>⚠️ {error}</p>
          <p className="error-hint">Zkontroluj, že backend běží na localhost:3000</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="state-wrap">
          <p>Žádné aktuální články {source !== 'Vše' ? `ze zdroje ${source}` : 'pro tento klub'}</p>
        </div>
      )}

      {/* Články */}
      {!loading && !error && (
        <div className="articles-list">
          {filtered.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

function ArticleCard({ article }) {
  const style = SOURCE_STYLES[article.source] || { bg: '#F3F3F3', color: '#444' }
  const isNew = dayjs().diff(dayjs(article.publishedAt), 'hour') < 3

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card"
    >
      {article.image && (
        <img src={article.image} alt="" className="article-img" loading="lazy" />
      )}
      <div className="article-body">
        <div className="article-meta">
          <span className="source-pill" style={{ background: style.bg, color: style.color }}>
            {article.source}
          </span>
          {isNew && <span className="new-pill">NOVÉ</span>}
          <span className="article-time">{dayjs(article.publishedAt).fromNow()}</span>
        </div>
        <h2 className="article-title">{article.title}</h2>
        {article.perex && <p className="article-perex">{article.perex}</p>}
      </div>
    </a>
  )
}
