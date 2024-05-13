/* eslint-disable no-console */
import { describe, expect, it } from 'bun:test'
import { highlight } from '../src/index'

const klassjs = `/**
* @param {string} names
* @return {Promise<string[]>}
*/
async function notify(names) {
 const tags = []
 for (let i = 0; i < names.length; i++) {
   tags.push('@' + names[i])
 }
 await ping(tags)
}
class SuperArray extends Array {
 static core = Object.create(null)
 constructor(...args) { super(...args); }
 bump(value) {
   return this.map(
     x => x == undefined ? x + 1 : 0
   ).concat(value)
 }
}`
const regexjs = `export const test = (str) => /^\/[0-5]\/$/g.test(str)
// This is a super lightweight javascript syntax highlighter npm package
// This is a inline comment / <- a slash
/// <reference path="..." /> // reference comment
/* This is another comment */ alert('good') // <- alerts
// Invalid calculation: regex and numbers
const _in = 123 - /555/ + 444;
const _iu = /* evaluate */ (19) / 234 + 56 / 7;`
const jsx = `const element = (
  <>
    <Food
      season={{
        sault: <p a={[{}]} />
      }}>
    </Food>
    {/* jsx comment */}
    <h1 className="title" data-title="true">
      Read{' '}
      <Link href="/posts/first-post">
        <a>this page! - {Date.now()}</a>
      </Link>
    </h1>
  </>
)`

describe('should work', () => {
  it('klassjs', () => {
    const result = highlight(klassjs)
    console.log(result)
    expect(result).toMatchSnapshot()
  })

  it('regexjs', () => {
    const result = highlight(regexjs)
    console.log(result)
    expect(result).toMatchSnapshot()
  })

  it('jsx', () => {
    const result = highlight(jsx)
    console.log(result)
    expect(result).toMatchSnapshot()
  })

  it('jsx with line numbers', () => {
    const result = highlight(jsx, { showLineNumbers: true })
    console.log(result)
    expect(result).toMatchSnapshot()
  })
})
