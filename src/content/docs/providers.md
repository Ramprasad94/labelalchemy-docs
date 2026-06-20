---
title: AI provider setup (BYOK)
description: Set up AI-assisted naming in Label Alchemy. Choose from Anthropic, OpenAI, Gemini, DeepSeek, OpenRouter, Ollama, LM Studio, or a custom endpoint.
---

AI naming is opt-in and requires you to bring your own API key (BYOK). The default naming mode
is fully deterministic and works offline with no key. Enable AI naming when you want richer,
more context-aware label names.

## When to use AI naming

**Default (deterministic)** is the right choice for most cases:
- No API key, no cost, no network call
- Works in air-gapped environments
- Consistent — same string always produces the same name
- Validates instantly

**AI naming** adds value when:
- You have hundreds of labels in one batch and want nuanced names
- Your string values are ambiguous without surrounding context
- You're using a free local model (Ollama, LM Studio) and want richer names at $0

In either mode, every name is editable before it applies. AI naming is a suggestion, not a
requirement.

## Setup

1. Open the Command Palette (`Cmd+Shift+P`) → **Label Alchemy: Configure Settings**
2. Enable **AI-assisted naming**
3. Select your **Provider**
4. Select or enter a **Model**
5. Enter your **API Key** (skipped for Ollama, LM Studio, and unauthenticated custom endpoints)
6. Label Alchemy runs a **capability test** (sends a single test prompt). If it passes, you're
   ready. If it fails, an error message shows what's wrong.

Your API key is stored in VS Code's encrypted secret storage — never in `settings.json`, never
logged, never visible in plain text.

## Supported providers

### Anthropic (Claude)

| Setting | Value |
|---------|-------|
| Provider | `Anthropic` |
| Recommended model | `claude-sonnet-4-6` |
| Fast / cheap model | `claude-haiku-4-5` |
| API key required | Yes |
| Key source | [console.anthropic.com](https://console.anthropic.com) |

Claude Haiku is the best price/quality tradeoff for label naming — fast, cheap, and produces
clean Salesforce-style names. Sonnet if you want the best quality. Do not use Claude Opus for
this task — it's slower and more expensive with no practical naming advantage.

### OpenAI

| Setting | Value |
|---------|-------|
| Provider | `OpenAI` |
| Recommended model | `gpt-4o-mini` |
| Higher quality | `gpt-4o`, `gpt-4.1` |
| API key required | Yes |
| Key source | [platform.openai.com](https://platform.openai.com) |

`gpt-4o-mini` is the best value for naming. `gpt-4o` / `gpt-4.1` for more careful names on
complex string sets.

### Google Gemini

| Setting | Value |
|---------|-------|
| Provider | `Gemini` |
| Recommended model | `gemini-2.0-flash` |
| API key required | Yes |
| Key source | [aistudio.google.com](https://aistudio.google.com) |

Gemini 2.0 Flash is fast and has a generous free tier. Good option if you already have a Google
AI Studio key.

### DeepSeek

| Setting | Value |
|---------|-------|
| Provider | `DeepSeek` |
| Recommended model | `deepseek-chat` |
| API key required | Yes |
| Key source | [platform.deepseek.com](https://platform.deepseek.com) |

Very cost-effective. `deepseek-chat` (V3) produces solid naming results.

### OpenRouter

| Setting | Value |
|---------|-------|
| Provider | `OpenRouter` |
| Model format | `<provider>/<model>` — e.g. `meta-llama/llama-3.3-70b-instruct` |
| API key required | Yes |
| Key source | [openrouter.ai](https://openrouter.ai) |

OpenRouter gives you access to 100+ models from a single API key. Useful if you want to
experiment or you already have OpenRouter credits. Any model that supports the OpenAI Chat
Completions format works.

### Ollama (local, free)

| Setting | Value |
|---------|-------|
| Provider | `Ollama` |
| API key required | **No** |
| Default base URL | `http://localhost:11434` |
| Recommended models | `llama3.3`, `qwen2.5:14b`, `deepseek-r1:14b` |
| Prerequisites | [ollama.ai](https://ollama.ai) installed and running |

**Nothing leaves your machine.** Ollama runs the model locally. Free and private. Best choice
for air-gapped setups or when privacy is a hard requirement.

Setup:
```bash
# Install Ollama, then pull a model
ollama pull llama3.3
# Ollama runs on port 11434 by default — no additional config needed
```

Label Alchemy connects to `http://localhost:11434` automatically. Override in settings if
your Ollama runs on a different port.

### LM Studio (local, free)

| Setting | Value |
|---------|-------|
| Provider | `LM Studio` |
| API key required | **No** |
| Default base URL | `http://localhost:1234` |
| Prerequisites | [lmstudio.ai](https://lmstudio.ai) installed, server started |

**Nothing leaves your machine.** LM Studio hosts any GGUF model as a local OpenAI-compatible
server. Same privacy guarantees as Ollama.

Setup:
1. Download and install LM Studio
2. Download a model (Models tab)
3. Go to Local Server → Start Server (default port 1234)
4. Set Provider to `LM Studio` in Label Alchemy settings

### Custom OpenAI-compatible endpoint

| Setting | Value |
|---------|-------|
| Provider | `Custom` |
| Base URL | Your endpoint URL |
| API key | Optional (depends on your endpoint) |
| Model | Whatever your endpoint accepts |

Use this for:
- A self-hosted vLLM or LiteLLM proxy
- A corporate proxy in front of a supported model
- Any other service that speaks the OpenAI Chat Completions API

## Model requirements

Label Alchemy sends a single chat message to the model and parses the response as a raw
string (not JSON). Any model that can follow instructions well enough to return a short
underscore-separated name is compatible.

Minimum viable models: ~7B parameters or equivalent quality. Models below 7B tend to produce
inconsistent or non-compliant names.

## Capability test

When you configure a provider, Label Alchemy runs a quick test: it sends the message
`Return only this text: Hello` and checks whether the response contains `Hello`. If the test
fails:

- **Wrong base URL** — check that the URL matches your provider's endpoint exactly
- **Invalid API key** — the key may have been copied with whitespace or is expired
- **Model not available** — the model name may be wrong or not loaded (Ollama/LM Studio)
- **Server not running** — start Ollama or LM Studio server first

See [Troubleshooting](/troubleshooting/) for more on capability-test failures.

## Privacy

When you use an API-based provider (Anthropic, OpenAI, etc.), the **string values** from your
source files are sent to that provider's API. This is necessary for the model to suggest names.

If your Salesforce code contains confidential business strings, use Ollama or LM Studio — both
run locally and nothing leaves your machine.

Keys are stored in VS Code's encrypted secret storage (`vscode.SecretStorage`). They are never
written to disk in plain text and are not accessible to other extensions.

See the full [privacy policy](/privacy/) for details on what is and isn't sent.
