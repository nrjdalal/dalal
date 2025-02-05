import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    index: "src/index.ts",
    "bin/index": "bin/index.ts",
    "bin/ollama": "bin/commands/ollama.ts",
  },
  format: ["esm"],
  minify: true,
  outDir: "dist",
  sourcemap: false,
})
