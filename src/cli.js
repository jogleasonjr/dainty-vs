const { getConfigurationJson } = require("./configuration");
const {
  buildThemeFiles,
  buildIndex,
  buildSyntax,
  buildCoverage,
  buildDaintyCss,
  buildColors
} = require("./build");
const { generateColorPalette } = require("./colors");

(async () => {
  const [error, configuration] = await getConfigurationJson();

  if (error) {
    console.error(error);
    return;
  }

  const colors = generateColorPalette(configuration.colors);

  await Promise.all([
    buildThemeFiles(configuration, colors),
    buildIndex(colors),
    buildSyntax(colors),
    buildColors(colors),
    buildDaintyCss(colors)
  ]);

  await buildCoverage(colors);
})();
