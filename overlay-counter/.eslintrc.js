module.exports = {
  extends: [
    "plugin:vue/essential",
    require.resolve("eslint-config-airbnb-base"),
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    allowImportExportEverywhere: true
  },
  env: {
    browser: true
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: require.resolve("@vue/cli-service/webpack.config.js")
      }
    },
    "import/extensions": [".js", ".jsx", ".mjs", ".ts", ".tsx"]
  },
  rules: {
    "no-param-reassign": ["off"],
    "import/no-named-as-default-member": 0,
    "import/no-named-as-default": 0,
    "import/first": 0,
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        mjs: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ]
  }
};
