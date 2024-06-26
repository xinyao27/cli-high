import { defineBuildConfig } from 'unbuild'
import pkg from './package.json'

export default defineBuildConfig({
  entries: ['src/index.ts', 'src/cli.ts'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
  replace: {
    'process.env.VERSION': JSON.stringify(pkg.version),
  },
})
