const { transformTheme } = require("./transformers/theme");
const { transformSettings } = require("./transformers/settings");
const { transformColorsPage } = require("./transformers/pages/colors");
const { transformCoveragePage } = require("./transformers/pages/coverage");
const { transformDaintyCssPage } = require("./transformers/pages/dainty-css");
const { transformIndexPage } = require("./transformers/pages/index");
const { transformSyntaxPage } = require("./transformers/pages/syntax");

module.exports = {
  transformTheme,
  transformSettings,
  transformIndexPage,
  transformColorsPage,
  transformCoveragePage,
  transformDaintyCssPage,
  transformSyntaxPage
};
