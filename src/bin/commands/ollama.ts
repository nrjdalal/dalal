import { ollamaListLocalModels, ollamaVersion } from "@/lib/ollama"
import { name, version } from "~/package.json"

const ollamaHelpMessage = `${name}@${version}

Description:
  Get up and running with large language models

Usage:
  $ ${name} ollama [options]

Options:
  -l, --list     List local models
  -h, --help     Display help
  -v, --version  Display version`

export const ollama = async ({
  command,
  positionals,
  values,
}: {
  command: string
  positionals: string[]
  values: Record<string, any>
}) => {
  if (values.list) {
    const models = await ollamaListLocalModels()
    console.log(models)
    process.exit(0)
  }
  if (values.version) {
    const version = await ollamaVersion()
    console.log(version)
    process.exit(0)
  }
  if (values.help) {
    console.log(ollamaHelpMessage)
    process.exit(0)
  }

  console.error(ollamaHelpMessage)
  console.error(`\nUnknown command:\n  $ ${name} ${command}\n`)
  process.exit(1)
}
