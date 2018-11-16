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
  const [error, configuration] = await getConfigurationJson();

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
