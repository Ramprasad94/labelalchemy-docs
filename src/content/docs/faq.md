---
title: FAQ
description: "Frequently asked questions about Label Alchemy: AI, privacy, Salesforce compatibility, pricing, and more."
---

## General

**What is Label Alchemy?**
Label Alchemy is a VS Code extension that converts hard-coded strings in Salesforce source files
(Apex, LWC, Aura) to Custom Labels. It finds the strings, generates valid label names, shows you
a diff, and writes the changes when you approve.

**Does it work with my Salesforce org type?**
Yes. Label Alchemy works with any Salesforce DX project structure regardless of org type —
Developer Edition, sandbox, scratch org, or production. The deploy feature prevents deploys to
production, but scanning and converting work everywhere.

**What Salesforce file types does it support?**
- Apex classes (`.cls`)
- LWC JavaScript (`.js` inside an `lwc/` bundle)
- LWC HTML (`.html` inside an `lwc/` bundle)
- Aura JavaScript (`.js` inside an `aura/` bundle)
- Aura markup (`.cmp`, `.app` inside an `aura/` bundle)

**Does it work in the Salesforce Extensions Pack / SFDX workspace?**
Yes. Label Alchemy is independent of the Salesforce Extensions Pack and works alongside it.
Both can be installed at the same time.

**What version of VS Code is required?**
VS Code 1.85 or later.

## AI and naming

**Do I need an AI/LLM to use Label Alchemy?**
No. The default naming mode is fully deterministic — it runs locally with no API key, no network
call, and no cost. AI naming is opt-in.

**How does the deterministic naming work?**
It splits the string into meaningful words, strips filler words ("a", "the", "of"), detects a
context hint from surrounding code (error message, placeholder, button, etc.), applies your label
prefix if configured, and enforces the 40-character Salesforce name limit.

**What AI providers are supported?**
Anthropic (Claude), OpenAI, Google Gemini, DeepSeek, OpenRouter, Ollama, LM Studio, and any
custom OpenAI-compatible endpoint. [See the full guide →](/providers/)

**What is BYOK?**
Bring Your Own Key. Label Alchemy doesn't have its own AI subscription — you provide an API key
for whichever provider you use. Your key is stored in VS Code's encrypted secret storage and
used only to call the provider's API on your behalf.

**Can I use AI naming for free?**
Yes — if you use Ollama or LM Studio. Both run local models on your machine at $0.

**Can I edit AI-suggested names?**
Yes. Every name — whether deterministic or AI-suggested — is editable in the diff panel before
you approve. The Approve button stays disabled until all names pass validation.

**Will the AI ever produce an invalid Salesforce label name?**
No. Whatever the model returns is sanitized to a valid Salesforce name before it appears in the
UI. The model's raw response can't reach your codebase in an invalid state.

## Privacy and data

**Does Label Alchemy send my code to a server?**
In default (deterministic) mode: **no**. The scanner, naming engine, and apply step are all
local. Nothing is sent anywhere.

In AI naming mode with an API-based provider: the **string values** from your source files are
sent to the LLM provider (Anthropic, OpenAI, etc.) to get name suggestions. File paths and
surrounding code context may also be sent.

Use Ollama or LM Studio as your provider if you need to keep everything local even in AI mode.

**Is my license key stored securely?**
Yes. License keys are stored in VS Code's encrypted secret storage (`vscode.SecretStorage`),
not in `settings.json`. They are never logged or written to disk in plain text.

**Does Label Alchemy have telemetry?**
No usage telemetry is collected. Label Alchemy does not phone home or report usage statistics.
The only external connections are: license validation (Lemon Squeezy) and LLM API calls when
AI naming is enabled.

**Where is the privacy policy?**
[Privacy policy →](/privacy/)

## Features and behavior

**What happens to strings that appear in multiple files?**
They map to one label. The second occurrence refers to the same label name instead of creating
a duplicate.

**Will it overwrite my existing Custom Labels?**
No. Label Alchemy merges new labels into your existing `CustomLabels.labels-meta.xml`. It never
modifies existing entries.

**What if I don't have a CustomLabels file yet?**
Label Alchemy creates one at the correct path under your `force-app` structure.

**Why do LWC HTML changes also update the `.js` file?**
LWC `{binding}` syntax in HTML requires a getter in the sibling JavaScript file. Label Alchemy
adds the `@salesforce/label` import and getter automatically so the binding resolves. Without
this step, the LWC component would fail to deploy.

**Can I undo a conversion?**
Yes — through git. Label Alchemy writes to disk, but it doesn't commit anything. A `git checkout`
or `git restore` reverts the changes. We recommend converting on a branch so you can PR-review
the diff before merging.

**What is the Audit Report?**
A folder-wide read-only scan that shows every hard-coded string organized by file and component.
Free. Use it to understand the scope of work before committing to any conversions.

**Does Label Alchemy handle Salesforce namespace prefixes?**
The default mode uses `c.` as the label namespace (standard developer edition namespace). If
your org has a custom namespace, set it via the `labelAlchemy.labelPrefix` configuration. The
prefix is prepended to all generated names.

## Licensing and pricing

**Is the free tier really free? No card required?**
Yes. Scan, name, review, and apply on single files — no account, no credit card.

**What does Pro add?**
Bulk convert (apply conversions across all files from an Audit Report), Deploy to Org (one-click
deploy after converting), and Audit CSV export — plus all roadmap features as they ship.
[Pricing →](https://labelalchemy.dev/#pricing)

**Is it a subscription?**
The Individual license is a one-time purchase — $49 personal, $99 commercial — that you own
forever, with free updates to version 1. Only the Team tier is a subscription, at $15/seat/month
(3-seat minimum, or $144/seat/year). At launch, a **Founding Member** early-bird gives the first
100 buyers the full license for $29 one-time (regularly $49). See [License activation](/license-activation/)
for how it works.

**Is there regional pricing for India or other markets?**
Yes. Lemon Squeezy's Purchasing Power Parity pricing applies automatically at checkout —
approximately 40–50% off for India and other high-Salesforce-ecosystem markets. No code needed.

**Is the license per machine or per user?**
Per user (validated by VS Code machine ID). Contact support if you work across multiple
machines. The Team tier supports multiple seats. [More on activation →](/license-activation/)

**What happens if my internet is down and license validation fails?**
Label Alchemy has a 3-day grace period. If it validated successfully before and can't reach the
license server now, you continue working normally. A warning is shown after 1 day.

**What's on the roadmap for Pro?**
Conflict detection (flag strings that already match an existing label), reuse suggestions
(propose an existing label before creating a new one), and org-level reporting. Subscribers
receive these as they ship at no extra cost. [See the roadmap →](https://github.com/Ramprasad94/labelalchemy/blob/main/ROADMAP.md)

**Can I use the extension in CI?**
The extension runs in the VS Code UI context, not as a standalone CLI. It's designed for
interactive developer use, not CI pipelines.

## Troubleshooting

Common problems and fixes — scanner found nothing, package-root errors, capability-test failures,
blocked deploys, license-key issues — are on the dedicated [Troubleshooting](/troubleshooting/) page.
