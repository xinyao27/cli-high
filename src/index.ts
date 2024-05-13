import { highlight as highlightAsHtml } from 'sugar-high'
import { black, cyan, dim, green, magenta, red } from 'yoctocolors'

export interface HighlightOptions {
  showLineNumbers?: boolean
}
export function highlight(code: string, options: HighlightOptions = { showLineNumbers: false }) {
  const html = highlightAsHtml(code)
  const regex = /<span class="sh__line">(.*)<\/span>/g

  let match
  let result = ''
  let i = 1

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(html)) !== null) {
    const innerMatches = [...match[1].matchAll(/<span class="([^"]+)" style="color: ([^"]+)">(.*?)<\/span>/gs)]
    result += options.showLineNumbers ? `${dim(`${i}`.padEnd(2, ' '))} ` : ''
    innerMatches.forEach((innerMatch) => {
      const classType = innerMatch[1]
      const text = decode(innerMatch[3])

      switch (classType) {
        case 'sh__token--identifier':
          result += black(text)
          break
        case 'sh__token--keyword':
          result += red(text)
          break
        case 'sh__token--string':
          result += green(text)
          break
        case 'sh__token--class':
          result += cyan(text)
          break
        case 'sh__token--property':
          result += cyan(text)
          break
        case 'sh__token--entity':
          result += magenta(text)
          break
        case 'sh__token--jsxliterals':
          result += green(text)
          break
        case 'sh__token--sign':
          result += dim(text)
          break
        case 'sh__token--comment':
          result += dim(text)
          break
        default:
          result += text
          break
      }
    })
    result += '\n'
    i++
  }

  return result
}

function decode(str: string) {
  return str
    .replace('&amp;', '&')
    .replace('&lt;', '<')
    .replace('&gt;', '>')
    .replace('&quot;', '"')
    .replace('&#039;', "'")
}
