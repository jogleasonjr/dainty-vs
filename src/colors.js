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
    desaturate("#e3f2fd", 0.15625)
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
  greenLighter: desaturate("#b9f6ca", 0.25),

  // Material Deep Orange 200
  deepOrangeLight: brighten(desaturate("#ffab91", 1.375), 0.0625),

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

function brighten(color, amount) {
  return chroma(color)
    .brighten(amount)
    .hex();
}

function generateScale(colors, n = 40) {
  return chroma
    .scale(colors)
    .mode("lch")
    .colors(n);
}

function generateColorPalette(colors, configuration) {
  const newGrays = [
    generateScale(colors.grays)[configuration.colors.process.brighten]
  ].concat(colors.grays.slice(1));
  const newBlueGrays = [
    generateScale(colors.blueGrays)[configuration.colors.process.brighten]
  ].concat(colors.blueGrays.slice(1));

  return {
    grays: generateScale(
      newGrays.map(c =>
        desaturate(c, configuration.colors.process.desaturate * 0.125)
      )
    ),
    blueGrays: generateScale(
      newBlueGrays.map(c =>
        desaturate(c, configuration.colors.process.desaturate * 0.125)
      )
    ),
    blues: generateScale(
      colors.blues.map(c =>
        desaturate(c, configuration.colors.process.desaturate * 0.25)
      )
    ),
    blueLighter: desaturate(
      colors.blueLighter,
      configuration.colors.process.desaturate * 0.25
    ),
    greenLighter: desaturate(
      colors.greenLighter,
      configuration.colors.process.desaturate * 0.5
    ),
    deepOrangeLight: desaturate(
      colors.deepOrangeLight,
      configuration.colors.process.desaturate * 0.125
    ),
    purpleLight: desaturate(
      colors.purpleLight,
      configuration.colors.process.desaturate * 0.25
    ),
    amberLighter: desaturate(
      colors.amberLighter,
      configuration.colors.process.desaturate * 0.25
    )
  };
}

module.exports = {
  defaultColors,
  generateColorPalette
};
