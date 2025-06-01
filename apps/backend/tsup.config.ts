import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/api.ts'],
  format: ['esm'],
  outDir: 'dist',
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['dotenv', 'fs', 'path', 'os'], // 👈 mark Node core + dotenv as external
})
