const { getConfigurationJson } = require("./configuration");
const { buildThemeFiles, buildWebsite } = require("./build");

(async () => {
  if (process.env.NODE_ENV === "production") {
    await buildWebsite();
    return;
  }

  const [error, configuration] = await getConfigurationJson();

  if (error) {
    console.error(error);
    return;
  }

  await Promise.all([buildThemeFiles(configuration), buildWebsite()]);
})();
