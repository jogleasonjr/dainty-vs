# Dainty for Visual Studio

Dainty is a configurable refined and balanced color theme for Visual Studio drawing inspiration from the default dark themes of Visual Studio and Visual Studio Code. It is designed to maximize readability and reduce eye strain, making it more pleasant to work with code all day long.

For more information and web-based configuration, see https://dainty-vs.now.sh.

## Features

- Slightly dimmed punctuation marks, and editor clean ups
- Font for editor, console, and output windows can be set
- Active file tab, file tab border, and status bar background can be set to either gray, blue, or transparent
- Contrast for environment background can be added
- Contrast for environment text can be added
- Contrast for comments can be added
- Contrast for scrollbars can be added
- Transparent environment borders can be set
- Transparent scrollbar containers can be set
- Transparent tool window grip handles can be set
- Settings for Indent Guides extension can be included
- Colors can be brightened or desaturated
- Colors can be overridden

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
| `GET`  | `/coverage.html`                | Coverage page                                                     |
| `GET`  | `/dainty-latest.zip`            | Generates the latest version of Dainty with default configuration |
| `POST` | `/dainty-latest-configured.zip` | Generates the latest version of Dainty with custom configuration  |

Custom configuration is sent as JSON using the request body, and the format is defined by [`configuration-schema.json`](https://github.com/alexanderte/dainty-vs/blob/master/configuration-schema.json).

## Overriding colors

Colors can be overridden by adding the following object to `"colors"` in `configuration.json`:

```json
"overrides": {
  "blueGrays": ["#0f111a", "#e3f2fd"],
  "blues": ["#082847", "#1976d2", "#e3f2fd"],
  "blueLighter": "#82b1ff",
  "greenLighter": "#b9f6ca",
  "deepOrangeLighter": "#e4b8a9",
  "purpleLight": "#ce93d8",
  "amberLighter": "#ffecb3"
}
```

`blueGrays` and `blues` are scales where each array item represents a point on the scale. The scale can be of any length. The colors of the scale are evenly distributed between the points.

Use `public/syntax.html` to quickly test new settings after running `npm run build`.

## License

Dainty for Visual Studio is licensed under the [MIT License](https://github.com/alexanderte/dainty-vs/blob/master/license.md).
