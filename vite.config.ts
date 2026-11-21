// @ts-expect-error Node built-in types are not included in this Vite config project.
import { copyFile, readdir, unlink } from 'node:fs/promises'
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
    {
      name: 'exclude-local-work-videos-from-build',
      apply: 'build',
      async closeBundle() {
        const videosDirectory = 'dist/assets/abdo/work'
        let entries: Array<{ isFile: () => boolean; name: string }>
        try {
          entries = await readdir(videosDirectory, { withFileTypes: true })
        } catch (error) {
          if ((error as { code?: string }).code === 'ENOENT') return
          throw error
        }

        await Promise.all(
          entries
            .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.mp4'))
            .map((entry) => unlink(`${videosDirectory}/${entry.name}`)),
        )
      },
    },
  ],
}))
