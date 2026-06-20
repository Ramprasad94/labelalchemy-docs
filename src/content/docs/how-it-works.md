---
title: How it works
description: Step-by-step walkthrough of the Label Alchemy pipeline — scan, name, review, apply, deploy.
---

Label Alchemy converts hard-coded strings to Salesforce Custom Labels in a five-stage pipeline.
Every stage is transparent and user-controlled — nothing is written or deployed without your
explicit approval.

## Stage 1 — Scan

Label Alchemy reads your Salesforce source files and finds every string that belongs in a Custom
Label, using a set of file-type-aware regex detectors.

**What it finds:**
- Exception messages, `addError` values, and return strings in Apex
- Toast titles and messages, property assignments in LWC JavaScript
- `label`, `placeholder`, `title`, and static text content in LWC HTML
- `component.set` strings and toast events in Aura JavaScript
- Attribute values and text content in Aura markup (`.cmp`, `.app`)

**What it skips automatically:**
- Salesforce API names (any string containing `__`)
- SOQL / SOSL query strings
- Framework references (`v.*`, `c.*`, `$Label.*`, `$A.get`)
- Debug and logging calls
- MIME types, numeric strings, single characters
- Commented-out code (block and inline comments are stripped before scanning)

The scanner runs entirely locally — no network call, no API key, no cost.

## Stage 2 — Name

Each detected string becomes a Salesforce Custom Label. The label needs a valid developer Name
(≤40 chars, Snake_Case, letters/digits/underscores, starts with a letter).

**Deterministic mode (default):**
Label Alchemy generates names locally using a set of rules:
1. Split the string into meaningful words (drop fillers like "a", "the", "of")
2. Detect a context hint from the surrounding code:
   - String in an `addError` or exception → prefix with `Error_`
   - String in a placeholder attribute → prefix with `Placeholder_`
   - String on a button → prefix with `Button_`
3. Join with underscores; apply your label prefix if configured
4. Trim to fit within 40 characters; ensure uniqueness

Example: `"Please enter your email address"` in a placeholder → `Placeholder_Enter_Email_Address`

**AI mode (opt-in):**
Enable AI naming and bring your own API key for richer, more context-aware names from an LLM.
The model's suggestion is always sanitized to a valid Salesforce name — the model can't produce an
invalid output that reaches your codebase.

Either way, you see every generated name in the diff panel and can edit any of them before
approving.

## Stage 3 — Review

A diff panel opens inside VS Code listing every proposed label. For each label you see:

- The original string value
- The generated label name (editable)
- The file and line number
- A checkbox to include or exclude it

**Editing names:** Click any label name to edit it. Validation runs as you type — you'll see a red
border if the name is invalid (too long, invalid characters, or a duplicate). The Approve button
stays disabled until all checked names are valid.

**Viewing the diff:** Click **View Diff** on any file to open VS Code's native diff editor and see
exactly which lines will change. The diff is live — it updates when you check/uncheck labels.

**Grouped by component:** LWC files (`.html` + `.js`) appear together under a component header.
Aura bundle files appear together. Apex classes are their own group.

## Stage 4 — Apply

Click **Approve Selected** and Label Alchemy writes the changes:

1. **Source files** — each approved file is read, transformed, and written one at a time. The
   replacement is file-type-aware:
   - Apex → `System.Label.<Name>`
   - LWC HTML → `{getter}` (attribute) or `{getter}` (text node)
   - LWC JavaScript → `import <camel> from '@salesforce/label/c.<Name>';` (hoisted to top)
   - Aura HTML → `"{!$Label.c.<Name>}"` (attribute quotes preserved)
   - Aura JavaScript → `$A.get("$Label.c.<Name>")`

2. **LWC sidecar** — for every LWC HTML change, Label Alchemy automatically adds the
   `@salesforce/label` import and the `<camel> = Name;` getter to the sibling `.js` file.
   No manual wiring needed.

3. **CustomLabels XML** — new labels are merged into your existing
   `CustomLabels.labels-meta.xml`. Existing labels are never overwritten. The file is found
   automatically based on the package structure of the converted files.

Everything happens in memory first — files are only written after all transformations are
ready, so a partial failure doesn't leave your code in a broken state.

## Stage 5 — Deploy [Pro]

After applying, Label Alchemy offers a one-click deploy to a connected Salesforce org:

1. **Pick your org** — a QuickPick shows all your authorized orgs with sandbox/scratch/production
   badges. Your choice is remembered for the session.
2. **Production check** — Label Alchemy verifies the org type before deploying. Production orgs are
   hard-blocked. Unknown org types are blocked (fail-safe). Only sandboxes, scratch orgs, and
   Developer Edition orgs may proceed.
3. **Deploy** — the `sf project deploy start` command runs in a visible VS Code terminal. You see
   the real `sf` output; you can cancel at any time.

For large deployments (>25 changed files), Label Alchemy generates a `package.xml` manifest so
the deploy stays within OS command-line limits even for thousands of files.

## The full picture (single file)

```
Right-click a .cls file → "Scan Active File"
    └─ Scanner reads the file; finds 12 hard-coded strings
    └─ Naming engine generates valid label names (offline)
    └─ Diff panel opens:
         - 12 labels proposed
         - You edit 2 names
         - You uncheck 1 label that's actually an internal constant
    └─ Approve Selected (11 labels)
    └─ ContactValidator.cls  — 11 string literals replaced
    └─ CustomLabels.labels-meta.xml — 11 new labels merged
    └─ "Deploy these 11 changes?" → [Deploy to org] [Not now]
    └─ Deploy to devSandbox → sf CLI terminal opens, deploy completes
```

## Privacy

In the default (deterministic) mode, **no data ever leaves your machine**. The scanner, naming
engine, and apply step are entirely local.

If you enable AI naming, file content is sent to the LLM provider you configured with your own
API key. Choose Ollama or LM Studio as your provider and the content stays local even in AI mode.

Your API keys and license key are stored in VS Code's encrypted secret storage — never in plain
text, never logged, never shared.

[Full privacy policy →](/privacy/)
