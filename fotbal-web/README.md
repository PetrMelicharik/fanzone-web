# ⚽ Fanzone – Nasazení na Vercel

React webová aplikace pro čtení zpráv z české fotbalové ligy.

---

## 🚀 Nasazení krok za krokem

### 1. Nahraj backend na Render.com (zdarma)

1. Vytvoř účet na [render.com](https://render.com)
2. Klikni **New → Web Service**
3. Propoj svůj GitHub a vyber repozitář (nahraj tam složku `backend/`)
4. Nastav:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Klikni **Create Web Service**
6. Po nasazení dostaneš URL jako `https://fotbal-backend-xxxx.onrender.com`

### 2. Nastav URL backendu v .env souboru

Vytvoř soubor `.env` v kořeni projektu `fotbal-web/`:

```
VITE_API_URL=https://fotbal-backend-xxxx.onrender.com
```

### 3. Nahraj web na Vercel (zdarma)

#### Možnost A – přes GitHub (doporučeno)
1. Vytvoř účet na [vercel.com](https://vercel.com)
2. Klikni **New Project → Import Git Repository**
3. Vyber svůj repozitář
4. Nastav **Root Directory** na `fotbal-web`
5. Přidej Environment Variable: `VITE_API_URL` = URL tvého Render backendu
6. Klikni **Deploy**

#### Možnost B – přes CLI
```bash
npm install -g vercel
cd fotbal-web
vercel
# Postupuj podle instrukcí
```

---

## 💻 Lokální vývoj

```bash
# 1. Spusť backend (v jiném terminálu)
cd backend
npm install && npm run dev

# 2. Spusť web
cd fotbal-web
npm install
npm run dev
# Otevře http://localhost:5173
```

---

## 📁 Struktura

```
fotbal-web/
├── src/
│   ├── components/
│   │   ├── ClubList.jsx    # Seznam klubů s logy
│   │   └── ArticleList.jsx # Články vybraného klubu
│   ├── clubs.js            # Data klubů + loga
│   ├── api.js              # Komunikace s backendem
│   ├── App.jsx             # Hlavní komponenta
│   └── App.css
└── index.html
```
