import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/Raycast.ts"],
  format: ["esm", "cjs"],
  metafile: true,
  sourcemap: true,
  clean: true,
});
