/* eslint-disable */
module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    testMatch: ['**/*.(spec|test).ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
