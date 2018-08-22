import React from 'react'
import { storiesOf } from '@storybook/react'
const icons = require('../package/index')

function themed (children) {
  return (
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      {children}
    </div>
  )
}

const iconStories = storiesOf('Icons', module)
iconStories.add(`all icons (${Object.keys(icons).length.toLocaleString()})`, () => themed(
  <div>
    {Object.keys(icons).map((icon) => {
      const Icon = icons[icon]
      return <Icon key={icon} />
    })}
  </div>
))

Object.keys(icons).sort().forEach((icon) => {
  const Icon = icons[icon]
  iconStories.add(icon, () => themed(<Icon />))
})
