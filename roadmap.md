# Roadmap

## 2018-11-20

I use Visual Studio at work for C# development, some JavaScript, and Sass. Although Dainty for Visual Studio feels “good enough” for my use cases, there are some things that need to be improved before I would say that it’s complete. One example is hovering the small icons on the active tab. The background color is not the one I would choose if I had unlimited time to tweak things. Also, the different status bar colors should be supported in a better way.

I’m not sure yet how complete Dainty for Visual Studio should become. While the search–replace approach has been great for quick prototyping, I’m not sure if it is needed if the plan is to support most color tokens of Visual Studio. The Color Themes extension for Visual Studio has a “Show Common Elements” listing. I think the first priority should be to get everything on this list right. There should also be greater coverage for things like regions in C# or CDATA in XML.

Dainty for Visual Studio currently supports presets making it easy to turn it into another theme. I have just started working on a way to convert VS Code themes to Visual Studio themes. I’m not too familiar with VS Code themes, and I’m taking a break from this project to start working on the Dainty for VS Code theme.

These are things I would like to see in the future:

- Support everything in the “Show Common Elements” listing of the Color Themes extension _(high priority)_
- Better support tokens such as C# regions or XML CDATA _(high priority)_
- Add support for ReShaper _(high priority)_
- Add support for Visual Studio 2019 _(high priority)_
- Add integration tests especially for downloading the ZIP files _(high priority)_
- Add unit tests especially for the colors module _(high priority)_
- Add support for converting VS Code themes _(high priority)_
  - One of my ideas is to make the conversion of VS Code themes into VS themes complete enough so that Dainty for VS Code can be used for generating Dainty for VS.
- Make it possible to run an `npm` script to build the theme for making it available through the VS Marketplace _(high priority)_
- Consider using something like ImageMagick to improve the screenshot workflow _(low priority)_
- Consider rewriting pages in React to enable more interactive features (wait until hooks are out of alpha) _(low priority)_
- Consider extracting color scale code into an `npm` package _(low priority)_
- Consider turning Dainty.css into its own project _(low priority)_

If you have anything you’d like to see, then feel free to open an issue at GitHub.
