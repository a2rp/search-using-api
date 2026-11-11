import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/search-using-api/",
    plugins: [react()],
});
