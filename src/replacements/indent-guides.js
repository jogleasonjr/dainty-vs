const { toRGBString, checkScaleRange } = require("../colors");

function getIndentGuidesReplacements(configuration, colors) {
  const { editor } = configuration;
  const { blueGrays, purples } = colors;
  const dark = configuration.variant === "dark";

  function edbc(index) {
    return checkScaleRange(index - editor.backgroundContrast);
  }

  return [
    ["DEFAULT_DEFAULT_LINE_COLOR", toRGBString(blueGrays[edbc(4)])],
    ["DEFAULT_DEFAULT_HIGHLIGHT_COLOR", toRGBString(blueGrays[edbc(6)])],
    ["DEFAULT_UNALIGNED_LINE_COLOR", toRGBString(purples[39])],
    ["DEFAULT_UNALIGNED_HIGHLIGHT_COLOR", toRGBString(purples[39])]
  ];
}

module.exports = {
  getIndentGuidesReplacements
};
