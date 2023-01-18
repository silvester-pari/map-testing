const { defineConfig } = require("cypress");
const vitePreprocessor = require("cypress-vite");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/",
    setupNodeEvents(on, config) {
      on("file:preprocessor", vitePreprocessor());
    },
    supportFile: false,
  },
});
