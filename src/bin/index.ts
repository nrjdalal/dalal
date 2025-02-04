import { parseArgs } from "node:util"
import { ollama } from "@/bin/commands/ollama"
import { author, name, version } from "~/package.json"

const helpMessage = `Version:
  ${name}@${version}

Usage:
  $ ${name} <command> [options]

Commands:
  ollama         Get up and running with large language models

Options:
  -h, --help     Display help for command

Author:
  ${author.name} <${author.email}> (${author.url})`

const parse: typeof parseArgs = (config) => {
  try {
    return parseArgs(config)
  } catch (err: any) {
    throw new Error(`Error parsing arguments: ${err.message}`)
  }
}

const main = async () => {
  try {
    const command = process.argv.slice(2)

    switch (command[0]) {
      case "ollama":
        await ollama(command.slice(1))
        break
    }

    const { values } = parse({
      options: {
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
      },
    })

    if (values.version) {
      console.log(`${name}@${version}`)
      process.exit(0)
    }
    if (values.help) {
      console.log(helpMessage)
      process.exit(0)
    }
  } catch (err: any) {
    console.error(helpMessage)
    console.error(`\n${err.message}\n`)
    process.exit(1)
  }
}

main()
