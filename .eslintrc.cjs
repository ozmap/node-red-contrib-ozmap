module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    browser: true,
    es6: true
  },
  settings: {
    "import/extensions": [
      ".js",
    ],
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
        ]
      }
    }
  },
  plugins: [
    "import",
  ],
  extends: [
    // Enables eslint-plugin-prettier and eslint-config-prettier.
    // This will display prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": [
      "error",
      { allow: ["warn", "error"] }
    ],
    "multiline-ternary": 0,
    "no-unused-vars": "off",
    "no-shadow": 0,
    "no-useless-constructor": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
      }
    ],
    "max-len": [
      "warn",
      {
        "code": 120,
        "tabWidth": 2,
        "comments": 120,
        "ignoreComments": false,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ]
  },
};