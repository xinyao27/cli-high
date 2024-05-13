/**
 * @param {string} names
 * @return {Promise<string[]>}
 */
async function notify(names) {
  const tags = []
  for (const name_ of names) {
    tags.push(`@${name_}`)
  }
  await ping(tags)
}
class SuperArray extends Array {
  static core = Object.create(null)
  constructor(...args) {
    super(...args)
  }

  bump(value) {
    return this.map((x) => (x == undefined ? x + 1 : 0)).concat(value)
  }
}
