const css = `
  :root {
    --v-bg: #ffffff;
    --v-fg: #171717;
    --v-text: #262626;
    --v-muted: #666666;
    --v-border: #e5e5e5;
    --v-accent: #0059d6;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 9.5pt;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    line-height: 1.55;
    color: var(--v-text);
    background: var(--v-bg);
    text-rendering: optimizeLegibility;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .resume {
    hyphens: manual;
    font-feature-settings: "kern" 1, "liga" 1;
  }
  .resume h1 {
    font-size: 21pt;
    margin: 0 0 0.35rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--v-fg);
  }
  /* Headline e contatos abaixo do nome. */
  .resume h1 + p {
    margin: 0 0 0.4rem;
    color: var(--v-muted);
    font-size: 8.75pt;
    line-height: 1.7;
  }
  .resume h1 + p strong {
    font-size: 10.5pt;
    font-weight: 500;
    color: var(--v-fg);
  }
  .resume h2 {
    font-size: 8.5pt;
    margin: 1.9rem 0 0.9rem;
    padding: 0 0 0.4rem;
    border-bottom: 1px solid var(--v-border);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--v-accent);
    line-height: 1.2;
  }
  .resume h3 {
    font-size: 10pt;
    margin: 1.35rem 0 0;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.35;
    color: var(--v-fg);
  }
  .resume h2 + h3 {
    margin-top: 0;
  }
  /* Empresa, local e data abaixo do cargo. */
  .resume h3 + p {
    margin: 0.1rem 0 0.5rem;
    font-size: 8.75pt;
    color: var(--v-muted);
  }
  .resume h3 + p strong {
    font-weight: 500;
    color: var(--v-text);
  }
  .resume p {
    margin: 0 0 0.65rem;
  }
  .resume ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  .resume li {
    margin: 0.3rem 0;
    padding-left: 0.1rem;
  }
  .resume li::marker {
    color: var(--v-muted);
  }
  .resume strong {
    font-weight: 600;
    color: var(--v-fg);
  }
  .resume code {
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 0.86em;
    color: var(--v-fg);
  }
  .resume a {
    color: var(--v-accent);
    text-decoration: none;
  }
  @media print {
    .resume h2,
    .resume h3,
    .resume h3 + p {
      break-after: avoid;
    }
    /* Cada experiência fica inteira na mesma página. */
    .resume ul,
    .resume p {
      break-inside: avoid;
    }
  }
`;

type Props = {
  markdownHtml: string;
  embeddedFontFaces: string;
};

export function ResumeShell({ markdownHtml, embeddedFontFaces }: Props) {
  const styleBlock = embeddedFontFaces + css;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <style dangerouslySetInnerHTML={{ __html: styleBlock }} />
      </head>
      <body>
        <main
          className="resume"
          dangerouslySetInnerHTML={{ __html: markdownHtml }}
        />
      </body>
    </html>
  );
}
