const { RGBToBGR } = require("../colors");

function getFontsAndColorsReplacements(configuration, colors) {
  const { editor } = configuration;
  const { blueGrays, blues, accent } = colors;
  const dark = configuration.variant === "dark";

  function edbc(index) {
    return index + -editor.backgroundContrast;
  }

  function edfc(index) {
    return index + editor.foregroundContrast;
  }

  function r(str) {
    return RGBToBGR(str)
      .replace("#", "")
      .toUpperCase();
  }

  return [
    ["OUTLINING_SQUARE_FOREGROUND", r(blueGrays[edbc(4)])],
    ["OUTLINING_VERTICAL_RULE_FOREGROUND", r(blueGrays[edbc(4)])],
    ["LINE_NUMBER_FOREGROUND", r(blueGrays[edfc(12)])],
    ["BLOCK_STRUCTURE_ADORNMENTS_BACKGROUND", r(blueGrays[edbc(4)])],
    ["HTML_SERVER_SIDE_SCRIPT_FOREGROUND", r(blues[26])],
    ["HTML_SERVER_SIDE_SCRIPT_BACKGROUND", r(blueGrays[edbc(4)])],
    ["RAZOR_CODE_BACKGROUND", r(blueGrays[edbc(1)])],
    ["SELECTED_TEXT_BACKGROUND", r(accent[20])],
    ["EDITOR_FONT_FAMILY", configuration.editor.fontFamily],
    ["BRACE_MATCHING_FOREGROUND", r(accent[36])],
    ["BRACE_MATCHING_BACKGROUND", r(blueGrays[edbc(4)])],
    ["CURRENT_LINE_FOREGROUND", r(blueGrays[edbc(0)])],
    ["CURRENT_LINE_BACKGROUND", r(blueGrays[edbc(6)])],
    [
      "XML_ATTRIBUTE_VALUE_FOREGROUND",
      r(dark ? colors.oranges[33] : colors.oranges[18])
    ],
    [
      "XML_ATTRIBUTE_QUOTES_FOREGROUND",
      r(dark ? colors.oranges[33] : colors.oranges[18])
    ]
  ];
}

module.exports = {
  getFontsAndColorsReplacements
};
