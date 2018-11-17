const culori = require("culori");
const changeCase = require("change-case");

function generateScale(color, override, adjustments, lessChrome) {
  const maximumLightness = 100;
  const maximumChroma = 131.207;
  const lightnessMultiplier = 2.25;

  let chromaDivisor = 3;
  let hue = 0;
  let lightnessAdjustment = 0;
  let chromaAdjustment = 0;
  let chromaStartAdjustment = 0;
  let chromaEndAdjustment = 0;

  switch (color) {
    case "BLUE_GRAYS":
      hue = 270;
      chromaDivisor = 24;
      break;
    case "BLUES":
      hue = 270 - 90 / 16;
      break;
    case "PURPLES":
      hue = 315;
      break;
    case "GREENS":
      hue = 180;
      break;
    case "ORANGES":
      hue = 45;
      chromaAdjustment -= maximumChroma / 6;
      break;
  }

  if (lessChrome) {
    chromaDivisor = 6;
  }

  if (color === "BLUE_GRAYS") {
    chromaAdjustment += adjustments.chroma ? adjustments.chroma : 0;
    lightnessAdjustment += adjustments.lightness ? adjustments.lightness : -3;
    chromaStartAdjustment = adjustments.chromaStart
      ? adjustments.chromaStart
      : 5;
    chromaEndAdjustment = adjustments.chromaEnd
      ? adjustments.chromaEnd
      : -3.125;
  } else {
    chromaAdjustment += adjustments.chroma ? adjustments.chroma * 2 : 0;
  }

  const lchOverride = override ? culori.lch(override) : null;

  let scale = [];

  for (let i = 0; i < 40; i++) {
    scale.push({
      mode: "lch",
      h: lchOverride ? lchOverride.h : hue,
      l:
        (lightnessAdjustment / 40) * (39 - i) +
        (maximumLightness - lightnessMultiplier * (39 - i)),
      c:
        (chromaStartAdjustment / 40) * (39 - i) +
        (chromaEndAdjustment / 40) * i +
        (lchOverride
          ? lchOverride.c
          : maximumChroma / chromaDivisor + chromaAdjustment)
    });
  }

  return scale.map(culori.formatter("hex"));
}

function generateColorPalette(configuration) {
  const overrides = configuration.colors.overrides
    ? configuration.colors.overrides
    : {};

  function handleVariant(scale) {
    if (configuration.variant === "dark") {
      return scale;
    } else {
      return scale.reverse();
    }
  }

  const colorPalette = {
    blueGrays: handleVariant(
      generateScale(
        "BLUE_GRAYS",
        overrides.blueGrays,
        configuration.colors.adjustments
      )
    ),
    blues: handleVariant(
      generateScale("BLUES", overrides.blues, configuration.colors.adjustments)
    ),
    bluesLessChrome: handleVariant(
      generateScale(
        "BLUES",
        overrides.blues,
        configuration.colors.adjustments,
        true
      )
    ),
    purples: handleVariant(
      generateScale(
        "PURPLES",
        overrides.purples,
        configuration.colors.adjustments
      )
    ),
    oranges: handleVariant(
      generateScale(
        "ORANGES",
        overrides.oranges,
        configuration.colors.adjustments
      )
    ),
    greens: handleVariant(
      generateScale(
        "GREENS",
        overrides.greens,
        configuration.colors.adjustments
      )
    )
  };

  return {
    ...colorPalette,
    accent: colorPalette[`${configuration.colors.accent}s`]
  };
}

function isHexColor(colorHex) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorHex);
}

// In: "#00cc44"
// Out: "0, 204, 68"
function toRGBString(colorHex) {
  const color = culori.parse(colorHex);

  return `${color.r * 255}, ${color.g * 255}, ${color.b * 255}`;
}

// In: "#00cc44"
// Out: "#44cc00"
function RGBToBGR(colorHex) {
  return (
    colorHex[0] +
    colorHex[5] +
    colorHex[6] +
    colorHex[3] +
    colorHex[4] +
    colorHex[1] +
    colorHex[2]
  );
}

// In: "8000CC44"
// Out: "#00CC4480"
function toColorHex(str) {
  if (str[0] === "F" && str[1] === "F") {
    return `#${str.substr(2).toLowerCase()}`;
  } else {
    return `#${str.substr(2)}${str.substr(0, 2)}`.toLowerCase();
  }
}

// In: "#00CC4480"
// Out: "80CC4400"
function toVsColorHex(str) {
  if (str.length === 9) {
    return `${str.substr(7, 2)}${str.substr(1, 6)}`.toUpperCase();
  } else {
    return `FF${str.substr(1, 6)}`.toUpperCase();
  }
}

function generateColorConstantReplacements(colors, quotedKeys = true) {
  let replacements = [];

  for (const key of Object.keys(colors)) {
    for (let i = 0; i < colors[key].length; i++) {
      if (quotedKeys) {
        replacements.push([
          `"${changeCase.constantCase(key)}_${i}"`,
          colors[key][i]
        ]);
      } else {
        replacements.push([
          `${changeCase.constantCase(key)}_${i}`,
          colors[key][i]
        ]);
      }
    }
  }

  return replacements;
}

function applyColorConstantReplacement(
  color,
  colorReplacements,
  colorReplacementKeys
) {
  if (isHexColor(color)) {
    return color;
  } else if (colorReplacementKeys.includes(color) !== -1) {
    return colorReplacements[colorReplacementKeys.indexOf(color)];
  } else {
    throw new Error(`Dainty color constant ${color} not found.`);
  }
}

module.exports = {
  generateColorPalette,
  generateColorConstantReplacements,
  applyColorConstantReplacement,
  isHexColor,
  toRGBString,
  RGBToBGR,
  toColorHex,
  toVsColorHex
};
