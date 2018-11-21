const { RGBToBGR, checkScaleRange } = require("../colors");

function getFontsAndColorsReplacements(configuration, colors) {
  const { editor } = configuration;
  const { blueGray, blue, accent } = colors;
  const dark = configuration.variant === "dark";

  function edbc(index) {
    return checkScaleRange(index - editor.backgroundContrast);
  }

  function edfc(index) {
    return checkScaleRange(index + editor.foregroundContrast);
  }

  function r(str) {
    return RGBToBGR(str)
      .replace("#", "")
      .toUpperCase();
  }

  return [
    ["OUTLINING_SQUARE_FOREGROUND", r(blueGray[edbc(4)])],
    ["OUTLINING_VERTICAL_RULE_FOREGROUND", r(blueGray[edbc(4)])],
    ["LINE_NUMBER_FOREGROUND", r(blueGray[edfc(12)])],
    ["BLOCK_STRUCTURE_ADORNMENTS_BACKGROUND", r(blueGray[edbc(4)])],
    ["HTML_SERVER_SIDE_SCRIPT_FOREGROUND", r(blue[26])],
    ["HTML_SERVER_SIDE_SCRIPT_BACKGROUND", r(blueGray[edbc(4)])],
    ["RAZOR_CODE_BACKGROUND", r(blueGray[edbc(1)])],
    ["SELECTED_TEXT_BACKGROUND", r(accent[20])],
    ["EDITOR_FONT_FAMILY", configuration.editor.fontFamily],
    ["BRACE_MATCHING_FOREGROUND", r(accent[36])],
    ["BRACE_MATCHING_BACKGROUND", r(blueGray[edbc(4)])],
    ["CURRENT_LINE_FOREGROUND", r(blueGray[edbc(0)])],
    ["CURRENT_LINE_BACKGROUND", r(blueGray[edbc(6)])],
    [
      "XML_ATTRIBUTE_VALUE_FOREGROUND",
      r(dark ? colors.orange[33] : colors.orange[18])
    ],
    [
      "XML_ATTRIBUTE_QUOTES_FOREGROUND",
      r(dark ? colors.orange[33] : colors.orange[18])
    ]
  ];
}

module.exports = {
  getFontsAndColorsReplacements
};
