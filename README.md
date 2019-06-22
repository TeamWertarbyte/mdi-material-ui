# Material Design Icons for Material-UI
[![npm](https://img.shields.io/npm/v/mdi-material-ui.svg)](https://www.npmjs.com/package/mdi-material-ui)
[![Material Design Icons version](https://img.shields.io/badge/mdi-v3.7.95-blue.svg)](https://github.com/Templarian/MaterialDesign)
[![Material Design Icons version](https://img.shields.io/badge/mdi--light-v0.2.63-blue.svg)](https://github.com/Templarian/MaterialDesignLight)

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

There are three major versions of this package, each one for different Material-UI releases. All three versions will receive icon updates as minor releases for the foreseeable future.

| Material-UI | mdi-material-ui |
|---|---|
|0.x|^4.0.0|
|^1.0.0, ^3.0.0|^5.0.0|
|^4.0.0|^6.0.0|

## Usage
Every icon is exported with its original name in PascalCase. So `coffee` becomes `Coffee`,
`cloud-print-outline` is exported as `CloudPrintOutline` and so on.

The Material Design _Light_ icons are included in the `/light` subdirectory.

### With tree-shaking
If your environment supports tree-shaking and you are sure that it works fine in your setup, you can simply import the icons as follows:

```js
import { Coffee, Food } from 'mdi-material-ui'
import { Camera, Settings } from 'mdi-material-ui/light'

<Coffee />
<Food />
<Camera />
<Settings />
```

### Without tree-shaking
If your environment doesn't support tree-shaking, you should only import the icons that you actually need in order to ensure that you don't end up bundling _all_ icons.
  
```js
import Coffee from 'mdi-material-ui/Coffee'
import Food from 'mdi-material-ui/Food'
import Camera from 'mdi-material-ui/light/Camera'
import Settings from 'mdi-material-ui/light/Settings'

<Coffee />
<Food />
<Camera />
<Settings />
```

## License
The scripts included in this repository are licensed under the WTFPL.
The icons are licensed under the MIT license (see [Material Design Icons](https://github.com/Templarian/MaterialDesign-SVG) and the [NOTICE][] file).

[NOTICE]: https://github.com/TeamWertarbyte/mdi-material-ui/blob/master/NOTICE
