# Dainty for Visual Studio

Dainty is a configurable modern and balanced color theme drawing inspiration from the default dark themes of Visual Studio and Visual Studio Code. It is designed to maximize readability and reduce eye strain, making it more pleasant to work with code all day long.

For more information, see https://dainty-vs.now.sh.

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

    "overrides": {
      "grays": ["#212121", "#fafafa"],
      "blueGrays": ["#0f111a", "#e3f2fd"],
      "blues": ["#082847", "#1976d2", "#e3f2fd"],
      "blueLighter": "#82b1ff",
      "greenLighter": "#b9f6ca",
      "deepOrangeLighter": "#e4b8a9",
      "purpleLight": "#ce93d8",
      "amberLighter": "#ffecb3"
    }

`grays`, `blueGrays`, and `blues` are scales where each array item represents a point on the scale. The scale can be of any length. The scale is evenly distributed between the points.

## License

Dainty for Visual Studio is licensed under the [MIT License](https://github.com/alexanderte/dainty-vs/blob/master/license.md).
