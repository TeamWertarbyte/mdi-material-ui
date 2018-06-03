import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

export default (svg) => {
  const Icon = (props) => <SvgIcon {...props}>{svg}</SvgIcon>
  Icon.muiName = 'SvgIcon'
  return Icon
}
