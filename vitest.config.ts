import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./", import.meta.url)) } },
  test: {
    // Shiki loads its grammars on first use, which takes a few seconds.
    testTimeout: 20_000,
  },
});
