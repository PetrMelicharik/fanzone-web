import { useState } from 'react'
import { CLUBS } from '../clubs.js'
import './ClubList.css'

function ClubLogo({ club }) {
  const [src, setSrc] = useState(club.logo)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="club-logo-fallback" style={{ color: club.color }}>
        {club.short.slice(0, 3).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`Logo ${club.name}`}
      className="club-logo"
      onError={() => {
        if (src === club.logo && club.logoPng) {
          setSrc(club.logoPng)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

export default function ClubList({ onSelect }) {
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? CLUBS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.short.toLowerCase().includes(search.toLowerCase())
      )
    : CLUBS

  return (
    <div>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Hledat klub nebo město…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      <div className="clubs-grid">
        {filtered.map(club => (
          <button key={club.slug} className="club-card" onClick={() => onSelect(club)}>
            <div className="club-logo-wrap" style={{ background: club.bg }}>
              <ClubLogo club={club} />
            </div>
            <div className="club-info">
              <div className="club-name">{club.name}</div>
              <div className="club-city">{club.city}</div>
            </div>
            <span className="club-arrow">›</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">Žádný klub nenalezen</div>
      )}
    </div>
  )
}
