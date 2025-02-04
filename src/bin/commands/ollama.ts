import { tags, version } from "@/lib/ollama"
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

    const prompt = positionals.slice(1).join(" ")

    try {
      const response = await fetch(
        (values.base || "http://localhost:11434") + "/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model, prompt, stream: true }),
        },
      )

      if (!response.body) {
        throw new Error("Response body is null")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        buffer += chunk

        let boundary = buffer.indexOf("\n")
        while (boundary !== -1) {
          const completeChunk = buffer.slice(0, boundary)
          buffer = buffer.slice(boundary + 1)

          const jsonChunk = JSON.parse(completeChunk)
          if (jsonChunk.response) {
            process.stdout.write(jsonChunk.response)
          }
          boundary = buffer.indexOf("\n")
        }
      }
    } catch (err: any) {
      console.error(`Error generating text: ${err.message}`)
    }

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
