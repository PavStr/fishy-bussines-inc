# Mo i Rana Sardinerklubb

A minimal one-page public website for Mo i Rana Sardinerklubb, designed for GitHub Pages.

## Structure
- `index.html`: semantic one-page layout
- `styles.css`: minimal site styling
- `site-config.js`: static copy, links, contacts, and events configuration
- `app.js`: client-side rendering and Google Sheets event loading
- `assets/docs/`: public documents
- `assets/logo/`: original logo source and web-ready variants
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow

## Before publishing
Update `site-config.js` with:

1. Public contact addresses when they are ready.
2. The Google Sheet ID for the events feed.
3. Any revised public-facing copy if the club wants to tune tone or wording.

Empty fields are automatically hidden in the interface.

## Google Sheets events feed
Create a publicly readable Google Sheet with a tab named `Events`.

Use these columns exactly:

- `date`
- `title`
- `description`
- `location`
- `link`
- `visible`
- `status`

Field expectations:

- `date`: `YYYY-MM-DD`
- `visible`: `yes` or `no`
- `status`: `planned`, `confirmed`, or `completed`

The site reads the sheet from:

`https://docs.google.com/spreadsheets/d/<SHEET_ID>/gviz/tq?tqx=out:csv&sheet=Events`

The page renders only rows where:

- `visible=yes`
- `status!=completed`
- `date` is today or later in `Europe/Oslo`

## Simple update pipeline
The intended workflow is deliberately small:

1. The board edits the Google Sheet.
2. The website reads the sheet directly as CSV.
3. Updated events appear on the next page refresh.

That means there is no CMS, no database, and no need to edit HTML for normal event updates.

## How to connect the sheet
1. Create a Google Sheet.
2. Name the tab `Events`.
3. Add this header row:

```text
date,title,description,location,link,visible,status
```

4. Add rows such as:

```text
2026-04-12,Årsmøte,Årsmøte for medlemmer,Mo i Rana,,yes,confirmed
2026-06-03,Sardinavaganza,Sosial samling og aktivitet,Mo i Rana,https://example.com,yes,planned
```

5. Make the sheet publicly readable.
6. Copy the Sheet ID from:

```text
https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
```

7. Paste it into `events.sheetId` in `site-config.js`.

Example:

```js
events: {
  sheetId: "1abcDEFghijkLMNopQRstuVWxyz1234567890",
  tabName: "Events",
  timezone: "Europe/Oslo",
  emptyMessage: "Ingen kommende arrangementer er kunngjort."
}
```

Once that is done, the maintenance loop is simply: edit sheet -> refresh page.

## Future option
If the club later wants more control, a GitHub Action could fetch the sheet and write a local `events.json` on a schedule. For v1, direct Google Sheets loading is the simplest approach.

## Local testing
Serve the repository through any simple static server and verify:

- the page reads well on mobile and desktop
- links and the PDF open correctly
- the empty or failing event feed shows a calm fallback state

## Deployment
Pushes to `main` trigger the GitHub Pages workflow and publish the repository root as a static site.
