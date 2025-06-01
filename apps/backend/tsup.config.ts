import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/app.ts'],
  format: ['esm'],
  outDir: 'dist',
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['dotenv', 'fs', 'path', 'os'], // 👈 mark Node core + dotenv as external
})
