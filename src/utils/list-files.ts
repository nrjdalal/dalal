import { glob } from "tinyglobby"

export const listFiles = async ({
  patterns = ["**"],
  ignore = [],
}: {
  patterns?: string | string[]
  ignore?: string | string[]
} = {}) => {
  const files = [".DS_Store", "*.lock", "**/*.map", "LICENSE*"]
  const directories = [".git", "node_modules", "dist"]
  ignore = Array.isArray(ignore) ? ignore : [ignore]
  ignore = [...files, ...directories, ...ignore]

  const patternsArray = Array.isArray(patterns) ? patterns : [patterns]

  ignore = ignore.filter(
    (ig) => !patternsArray.some((pattern) => pattern === ig),
  )
  return await glob(patternsArray, { ignore })
}
