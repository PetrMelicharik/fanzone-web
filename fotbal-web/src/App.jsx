import { useState } from 'react'
import ClubList from './components/ClubList.jsx'
import ArticleList from './components/ArticleList.jsx'
import './App.css'

export default function App() {
  const [selectedClub, setSelectedClub] = useState(null)

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo" onClick={() => setSelectedClub(null)} style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="Fanzone" className="app-logo-img" />
            <div className="app-logo-text">
              <div className="app-logo-title">Fanzone</div>
              <div className="app-logo-sub">Zprávy z české fotbalové ligy</div>
            </div>
          </div>
          {selectedClub && (
            <button className="back-btn" onClick={() => setSelectedClub(null)}>
              ← Všechny kluby
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {selectedClub ? (
          <ArticleList club={selectedClub} onBack={() => setSelectedClub(null)} />
        ) : (
          <ClubList onSelect={setSelectedClub} />
        )}
      </main>

      <footer className="app-footer">
        <div className="app-footer-inner">
          <img src="/logo.png" alt="Fanzone" className="footer-logo" />
          <div className="footer-sources">
            iSport.cz · Sport.cz · ČT Sport · EuroFotbal.cz · ČeskéNoviny.cz · iDnes.cz
          </div>
        </div>
      </footer>
    </div>
  )
}
