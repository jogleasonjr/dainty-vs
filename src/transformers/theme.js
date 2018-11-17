const path = require("path");
const util = require("util");
const convert = require("xml-js");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const {
  toVsColorHex,
  cloneDeep,
  applyReplacements,
  generateColorReplacements
} = require("../utils");
const {
  getSearchReplaceReplacements,
  getCategoryReplacements
} = require("../replacements/theme");

const readFile = util.promisify(fs.readFile);

async function transformTheme(configuration, colors) {
  const source = path.join(__dirname, "../templates/dark.vstheme");

  console.log(`Transforming \`${source}\`…`);

  const content = await readFile(source, "utf8");

  let replacedContent = applyReplacements(
    content,
    getSearchReplaceReplacements(configuration, colors),
    toVsColorHex,
    toVsColorHex
  );

  replacedContent = applyReplacements(replacedContent, [
    ["ThemeName", "Dainty"],
    ["ThemeGUID", uuidv1()]
  ]);

  try {
    replacedContent = applyCategoryReplacements(
      replacedContent,
      getCategoryReplacements(configuration, colors),
      generateColorReplacements(colors, false),
      generateColorReplacements(colors, false).map(r => r[0])
    );
  } catch (error) {
    return [error, null];
  }

  return [null, replacedContent];
}

function applyColorConstantReplacement(
  color,
  colorReplacements,
  colorReplacementKeys
) {
  if (colorReplacementKeys.includes(color)) {
    return colorReplacements[colorReplacementKeys.indexOf(color)][1];
  } else {
    return color;
  }
}

function applyCategoryReplacements(
  xmlContent,
  categoryReplacements,
  colorReplacements,
  colorReplacementKeys
) {
  let jsContent = convert.xml2js(xmlContent);
  let replacements = cloneDeep(categoryReplacements);

  const categories = jsContent.elements[0].elements[0].elements;

  for (let category of categories) {
    const categoryName = category.attributes.Name;

    if (replacements[categoryName] === undefined) {
      continue;
    }

    for (let colorsGroup of category.elements) {
      const colorsGroupName = colorsGroup.attributes.Name;
      const colorsGroupReplacements =
        replacements[categoryName][colorsGroupName];

      if (colorsGroupReplacements === undefined) {
        continue;
      }

      if (
        !Array.isArray(colorsGroupReplacements) ||
        colorsGroupReplacements.length !== 2
      ) {
        throw new Error(
          `Colors group for \`${categoryName}.${colorsGroupName}\` must be an array consisting of two elements; one with background color, and one with foreground color.`
        );
      }

      let backgroundElement = colorsGroup.elements.find(
        e => e.name === "Background"
      );

      if (
        backgroundElement === undefined &&
        colorsGroupReplacements[0] !== null
      ) {
        throw new Error(
          `Replacement background set for colors group \`${categoryName}.${colorsGroupName}\`, but no such background is defined`
        );
      } else if (
        backgroundElement !== undefined &&
        colorsGroupReplacements[0] !== null
      ) {
        backgroundElement.attributes.Source = toVsColorHex(
          applyColorConstantReplacement(
            colorsGroupReplacements[0],
            colorReplacements,
            colorReplacementKeys
          )
        );
      }

      let foregroundElement = colorsGroup.elements.find(
        e => e.name === "Foreground"
      );

      if (
        foregroundElement === undefined &&
        colorsGroupReplacements[1] !== null
      ) {
        throw new Error(
          `Replacement foreground set for colors group \`${categoryName}.${colorsGroupName}\`, but foreground not defined in .vstheme.`
        );
      } else if (
        foregroundElement !== undefined &&
        colorsGroupReplacements[1] !== null
      ) {
        foregroundElement.attributes.Source = toVsColorHex(
          applyColorConstantReplacement(
            colorsGroupReplacements[1],
            colorReplacements,
            colorReplacementKeys
          )
        );
      }

      delete replacements[categoryName][colorsGroupName];
    }

    if (Object.keys(replacements[categoryName]).length !== 0) {
      throw new Error(
        `Replacements set for category \`${categoryName}\` but color groups not defined in .vstheme: ${Object.keys(
          replacements[categoryName]
        ).join(", ")}`
      );
    }
    delete replacements[categoryName];
  }

  if (Object.keys(replacements).length !== 0) {
    throw new Error(
      `Replacements set for categories not defined in .vstheme: ${Object.keys(
        replacements
      ).join(", ")}`
    );
  }

  return convert.js2xml(jsContent);
}

module.exports = {
  transformTheme
};
