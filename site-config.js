window.SITE_CONFIG = Object.freeze({
  brand: {
    name: "Mo i Rana Sardinerklubb",
    tagline:
      "Lokal forening for fellesskap, arrangementer og sardinsk alvor.",
    intro: ""
  },
  purpose: {
    paragraphs: [
      "Mo i Rana Sardinerklubb er en frivillig forening i Mo i Rana. Klubben samler mennesker gjennom åpne arrangementer, lokal tilstedeværelse og en tydelig identitet bygget på orden, fellesskap og et passende mål av hermetisk alvor.",
      "Foreningen skal være inkluderende, synlig og virksom. Den arbeider med arrangementer, samarbeid og offentlig nærvær, og gjør dette med den høytidelige nøkternheten som bare en sardinerklubb kan forsvare.",
      "Vedtektene er foreningens styrende dokument. Denne siden er den korte, offentlige versjonen."
    ],
    statutes: {
      label: "Vedtekter",
      href: "assets/docs/vedtekter-mo-i-rana-sardinerklubb.pdf"
    }
  },
  officialLinks: [
    {
      label: "Facebook",
      description: "Kunngjøringer og bevegelser i stimen",
      href: "https://www.facebook.com/groups/sardinerklubben"
    },
    {
      label: "Brønnøysundregisteret",
      description: "Formell eksistens",
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
    // Use a published CSV feed for public event data.
    csvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vR08JCwF80ToEVl_THNZ66bpDrVP-a5hLCBPRW4khtHS1mQYCRmo3GATc-RgNjUWwxZGB0Fx2_JFn1u/pub?gid=0&single=true&output=csv",
    sheetId: "",
    tabName: "Events",
    timezone: "Europe/Oslo",
    emptyMessage: "Ingen kommende arrangementer er kunngjort."
  },
  footer: ""
});
