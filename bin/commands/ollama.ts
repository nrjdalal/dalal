#!/usr/bin/env node
import fs from "node:fs"
import { parseArgs } from "node:util"
import { name } from "@/package.json"
import { tags, version } from "@/src/lib/ollama"
import { listFiles } from "@/src/utils/list-files"
import ansiEscapes from "ansi-escapes"

const helpMessage = `ollama (https://ollama.com)

Description:
  Get up and running with large language models

Usage:
  $ ${name} ollama <prompt> [options]

Options:
  -b, --base     Base URL
                 Default: http://localhost:11434
  -d, --dir      Prefix <prompt> with files in CWD
  -l, --list     List local models
  -m, --model    The model name
  -h, --help     Display help message
  -v, --version  Display version`

export const ollama = async (args: string[]) => {
  try {
    const { values, positionals } = parseArgs({
      allowPositionals: true,
      options: {
        dir: { type: "boolean", short: "d" },
        base: { type: "string", short: "b" },
        list: { type: "boolean", short: "l" },
        model: { type: "string" },
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
      },
      args,
    })

    if (!positionals.length) {
      if (values.list) console.log(await tags())
      if (values.version) console.log(await version())
      if (values.help) console.log(helpMessage)
      process.exit(0)
    }

    let model = values.model

    if (!values.model) {
      const getTags = await tags()
      if (!getTags["models"].length) {
        throw new Error("No model found!")
      }
      model = getTags["models"][0].name
    }
    console.log(`Generating text with model: ${model}\n`)

    let fileData = ""

    if (values.dir) {
      const files = await listFiles()

      console.log("\nFiles attached:", files)

      for (const file of files) {
        fileData += `\n--- ${file} ---\n
${fs.readFileSync(file, "utf-8")}`
      }

      console.log("\n")
    }

    const prompt = fileData + positionals.join(" ")

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
    let output = ""

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
          output += jsonChunk.response
          process.stdout.write(jsonChunk.response)
        }
        boundary = buffer.indexOf("\n")
      }
    }

    process.stdout.write(
      ansiEscapes.cursorUp(output.split("\n").length - 1) +
        ansiEscapes.cursorLeft +
        ansiEscapes.eraseDown +
        `--- ${output}`,
    )

    process.exit(0)
  } catch (err: any) {
    console.error(helpMessage)
    console.error(`\n${err.message}\n`)
    process.exit(1)
  }
}

if (process.argv[2] !== "ollama") ollama(process.argv.slice(2))
