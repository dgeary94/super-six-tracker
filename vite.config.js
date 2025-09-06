import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  base: "/super-six-tracker/",
  plugins: [react()],
  assetsInclude: ["**/*.csv"],
});
