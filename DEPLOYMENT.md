# 🚀 Nasazení AI Chatbot Aplikace

## 📋 Přehled
- **Frontend**: GitHub Pages (automatické nasazení)
- **Backend**: Render.com (Node.js service)
- **Databáze**: Bez databáze (lokální úložiště)

## 🌐 Render.com - Backend

### 1. Vytvoření Render service
1. Jděte na https://render.com
2. Přihlaste se a klikněte "New +"
3. Vyberte "Web Service"
4. Propojte s GitHub repozitářem

### 2. Konfigurace
- **Name**: `chatbot-backend`
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

### 3. Environment Variables
Nastavte tyto proměnné v Render dashboardu:
```
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_ORG_ID=org-your-org-id-here
OPENAI_ASSISTANT_ID=asst-your-assistant-id-here
NODE_ENV=production
```

### 4. Doména
Render automaticky vytvoří URL jako:
`https://your-app-name.onrender.com`

## 📱 GitHub Pages - Frontend

### 1. Automatické nasazení
- GitHub Actions automaticky nasadí při push do `main` branch
- Frontend bude dostupný na: `https://your-username.github.io/your-repo-name`

### 2. Manuální nasazení
```bash
cd frontend
npm run build
# Nahrajte obsah složky build na GitHub Pages
```

## 🔧 Konfigurace

### Frontend API URL
V `frontend/src/services/ChatService.js` je nastaveno:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-app-name.onrender.com/api'
  : 'http://localhost:3001/api';
```

**Důležité**: Změňte `your-app-name` na skutečné jméno vašeho Render service!

### CORS nastavení
Backend je nakonfigurován pro:
- `https://*.github.io`
- `https://*.render.com`
- `http://localhost:3000` (vývoj)

## ✅ Kontrola nasazení

### Backend Health Check
```bash
curl https://your-app-name.onrender.com/api/health
```

### Frontend
1. Otevřete GitHub Pages URL
2. Zkontrolujte, že se aplikace načte
3. Otestujte chat funkcionalitu

## 🔒 Bezpečnost

### Environment Variables
- ✅ API klíče jsou v Render dashboardu
- ✅ Žádné klíče v kódu
- ✅ CORS je správně nastaveno

### Rate Limiting
- 100 požadavků za 15 minut
- Aktivní na Render

## 🐛 Řešení problémů

### Backend se nespustí
1. Zkontrolujte environment variables v Render
2. Podívejte se na logy v Render dashboardu
3. Otestujte lokálně: `cd backend && npm start`

### Frontend se nenačte
1. Zkontrolujte GitHub Actions logy
2. Ověřte, že build proběhl úspěšně
3. Zkontrolujte API URL v ChatService.js

### CORS chyby
1. Ověřte, že backend URL je správně nastaveno
2. Zkontrolujte CORS konfiguraci v `config/config.js`
3. Restartujte Render service

## 📊 Monitoring

### Render Dashboard
- Logy v reálném čase
- Metriky výkonu
- Status service

### GitHub Actions
- Build status
- Deployment logy
- Error reporting 