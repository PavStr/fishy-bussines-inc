# Mo i Rana Sardinerklubb

En enkel, statisk informasjonsside for Mo i Rana Sardinerklubb, tilpasset GitHub Pages.

## Innhold
- `index.html`: semantisk en-sidestruktur
- `styles.css`: minimal visuell stil
- `site-config.js`: samlet statisk innhold, lenker, kontaktpunkter og event-konfigurasjon
- `app.js`: rendering av innhold og innlasting av arrangementer fra Google Sheets
- `assets/docs/`: offentlige dokumenter
- `assets/logo/`: original logo og web-klare varianter
- `.github/workflows/deploy-pages.yml`: automatisk publisering til GitHub Pages

## Før publisering
Oppdater `site-config.js` med:

1. Offisielle URL-er for Facebook og Brønnøysundregisteret.
2. Rollebaserte e-postadresser eller andre offentlige kontaktpunkter.
3. `events.sheetId` når den offentlige Google Sheets-oversikten er klar.

Felter uten verdi skjules automatisk i grensesnittet.

## Google Sheet for arrangementer
Opprett et offentlig lesbart ark med en fane som heter `Events`, og bruk disse kolonnene nøyaktig:

- `date`
- `title`
- `description`
- `location`
- `link`
- `visible`
- `status`

Verdier:

- `date`: `YYYY-MM-DD`
- `visible`: `yes` eller `no`
- `status`: `planned`, `confirmed` eller `completed`

Når `events.sheetId` er satt, henter siden data fra:

`https://docs.google.com/spreadsheets/d/<SHEET_ID>/gviz/tq?tqx=out:csv&sheet=Events`

Siden viser bare arrangementer der:

- `visible=yes`
- `status!=completed`
- `date` er i dag eller senere i `Europe/Oslo`

## Enkelt oppdateringsløp
Den enkleste pipeline-en er:

1. Styret oppdaterer Google Sheet.
2. Nettsiden leser arket direkte som CSV fra Google.
3. Nye arrangementer vises ved neste sideoppdatering.

Det betyr at dere ikke trenger database, adminpanel eller GitHub-commit for vanlige arrangementsendringer.

## Slik kobler du arket til siden
1. Opprett et Google Sheet.
2. Gi fanen navnet `Events`.
3. Legg inn første rad med disse kolonnene:

```text
date,title,description,location,link,visible,status
```

4. Legg inn rader, for eksempel:

```text
2026-04-12,Årsmøte,Årsmøte for medlemmer,Mo i Rana,,yes,confirmed
2026-06-03,Sardinavaganza,Sosial samling og aktivitet,Mo i Rana,https://example.com,yes,planned
```

5. Publiser arket slik at det er offentlig lesbart:
   `Fil` -> `Del` -> `Publiser på nettet` eller del det som offentlig visning, så lenge CSV-endepunktet er tilgjengelig.
6. Kopier Sheet-ID-en fra URL-en:

```text
https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
```

7. Sett den inn i `events.sheetId` i `site-config.js`.

Eksempel:

```js
events: {
  sheetId: "1abcDEFghijkLMNopQRstuVWxyz1234567890",
  tabName: "Events",
  timezone: "Europe/Oslo",
  emptyMessage: "Ingen kommende arrangementer."
}
```

Når dette er gjort, er oppdateringsløpet bare: rediger arket -> last inn siden på nytt.

## Hvis dere vil ha litt mer kontroll senere
Et neste trinn kan være en GitHub Action som henter arket og lagrer en lokal `events.json` ved hver endring eller på timeplan. Men for v1 er direkte lesing fra Google Sheet både enklest og penest.

## Lokal test
Åpne repoet i en enkel lokal server, for eksempel VS Code Live Server eller tilsvarende statisk server, og kontroller:

- at layouten er lesbar på mobil og desktop
- at lenker og PDF virker
- at tom eller feilende event-feed gir en rolig tomtilstand

## Drift
Push til `main` utløser GitHub Pages-workflowen og publiserer rotmappen som statisk nettsted.
