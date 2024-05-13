/* eslint-disable no-console */
import path from 'node:path'
import { describe, expect, it } from 'bun:test'
import { highlight } from '../src/index'

const classjs = await Bun.file(path.resolve(__dirname, '../example/class.js')).text()
const regexjs = await Bun.file(path.resolve(__dirname, '../example/regex.js')).text()
const jsx = await Bun.file(path.resolve(__dirname, '../example/jsx.js')).text()

describe('should work', () => {
  it('class', () => {
    const result = highlight(classjs)
    console.log(result)
    expect(result).toMatchSnapshot()
  })

  it('regex', () => {
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
