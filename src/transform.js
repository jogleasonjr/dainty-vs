const { transformTheme } = require("./transformers/theme");
const { transformSettings } = require("./transformers/settings");
const { transformIndex } = require("./transformers/index");
const { transformSyntax } = require("./transformers/syntax");
const { transformCoverage } = require("./transformers/coverage");
const { transformColors } = require("./transformers/colors");

module.exports = {
  transformTheme,
  transformSettings,
  transformIndex,
  transformSyntax,
  transformCoverage,
  transformColors
};
