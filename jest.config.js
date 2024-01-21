module.exports = {
    testEnvironment: "node",
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.js$",
    moduleFileExtensions: ["js", "json", "node"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: ["src/**/*.js"],
  };
