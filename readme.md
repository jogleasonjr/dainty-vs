# Dainty for Visual Studio

Dainty is a highly configurable, refined, and balanced color theme for Visual Studio drawing inspiration from the default dark themes of Visual Studio and Visual Studio Code. It is designed to maximize readability and reduce eye strain, making it more pleasant to work with code all day long.

For more information and web-based configuration, see https://dainty-vs.now.sh.

## Features

- Precise and pleasant colors are generated within the CIELAB color space
- Supports presets of configurations – i.e. other themes
- Punctuation marks are slightly dimmed
- The left side of the editor is less busy than in the default themes
- Contrast for environment background can be added
- Contrast for environment and editor text can be added
- Contrast for comments can be added
- Contrast for scrollbars can be added
- Transparent environment borders can be set
- Transparent scrollbar containers can be set
- Transparent tool window grip handles can be set
- Settings for Indent Guides extension can be included
- Colors can be brightened or desaturated
- Colors can be lightened, darkened, or desaturated
- Colors can be overridden, and accent color can be set
- Environment colors and editor syntax tokens can be overridden

## Setup

    npm install

## CLI usage

Run `npm run build` to generate the color theme files. This produces `dist/dainty.vstheme` and `dist/dainty.vssettings`.

`configuration.json` is used for configuration, and the file is created with default values if it doesn’t exist. The format of `configuration.json` is defined by [`configuration-schema.json`](https://github.com/alexanderte/dainty-vs/blob/master/configuration-schema.json).

## Server usage

Run `npm run start` to start Express server. These are the available routes:

| Method | Route                           | Description                                                       |
| ------ | ------------------------------- | ----------------------------------------------------------------- |
| `GET`  | `/`                             | Landing page                                                      |
| `GET`  | `/colors.html`                  | Colors page                                                       |
| `GET`  | `/coverage.html`                | Coverage page                                                     |
| `GET`  | `/dainty-css.html`              | Dainty.css page                                                   |
| `GET`  | `/syntax.html`                  | Syntax page                                                       |
| `GET`  | `/dainty-latest.zip`            | Generates the latest version of Dainty with default configuration |
| `POST` | `/dainty-latest-configured.zip` | Generates the latest version of Dainty with custom configuration  |

Custom configuration is sent as JSON using the request body, and the format is defined by [`configuration-schema.json`](https://github.com/alexanderte/dainty-vs/blob/master/configuration-schema.json).

## Adjustments

These are adjustments that can be specified under `colors.adjustments` in `configuration.json`:

| Property        | Description                                                  | Minimum value | Maximum value |
| --------------- | ------------------------------------------------------------ | ------------- | ------------- |
| `"lightness"`   | Adjust lightness to make blue-grays either darker og lighter | -5            | 5             |
| `"chroma"`      | Adjust chroma to make colors either more or less saturated   | -5            | 5             |
| `"chromaStart"` | Adjust start of blue grays scale chroma                      | -5            | 5             |
| `"chromaEnd"`   | Adjust start of blue grays scale chroma                      | Not specified | Not specified |

## Presets

Presets are configuration files that you can use in addition to `configuration.json`. They are mostly used for turning Dainty into another color theme. Presets are located in the `presets` directory. You can build Dainty with the remix configuration displayed on the website by running:

    npm run build -- -p dainty-remix

If a property is set in both `configuration.json` and the preset configuration, then the one in `configuration.json` is used.

## Advanced

### Overriding colors

Color scales can be overridden by adding the following object to `"colors"` in `configuration.json`:

```json
"overrides": {
  "blueGrays": "#11181b",
  "blues": "#ab47bc",
  "purples": "#42a5f5",
  "greens": "#84ffff",
  "oranges": "#82b1ff"
}
```

With a provided base color a scale of 40 shades is built. The color will be converted to LCh and its hue and chroma (saturation) will be kept.

Use `public/syntax.html` to quickly test new settings after running `npm run build`.

### Overriding environment colors and editor tokens

Environment colors and editor tokens can be overridden by adding the following object to `"colors"` in `configuration.json`:

```json
"replacements": {
  "overrides": {
    "searchReplace": {
      "#b5cea8": ["PURPLES_20", "PURPLES_20"]
    },
    "categories": {
      "ColorizedSignatureHelp colors": {
        "HTML Attribute Value": [[null, "BLUES_0"], [null, "BLUES_32"]]
      }
    }
  }
}
```

Each replacement is a tuple, where the first value represents the dark variation of the theme. The second value represents the light variation. For categories there is an inner tuple representing the background color, and text color, respectively.

## License

Dainty for Visual Studio is licensed under the [MIT License](https://github.com/alexanderte/dainty-vs/blob/master/license.md).
