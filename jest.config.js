module.exports = {
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/?(*.)(spec|test).js?(x)", "**/test/**/*.js?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.+/helpers/", "/config/"],
  runner: "jest-serial-runner",
  setupFiles: ["dotenv/config"],
};
