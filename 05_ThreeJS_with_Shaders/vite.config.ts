import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [glsl(), tailwindcss()],
  server: {
    host: true,
    port: 3000,
  },
});
