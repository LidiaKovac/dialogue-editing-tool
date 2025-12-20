import path from "path";

// jest.jsdom.config.js
module.exports = {
  // Use ts-jest to handle TypeScript
  preset: "ts-jest",

  // Use jsdom environment (simulates browser)
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/jest.jsdom.setup.ts"],

  // Where to look for tests
  roots: ["<rootDir>"],

  // Only run files matching *.test.ts or *.test.tsx
  testMatch: [
    "**/__tests__/dom/**/*.test.ts",
    "**/__tests__/dom/**/*.test.tsx",
  ],

  // Module path aliases (so @/app/... works)
  moduleNameMapper: {
    "^@/(.*)$": path.resolve(__dirname, "./$1"),
    "^quill$": "<rootDir>/src/__tests__/dom/mocks/quill.mock.ts",
  },
  // Ignore these paths
  testPathIgnorePatterns: ["/node_modules/"],

  // Transform TypeScript files
  // ← ADD THIS to transform Quill
  transformIgnorePatterns: [
    "node_modules/(?!(quill)/)", // Transform quill module
  ],

  // ← ADD/UPDATE THIS
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react",
        },
      },
    ],
    "^.+\\.jsx?$": "babel-jest", // Transform JS files
  },
}
