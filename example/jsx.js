const element = (
  <>
    <Food
      season={{
        sault: <p a={[{}]} />,
      }}
    />
    {/* jsx comment */}
    <h1 className="title" data-title="true">
      Read{' '}
      <Link href="/posts/first-post">
        <a>this page! - {Date.now()}</a>
      </Link>
    </h1>
  </>
)

import MillionLint from '@million/lint'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const plugins = [react()]
plugins.unshift(MillionLint.vite())
export default defineConfig({
  plugins: plugins,
})
