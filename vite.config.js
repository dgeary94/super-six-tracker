import { defineConfig } from "vite"
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
    base: '/super-six-tracker/',
    assetsInclude: ['**/*.csv']
})