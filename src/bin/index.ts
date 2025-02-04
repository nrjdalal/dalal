import { parseArgs } from "node:util"
import { author, name, version } from "~/package.json"
import { ollama } from "~/src/bin/commands/ollama"

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
    const cmd = parse({
      allowPositionals: true,
      options: {
        list: { type: "boolean", short: "l" },
        model: { type: "string" },
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
      },
    }) as {
      command: string
      positionals: string[]
      values: Record<string, any>
    }

    cmd.command = process.argv.slice(2).join(" ")

    if (cmd.positionals[0] === "ollama") {
      await ollama(cmd)
    }

    if (!cmd.positionals.length) {
      if (cmd.values.version) {
        console.log(versionMessage)
        process.exit(0)
      }
      if (cmd.values.help) {
        console.log(helpMessage)
        process.exit(0)
      }
    }

    console.error(helpMessage)
    console.error(`\nUnknown command:\n  $ ${name} ${cmd.command}\n`)
    process.exit(1)
  } catch (err: any) {
    console.error(`Unexpected error: ${err.message}\n`)
    process.exit(1)
  }
}

main()
