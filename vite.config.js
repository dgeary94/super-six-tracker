import { defineConfig } from "vite"
import dns from 'dns'
//import dsv from '@rollup/plugin-dsv'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
    //plugins: [dsv()],
    base: '/super-six-tracker/',
    assetsInclude: ['**/*.csv']
})