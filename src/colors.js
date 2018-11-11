const chroma = require("chroma-js");

const defaultColors = {
  blueGrays: [
    // Custom
    "#070b18",

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

  // Custom
  deepOrangeLighter: "#f1c0af",

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

function mergeColors(defaults, overrides = {}) {
  let result = {};

  for (const key of Object.keys(defaults)) {
    if (overrides[key]) {
      result[key] = overrides[key];
    } else {
      result[key] = defaults[key];
    }
  }

  return result;
}

function brightenScale(colors, steps) {
  return [generateScale(colors)[steps]].concat(colors.slice(1));
}

function generateColorPalette(configuration) {
  const colors = mergeColors(defaultColors, configuration.overrides);

  const blueGrays = brightenScale(
    colors.blueGrays,
    configuration.process.brighten
  );

  return {
    blueGrays: generateScale(
      blueGrays.map(c =>
        desaturate(c, configuration.process.desaturate * 0.0625)
      )
    ),
    blues: generateScale(
      colors.blues.map(c =>
        desaturate(c, configuration.process.desaturate * 0.125)
      )
    ),
    blueLighter: desaturate(
      colors.blueLighter,
      configuration.process.desaturate * 0.125
    ),
    greenLighter: desaturate(
      colors.greenLighter,
      configuration.process.desaturate * 0.125
    ),
    deepOrangeLighter: desaturate(
      colors.deepOrangeLighter,
      configuration.process.desaturate * 0.125
    ),
    purpleLight: desaturate(
      colors.purpleLight,
      configuration.process.desaturate * 0.125
    ),
    amberLighter: desaturate(
      colors.amberLighter,
      configuration.process.desaturate * 0.125
    )
  };
}

module.exports = {
  defaultColors,
  generateColorPalette
};
