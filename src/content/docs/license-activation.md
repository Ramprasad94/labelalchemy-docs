---
title: License activation
description: How to activate a Label Alchemy license — entering your key, moving it between machines, the offline grace period, and how the perpetual license + update window works.
---

:::note[Coming soon]
Label Alchemy is launching shortly and isn't available yet, so licenses aren't on sale until
release. This page explains how activation will work. **[Join early access](https://labelalchemy.dev/#early-access)**
to get the founding-member offer first when it goes live.
:::

Label Alchemy's free tier needs no account and no license. **Paid features** — bulk convert, deploy
to org, project-wide AI naming, custom denylist, diverging-name duplicate detection, and Audit CSV
export — are unlocked with a license key from your purchase.

## What's free vs. Paid

| Free (no license) | Paid (requires a license) |
|-------------------|---------------------------|
| Single-file scan, name, review, apply | **Bulk convert** across your whole project |
| Deterministic naming + per-file AI naming (BYOK) | **Project-wide AI naming** (reuses existing labels + your convention) |
| Organize labels into categories | **Deploy to org** on approve (production hard-blocked) |
| Folder/project **Audit Report** + cost estimate | **Audit CSV export** |
| Smart label reuse + change-record output | **Custom denylist** (your own terms) |
| Built-in technical denylist | **Catch diverging-name duplicates** (reuse-or-create at write) |
| | Priority email support |

You can scan, name, review, and apply on single files forever without paying. The preview always
works — only the Paid actions require a valid key. For the full feature breakdown, see
[Features](/features/).

## Enter your license key

1. Buy a license — you'll receive a **license key** by email from Lemon Squeezy.
2. In VS Code, open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`).
3. Run **Label Alchemy: Enter License Key**.
4. Paste the key and press Enter.

Label Alchemy validates the key and, on success, activates the Paid features immediately. Your key is
stored in VS Code's encrypted secret storage — never in `settings.json` and never logged.

:::tip[Copying the key]
Keys are **case-sensitive**. Copy directly from your purchase email with no leading or trailing
spaces.
:::

## Moving the license between machines

Your license activates a limited number of **devices** (seats). To move it to another machine
yourself — no need to email support:

1. On the machine you're leaving, open the Command Palette → **Label Alchemy: Deactivate License on
   This Device**. This frees the seat.
2. On the new machine, run **Label Alchemy: Enter License Key** and paste the same key.

If you try to activate beyond your seat limit, Label Alchemy tells you the activation limit was
reached — deactivate on another device first, or add another license.

## Offline & validation grace period

Label Alchemy re-validates your license periodically (about every 7 days) and on restart. The check
sends only your license key and a VS Code machine ID — never your source. If the license server is
unreachable:

- If you previously validated successfully, you keep working normally during a **3-day grace
  period**.
- A **warning** appears after 1 day of failed validation.
- Network problems alone never block you — only a genuinely invalid/expired key does, and only
  after the grace period.

## What your purchase includes

Label Alchemy is sold as a **one-time, perpetual license** — the version you buy is yours to keep
forever. It includes a **12-month window of updates**; after that window your installed version keeps
working indefinitely, and only features released *after* your window are locked until you renew
updates (Command Palette → the **Renew updates** prompt links to your account).

There's a Personal vs. Commercial license (based on who pays), a limited **Founding-Member**
early-bird for the first launch buyers, and a per-seat **Team** plan that's coming soon. Pricing,
the founding offer, and renewal costs are kept current on the website:

➡️ **[See current pricing on labelalchemy.dev](https://labelalchemy.dev/#pricing)** — all figures,
Purchasing Power Parity discounts, and the refund window live there.

:::note[Why updates matter]
Salesforce ships roughly three API versions a year. Staying within an update window keeps Label
Alchemy compatible with your org and tooling as Salesforce, LWC, and VS Code evolve.
:::

## Troubleshooting activation

**"License key not accepted."** Confirm you're using the key from your Lemon Squeezy purchase email
(case-sensitive, no extra spaces).

**"Activation limit reached."** Deactivate the license on a device you no longer use (see
[Moving the license between machines](#moving-the-license-between-machines)), or add another license.

For more, see [Troubleshooting](/troubleshooting/) or email **support@labelalchemy.dev**.
