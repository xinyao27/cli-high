import { tokenize } from 'sugar-high'
import { dim, grayStylize, magentaStylize, pinkStylize, whiteSecondaryStylize, yellowStylize } from 'xycolors'

export interface HighlightOptions {
  showLineNumbers?: boolean
}
export function highlight(code: string, options: HighlightOptions = { showLineNumbers: false }) {
  const tokens = tokenize(code)
  const lines: string[] = []
  let i = 1
  const lineTokens: Array<[number, string]> = []

  function createLine(content: string) {
    const prefix = options.showLineNumbers ? `${dim(`${i}`.padEnd(2, ' '))} ` : ''
    i++
    return `${prefix}${content}`
  }
  function flushLine(tokens: Array<[number, string]>) {
    lines.push(
      createLine(
        tokens
          .map(([type, value]) => {
            switch (type) {
              case 0: // identifier
                return pinkStylize(value)
              case 1: // keyword
                return grayStylize(value)
              case 2: // string
                return grayStylize(value)
              case 3: // Class, number and null
                return yellowStylize(value)
              case 4: // property
                return pinkStylize(value)
              case 5: // entity
                return magentaStylize(value)
              case 6: // jsx literals
                return whiteSecondaryStylize(value)
              case 7: // sign
                return grayStylize(value)
              case 8: // comment
                return dim(value)
              default:
                return value
            }
          })
          .join(''),
      ),
    )
  }

  for (const token of tokens) {
    const [type, value] = token
    // Skip "break" tokens
    if (type !== 9) {
      // Divide multi-line token into multi-line code
      if (value.includes('\n')) {
        const lines = value.split('\n')
        for (let j = 0; j < lines.length; j++) {
          lineTokens.push([type, lines[j]])
          if (j < lines.length - 1) {
            flushLine(lineTokens)
            lineTokens.length = 0
          }
        }
      } else {
        lineTokens.push(token)
      }
    } else {
      lineTokens.push([type, ''])
      flushLine(lineTokens)
      lineTokens.length = 0
    }
  }

  if (lineTokens.length > 0) flushLine(lineTokens)

  return lines.join('\n')
}
