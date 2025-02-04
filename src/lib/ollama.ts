const generate = async ({
  base = "http://localhost:11434",
  model,
  prompt,
  stream = false,
}: {
  base?: string
  model: string
  prompt: string
  stream?: boolean
}) => {
  const response = await fetch(`${base}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt, stream }),
  })
  return await response.json()
}

const tags = async ({
  base = "http://localhost:11434",
}: { base?: string } = {}) => {
  const response = await fetch(`${base}/api/tags`)
  return await response.json()
}

const version = async ({
  base = "http://localhost:11434",
}: {
  base?: string
} = {}) => {
  const response = await fetch(`${base}/api/version`)
  return await response.json()
}

export { generate, tags, version }
