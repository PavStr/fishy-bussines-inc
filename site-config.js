window.SITE_CONFIG = Object.freeze({
  brand: {
    name: "Mo i Rana Sardinerklubb",
    tagline:
      "Lokal forening for arrangementer, fellesskap og tydelig identitet.",
    intro: ""
  },
  purpose: {
    paragraphs: [
      "Mo i Rana Sardinerklubb er en frivillig forening i Mo i Rana. Klubben samler mennesker gjennom åpne arrangementer og lokal forankring.",
      "Arbeidet skal være ryddig, inkluderende og synlig. Vedtektene er foreningens styrende dokument."
    ],
    statutes: {
      label: "Vedtekter",
      href: "assets/docs/vedtekter-mo-i-rana-sardinerklubb.pdf"
    }
  },
  officialLinks: [
    {
      label: "Facebook",
      description: "Kunngjøringer",
      href: "https://www.facebook.com/groups/sardinerklubben"
    },
    {
      label: "Brønnøysundregisteret",
      description: "Registrering",
      href: "https://virksomhet.brreg.no/nb/oppslag/underenheter/934310640"
    },
    {
      label: "Vedtekter",
      description: "PDF",
      href: "assets/docs/vedtekter-mo-i-rana-sardinerklubb.pdf"
    }
  ],
  contacts: {
    intro: "",
    items: [
      {
        role: "Generelle henvendelser",
        value: "",
        href: ""
      },
      {
        role: "Medlemskap",
        value: "",
        href: ""
      },
      {
        role: "Styret / presse / samarbeid",
        value: "",
        href: ""
      }
    ]
  },
  events: {
    // Sett inn Google Sheet-ID her når arket er klart.
    // URL-format: https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
    sheetId: "",
    tabName: "Events",
    timezone: "Europe/Oslo",
    emptyMessage: "Ingen kommende arrangementer."
  },
  footer: ""
});
