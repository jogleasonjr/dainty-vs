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

| Method | Route                         | Description                                                       |
| ------ | ----------------------------- | ----------------------------------------------------------------- |
| GET    | /                             | Dainty for Visual Studio website                                  |
| GET    | /dainty-latest.zip            | Generates the latest version of Dainty with default configuration |
| GET    | /dainty-latest-configured.zip | Generates the latest version of Dainty with custom configuration. |

Custom configuration is sent as JSON using the request body, and the format is defined by [`configuration-schema.json`](https://github.com/alexanderte/dainty-vs/blob/master/configuration-schema.json).

## License

Dainty for Visual Studio is licensed under the [MIT License](https://github.com/alexanderte/dainty-vs/blob/master/license.md).
