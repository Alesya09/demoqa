const { defineConfig } = require("cypress");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiBaseUrl: 'https://demoqa.com'
  }
});
