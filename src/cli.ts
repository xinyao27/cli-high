import path from 'node:path'
import fs from 'node:fs/promises'
import process from 'node:process'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'
import * as p from '@clack/prompts'
import c from 'picocolors'
import pkgJson from '../package.json'
import { highlight } from './index'

function header() {
  console.log('\n')
  p.intro(`✨ ${c.magenta(`${pkgJson.name} `)}${c.dim(`v${pkgJson.version}`)}`)
}

const instance = yargs(hideBin(process.argv))
  .scriptName('cli-high')
  .usage('')
  .command(
    '*',
    'Outputs a file or STDIN input with syntax highlighting',
    (args) =>
      args
        .option('showLineNumbers', {
          alias: 's',
          description: 'Show line numbers',
          type: 'boolean',
        })
        .help(),
    async (args) => {
      const { _, showLineNumbers } = args
      header()

      try {
        const filePath = path.join(process.cwd(), _[0].toString())
        const code = await fs.readFile(filePath, 'utf-8')
        const highlighted = highlight(code, { showLineNumbers })
        p.note(highlighted)
      } catch (error) {
        p.log.error(c.inverse(c.red(' Failed to read file')))
        p.log.error(c.red(`✘ ${String(error)}`))
        process.exit(1)
      }
    },
  )
  .showHelpOnFail(false)
  .alias('h', 'help')
  .version('version', pkgJson.version)
  .alias('v', 'version')

// eslint-disable-next-line no-unused-expressions
instance.help().argv
