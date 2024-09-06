import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "@common": path.resolve(__dirname, "./src/Common"),
    "@redux": path.resolve(__dirname, "./src/redux"),
  },
  server: {
    host: true, // This exposes the app to the network
    port: 5173 // Optional, default is 5173
  }
});
