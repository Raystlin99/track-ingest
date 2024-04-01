/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ["js", "jsx", "ts", "mjs"],
  moduleDirectories: ["node_modules", "src"],
  transform: {},
  testMatch: ["**/*.spec.js"],
  clearMocks: true,
};

export default config;
