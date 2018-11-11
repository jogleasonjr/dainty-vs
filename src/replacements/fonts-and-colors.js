const { RGBToBGR } = require("../utils");

function getFontsAndColorsReplacements(configuration, colors) {
  const { blueGrays, blues } = colors;

  function r(str) {
    return RGBToBGR(str)
      .replace("#", "")
      .toUpperCase();
  }

  return [
    ["OUTLINING_SQUARE_FOREGROUND", r(blueGrays[4])],
    ["OUTLINING_VERTICAL_RULE_FOREGROUND", r(blueGrays[4])],
    ["LINE_NUMBER_FOREGROUND", r(blueGrays[12])],
    ["BLOCK_STRUCTURE_ADORNMENTS_BACKGROUND", r(blueGrays[2])],
    ["HTML_SERVER_SIDE_SCRIPT_FOREGROUND", r(blues[24])],
    ["HTML_SERVER_SIDE_SCRIPT_BACKGROUND", r(blueGrays[4])],
    ["RAZOR_CODE_BACKGROUND", r(blueGrays[1])],
    ["SELECTED_TEXT_BACKGROUND", r(blues[24])],
    ["EDITOR_FONT_FAMILY", configuration.editor.fontFamily],
    ["BRACE_MATCHING_FOREGROUND", r(colors.blueLighter)],
    ["BRACE_MATCHING_BACKGROUND", r(blueGrays[4])],
    ["CURRENT_LINE_FOREGROUND", r(blueGrays[0])],
    ["CURRENT_LINE_BACKGROUND", r(blueGrays[6])]
  ];
}

module.exports = {
  getFontsAndColorsReplacements
};
