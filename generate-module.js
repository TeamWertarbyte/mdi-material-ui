#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var pascalCase = require('pascal-case')
var babel = require('babel-core')
var libxmljs = require("libxmljs")

var icons = fs.readdirSync('./icons/icons/svg')
  .filter(filename => /.*\.svg/.test(filename))
  .map(filename => {
    const icon = filename.substring(0, filename.length - 4)
    const xml = libxmljs.parseXml(fs.readFileSync(path.resolve('icons', 'icons', 'svg', filename)))
    const svg = xml.root().childNodes().map((child) => {
      
      return child.toString().trim()
    }).join('').trim()
    if (xml.svg.path == null) {
      throw Error(`No path found in ${icon}`)
    }
    if (xml.svg.path.length !== 1) {
      throw Error(`Unexpected number of paths (${xml.svg.path.length}) for ${icon}`)
    }
  })
  .map(icon => { return { name: `${pascalCase(icon)}Icon`, className: `mdi mdi-${icon}` } })

var iconExports = icons.map(({name, className}) =>
  `export const ${name} = (props) => <FontIcon className="${className}" {...props} />`
).join('\n')

const code =
  "import * as React from 'react'" + "\n" +
  "import FontIcon from 'material-ui/FontIcon'" + "\n" +
  "\n" +
  iconExports +
  "\n"

process.stdout.write(babel.transform(code, {
  presets: ['es2015', 'react', 'stage-0'],
  compact: true
}).code + '\n')

const request = require('request')
