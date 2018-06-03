#!/usr/bin/env node
const fse = require('fs-extra')
const path = require('path')
const pascalCase = require('pascal-case')
const babel = require('babel-core')
const xml2js = require('xml2js')
const pick = require('lodash.pick')

;(async () => {
  const mdiSvgPath = path.join(path.dirname(require.resolve('@mdi/svg/meta.json')), 'svg')
  const icons = await Promise.all(require('@mdi/svg/meta.json').map(async (icon) => {
    const xml = await new Promise((resolve, reject) => {
      xml2js.parseString(fse.readFileSync(path.join(mdiSvgPath, `${icon.name}.svg`), 'utf8'), (err, xml) => {
        if (err) {
          reject(err)
        } else {
          resolve(xml)
        }
      })
    })

    if (Object.keys(xml.svg).length > 2) throw Error(`The SVG of icon ${icon.name} contains unknown children`)
    const svg = xml.svg.path.map((child) => {
      return new xml2js.Builder({ headless: true }).buildObject({ path: child })
    }).join('').trim()

    if (svg.length === 0) {
      throw Error(`Unexpected number of paths (${xml.svg.path.length}) for ${icon.name}`)
    }
    return {
      name: pascalCase(icon.name),
      svg
    }
  }))
  const iconFiles = fse.readdirSync(mdiSvgPath)
  if (iconFiles.length !== icons.length) {
    console.warn(`${icons.length} icons specified in meta.json but ${iconFiles.length} svg files found`)
  }

  fse.removeSync(path.join(__dirname, 'package'))
  fse.mkdirpSync(path.join(__dirname, 'package'))

  for (const { name, svg } of icons) {
    const code = `import React from 'react'
  import createIcon from './util/createIcon'
  export default createIcon(<g>${svg}</g>)
  `

    // commonjs module syntax
    fse.writeFileSync(path.join(__dirname, 'package', `${name}.js`), babel.transform(code, {
      presets: ['es2015', 'react', 'stage-0'],
      compact: process.env.NODE_ENV === 'production'
    }).code)

    // typescript definition
    fse.writeFileSync(path.join(__dirname, 'package', `${name}.d.ts`), `export { default } from 'material-ui/SvgIcon'
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
