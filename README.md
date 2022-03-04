# Material Design Icons for Material-UI

[![Material Design Icons version](https://img.shields.io/badge/mdi-v6.5.95-blue.svg)](https://github.com/Templarian/MaterialDesign)
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

There are different major versions of this package, each one for different Material-UI releases. Note that this project does not follow semantic versioning. If Material Design Icons removes or renames icons, it will still be a minor version bump.

| Material-UI    | mdi-material-ui                                                                                                                           | npm tag |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| ^5.0.0         | [![npm](https://img.shields.io/npm/v/mdi-material-ui.svg)](https://www.npmjs.com/package/mdi-material-ui)                                 | latest  |
| ^4.0.0         | [![npm](https://img.shields.io/npm/v/mdi-material-ui/mui-v4.svg)](https://www.npmjs.com/package/mdi-material-ui/v/mui-v4)                 | mui-v4  |
| ^1.0.0, ^3.0.0 | [![npm](https://img.shields.io/npm/v/mdi-material-ui/mui-v3.svg)](https://www.npmjs.com/package/mdi-material-ui/v/mui-v3)                 | mui-v3  |
| 0.x            | [![npm](https://img.shields.io/npm/v/mdi-material-ui/legacy.svg?color=yellow)](https://www.npmjs.com/package/mdi-material-ui/v/legacy) \* | legacy  |

\* mdi-material-ui v4 (for Material-UI v0) is not updated anymore

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

The scripts included in this repository are licensed under the MIT license.
The icons are licensed under the MIT license (see [Material Design Icons](https://github.com/Templarian/MaterialDesign-SVG) and the [NOTICE][] file).

[notice]: https://github.com/TeamWertarbyte/mdi-material-ui/blob/master/NOTICE
