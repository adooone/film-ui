import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // No test suite yet — the runner is wired so checks and CI stay green,
    // and future *.test.* files are picked up with zero further setup.
    passWithNoTests: true,
  },
});
