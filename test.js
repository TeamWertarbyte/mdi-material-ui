const test = require('ava')
const React = require('react')
const renderer = require('react-test-renderer')
const fs = require('fs')
const filenameMap = require('./filenameMap')
const commonjsIcons = require('./package/index')
const commonjsIconsLight = require('./package/light/index')

test('the npm package', (t) => {
  // should set sideEffects to false to allow webpack to optimize re-exports
  const packageJson = require('./package/package.json')
  t.false(packageJson.sideEffects)
})

for (const iconName of Object.keys(commonjsIcons)) {
  test(`icons > ${iconName}`, (t) => {
    const renderedIcon = renderer.create(React.createElement(commonjsIcons[iconName])).toJSON()
    t.is(renderedIcon.type, 'svg')
    t.is(commonjsIcons[iconName].muiName, 'SvgIcon')
  })
}

test('ES module index file', (t) => {
  const esmReExports = fs.readFileSync('./package/index.es.js', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)
  t.is(esmReExports.length, Object.keys(commonjsIcons).length)

  for (const line of esmReExports) {
    const match = line.match(/^export \{ default as (.+?) \} from '\.\/(.+?)'$/)
    t.is(filenameMap[match[1]] || match[1], match[2])
    t.truthy(commonjsIcons[match[1]])
  }
})

for (const iconName of Object.keys(commonjsIconsLight)) {
  test(`light icons > ${iconName}`, (t) => {
    const renderedIcon = renderer.create(React.createElement(commonjsIconsLight[iconName])).toJSON()
    t.is(renderedIcon.type, 'svg')
    t.is(commonjsIconsLight[iconName].muiName, 'SvgIcon')
  })
}

test('mdi-light ES module index file', (t) => {
  const esmReExports = fs.readFileSync('./package/light/index.es.js', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)
  t.is(esmReExports.length, Object.keys(commonjsIconsLight).length)

  for (const line of esmReExports) {
    const match = line.match(/^export \{ default as (.+?) \} from '\.\/(.+?)'$/)
    t.is(match[1], match[2])
    t.truthy(commonjsIconsLight[match[1]])
  }
})
