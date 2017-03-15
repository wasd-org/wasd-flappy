export function extend (to = {}, from = {}) {
  for (const key in from) {
    to[key] = from[key]
  }
  return to
}
