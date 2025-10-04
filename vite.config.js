import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "import.meta.env.VITE_SERVER_URL": JSON.stringify(env.VITE_SERVER_URL),
    },
    root: "src/",
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          cart: resolve(__dirname, "src/cart/index.html"),
          product: resolve(__dirname, "src/product/index.html"),
          product_listing: resolve(
            __dirname,
            "src/product_listing/index.html"
          ),
        },
      },
    },
  };
});