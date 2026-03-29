(function () {
  const config = window.SITE_CONFIG;

  if (!config) {
    return;
  }

  renderStaticContent(config);
  loadEvents(config.events).catch(() => {
    renderEmptyEvents(config.events.emptyMessage);
  });

  function renderStaticContent(siteConfig) {
    setText("site-title", siteConfig.brand.name);
    setText("site-tagline", siteConfig.brand.tagline);
    setText("site-intro", siteConfig.brand.intro);
    setText("footer-note", siteConfig.footer);
    document.getElementById("site-footer").hidden = !siteConfig.footer;

    const purposeBody = document.getElementById("purpose-body");
    siteConfig.purpose.paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      purposeBody.appendChild(p);
    });

    const statutes = siteConfig.purpose.statutes;
    const statutesContainer = document.getElementById("purpose-statutes");
    if (statutes && statutes.href) {
      statutesContainer.appendChild(
        buildLink(statutes.label, statutes.href, "Åpne vedtektene som PDF")
      );
    } else {
      statutesContainer.hidden = true;
    }

    renderInfoList(
      document.getElementById("links-section"),
      document.getElementById("links-list"),
      siteConfig.officialLinks
        .filter((item) => item.href)
        .map((item) => ({
          label: item.label,
          description: item.description,
          node: buildLink("Åpne", item.href, item.label)
        }))
    );

    renderInfoList(
      document.getElementById("contacts-section"),
      document.getElementById("contacts-list"),
      siteConfig.contacts.items
        .filter((item) => item.value && item.href)
        .map((item) => ({
          label: item.role,
          description: item.value,
          node: buildLink(item.value, item.href, item.role)
        }))
    );
  }

  async function loadEvents(eventsConfig) {
    if (!eventsConfig.sheetId) {
      renderEmptyEvents(eventsConfig.emptyMessage);
      return;
    }

    const feedUrl = buildGoogleSheetCsvUrl(eventsConfig.sheetId, eventsConfig.tabName);
    const response = await fetch(feedUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error("Event feed request failed.");
    }

    const csv = await response.text();
    const rows = parseCsv(csv);
    const events = normalizeEvents(rows, eventsConfig.timezone);

    if (!events.length) {
      renderEmptyEvents(eventsConfig.emptyMessage);
      return;
    }

    renderEvents(events);
  }

  function buildGoogleSheetCsvUrl(sheetId, tabName) {
    const sheet = encodeURIComponent(tabName || "Events");
    return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheet}`;
  }

  function normalizeEvents(rows, timezone) {
    const today = getTodayInTimeZone(timezone);

    return rows
      .map((row) => ({
        date: (row.date || "").trim(),
        title: (row.title || "").trim(),
        description: (row.description || "").trim(),
        location: (row.location || "").trim(),
        link: (row.link || "").trim(),
        visible: (row.visible || "").trim().toLowerCase(),
        status: (row.status || "").trim().toLowerCase()
      }))
      .filter((event) => {
        return (
          event.date &&
          /^\d{4}-\d{2}-\d{2}$/.test(event.date) &&
          event.title &&
          event.visible === "yes" &&
          event.status !== "completed" &&
          event.date >= today
        );
      })
      .sort((left, right) => left.date.localeCompare(right.date));
  }

  function renderEvents(events) {
    const list = document.getElementById("events-list");
    const status = document.getElementById("events-status");
    list.innerHTML = "";
    status.textContent = "";

    events.forEach((event) => {
      const item = document.createElement("li");
      item.className = "event";

      const header = document.createElement("div");
      header.className = "event-header";

      const title = document.createElement("h3");
      title.textContent = event.title;

      const date = document.createElement("time");
      date.className = "event-date";
      date.dateTime = event.date;
      date.textContent = formatDate(event.date);

      header.append(title, date);
      item.appendChild(header);

      const metaParts = [];
      if (event.location) {
        metaParts.push(event.location);
      }
      if (event.status) {
        metaParts.push(formatStatus(event.status));
      }

      if (metaParts.length) {
        const meta = document.createElement("p");
        meta.className = "event-meta";
        meta.textContent = metaParts.join(" · ");
        item.appendChild(meta);
      }

      if (event.description) {
        const description = document.createElement("p");
        description.className = "event-description";
        description.textContent = event.description;
        item.appendChild(description);
      }

      if (event.link) {
        const linkContainer = document.createElement("p");
        linkContainer.className = "event-link";
        linkContainer.appendChild(buildLink("Mer informasjon", event.link, event.title));
        item.appendChild(linkContainer);
      }

      list.appendChild(item);
    });
  }

  function renderEmptyEvents(message) {
    const list = document.getElementById("events-list");
    const status = document.getElementById("events-status");
    list.innerHTML = "";
    status.textContent = message;
  }

  function renderInfoList(section, list, items) {
    list.innerHTML = "";
    if (!items.length) {
      section.hidden = true;
      return;
    }

    section.hidden = false;
    items.forEach((item) => {
      const li = document.createElement("li");

      const label = document.createElement("span");
      label.className = "item-label";
      label.textContent = item.label;

      const description = document.createElement("span");
      description.className = "item-description";

      if (item.description) {
        description.append(item.description);
      }

      if (item.node) {
        if (item.description) {
          description.append(" ");
        }
        description.appendChild(item.node);
      }

      li.append(label, description);
      list.appendChild(li);
    });
  }

  // Small CSV parser so descriptions may contain commas or line breaks.
  function parseCsv(csvText) {
    const rows = [];
    let current = "";
    let row = [];
    let inQuotes = false;

    for (let index = 0; index < csvText.length; index += 1) {
      const char = csvText[index];
      const next = csvText[index + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          current += '"';
          index += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (char === "," && !inQuotes) {
        row.push(current);
        current = "";
        continue;
      }

      if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") {
          index += 1;
        }
        row.push(current);
        rows.push(row);
        row = [];
        current = "";
        continue;
      }

      current += char;
    }

    if (current.length || row.length) {
      row.push(current);
      rows.push(row);
    }

    if (!rows.length) {
      return [];
    }

    const [headerRow, ...dataRows] = rows;
    const headers = headerRow.map((header) => header.trim());

    return dataRows
      .filter((dataRow) => dataRow.some((value) => value.trim() !== ""))
      .map((dataRow) => {
        return headers.reduce((record, header, index) => {
          record[header] = dataRow[index] || "";
          return record;
        }, {});
      });
  }

  function getTodayInTimeZone(timeZone) {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return formatter.format(new Date());
  }

  function formatDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return new Intl.DateTimeFormat("no-NO", {
      timeZone: "Europe/Oslo",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function formatStatus(status) {
    const labels = {
      planned: "Planlagt",
      confirmed: "Bekreftet",
      completed: "Gjennomført"
    };
    return labels[status] || status;
  }

  function buildLink(text, href, label) {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.textContent = text;
    anchor.setAttribute("aria-label", label);

    if (/^https?:\/\//.test(href)) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }

    return anchor;
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      if (value) {
        node.hidden = false;
        node.textContent = value;
      } else {
        node.hidden = true;
        node.textContent = "";
      }
    }
  }
})();
