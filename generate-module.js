#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const pascalCase = require('pascal-case')
const babel = require('babel-core')
const libxmljs = require('libxmljs')

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
    const xml = libxmljs.parseXml(fs.readFileSync(path.join(mdiSvgPath, `${icon.name}.svg`), 'utf8'))
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
      name: `${pascalCase(icon.name)}Icon`,
      svg
    }
  })

rimraf.sync(path.join(__dirname, 'lib'))
mkdirp.sync(path.join(__dirname, 'lib'))

// there is an 'svg' icon, so we can't call the SvgIcon component SvgIcon
const code = `
  import React from 'react'
  import Icon from 'material-ui/SvgIcon'

  ${icons.map(({ name, svg }) => `export const ${name} = (props) => <Icon {...props}>${svg}</Icon>`).join('\n')}
`
fs.writeFileSync(path.join(__dirname, 'lib', 'index.js'), babel.transform(code, {
  presets: ['es2015', 'react', 'stage-0'],
  compact: true
}).code)
