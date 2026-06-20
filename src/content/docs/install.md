---
title: Install
description: Install Label Alchemy in VS Code from the Marketplace, the Extensions panel, or the command line, and confirm it activated.
---

Label Alchemy is a VS Code extension. Installing takes under a minute, and the free tier works
immediately — no account and no API key required.

## Requirements

- **VS Code 1.85 or later**
- A **Salesforce DX project** (a folder containing `sfdx-project.json` or a `force-app/` directory)

Label Alchemy is independent of the Salesforce Extensions Pack and works alongside it — both can be
installed at the same time.

## Install from the Extensions panel

1. Open VS Code.
2. Press `Cmd+Shift+X` (macOS) or `Ctrl+Shift+X` (Windows/Linux) to open **Extensions**.
3. Search for **"Label Alchemy"**.
4. Click **Install**.

## Install from the command line

```bash
code --install-extension ramprasad94.labelalchemy
```

## Install from the Marketplace

Open the [Label Alchemy listing on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ramprasad94.labelalchemy)
and click **Install** — VS Code will open and complete the installation.

## Confirm it activated

Label Alchemy activates automatically when it detects a Salesforce project. To confirm:

1. Open a folder that contains a Salesforce DX project.
2. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`).
3. Type **"Label Alchemy"** — you should see commands such as **Scan Active File**, **Scan Folder**,
   and **Audit Report**.

If the commands don't appear, see [Troubleshooting](/troubleshooting/).

## Next steps

- [Convert your first string → Quick Start](/quick-start/)
- [Enable AI naming (optional) → Provider setup](/providers/)
- [Activate a license → License activation](/license-activation/)
