import { generate, tags, version } from "@/lib/ollama"
import { name } from "~/package.json"

const ollamaHelpMessage = `ollama

Description:
  Get up and running with large language models

Usage:
  $ ${name} ollama <prompt> [options]

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
  if (positionals[1]) {
    let model = values.model
    if (!values.model) {
      const getTags = await tags()
      if (!getTags["models"].length) {
        throw new Error("No model found!")
      }
      model = getTags["models"][0].name
    }
    console.log(`Generating text with model: ${model}\n`)
    console.log((await generate({ model, prompt: positionals[1] })).response)
    process.exit(0)
  }

  if (positionals.length === 1) {
    if (values.list) {
      console.log(await tags())
      process.exit(0)
    }
    if (values.version) {
      console.log(await version())
      process.exit(0)
    }
    if (values.help) {
      console.log(ollamaHelpMessage)
      process.exit(0)
    }
  }

  console.error(ollamaHelpMessage)
  console.error(`\nUnknown command:\n  $ ${name} ${command}\n`)
  process.exit(1)
}
