# Material Design Icons for Material-UI
[![npm](https://img.shields.io/npm/v/mdi-material-ui.svg)](https://www.npmjs.com/package/mdi-material-ui)
[![Material Design Icons version](https://img.shields.io/badge/mdi-v2.4.85-blue.svg)](https://github.com/Templarian/MaterialDesign-SVG/)

This module provides [Material-UI][material-ui] `<SvgIcon />` components for all
[Material Design Icons][md-icons]. This is pretty handy if you use React and Material-UI
to build a web app and run out of icons.

While this module contains wrappers for all icons, alias names are not included. For example, the _plus_ icon is aliased as _add_, but only the _plus_ icon
is exported.

[materialdesign-webfont-material-ui]: https://github.com/TeamWertarbyte/materialdesign-webfont-material-ui
[material-ui]: http://www.material-ui.com/
[md-icons]: https://materialdesignicons.com/

## Installation
```shell
npm install mdi-material-ui --save
```

## Usage
Every icon is exported with its original name in PascalCase. So `coffee` becomes `Coffee`,
`cloud-print-outline` is exported as `CloudPrintOutline` and so on.

### With tree-shaking
If your environment supports tree-shaking and you are sure that it works fine in your setup, you can simply import the icons as follows:

```js
import { Coffee, Food } from 'mdi-material-ui'

<Coffee />
<Food />
```

### Without tree-shaking
If your environment doesn't support tree-shaking, you should only import the icons that you actually need in order to ensure that you don't end up bundling _all_ icons.
  
```js
import Coffee from 'mdi-material-ui/Coffee'
import Food from 'mdi-material-ui/Food'

<Coffee />
<Food />
```

If you think that this is far too verbose (I agree!), consider using [babel-plugin-direct-import](https://github.com/umidbekkarimov/babel-plugin-direct-import). Install it and adjust your `.babelrc` by adding the following snippet to the plugins section:

```js
{
  // ...
  plugins: [
    // ...
    ["direct-import", ["mdi-material-ui"]]
  ]
}
```

## Related projects
Feel more like using a webfont instead of inline svg? We've [got your back][materialdesign-webfont-material-ui]!

## License
The scripts included in this repository are licensed under the WTFPL.
The icons are licensed under the MIT license (see [Material Design Icons](https://github.com/Templarian/MaterialDesign-SVG) and the [NOTICE][] file).

[NOTICE]: https://github.com/TeamWertarbyte/mdi-material-ui/blob/master/NOTICE
