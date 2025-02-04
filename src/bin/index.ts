import { parseArgs } from "node:util"
import { ollamaVersion } from "@/lib/ollama"
import { author, name, version } from "~/package.json"

const versionMessage = `${name}@${version}`

const helpMessage = `${name}@${version}

Usage:
  $ ${name} [options]
  $ ${name} <command> [options]

Commands:
  ollama         Get up and running with large language models

Options:
  -h, --help     Display help message
  -v, --version  Display version

Author:
  ${author.name} <${author.email}> (${author.url})`

const ollamaHelpMessage = `${name}@${version}

Description:
  Get up and running with large language models

Usage:
  $ ${name} ollama [options]

Options:
  -h, --help     Display help
  -v, --version  Display version`

const parse: typeof parseArgs = (config) => {
  try {
    return parseArgs(config)
  } catch (err: any) {
    console.error(`Error parsing arguments: ${err.message}`)
    console.error(helpMessage)
    process.exit(1)
  }
}

const main = async () => {
  try {
    const { values, positionals } = parse({
      allowPositionals: true,
      options: {
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
      },
    })

    if (!positionals.length) {
      if (values.version) {
        console.log(versionMessage)
        process.exit(0)
      }
      if (values.help) {
        console.log(helpMessage)
        process.exit(0)
      }
    }

    const command = positionals[0]

    if (command === "ollama") {
      if (values.help) {
        console.log(ollamaHelpMessage)
        process.exit(0)
      }
      if (values.version) {
        console.log(await ollamaVersion())
        process.exit(0)
      }

      console.error(ollamaHelpMessage)
      console.error(`\nUnknown command:\n  $ ${name} ${command}\n`)
      process.exit(1)
    }

    console.error(helpMessage)
    console.error(`\nUnknown command:\n  $ ${name} ${command}\n`)
    process.exit(1)
  } catch (err: any) {
    console.error(`Unexpected error: ${err.message}`)
    process.exit(1)
  }
}

main()
