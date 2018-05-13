import React from 'react'
import { storiesOf } from '@kadira/storybook'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
const icons = require('../package/index')

function themed (children) {
  return (
    <MuiThemeProvider muiTheme={createMuiTheme()}>
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
