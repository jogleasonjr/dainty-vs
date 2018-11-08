const chroma = require("chroma-js");

const defaultColors = {
  grays: [
    // Material Grey 900
    "#212121",
    // Material Grey 50
    "#fafafa"
  ],
  blueGrays: [
    // Custom
    "#161b25",
    // Material Blue 50
    desaturate("#e3f2fd")
  ],
  blues: [
    // Custom
    "#07224f",
    // Material Blue 700
    desaturate("#1976d2"),
    // Material Blue 50
    "#e3f2fd"
  ],

  // Material Blue A100
  blueLighter: desaturate("#82b1ff"),

  // Material Green A100
  greenLighter: desaturate("#b9f6ca"),

  // Material Deep Orange 200
  deepOrangeLight: desaturate("#ffab91", 0.875),

  // Material Purple 200
  purpleLight: desaturate("#ce93d8"),

  // Material Amber 100
  amberLighter: desaturate("#ffecb3", 0.875)
};

function desaturate(color, amount = 0.1875) {
  return chroma(color)
    .desaturate(amount)
    .hex();
}

function generateScale(colors, n = 40) {
  return chroma
    .scale(colors)
    .mode("lch")
    .colors(n);
}

function generateColorPalette(colors = defaultColors) {
  return {
    grays: generateScale(colors.grays),
    blueGrays: generateScale(colors.blueGrays),
    blues: generateScale(colors.blues),
    blueLighter: colors.blueLighter,
    greenLighter: colors.greenLighter,
    deepOrangeLight: colors.deepOrangeLight,
    purpleLight: colors.purpleLight,
    amberLighter: colors.amberLighter
  };
}

module.exports = {
  generateColorPalette
};
