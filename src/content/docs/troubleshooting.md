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

Deploy to Org is a [Paid feature](/license-activation/) — it requires a license.

## License key not accepted

- Use the key from your Lemon Squeezy purchase email — keys are **case-sensitive** and must have
  no extra spaces.
- If validation is failing due to a network outage, a [3-day grace period](/license-activation/#offline--validation-grace-period)
  keeps paid features working if you'd activated successfully before.

## "Activation limit reached"

Your license activates a limited number of devices. On a machine you no longer use, run **Label
Alchemy: Deactivate License on This Device** to free the seat, then re-enter the key on the new
machine. See [Moving the license between machines](/license-activation/#moving-the-license-between-machines).

## My custom denylist terms aren't being applied

The custom denylist requires a license — without one, only the always-on built-in technical denylist
applies. With a license, manage your terms via **Label Alchemy: Edit Custom Denylist** or the
**Manage denylist** link in the Audit Report. Matching is whole-value and case-insensitive (no
substrings or wildcards), so add the exact string you want ignored.

## Still stuck?

- **Questions & how-to:** [Discussions → Q&A](https://github.com/Ramprasad94/labelalchemy/discussions/categories/q-a)
- **Bugs:** [open a bug report](https://github.com/Ramprasad94/labelalchemy/issues/new?template=bug_report.yml) — include your extension version, VS Code version, OS, and a small **redacted** repro snippet
- **Anything private (billing, license):** email **support@labelalchemy.dev**
