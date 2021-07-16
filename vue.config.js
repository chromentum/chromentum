module.exports = {
  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.js",
      title: "Popup",
    },
    tab: {
      template: "./src/tab/tab.html",
      entry: "./src/tab/tab.js",
      title: "New Tab",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.js",
        },
      },
    },
  },
};
