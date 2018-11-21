const culori = require("culori");
const changeCase = require("change-case");

function generateScale(color, override, adjustments, lessChrome) {
  const maximumLightness = 100;
  const lightnessMultiplier = 2 + 5 / 16;
  let lightnessAdjustment = 0;

  const maximumChroma = 131.207;
  let chromaDivisor = 3;
  let chromaAdjustment = 0;
  let chromaStartAdjustment = 0;
  let chromaEndAdjustment = 0;

  let hue = 0;

  const lchOverride = override ? culori.lch(override) : null;

  switch (color) {
    case "BLUE_GRAY":
      hue = 270 - 90 / 16;
      chromaDivisor = 10 + 50 / 16;

      if (!lchOverride) {
        chromaEndAdjustment = -10;
      }
      break;
    case "BLUE":
      hue = 270 - 90 / 16;

      if (lessChrome) {
        chromaDivisor = 6;
      }
      break;
    case "PURPLE":
      hue = 315;
      break;
    case "GREEN":
      hue = 180;
      break;
    case "ORANGE":
      hue = 45;
      chromaAdjustment = -(maximumChroma / 6);
      break;
  }

  if (color === "BLUE_GRAY") {
    chromaAdjustment += adjustments.chroma ? adjustments.chroma : 0;
    lightnessAdjustment += adjustments.lightness ? adjustments.lightness : 0;
    chromaStartAdjustment += adjustments.chromaStart
      ? adjustments.chromaStart
      : 0;
    chromaEndAdjustment += adjustments.chromaEnd ? adjustments.chromaEnd : 0;
  } else {
    chromaAdjustment += adjustments.chroma ? adjustments.chroma * 2 : 0;
  }

  let scale = [];

  for (let i = 0; i < 40; i++) {
    scale.push({
      mode: "lch",
      h: lchOverride ? lchOverride.h : hue,
      l:
        (lchOverride && color === "BLUE_GRAY"
          ? lchOverride.l + ((maximumLightness - lchOverride.l) / 40) * i
          : maximumLightness - lightnessMultiplier * (39 - i)) +
        (lightnessAdjustment / 40) * (39 - i),
      c:
        (lchOverride ? lchOverride.c : maximumChroma / chromaDivisor) +
        chromaAdjustment +
        (chromaStartAdjustment / 40) * (39 - i) +
        (chromaEndAdjustment / 40) * i
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
    blueGray: handleVariant(
      generateScale(
        "BLUE_GRAY",
        overrides.blueGray,
        configuration.colors.adjustments
      )
    ),
    blue: handleVariant(
      generateScale("BLUE", overrides.blue, configuration.colors.adjustments)
    ),
    blueLessChroma: handleVariant(
      generateScale(
        "BLUE",
        overrides.blue,
        configuration.colors.adjustments,
        true
      )
    ),
    purple: handleVariant(
      generateScale(
        "PURPLE",
        overrides.purple,
        configuration.colors.adjustments
      )
    ),
    orange: handleVariant(
      generateScale(
        "ORANGE",
        overrides.orange,
        configuration.colors.adjustments
      )
    ),
    green: handleVariant(
      generateScale("GREEN", overrides.green, configuration.colors.adjustments)
    )
  };

  return {
    ...colorPalette,
    accent: colorPalette[configuration.colors.accent]
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

function checkScaleRange(index) {
  if (!Number.isInteger(index)) {
    throw new Error(
      `Index \`${index}\` is not a valid index for a Dainty color scale.`
    );
  }

  if (index < 0 || index > 39) {
    throw new Error(
      `Index \`${index}\` is not a valid index for a Dainty color scale.`
    );
  }

  return index;
}

module.exports = {
  generateColorPalette,
  generateColorConstantReplacements,
  applyColorConstantReplacement,
  isHexColor,
  toRGBString,
  RGBToBGR,
  toColorHex,
  toVsColorHex,
  checkScaleRange
};
