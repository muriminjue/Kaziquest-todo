module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  verbose: true,
  modulePathIgnorePatterns: ["src"],
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue",
  ],
  transform: {
    "^.*\\.(vue)$": "@vue/vue3-jest",
    "^.*\\.(js)$": "babel-jest",
  },
};
