#!/usr/bin/env node

var fs = require('fs')
var pascalCase = require('pascal-case')
var babel = require('babel-core')

var icons = fs.readdirSync('./icons/icons/svg')
  .filter(filename => /.*\.svg/.test(filename))
  .map(filename => filename.substring(0, filename.length - 4))
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
