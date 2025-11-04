import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  base: "/super-six-tracker/",
  plugins: [
    react(),
    tailwindcss(),],
  assetsInclude: ["**/*.csv"],
});
