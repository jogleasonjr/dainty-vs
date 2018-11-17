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

  if (process.argv[2] === "-p" || process.argv[2] === "--preset") {
    filename = `presets/${process.argv[3]}.json`;
  }

  const [error, configuration] = await getConfigurationJson(filename);

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
