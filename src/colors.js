const chroma = require("chroma-js");

function generateGrays() {
  return chroma
    .scale([
      // Material Grey 900
      "#212121",
      // Material Grey 50
      "#fafafa"
    ])
    .mode("lch")
    .colors(40);
}

function generateBlueGrays() {
  return chroma
    .scale([
      // Custom
      "#121729",
      // Material Blue 50
      "#e3f2fd"
    ])
    .mode("lch")
    .colors(40);
}

function generateBlues() {
  return chroma
    .scale([
      // Custom
      "#07224f",
      // Material Blue 600
      chroma("#1e88e5").desaturate(0.25),
      // Material Blue 50
      "#e3f2fd"
    ])
    .mode("lch")
    .colors(40);
}

const colors = {
  grays: generateGrays(),
  blueGrays: generateBlueGrays(),
  blues: generateBlues(),

  // Material Green A100
  greenLighter: processColor("#b9f6ca"),

  // Material Deep Orange 200
  deepOrangeLight: processColor("#ffab91", 0.875),

  // Material Purple 200
  purpleLight: processColor("#ce93d8"),

  // Material Amber 100
  amberLighter: processColor("#ffecb3", 0.875)
};

function processColor(c, d = 0.25) {
  return chroma(c)
    .desaturate(d)
    .hex();
}

module.exports = {
  colors
};
