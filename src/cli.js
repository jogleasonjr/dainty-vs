const { getConfigurationJson } = require("./configuration");
const { buildThemeFiles, buildIndex, buildCoverage } = require("./build");

(async () => {
  if (process.env.NODE_ENV === "production") {
    await buildIndex();
    return;
  }

  const [error, configuration] = await getConfigurationJson();

  if (error) {
    console.error(error);
    return;
  }

  await Promise.all([buildThemeFiles(configuration), buildIndex()]);

  await buildCoverage();
})();
