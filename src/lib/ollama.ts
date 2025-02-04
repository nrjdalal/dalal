const ollamaListLocalModels = async () => {
  const response = await fetch("http://localhost:11434/api/tags")
  const json = await response.json()
  return json
}

const ollamaVersion = async () => {
  const response = await fetch("http://localhost:11434/api/version")
  const json = await response.json()
  return json.version
}

export { ollamaListLocalModels, ollamaVersion }
