#!/usr/bin/env node
const fse = require('fs-extra')
const path = require('path')
const pascalCase = require('pascal-case')
const babel = require('babel-core')
const libxmljs = require('libxmljs')
const pick = require('lodash.pick')

function tryRemoveAttr (element, attributeName, matcher) {
  const attribute = element.attr(attributeName)
  if (attribute != null && (matcher == null || matcher(attribute) === true)) {
    attribute.remove()
  }
}

function renameAttr (element, oldName, newName) {
  const attribute = element.attr(oldName)
  if (attribute != null) {
    element.attr({ [newName]: attribute.value() })
    attribute.remove()
  }
}

function transformForReact (element) {
  tryRemoveAttr(element, 'fill-opacity', (attr) => attr.value() !== '1') // remove all fill-opacity attributes that are different from "1" (default value)
  tryRemoveAttr(element, 'fill') // remove fill, we want to inherit the color from the SvgIcon

  // rename attributes to camelCase for React
  renameAttr(element, 'fill-opacity', 'fillOpacity')
  renameAttr(element, 'stroke-width', 'strokeWidth')
  renameAttr(element, 'stroke-linejoin', 'strokeLinejoin')
  renameAttr(element, 'fill-rule', 'fillRule')
  renameAttr(element, 'clip-path', 'clipPath')
  renameAttr(element, 'stroke-opacity', 'strokeOpacity')

  // recursively transform all child nodes
  element.childNodes().filter((node) => node.name() !== 'text').forEach(transformForReact)
}

const mdiSvgPath = path.join(path.dirname(require.resolve('mdi-svg/meta.json')), 'svg')
const icons = require('mdi-svg/meta.json')
  .map((icon) => {
    const xml = libxmljs.parseXml(fse.readFileSync(path.join(mdiSvgPath, `${icon.name}.svg`), 'utf8'))
    const svg = xml.root().childNodes().map((child) => {
      if (child.type() === 'text') return
      transformForReact(child)
      return child.toString().trim()
    }).join('').trim()
    .replace(/xlink:href/ig, 'xlinkHref')
    .replace()

    if (svg.length === 0) {
      throw Error(`Unexpected number of paths (${xml.svg.path.length}) for ${icon.name}`)
    }
    return {
      name: pascalCase(icon.name),
      svg
    }
  })
const iconFiles = fse.readdirSync(mdiSvgPath)
if (iconFiles.length !== icons.length) {
  console.warn(`${icons.length} icons specified in meta.json but ${iconFiles.length} svg files found`)
}

fse.removeSync(path.join(__dirname, 'package'))
fse.mkdirpSync(path.join(__dirname, 'package'))

for (const { name, svg } of icons) {
  const code = `import React from 'react'
import SvgIcon from 'material-ui/SvgIcon'
export default (props) => <SvgIcon {...props}>${svg}</SvgIcon>
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
