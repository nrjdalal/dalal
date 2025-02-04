# Dalal - A CLI Tool for Interacting with Ollama Language Models

Dalal is a command-line interface (CLI) tool designed to interact with Ollama, a platform that enables running large language models locally. Currently, Dalal provides basic functionality to generate text using prompts and various options, but it's just the beginning of a broader ecosystem of tools aimed at enhancing productivity and automation.

## Description

Dalal allows users to interface with Ollama's language models directly from the command line. It simplifies tasks like generating text, listing available models, and fetching model information. The tool is designed to be extensible, with plans for additional features and commands in the future.

## Features

- **Text Generation**: Generate text using prompts.
- **Model Listing**: List available models through Ollama.
- **Base URL Configuration**: Specify a custom base URL for Ollama instances.
- **Version Information**: Retrieve the version of the running Ollama server.
- **Help System**: Built-in help system to display usage and options.

## Installation

- Install Dalal using npm (I prefer you switch to [Bun](https://bun.sh))

```bash
npm install -g dalal
```

- Or use it directly with npx

```bash
npx dalal ollama <prompt> [options]
```

## Usage

### Basic Syntax

```bash
dalal ollama <prompt> [options]
```

### Options

- **-b, --base**: Base URL for Ollama server (default: `http://localhost:11434`).

```bash
dalal ollama -b http://myollama:8080 ...
```

- **-l, --list**: List available models.

```bash
dalal ollama --list
```

- **-m, --model**: Specify the model name to use.

```bash
dalal ollama --model deepseek-r1 ...
```

- **-h, --help**: Display help message.

```bash
dalal ollama --help
```

- **--version**: Output the version of Dalal.

```bash
dalal ollama --version
```

### Examples

1. Generate text using a prompt:

```bash
dalal ollama "Explain quantum computing in simple terms."
```

2. List available models:

```bash
dalal ollama --list
```

3. Use a custom base URL:

```bash
dalal ollama -b http://myollama:8080 "What's the weather like today?"
```

## Roadmap

The future of Dalal is exciting, with plans to expand its capabilities beyond Ollama interaction. Upcoming features include:

- **New Commands**: Additional CLI commands for different tasks.
- **Scripting Support**: Allow users to create and execute scripts using Dalal.
- **Integration**: Better integration with other tools and services.
- **Advanced Features**: Enhanced model management and customization options.

## Keywords

- cli
- ollama
- language-models
- text-generation
- ai
- machine-learning

## License

MIT License
