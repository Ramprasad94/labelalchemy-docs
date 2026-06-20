---
title: Features
description: Complete feature list for Label Alchemy — scanner, naming engine, label categories, diff review, deploy, audit report, change records, denylist, and LLM providers.
---

Most of Label Alchemy is free. The heavy lifting — converting and deploying your **whole project at
once** — is unlocked with a license. Gated features are marked **Paid** below; everything else works
on the free tier with no account and no API key.

## Scanning

### Multi-file-type detection [Free]
Label Alchemy detects hard-coded strings across all Salesforce source types in a single pass:

| File type | What's detected |
|-----------|----------------|
| **Apex** (`.cls`) | Exception messages, `addError` values, return strings, `result.put` values, string literals |
| **LWC JavaScript** | Toast titles/messages, property assignments, getter returns, template literals |
| **LWC HTML** | `label`, `placeholder`, `title`, `value`, `message`, `header` attributes; static text content |
| **Aura JavaScript** | `component.set` strings, toast titles/messages, string assignments |
| **Aura Markup** (`.cmp`, `.app`) | `label`, `placeholder`, `title`, `value`, `description` attributes; static text content |

### Smart false-positive suppression [Free]
The scanner skips strings that aren't user-facing copy: Salesforce API names (anything with `__`),
SOQL/SOSL queries, framework references (`$A.get`, `v.*`, `c.*`, `lightning:`, `force:`), debug calls
(`System.debug`, `console.*`, `Logger.*`), MIME types, single characters, numeric strings, and
already-converted `$Label.*` references. Apex **test classes** are skipped by default when scanning a
folder (toggle with `labelAlchemy.scanTestClasses`).

### Built-in technical denylist [Free] · Custom denylist [Paid]
A built-in technical denylist ships free — HTTP verbs/headers, MIME and charset tokens, and
dynamic-SOQL fragments never get flagged. With a license, add **your** noise — brand and product
names, enum/API values, status codes, feature-flag names — via **Label Alchemy: Edit Custom
Denylist** or the **Manage denylist** link in the Audit Report. Matching is whole-value and
case-insensitive (no substrings/wildcards). Commit the `labelAlchemy.denylist` setting to your
workspace so every developer scans by the same rules.

### Stateful preprocessing [Free]
Before scanning, content is cleaned in a column-preserving pass that blanks block comments, inline
comments (quote-aware), HTML comments, and multi-line SOQL `[SELECT … ]` blocks — eliminating
false positives from commented-out code while keeping line/column numbers accurate.

### Folder / project scan [Free]
Right-click any folder, or pick one from the Command Palette, to scan your whole project.
Bounded-concurrency reads (12 at a time) prevent EMFILE crashes on large repos. A 1.5 MB per-file
guard skips minified/generated files. A cancellable progress bar shows `N/total`.

## Naming Engine

### Deterministic naming [Free] — no API key, offline, $0
Label names are generated locally: meaningful words split out (fillers stripped), a light context
prefix added when unambiguous (`Error_`, `Button_`, `Placeholder_`), your label prefix applied, the
40-character Salesforce limit enforced, and uniqueness ensured (`_2`, `_3`…). Produces valid
Snake_Case by default; switch to PascalCase with `labelAlchemy.labelNameCase`.

### AI naming [Free per-file · Paid project-wide] — BYOK
Enable `labelAlchemy.useAiNaming` to have an LLM suggest richer, context-aware names. The model's
suggestion is always sanitized to a valid Salesforce name. Two scopes (`labelAlchemy.aiNamingScope`):

- **Per-file (`chunk`) — Free:** each file is named on its own context.
- **Project-wide (`project`) — Paid:** also reads your existing `CustomLabels.labels-meta.xml` so an
  identical string reuses its existing label and new names follow your project's convention.

Tune output with `aiNamingStyle` (concise / descriptive / domain-rich), `aiNamingGuidance` (free-text
instructions), and `aiGenerateDescriptions` (also writes each label's Description field). Any
supported provider works — including free local models via Ollama or LM Studio. [Provider setup →](/providers/)

### Editable names [Free]
Every generated name is an editable input in the diff panel. Validation runs live (regex, 40-char
limit, duplicate detection); the Approve button stays disabled until all names are valid.

### Organize labels into categories [Free]
Set a Salesforce category on your labels right in the review panel — per label, or across a whole
file in one click. It writes straight to the label's `<categories>`, so labels land in your org
already sorted instead of dumped in one bucket.

### Smart label reuse [Free]
A string that appears more than once maps to **one** label — both within a single scan **and across
separate scans, days apart**, by reading your existing labels file. Identical strings collapse to one
shared label automatically; new labels merge into your XML.

## Diff Review Panel [Free]

- **Component-grouped layout** — an LWC component's `.html` and `.js` review together under one header.
- **Collapsible sections** with Expand all / Collapse all; collapsed sections with an invalid name show ⚠.
- **Per-label checkboxes** with indeterminate file-level state.
- **VS Code native diff editor** per file (live — updates on checkbox change).
- **LWC sidecar preview** for the auto-added `@salesforce/label` imports and getters.
- **Filter box** by component or file name.

## Apply [Free]

- **Disk-backed streaming apply** — O(1-file) memory; works on repos with thousands of files.
- **Automatic LWC sidecar** — `@salesforce/label` import + getter added to the sibling `.js`.
- **CustomLabels XML merge** — new labels merged into your existing file; existing labels never
  overwritten; anchored to the right `force-app` package; sorted alphabetically.
- **Catch diverging-name duplicates [Paid]** — automatic reuse handles identical text; this flags a
  value that already has a label under a *different* name (from a manual rename or AI-named label) and
  prompts you to reuse the existing label or create a new one — one prompt, no duplicate-value sprawl.

### Change record [Free]
Every convert writes a timestamped folder to `labelalchemy-changes/` — no git required — containing a
readable `summary.md` (labels created, files modified, component breakdown, deploy status), the same
data as `summary.csv`, and a portable `package.xml` you can deploy or hand to a teammate. A one-click
**Open summary** notification appears the moment a conversion finishes.

## Audit Report [Free]

Scan a folder or project and see the full picture before converting:
- Total hard-coded string count and breakdown by component type (Apex / LWC / Aura)
- Top-offenders table; filter by component or file name; lazy per-file drill-down
- An **"≈ N hrs estimated manual conversion"** cost-estimate KPI, with editable assumptions
  (`labelAlchemy.audit.minutesPerString`, optional `labelAlchemy.audit.hourlyRate`)

### Bulk convert [Paid]
Apply conversions across **all** files from the Audit Report in one approval flow, deduped as it goes,
grouped by component bundle.

### CSV export [Paid]
Download the Audit Report as a CSV — file path, component, string count, plus the estimate summary
and per-file minutes — for sharing with architects, QA, or clients.

## Deploy to Org [Paid]

- **One-click deploy after convert** — runs `sf project deploy start` on just the changed files and
  new labels. No terminal step.
- **Scoped entry points** — Deploy Last Conversion (Command Palette), Deploy This File / This Folder
  (right-click).
- **Production guardrail** — deploying to a production org is hard-blocked (no override); only
  sandboxes, scratch orgs, and Developer Edition may proceed; unknown org type is blocked (fail-safe).
- **Scales to large orgs** — for >25 files, generates a `package.xml` manifest and deploys via
  `--manifest`, staying within OS command-line limits.

## Provider Support (AI naming)

| Provider | Model examples | Key required |
|----------|---------------|-------------|
| Anthropic (Claude) | `claude-sonnet-4-6`, `claude-haiku-4-5` | Yes |
| OpenAI | `gpt-4o`, `gpt-4o-mini`, `gpt-4.1` | Yes |
| Google Gemini | `gemini-2.0-flash`, `gemini-1.5-pro` | Yes |
| DeepSeek | `deepseek-chat`, `deepseek-reasoner` | Yes |
| OpenRouter | `meta-llama/llama-3.3-70b-instruct`, + 100 others | Yes |
| Ollama (local) | `llama3.3`, `qwen2.5:14b`, `deepseek-r1:14b` | **No** |
| LM Studio (local) | Any loaded model | **No** |
| Custom OpenAI-compatible | Any endpoint | Optional |

[Provider setup guide →](/providers/)

## Commands

`Scan Active File` · `Scan Folder` · `Configure Settings` · `Switch Naming Mode (Deterministic / AI)`
· `Enter License Key` · `Deactivate License on This Device` · `Edit Custom Denylist` ·
`Deploy Last Conversion to Org` [Paid] · `Deploy This File to Org` [Paid] · `Deploy This Folder to
Org` [Paid] — all prefixed **Label Alchemy:** in the Command Palette.

## Settings

| Setting | What it does |
|---------|--------------|
| `useAiNaming` | Turn on AI naming (default off — deterministic, offline, free) |
| `provider` / `model` / `baseUrl` | LLM provider, model id, and optional API base URL override |
| `aiNamingScope` | `chunk` (free, per-file) or `project` (Paid, project-wide reuse + convention) |
| `aiNamingStyle` | `concise` / `descriptive` / `domainRich` name richness |
| `aiNamingGuidance` | Extra free-text instructions appended to the AI naming prompt |
| `aiGenerateDescriptions` | Also write a Description for each label (extra tokens) |
| `labelNameCase` | `snake` (default) or `pascal` for new names |
| `labelPrefix` | String prepended to every generated label **name** (e.g. `MyApp_`); does not change the `c.` reference namespace |
| `denylist` | Your custom denylist terms (Paid; built-in technical list is always on) |
| `scanTestClasses` | Include Apex test classes in folder scans (off by default) |
| `audit.minutesPerString` / `audit.hourlyRate` | Audit Report cost-estimate assumptions |
