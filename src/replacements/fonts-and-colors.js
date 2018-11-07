const { RGBToBGR } = require("../utils");

function getFontsAndColorsReplacements(configuration, colors) {
  const { blueGrays, blues } = colors;

  function r(str) {
    return RGBToBGR(str)
      .replace("#", "")
      .toUpperCase();
  }

  return [
    ["OUTLINING_SQUARE_FOREGROUND", r(blueGrays[8])],
    ["OUTLINING_VERTICAL_RULE_FOREGROUND", r(blueGrays[8])],
    ["LINE_NUMBER_FOREGROUND", r(blueGrays[8])],
    ["BLOCK_STRUCTURE_ADORNMENTS_BACKGROUND", r(blueGrays[8])],
    ["HTML_SERVER_SIDE_SCRIPT_FOREGROUND", r(blues[24])],
    ["HTML_SERVER_SIDE_SCRIPT_BACKGROUND", r(blueGrays[4 - 1])],
    ["RAZOR_CODE_BACKGROUND", r(blueGrays[4 - 1])],
    ["SELECTED_TEXT_BACKGROUND", r(blues[24])],
    ["EDITOR_FONT_FAMILY", configuration.editor.fontFamily]
  ];
}

module.exports = {
  getFontsAndColorsReplacements
};
