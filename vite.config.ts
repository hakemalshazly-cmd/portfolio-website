// @ts-expect-error Node built-in types are not included in this Vite config project.
import { copyFile } from 'node:fs/promises'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/portfolio-website/' : '/',
  plugins: [
    react(),
    {
      name: 'copy-google-site-verification',
      apply: 'build',
      async closeBundle() {
        const fileName = 'google4076f70e711f5f53.html'
        await copyFile(fileName, `dist/${fileName}`)
      },
    },
  ],
}))
