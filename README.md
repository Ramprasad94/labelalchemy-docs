# Label Alchemy — Documentation

Source for the **Label Alchemy** documentation site, published at
**[docs.labelalchemy.dev](https://docs.labelalchemy.dev)**.

Label Alchemy is a VS Code extension that converts hard-coded user-facing strings in Salesforce
Apex, LWC, and Aura code into Custom Labels — deterministic by default, with optional AI-assisted
naming (BYOK).

- 🧩 **Install:** [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ramprasad94.labelalchemy)
- 🌐 **Website:** [labelalchemy.dev](https://labelalchemy.dev)
- 💬 **Support & community:** [github.com/Ramprasad94/labelalchemy](https://github.com/Ramprasad94/labelalchemy)

Built with [Astro Starlight](https://starlight.astro.build/) and deployed on Vercel.

## Project structure

```
.
├── public/                  # favicon, OG image, static assets
├── src/
│   ├── assets/              # logo (light/dark)
│   ├── content/docs/        # one Markdown/MDX file per page (flat slugs)
│   ├── styles/custom.css    # brand theming (indigo/violet, Inter + JetBrains Mono)
│   └── content.config.ts
├── astro.config.mjs         # site config, sidebar, fonts, OG metadata
├── vercel.json
└── package.json
```

Pages live in `src/content/docs/` as flat slugs (`install.md` → `/install/`); the sidebar grouping
is configured in `astro.config.mjs`.

## Local development

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build locally
```

## Deployment

Pushing to `main` triggers a Vercel production deploy (framework auto-detected as Astro;
see `vercel.json`). The custom domain `docs.labelalchemy.dev` is configured in the Vercel project.

## Contributing

Found an error in the docs or want to suggest an improvement? Open an issue or discussion in the
[community repository](https://github.com/Ramprasad94/labelalchemy), or use the **Edit page** link
at the bottom of any page on [docs.labelalchemy.dev](https://docs.labelalchemy.dev).
