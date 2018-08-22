#!/usr/bin/env node
const fse = require('fs-extra')
const path = require('path')
const pascalCase = require('pascal-case')
const babel = require('babel-core')
const pick = require('lodash.pick')

;(async () => {
  const icons = Object.entries(require('@mdi/js'))
    .filter(([name]) => name.indexOf('mdi') === 0)
    .map(([name, path]) => ({
      name: pascalCase(name.substr(3)), // remove mdi prefix
      svgPath: path
    }))

  fse.removeSync(path.join(__dirname, 'package'))
  fse.mkdirpSync(path.join(__dirname, 'package'))

  for (const { name, svgPath } of icons) {
    const code = `import createIcon from './util/createIcon'
  export default createIcon('${svgPath}')
  `

    // commonjs module syntax
    fse.writeFileSync(path.join(__dirname, 'package', `${name}.js`), babel.transform(code, {
      presets: ['es2015', 'react', 'stage-0'],
      compact: process.env.NODE_ENV === 'production'
    }).code)

    // typescript definition
    fse.writeFileSync(path.join(__dirname, 'package', `${name}.d.ts`), `export { default } from '@material-ui/core/SvgIcon'
  `)
  }

  // es2015 module syntax
  const allExports = icons.map(({ name }) => `export { default as ${name} } from './${name}'`).join('\n')
  fse.writeFileSync(path.join(__dirname, 'package', 'index.es.js'), allExports)

  // typescript index definition (looks exactly the same)
  fse.writeFileSync(path.join(__dirname, 'package', 'index.d.ts'), allExports)

  // commonjs module
  fse.writeFileSync(path.join(__dirname, 'package', 'index.js'), babel.transform(allExports, {
    plugins: ['transform-es2015-modules-commonjs'],
    compact: process.env.NODE_ENV === 'production'
  }).code)

  // createIcon function
  fse.mkdirSync(path.join(__dirname, 'package', 'util'))
  fse.writeFileSync(
    path.join(__dirname, 'package', 'util', 'createIcon.js'),
    babel.transform(fse.readFileSync(path.join(__dirname, 'src', 'util', 'createIcon.js')), {
      presets: ['es2015', 'react', 'stage-0'],
      compact: process.env.NODE_ENV === 'production'
    }).code
  )

  // copy other files
  ;[
    'README.md',
    'NOTICE',
    'LICENSE',
    '.npmignore'
  ].forEach((file) => fse.copySync(path.join(__dirname, file), path.join(__dirname, 'package', file)))

  const packageJson = require('./package.json')
  packageJson.name = 'mdi-material-ui'
  fse.writeFileSync(path.join(__dirname, 'package', 'package.json'), JSON.stringify(pick(packageJson, [
    'name',
    'version',
    'description',
    'main',
    'module',
    'jsnext:main',
    'sideEffects',
    'repository',
    'keywords',
    'author',
    'license',
    'bugs',
    'homepage',
    'peerDependencies'
  ]), null, 2), 'utf-8')
})()
