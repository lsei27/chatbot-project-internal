# Nastavení OpenAI API klíčů

## Krok 1: Získání API klíče
1. Jděte na https://platform.openai.com/api-keys
2. Přihlaste se do svého OpenAI účtu
3. Klikněte na "Create new secret key"
4. Zkopírujte vygenerovaný klíč (začíná s "sk-")

## Krok 2: Získání Assistant ID
1. Jděte na https://platform.openai.com/assistants
2. Vytvořte nového asistenta nebo použijte existujícího
3. Zkopírujte Assistant ID (začíná s "asst_")

## Krok 3: Nastavení environment proměnných
1. V kořenovém adresáři projektu vytvořte soubor `config/.env`
2. Přidejte následující proměnné:

```bash
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_ORG_ID=org-your-org-id-here
OPENAI_ASSISTANT_ID=asst-your-assistant-id-here
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## Krok 4: Ověření nastavení
1. Spusťte backend: `cd backend && npm start`
2. Zkontrolujte, že se server spustil bez chyb
3. Otestujte health endpoint: `http://localhost:3001/api/health`

## Poznámky
- Nikdy nesdílejte API klíče v kódu
- Používejte .env soubory pro lokální vývoj
- Pro produkci nastavte environment proměnné na serveru 