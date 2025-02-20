import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/Raycast.ts"],
  format: ["esm", "cjs"],
  minify: true,
  sourcemap: true,
  clean: true,
});
