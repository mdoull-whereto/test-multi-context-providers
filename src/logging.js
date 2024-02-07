export function logComponentTime (name) {
  console.log('[', new Date().toISOString(), `]: ${name} re-render`)
}
