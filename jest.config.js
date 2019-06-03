/* eslint-disable */
module.exports = {
  roots: ["./src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["./jestSetup.js"],
  // collectCoverage: true,
  collectCoverageFrom: ["src/**/*!(test).{ts,tsx}"]
};
