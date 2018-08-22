import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

export default (path) => {
  const Icon = (props) => <SvgIcon {...props}><path d={path} /></SvgIcon>
  Icon.muiName = 'SvgIcon'
  return Icon
}
