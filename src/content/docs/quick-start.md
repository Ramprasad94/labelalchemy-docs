---
title: Quick Start
description: Install Label Alchemy and convert your first Salesforce string to a Custom Label in under 5 minutes.
---

Convert your first Salesforce string to a Custom Label in under 5 minutes. No API key required for
the default setup.

## Step 1 — Install

**From the VS Code Extensions panel:**

1. Open VS Code
2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux) to open Extensions
3. Search **"Label Alchemy"**
4. Click **Install**

**Or from the command line:**

```bash
code --install-extension ramprasad94.labelalchemy
```

See the [full install guide](/install/) for requirements and how to confirm activation.

## Step 2 — Open a Salesforce project

Open a folder containing a Salesforce DX project (one that has a `sfdx-project.json` or
`force-app/` directory). Label Alchemy activates automatically when it detects Salesforce files.

## Step 3 — Scan a file

1. Open any `.cls`, LWC `.js`/`.html`, or Aura `.cmp`/`.app`/`.js` file
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows) to open the Command Palette
3. Type **"Label Alchemy: Scan Active File"** and press Enter

Or: right-click the file in the Explorer and select **"Label Alchemy: Scan Active File"**.

Label Alchemy scans the file and opens the **Proposed Changes** panel listing every hard-coded
string it found.

## Step 4 — Review and approve

In the Proposed Changes panel:

- **Edit a label name** — click any name to edit it. It's validated live (40-char limit, valid
  characters, no duplicates). The Approve button stays disabled until all checked names are valid.
- **Uncheck a label** — if a string isn't user-facing copy, uncheck it. It stays in your code
  untouched.
- **View the diff** — click **View Diff** next to any file to see the exact line changes in VS
  Code's native diff editor.
- **Approve All** or **Approve Selected** — when you're happy, click to apply.

## Step 5 — Done

After approving:

1. **Your source file** is updated — hard-coded strings replaced with the correct SF references
   (`System.Label.X` for Apex, `{getter}` for LWC HTML, etc.)
2. **`CustomLabels.labels-meta.xml`** is updated with the new label entries (you can set a category
   on labels in the review panel before approving)
3. For LWC HTML changes, the sibling `.js` is automatically updated with the import + getter
4. A **change record** is written to `labelalchemy-changes/` — a `summary.md`, `summary.csv`, and
   `package.xml` — and an **Open summary** notification appears

Deploy to your org when ready:

```bash
sf project deploy start --source-dir force-app/main/default/labels
sf project deploy start --source-dir force-app/main/default/classes
```

Or use **Deploy to Org** from the Command Palette (a Paid feature — requires a license).

## Scan a whole project (Audit Report)

To see every hard-coded string across your project:

1. Right-click any folder in the Explorer → **Label Alchemy: Scan Folder**
   Or press `Cmd+Shift+P` → **Label Alchemy: Scan Folder** → pick a folder
2. The **Audit Report** opens — total count, by component type, by file, with per-file drill-down,
   and an estimated manual-conversion time
3. From the Audit Report, click **Convert to Labels** to apply bulk conversions [Paid]

The folder scan and Audit Report are free. Bulk convert requires a license.

## Optional: Enable AI naming

If you want richer label names from an LLM:

1. Open the Command Palette → **Label Alchemy: Configure Settings**
2. Choose **AI-assisted naming**
3. Pick a provider (Anthropic, OpenAI, Gemini, DeepSeek, OpenRouter, Ollama, LM Studio, Custom)
4. Pick a model, enter your API key (skipped for local providers)
5. Label Alchemy runs a quick capability test — if it passes, you're ready

Your API key is stored in VS Code's encrypted secret storage. It's never written to a settings
file or logged.

## Next steps

- [All features →](/features/)
- [Provider setup guide →](/providers/)
- [Full FAQ →](/faq/)
- [Activate a license →](/license-activation/)
