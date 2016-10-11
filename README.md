# Material Design Webfont for Material-UI

Sorry for the long repo name, but it pretty much nails it. This tiny module
provides [Material-UI][material-ui] `<FontIcon />` elements for all
[Material Design Icons][md-icons]. This is pretty handy if you use React and Material-UI
to build a web app and run out of icons.

While this module contains wrappers for all icons, alias names are not included
at the moment. For example, the _plus_ icon is aliased as _add_, but only the _plus_ icon
is exported.

[material-ui]: http://www.material-ui.com/
[md-icons]: https://materialdesignicons.com/

## Installation
```shell
npm install materialdesign-webfont-material-ui --save
```

## Usage

To use the icons, you need to include the webfont in your HTML files.

```html
<link href="//cdn.materialdesignicons.com/1.7.22/css/materialdesignicons.min.css" media="all" rel="stylesheet" type="text/css" />
```

Then you can import and use the icons. Every icon is exported with its
original name in PascalCase, plus _Icon_. So `coffee` becomes `CoffeeIcon`,
`cloud-print-outline` is exported `CloudPrintOutlineIcon` and so on.

```js
import { CoffeeIcon } from 'materialdesign-webfont-material-ui'

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

The scripts included in this repository are licensed under the WTFPL. For the license
of the icons, see [Material Design Icons][md-icons].
