module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    // setupFilesAfterEnv: ['<rootDir>/prisma/functions/singleton.ts'],
    setupFilesAfterEnv: ['./jest.setup.js'],
}