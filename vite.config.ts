import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig({
    server: {
        watch: {
            ignored: [`${__dirname}/**/lib/server/prisma.ts`]
        }
    },
    plugins: [sveltekit()]
});