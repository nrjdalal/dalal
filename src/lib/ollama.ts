const generate = async ({
  model,
  prompt,
  stream = false,
}: {
  model: string
  prompt: string
  stream?: boolean
}) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt, stream }),
  })
  return await response.json()
}

const tags = async () => {
  const response = await fetch("http://localhost:11434/api/tags")
  return await response.json()
}

const version = async () => {
  const response = await fetch("http://localhost:11434/api/version")
  return await response.json()
}

export { generate, tags, version }
