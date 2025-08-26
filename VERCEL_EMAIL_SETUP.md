# E-Mail-Versand auf Vercel einrichten

## Schritt-für-Schritt Anleitung

### 1. Vercel Dashboard öffnen
- Gehen Sie zu: https://vercel.com/dashboard
- Loggen Sie sich mit Ihrem Account ein
- Klicken Sie auf Ihr **"dasEntwicklerhaus"** Projekt

### 2. Zu Environment Variables navigieren
- Klicken Sie oben auf den Tab **"Settings"**
- Klicken Sie links im Menü auf **"Environment Variables"**

### 3. Environment Variables hinzufügen

Für jede der folgenden Variablen:
- Klicken Sie **"Add New"** 
- Geben Sie Name und Value genau wie unten ein
- Wählen Sie **"Production, Preview, and Development"**
- Klicken Sie **"Save"**

#### Variable 1:
```
Name: SMTP_HOST
Value: mail.agenturserver.de
```

#### Variable 2:
```
Name: SMTP_PORT
Value: 587
```

#### Variable 3:, ,
```
Name: SMTP_USER
Value: admin@dasentwicklerhaus.de
```

#### Variable 4:
```
Name: SMTP_PASS
Value: T3njoka21!
```

### 4. Projekt neu deployen
- Gehen Sie zu **"Deployments"** (oben im Dashboard)
- Beim neuesten/obersten Deployment klicken Sie die drei Punkte **"..."**
- Klicken Sie **"Redeploy"**
- Warten Sie ca. 1-2 Minuten bis das Deployment fertig ist

### 5. E-Mail-Versand testen
- Besuchen Sie Ihre Website: https://dasentwicklerhaus.de/contact
- Füllen Sie das Kontaktformular aus
- Nach dem Absenden sollte eine E-Mail in Ihrem **admin@dasentwicklerhaus.de** Postfach ankommen

## Troubleshooting

### Problem: Keine E-Mails kommen an
- **Lösung 1:** Prüfen Sie den Spam-Ordner
- **Lösung 2:** Überprüfen Sie, dass alle 4 Environment Variables korrekt gesetzt sind
- **Lösung 3:** Warten Sie 5-10 Minuten nach dem Redeploy

### Problem: "Es ist ein Fehler aufgetreten"
- **Lösung:** Das Formular funktioniert auch ohne E-Mail-Versand. Einreichungen werden in den Vercel Function Logs gespeichert.

## Logs anschauen
Um zu sehen ob Nachrichten ankommen:
1. Vercel Dashboard → Ihr Projekt
2. **"Functions"** Tab
3. **"View Function Logs"**
4. Hier sehen Sie alle Kontaktformular-Einreichungen

---

**Wichtig:** Diese Datei enthält Passwörter und sollte NICHT in Git committed werden!