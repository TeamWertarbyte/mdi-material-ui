/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as commonjsIcons from '../package/index'
import * as es2015Icons from '../package/index.es'

describe('the generated commonjs module', () => {
  for (const iconName of Object.keys(commonjsIcons)) {
    it(`should export a ${iconName} element that returns an SVG`, () => {
      const Icon = commonjsIcons[iconName]
      const renderedIcon = renderer.create((
        <MuiThemeProvider>
          <Icon />
        </MuiThemeProvider>
      )).toJSON()
      expect(renderedIcon.type).toBe('svg')
    })
  }
})

describe('the generated es2015 module', () => {
  for (const iconName of Object.keys(es2015Icons)) {
    it(`should export a ${iconName} element that returns an SVG`, () => {
      const Icon = es2015Icons[iconName]
      const renderedIcon = renderer.create((
        <MuiThemeProvider>
          <Icon />
        </MuiThemeProvider>
      )).toJSON()
      expect(renderedIcon.type).toBe('svg')
    })
  }

  it('should include the same icons as the CommonJS module', () => {
    expect(Object.keys(es2015Icons)).toEqual(expect.arrayContaining(Object.keys(commonjsIcons)))
    expect(Object.keys(es2015Icons).length).toBe(Object.keys(commonjsIcons).length)
  })
})
