import React from 'react'
import { storiesOf } from '@storybook/react'
const icons = require('../package/index')
const lightIcons = require('../package/light/index')

function themed (children) {
  return (
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      {children}
    </div>
  )
}

const iconStories = storiesOf('Material Design Icons', module)
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

const lightIconStories = storiesOf('Material Design Icons Light', module)
lightIconStories.add(`all icons (${Object.keys(lightIcons).length.toLocaleString()})`, () => themed(
  <div>
    {Object.keys(lightIcons).map((icon) => {
      const Icon = lightIcons[icon]
      return <Icon key={icon} />
    })}
  </div>
))

Object.keys(lightIcons).sort().forEach((icon) => {
  const Icon = lightIcons[icon]
  lightIconStories.add(icon, () => themed(<Icon />))
})
