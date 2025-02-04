# Dalal CLI Tool

**Dalal** is a command-line interface (CLI) tool designed to simplify interactions with large language models. Initially focused on Ollama, it will soon expand to include various other tools aimed at enhancing your experience in working with AI-driven applications.

## Features

- **Prompt-Based Text Generation**: Generate text using a specified model and prompt.
- **Model Management**: List available models and view their details.
- **Version Information**: Display the version of the Ollama service you are connected to.
- **Directory Input**: Include all files in a directory as part of your prompt, ignoring `.gitignore` files.

## Installation

To install Dalal globally using npm, execute the following command:

```bash
npm install -g dalal
```

## Usage

### Basic Command Structure

```bash
dalal ollama <prompt> [options]
```

- **`<prompt>`**: The text prompt you want to use for generating the response.
- **`[options]`**: Optional flags to customize the behavior of the command.

### Available Options

- **`--base`, `-b`**: Specify the base URL of the Ollama service (default: `http://localhost:11434`).
- **`--list`, `-l`**: List all available models.
- **`--model`, `-m`**: Specify the model to use for text generation. If not provided, the first model in the list will be used.
- **`--dir`, `-d`**: Include all files in the current directory as part of the prompt, ignoring `.gitignore` files.
- **`--help`, `-h`**: Display help information for the `ollama` command.
- **`--version`, `-v`**: Display the version of the Ollama service.

### Examples

1. **Generate text with a specific model:**

   ```bash
   dalal ollama "Translate this to French" --model "france"
   ```

2. **List available models:**

   ```bash
   dalal ollama --list
   ```

3. **Include directory contents in the prompt and generate text:**

   ```bash
   dalal ollama "Summarize this project" --dir
   ```

4. **Display version information:**

   ```bash
   dalal ollama --version
   ```

## Contributing

We welcome contributions from the open-source community! If you have ideas for new features or improvements, feel free to [submit an issue](https://github.com/your-username/dalal/issues) or create a pull request.

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`.
3. Commit your changes: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Open a pull request.

## License

Dalal is released under the [MIT License](LICENSE).

## About Us

At Dalal, we believe in leveraging technology to simplify complex processes and empower individuals with powerful tools. Our mission is to make AI more accessible and useful for everyone.

---

Feel free to explore the potential of Dalal and join us on this exciting journey!
