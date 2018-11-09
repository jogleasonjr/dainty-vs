const chroma = require("chroma-js");

const defaultColors = {
  grays: [
    // Material Grey 900
    "#212121",
    // Material Grey 50
    "#fafafa"
  ],
  blueGrays: [
    // Material Theme Ocean
    "#0f111a",
    // Material Blue 50
    "#e3f2fd"
  ],
  blues: [
    // Custom
    "#082847",

    // Material Blue 700
    "#1976d2",
    // Material Blue 50
    "#e3f2fd"
  ],

  // Material Blue A100
  blueLighter: "#82b1ff",

  // Material Green A100
  greenLighter: "#b9f6ca",

  // Material Deep Orange 200
  deepOrangeLight: desaturate("#ffab91", 0.75),

  // Material Purple 200
  purpleLight: "#ce93d8",

  // Material Amber 100
  amberLighter: "#ffecb3"
};

function desaturate(color, amount) {
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
