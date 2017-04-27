# Material Design Icons for Material-UI

This module provides [Material-UI][material-ui] `<SvgIcon />` components for all
[Material Design Icons][md-icons]. This is pretty handy if you use React and Material-UI
to build a web app and run out of icons.

Feel more like using a webfont instead of inline svg? We've [got your back][materialdesign-webfont-material-ui]!

While this module contains wrappers for all icons, alias names are not included
at the moment. For example, the _plus_ icon is aliased as _add_, but only the _plus_ icon
is exported.

[materialdesign-webfont-material-ui]: https://github.com/TeamWertarbyte/materialdesign-webfont-material-ui
[material-ui]: http://www.material-ui.com/
[md-icons]: https://materialdesignicons.com/

## Installation
```shell
npm install mdi-material-ui --save
```

## Usage

Every icon is exported with its original name in PascalCase, plus _Icon_. So `coffee` becomes `CoffeeIcon`,
`cloud-print-outline` is exported `CloudPrintOutlineIcon` and so on.

```js
import { CoffeeIcon } from 'mdi-material-ui'

// ...

render() {
  return (
    <div>
      Enjoy your coffee! <CoffeeIcon />
    </div>
  )
}
```

## License

The scripts included in this repository are licensed under the WTFPL.
The icons are licensed under the SIL Open Font License 1.1 (see [Material Design Icons][md-icons] and the [NOTICE][] file).

[NOTICE]: https://github.com/TeamWertarbyte/mdi-material-ui/blob/master/NOTICE