#!/usr/bin/env node
const fse = require('fs-extra')
const path = require('path')
const babel = require('@babel/core')
const pick = require('lodash.pick')
const filenameMap = require('./filenameMap')

function checkNameClashes (icons) {
  const caseNameClashes = icons.filter(
    (icon) =>
      icon.filename == null &&
      icons.filter(
        (icon2) =>
          icon2.filename == null &&
          icon2.name.toLowerCase() === icon.name.toLowerCase()
      ).length > 1
  )
  if (caseNameClashes.length > 0) {
    throw new Error(
      `The following icons have the same file name (case insensitive): ${caseNameClashes
        .map((icon) => icon.name)
        .join(', ')}`
    )
  }
}

(async () => {
  const icons = Object.entries(require('@mdi/js'))
    .filter(([name]) => name.indexOf('mdi') === 0)
    .map(([name, path]) => ({
      name: name.substr(3), // remove mdi prefix
      filename: filenameMap[name.substr(3)],
      svgPath: path
    }))
  checkNameClashes(icons)

  const lightIcons = Object.entries(require('@mdi/light-js'))
    .filter(([name]) => name.indexOf('mdil') === 0)
    .map(([name, path]) => ({
      name: name.substr(4), // remove mdil prefix
      svgPath: path
    }))
  checkNameClashes(lightIcons)

  fse.removeSync(path.join(__dirname, 'package'))
  fse.mkdirpSync(path.join(__dirname, 'package', 'light'))

  for (const { name, filename, svgPath } of icons) {
    const code = `import createIcon from './util/createIcon'
  export default createIcon('${svgPath}')
  `

    // commonjs module syntax
    fse.writeFileSync(path.join(__dirname, 'package', `${filename || name}.js`), babel.transform(code, {
      presets: ['@babel/preset-react', '@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties'],
      compact: process.env.NODE_ENV === 'production'
    }).code)

    // typescript definition
    fse.writeFileSync(path.join(__dirname, 'package', `${filename || name}.d.ts`), `export { default } from '@material-ui/core/SvgIcon'
  `)
  }

  for (const { name, filename, svgPath } of lightIcons) {
    const code = `import createIcon from '../util/createIcon'
  export default createIcon('${svgPath}')
  `

    // commonjs module syntax
    fse.writeFileSync(path.join(__dirname, 'package', 'light', `${filename || name}.js`), babel.transform(code, {
      presets: ['@babel/preset-react', '@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties'],
      compact: process.env.NODE_ENV === 'production'
    }).code)

    // typescript definition
    fse.writeFileSync(path.join(__dirname, 'package', 'light', `${filename || name}.d.ts`), `export { default } from '@material-ui/core/SvgIcon'
  `)
  }

  const generateIndexFiles = (destination, icons) => {
    // es2015 module syntax
    const allExports = icons.map(({ name, filename }) => `export { default as ${name} } from './${filename || name}'`).join('\n')
    fse.writeFileSync(path.join(destination, 'index.es.js'), allExports)
  
    // typescript index definition (looks exactly the same)
    fse.writeFileSync(path.join(destination, 'index.d.ts'), allExports)
  
    // commonjs module
    fse.writeFileSync(path.join(destination, 'index.js'), babel.transform(allExports, {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
      compact: process.env.NODE_ENV === 'production'
    }).code)
  }

  generateIndexFiles(path.join(__dirname, 'package'), icons)
  generateIndexFiles(path.join(__dirname, 'package', 'light'), lightIcons)

  // createIcon function
  fse.mkdirSync(path.join(__dirname, 'package', 'util'))
  fse.writeFileSync(
    path.join(__dirname, 'package', 'util', 'createIcon.js'),
    babel.transform(fse.readFileSync(path.join(__dirname, 'src', 'util', 'createIcon.js')), {
      presets: ['@babel/preset-react', '@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties'],
      compact: process.env.NODE_ENV === 'production'
    }).code
  )

  // update readme
  const mdiVersion = require(path.join(require.resolve('@mdi/js'), '..', '..', 'package.json')).version
  const mdiLightVersion = require(path.join(require.resolve('@mdi/light-js'), '..', '..', 'package.json')).version
  let readme = await fse.readFile(path.join(__dirname, 'README.md'), 'utf-8')
  readme = readme.replace(/img\.shields\.io\/badge\/mdi-v(.+?)-blue\.svg/g, `img.shields.io/badge/mdi-v${mdiVersion}-blue.svg`)
  readme = readme.replace(/img\.shields\.io\/badge\/mdi--light-v(.+?)-blue\.svg/g, `img.shields.io/badge/mdi--light-v${mdiLightVersion}-blue.svg`)
  await fse.writeFile(path.join(__dirname, 'README.md'), readme, 'utf-8')

  // copy other files
  ;[
    'README.md',
    'NOTICE.txt',
    'LICENSE.txt',
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
