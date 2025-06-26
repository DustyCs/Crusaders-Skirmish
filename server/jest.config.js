export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    setupFilesAfterEnv: ['./jest.setup.js'],
    forceExit: true
};