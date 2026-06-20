---
title: Features
description: Complete feature list for Label Alchemy — scanner, naming engine, diff review, deploy, audit report, and LLM providers.
---

## Scanning

### Multi-file-type detection
Label Alchemy detects hard-coded strings across all Salesforce source types in a single pass:

| File type | What's detected |
|-----------|----------------|
| **Apex** (`.cls`) | Exception messages, `addError` values, return strings, `result.put` values, string literals |
| **LWC JavaScript** | Toast titles/messages, property assignments, getter returns, template literals |
| **LWC HTML** | `label`, `placeholder`, `title`, `value`, `message`, `header` attributes; static text content |
| **Aura JavaScript** | `component.set` strings, toast titles/messages, string assignments |
| **Aura Markup** (`.cmp`, `.app`) | `label`, `placeholder`, `title`, `value`, `description` attributes; static text content |

### Smart false-positive suppression
The scanner skips strings that aren't user-facing copy:
- Salesforce API names (anything with `__`)
- SOQL / SOSL query strings
- Framework references (`$A.get`, `v.*`, `c.*`, `lightning:`, `force:`)
- Debug calls (`System.debug`, `console.*`, `Logger.*`)
- MIME types, single characters, numeric strings
- Already-converted `$Label.*` references

### Stateful preprocessing
Before scanning, the content is cleaned in a column-preserving pass that blanks block comments,
inline comments (quote-aware), HTML comments, and multi-line SOQL `[SELECT … ]` blocks. This
prevents false positives from commented-out code while keeping line/column numbers accurate for
every result.

### Folder / project scan (free)
Right-click any folder in the Explorer, or pick one from the Command Palette, to scan your whole
project. Bounded-concurrency reads (12 at a time) prevent EMFILE crashes on large Salesforce repos.
A 1.5 MB per-file guard skips minified/generated files. A cancellable progress bar shows `N/total`.

## Naming engine

### Deterministic naming (default — no API key, offline, $0)
Label names are generated locally by `smartLabelName`:
- Splits the string value into meaningful words (strips fillers: "a", "the", "of", etc.)
- Adds a light context prefix when the signal is unambiguous: `Error_` for exception messages,
  `Button_` for button labels, `Placeholder_` for placeholder text
- Applies your global label prefix if configured
- Enforces the 40-character Salesforce name limit
- Ensures uniqueness within the label set (appends `_2`, `_3`… as needed)
- Produces valid Snake_Case (`My_Save_Button`, `Error_Name_Required`, `Placeholder_Enter_Email`)

### AI naming (opt-in, BYOK)
Enable `labelAlchemy.useAiNaming` to have an LLM suggest richer, more context-aware names. Any
supported provider works — including free local models via Ollama or LM Studio (nothing leaves
your machine). The LLM suggestion is always sanitized to a valid Salesforce name regardless of
what the model returns. [See provider setup →](/providers/)

### Editable names
Every generated label name is an editable input in the diff panel. Edit before approving.
Validation runs live: regex, 40-char limit, duplicate detection. The Approve button is disabled
until all names are valid.

## Diff review panel

### Component-grouped layout
Files are grouped by bundle. An LWC component's `.html` and `.js` appear under the same header so
you review them together, not scrolled apart.

### Collapsible sections
Both the component-group headers and per-file headers collapse. The toolbar has **Expand all /
Collapse all** controls. Collapsed sections with an invalid name show an ⚠ marker.

### Per-label checkboxes
Approve the whole file, or cherry-pick individual labels. The file-level checkbox goes
indeterminate when only some labels are selected.

### VS Code native diff editor
Click **View Diff** on any file to open it in VS Code's built-in diff editor — the exact character
diff, syntax-highlighted. The diff is computed from the currently approved labels, so it updates
if you uncheck a label.

### LWC sidecar preview
For LWC HTML changes whose sibling `.js` isn't itself a proposed change, a read-only sidecar card
shows the `@salesforce/label` imports and getters that will be auto-added. View Diff is available
on the sidecar too.

### Filter box
Filter the panel by component name or file name. Useful on large Audit Reports with hundreds of
proposed changes.

## Apply

### Disk-backed streaming apply
Changes are applied one file at a time — read → transform → write → release. Memory usage is O(1
file) regardless of how many files are in the batch. Works on orgs with thousands of source files.

### Automatic LWC sidecar
When an LWC HTML file is approved and the binding getter needs to exist in the sibling `.js`, Label
Alchemy adds the `import` and getter automatically. If that `.js` was also in the approved set, the
sidecar change is merged into the existing edit, not written separately.

### CustomLabels XML merge
New labels are merged into your existing `CustomLabels.labels-meta.xml` — existing labels are
never overwritten. The file is anchored to the `force-app` package that holds the converted source
files (not the workspace root). Labels are sorted alphabetically.

### Repeated-string reuse
A string that appears in multiple files maps to **one** label, not one per file. The second
occurrence just references the label by name.

## Audit Report (free)

### Folder-wide read-only report
Scan a folder or project and see the full picture before committing to any conversion:
- Total hard-coded string count
- Breakdown by component type (Apex / LWC / Aura)
- Top-offenders table (files sorted by count)
- An "≈ N hrs estimated manual conversion" cost-estimate KPI (assumptions are visible and editable)
- Filter by component or file name
- Per-file drill-down (lazy — loads strings on expand, not upfront)

### CSV export [Pro]
Download the Audit Report as a CSV file — file path, component name, string count, plus the
estimate summary and per-file minutes — for sharing with architects, QA, or clients.

## Deploy to Org [Pro]

### One-click deploy after convert
After applying a conversion, Label Alchemy offers to deploy the changed files to a connected
Salesforce org in one click. No terminal required.

### Scoped entry points
- **Deploy Last Conversion** (Command Palette) — redeploys the most recently converted set,
  with a component-type summary so you know exactly what will deploy.
- **Deploy This File** (right-click a file) — deploys a single file.
- **Deploy This Folder** (right-click a folder) — deploys all Salesforce files under the folder.

### Production guardrail
Deploying to a production org from the IDE is **hard-blocked**. No override. The block fires unless
the org is confirmed as a sandbox, scratch org, or Developer Edition. If org type is unknown, the
deploy is blocked (fail-safe). Keeps your release pipeline intact.

### Scales to large orgs (manifest deploy)
For bulk deploys with more than 25 files, Label Alchemy generates a `package.xml` manifest and
deploys via `sf project deploy start --manifest`. An LWC bundle (4 files) is one manifest member.
The entire CustomLabels file is one component. This keeps the deploy command within OS limits
regardless of repo size.

## Provider support (AI naming)

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
