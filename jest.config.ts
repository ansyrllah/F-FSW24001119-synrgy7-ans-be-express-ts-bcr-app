/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^@Controllers(.*)$": "<rootDir>/app/controllers$1",
    "^@Exceptions(.*)$": "<rootDir>/app/exceptions$1",
    "^@Interfaces(.*)$": "<rootDir>/app/interfaces$1",
    "^@Middlewares(.*)$": "<rootDir>/app/middlewares$1",
    "^@Models(.*)$": "<rootDir>/app/models$1",
    "^@Repositories(.*)$": "<rootDir>/app/repositories$1",
    "^@Services(.*)$": "<rootDir>/app/services$1",
    "^@Validations(.*)$": "<rootDir>/app/validations$1",
    "^@Config(.*)$": "<rootDir>config$1",
    "^@Routes(.*)$": "<rootDir>/routes$1",
  },
  transformIgnorePatterns: ["/node_modules", "/.*/dist"],
};