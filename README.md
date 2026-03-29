# Mo i Rana Sardinerklubb

Public-facing one-page website for Mo i Rana Sardinerklubb, built as a small static site and intended for straightforward publishing on GitHub Pages or any comparable static host.

The project is intentionally simple:

- no build step
- no framework dependency
- no server-side runtime
- content and links are managed through a single configuration file
- events can be sourced from a public Google Sheets CSV feed

## Project Goals

This repository is designed around a few practical constraints:

- keep the site easy to understand for the next maintainer
- keep recurring updates lightweight
- avoid introducing infrastructure that is unnecessary for a public informational site
- preserve a clean separation between public website content and anything that should remain private

## Repository Layout

- `index.html` defines the semantic one-page document structure
- `styles.css` contains the site styling
- `app.js` renders configured content and loads event data in the browser
- `site-config.js` holds public-facing copy, links, and event feed settings
- `assets/docs/` stores public downloadable documents
- `assets/logo/` contains source and web-ready logo assets
- `CNAME` is used when the site is served on a custom domain

## How It Works

The page renders in two layers:

1. Static public content is loaded from `site-config.js`.
2. Upcoming events are fetched client-side from a public CSV feed.

If the event feed is unavailable, the site falls back to a calm, user-friendly empty/error state rather than failing the entire page.

This keeps the editing model simple: normal text updates happen in `site-config.js`, while routine event maintenance can happen in a spreadsheet rather than in HTML.

## Event Feed

The site supports a public Google Sheets-backed event feed. The preferred approach is to publish the sheet as CSV and point the site to that URL.

Expected tab name:

- `Events`

Expected columns:

- `date`
- `title`
- `description`
- `location`
- `link`
- `visible`
- `status`

Field expectations:

- `date` uses `YYYY-MM-DD`
- `visible` uses `yes` or `no`
- `status` uses `planned`, `confirmed`, or `completed`

Only rows that meet all of the following conditions are rendered:

- `visible=yes`
- `status` is not `completed`
- `date` is today or later in `Europe/Oslo`

## Local Development

Because this is a static site, local development only requires a simple web server.

Examples:

```bash
python3 -m http.server 8000
```

or

```bash
npx serve .
```

Then open `http://localhost:8000`.

Opening `index.html` directly as a `file://` URL is not recommended when testing event loading, because browser security rules can block the remote fetch behavior used for the CSV feed.

## Publishing

The site is suitable for GitHub Pages and other static hosting platforms.

A typical deployment flow is:

1. Update public content or configuration.
2. Commit changes to the default branch.
3. Let the static host publish the repository contents.

If a GitHub Pages workflow is enabled for the repository, pushes to the publishing branch can be deployed automatically.

## Configuration Guidelines

Treat `site-config.js` as public.

Only place information there that is intended to appear in the browser or to be retrievable by anyone visiting the site. That includes:

- public organization copy
- public links
- public contact endpoints
- public event feed URLs

Do not place confidential or operationally sensitive information in this repository, including:

- private email addresses not intended for publication
- unpublished documents
- internal notes
- non-public spreadsheet links
- tokens, secrets, or credentials of any kind

## Maintenance Notes

For a site of this size, restraint is a feature. Before adding tooling, ask whether it materially improves maintainability, reliability, or editorial workflow. In most cases, the current static approach should remain the default.

If the project later needs more control over event publishing, a reasonable next step would be to generate a local JSON snapshot from a scheduled job rather than introducing a full CMS.
