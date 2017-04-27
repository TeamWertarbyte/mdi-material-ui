import React from 'react'
import { storiesOf } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const icons = require('../lib')

function themed (children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div style={{ fontFamily: 'Roboto, sans-serif' }}>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

const iconStories = storiesOf('Icons', module)
iconStories.add(`all icons (${Object.keys(icons).length.toLocaleString()})`, () => themed(
  <div>
    {Object.keys(icons).map((icon) => {
      const Icon = icons[icon]
      return <Icon key={icon} color='#f00' />
    })}
  </div>
))

Object.keys(icons).sort().forEach((icon) => {
  const Icon = icons[icon]
  iconStories.add(icon, () => themed(<Icon />))
})
