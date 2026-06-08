# Benötigte ENV-Variablen

Diese Datei ist eine Vorlage. Keine echten Zugangsdaten in diese Datei oder in `.env.local` eintragen, solange sie nicht bewusst lokal oder in Vercel als Secret gesetzt werden.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

ADMIN_LOGIN_EMAIL=
ADMIN_LOGIN_PASSWORD=

CRON_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

CONTACT_RECEIVER_EMAIL=
```

Hinweise:
- `SUPABASE_SERVICE_ROLE_KEY` darf nur serverseitig verwendet werden.
- Admin-Zugriffe und Schreibzugriffe auf `inquiries` sollen über serverseitige API-Routen laufen.
- Kundendaten, Angebote und Rechnungen dürfen nicht öffentlich über den Browser mit dem Anon-Key gelesen werden.
