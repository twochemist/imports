import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    restoreMocks: true,
  },
};

export default defineConfig(({ command }) => ({
  plugins: command === "serve" ? [checker({ typescript: true })] : [],
  test: vitestConfig.test,
}));
