---
title: License activation
description: How to activate a Label Alchemy Pro license — entering your key, machine limits, the offline grace period, and what your one-time purchase includes.
---

Label Alchemy's free tier needs no account and no license. **Pro features** — bulk convert, deploy
to org, and Audit CSV export — are unlocked with a license key from your purchase.

## What's free vs. Pro

| Free (no license) | Pro (license required) |
|-------------------|------------------------|
| Single-file scan, name, review, apply | Bulk convert across all files from an Audit Report |
| Folder/project **Audit Report** (read-only) | **Deploy to Org** (one-click, production hard-blocked) |
| Deterministic naming + AI naming (BYOK) | Audit **CSV export** |

You can scan, name, review, and apply on single files forever without paying. The preview always
works — only Pro actions require a valid key.

## Enter your license key

1. Buy a license — you'll receive a **license key** by email from Lemon Squeezy.
2. In VS Code, open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`).
3. Run **Label Alchemy: Enter License Key**.
4. Paste the key and press Enter.

Label Alchemy validates the key and, on success, activates Pro immediately. Your key is stored in
VS Code's encrypted secret storage — never in `settings.json` and never logged.

:::tip[Copying the key]
Keys are **case-sensitive**. Copy directly from your purchase email with no leading or trailing
spaces.
:::

## Machine limits (per-user licensing)

The Individual license is validated by your **VS Code machine ID**, so it's tied to the machine you
activate on:

- **Individual** — activates on your machine. If you work across multiple machines, email
  **support@labelalchemy.dev** and we'll help.
- **Team** — multiple seats (3-seat minimum), suitable for a team working across machines.

## Offline & validation grace period

Label Alchemy re-validates your license periodically (about every 7 days) and on restart. If the
license server is unreachable:

- If you previously validated successfully, you keep working normally during a **3-day grace
  period**.
- A **warning** appears after 1 day of failed validation.
- Network problems alone never block you — only a genuinely invalid/expired key does, and only
  after the grace period.

## What your purchase includes

- **Individual license** — a **one-time purchase** you own forever: **$49 personal / $99
  commercial**. Includes free updates within **version 1** (a future major version would be a
  separate paid upgrade).
- **Founding Member** — at launch, the first 100 buyers get the full license for **$29 one-time**.
- **Team** — the only subscription tier: **$15/seat/month** (3-seat minimum) or **$144/seat/year**.
- **Regional pricing** — Lemon Squeezy's Purchasing Power Parity discount applies automatically at
  checkout (~40–50% off in India and similar markets). No code needed.

See current pricing on the [Label Alchemy website](https://labelalchemy.dev/#pricing).

## Troubleshooting activation

**"License key not accepted."** Confirm you're using the key from your Lemon Squeezy purchase email
(case-sensitive, no extra spaces). If it was already activated on another machine, email
**support@labelalchemy.dev**.

For more, see [Troubleshooting](/troubleshooting/) or email **support@labelalchemy.dev**.
