
const nextJest = require('next/jest')
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const createJestConfig = nextJest({
  // next.js 앱의 경로
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // @ 경로 alias 설정
  },
}

module.exports = createJestConfig(customJestConfig)