import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';
import projectFiles from './vite-plugins/project-files.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl(), projectFiles()],
})