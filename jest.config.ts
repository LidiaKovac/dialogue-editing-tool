import type { Config } from 'jest'
import nextJest from 'next/jest.js'
import path from "path"

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: ["**/__tests__/node/*.test.ts", "**/__tests__/node/*.test.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": path.resolve(__dirname, "./$1"),
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ["<rootDir>/__tests__/jest.setup.ts"],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)