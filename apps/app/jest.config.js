module.exports = {
  testRegex: '/src/.*.(test)\\.js$',
  modulePathIgnorePatterns: ['node_modules', 'public'],
  setupFilesAfterEnv: ['./jest.setup.js']
}