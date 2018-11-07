const { transformIndex } = require("./transformers/index");
const { transformSettings } = require("./transformers/settings");
const { transformTheme } = require("./transformers/theme");
const { transformCoverage } = require("./transformers/coverage");

module.exports = {
  transformIndex,
  transformSettings,
  transformTheme,
  transformCoverage
};
