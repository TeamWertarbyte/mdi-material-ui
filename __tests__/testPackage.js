/* eslint-env jest */

describe('the npm package', () => {
  it('should set sideEffects to false to allow webpack to optimize re-exports', () => {
    const packageJson = require('../package/package.json')
    expect(packageJson.sideEffects).toBe(false)
  })
})
