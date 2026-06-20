---
title: Troubleshooting
description: Fixes for common Label Alchemy issues — scanner found nothing, package-root errors, AI capability-test failures, blocked deploys, and license-key problems.
---

If something isn't working, the fixes below cover the most common cases. For anything else, ask in
[Discussions → Q&A](https://github.com/Ramprasad94/labelalchemy/discussions/categories/q-a) or email
**support@labelalchemy.dev**.

## The commands don't appear in the Command Palette

Label Alchemy activates when it detects a Salesforce project. Make sure:

- You've opened a **folder** (not a single file) that contains `sfdx-project.json` or a
  `force-app/` directory.
- You're on **VS Code 1.85 or later**.
- The extension is installed and enabled (Extensions panel → search "Label Alchemy").

## The scanner found nothing in my file

Check that the file is a supported type (`.cls`, `.js`, `.html`, `.cmp`, `.app`) and that it
contains string literals that aren't already Custom Label references. The scanner skips SOQL,
API names with `__`, and commented-out code.

## "No Salesforce package root found"

Label Alchemy looks for a `force-app` or similar SFDX package directory. Make sure you have
`sfdx-project.json` in your workspace root and the file you're scanning is under the package
directory.

## AI naming capability test fails

- Check the **base URL** matches your provider.
- Check the **API key** (no extra spaces, not expired).
- For **Ollama / LM Studio**: make sure the server is running and the model is loaded.

See [AI provider setup](/providers/#capability-test) for the per-provider checklist.

## Deploy is blocked

- **"Production deploy blocked"** — confirm you're targeting a sandbox or scratch org. Production
  orgs are hard-blocked by design, with no override.
- **"No deployable files"** — the selected path contains no Apex, LWC, Aura, or CustomLabels files.

Deploy to Org is a [Pro feature](/license-activation/).

## License key not accepted

- Use the key from your Lemon Squeezy purchase email — keys are **case-sensitive** and must have
  no extra spaces.
- If the key was already activated on another machine, email **support@labelalchemy.dev**.
- If validation is failing due to a network outage, a [3-day grace period](/license-activation/#offline--validation-grace-period)
  keeps Pro working if you'd activated successfully before.

## Still stuck?

- **Questions & how-to:** [Discussions → Q&A](https://github.com/Ramprasad94/labelalchemy/discussions/categories/q-a)
- **Bugs:** [open a bug report](https://github.com/Ramprasad94/labelalchemy/issues/new?template=bug_report.yml) — include your extension version, VS Code version, OS, and a small **redacted** repro snippet
- **Anything private (billing, license):** email **support@labelalchemy.dev**
