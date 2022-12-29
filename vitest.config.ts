/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // use `describe, it, test` without importing them
        environment: "jsdom",
        passWithNoTests: true,
        // environment: 'happy-dom',
        setupFiles: "./tests/setup.ts",
        // setupFiles: ['./src/setup.ts'],
        exclude: ["node_modules", "playwright/*.ts", "playwright/*.tsx"]
    },
});