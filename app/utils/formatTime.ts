export function formatTime(seconds: number): string {
  if (!seconds) return ""
  if (seconds === 0) return "0"

  const date = new Date(seconds * 1000)
  return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, "0")}`
}
