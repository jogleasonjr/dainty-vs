const { getConfigurationJson } = require("./configuration");
const {
  buildThemeFiles,
  buildIndexPage,
  buildColorsPage,
  buildCoveragePage,
  buildDaintyCssPage,
  buildSyntaxPage
} = require("./build");
const { generateColorPalette } = require("./colors");

(async () => {
  let filename;
  let type;

  if (process.argv[2] === "-p" || process.argv[2] === "--preset") {
    type = "CONFIGURATION_PRESET";
    filename = `presets/${process.argv[3]}.json`;
  } else if (process.argv[2] === "-c" || process.argv[2] === "--vscode-theme") {
    type = "VSCODE_THEME";
    filename = `vscode-themes/${process.argv[3]}.color-theme.json`;
  }

  const [error, configuration] = await getConfigurationJson(type, filename);

  if (error) {
    console.error(error);
    return;
  }

  const colors = generateColorPalette(configuration);

  await Promise.all([
    buildThemeFiles(configuration, colors),
    buildIndexPage(colors),
    buildSyntaxPage(colors),
    buildColorsPage(colors),
    buildDaintyCssPage(colors)
  ]);

  await buildCoveragePage(colors);
})();
