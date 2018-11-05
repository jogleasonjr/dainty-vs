const fs = require("fs");
const uuidv1 = require("uuid/v1");
const { colors } = require("./colors");
const { toRGBString, RGBToBGR } = require("./utils");
const path = require("path");
const util = require("util");
const convert = require("xml-js");
const replaceOnce = require("replace-once");

const readFile = util.promisify(fs.readFile);

const { grays, blueGrays, blues } = colors;

function getThemeReplacements(configuration) {
  const c = configuration.environment.additionalTextContrast ? 4 : 0;
  const cb = configuration.environment.additionalTextContrast ? 2 : 0;

  const environmentBackgroundColor = configuration.environment
    .additionalBackgroundContrast
    ? blueGrays[2]
    : blueGrays[1];
  const activeTabAndStatusbar =
    configuration.environment.accentColor === "transparent"
      ? environmentBackgroundColor
      : configuration.environment.accentColor === "blue"
        ? blues[8]
        : configuration.environment.additionalBackgroundContrast
          ? blueGrays[6 + cb]
          : blueGrays[5 + cb];

  return [
    // # Backgrounds

    // Active tab, statusbar
    ["#007acc", activeTabAndStatusbar],

    // Menu bar item hover
    ["#3e3e40", blueGrays[6]],

    // Menu
    ["#1b1b1c", blueGrays[2]],

    // Menu item hover
    ["#333334", blueGrays[6]],

    // Hover tab
    ["#1c97ea", blueGrays[4]],

    // Inactive tab hover close
    ["#52b0ef", blueGrays[8]],

    // Inactive tab active close
    ["#0e6198", blueGrays[10]],

    // Editor
    ["#1e1e1e", blueGrays[0]],

    // Toolbar separator
    ["#222222", blueGrays[0]],

    // Solution Explorer, Properties
    ["#252526", blueGrays[0]],

    // Title bar, menu bar
    ["#2d2d30", environmentBackgroundColor],

    // Breakpoints bar
    ["#333333", blueGrays[1]],

    // Search Solution Explorer, Quick Launch, Package Manager
    ["#333337", blueGrays[0]],

    // Scrollbar containers
    [
      "#3e3e42",
      configuration.environment.transparentScrollbarContainers
        ? blueGrays[0]
        : blueGrays[1]
    ],

    // Scrollbar
    [
      "#686868",
      configuration.environment.additionalScrollbarContrast
        ? blueGrays[6]
        : blueGrays[4]
    ],

    // Scrollbar hover
    [
      "#9e9e9e",
      configuration.environment.additionalScrollbarContrast
        ? blueGrays[8]
        : blueGrays[6]
    ],

    // Scrollbar active
    [
      "#efebef",
      configuration.environment.additionalScrollbarContrast
        ? blueGrays[10]
        : blueGrays[8]
    ],

    // Scrollbar glyph disabled
    ["#555558", blueGrays[4]],

    // Selected item in Solution Explorer, thin borders across app
    [
      "#3f3f46",
      configuration.environment.transparentBorders
        ? environmentBackgroundColor
        : blueGrays[4]
    ],

    // Package Manger border
    ["#434346", blueGrays[8]],

    // Active line border
    ["#464646", blueGrays[2]],

    // Grip – inactive tool window
    [
      "#46464a",
      configuration.environment.transparentToolWindowGrips
        ? environmentBackgroundColor
        : blueGrays[8]
    ],

    // Grip – active tool window
    [
      "#59a8de",
      configuration.environment.transparentToolWindowGrips
        ? activeTabAndStatusbar
        : blueGrays[16]
    ],

    // File changes indicator
    ["#eff284", blueGrays[2]],

    // File changes after save indicator
    ["#577430", blueGrays[2]],

    // Outline area
    ["#232323", blueGrays[2]],

    // File preview
    ["#68217a", blues[0]],

    // Tooltip
    ["#424245", blueGrays[2]],

    // Tooltip border
    ["#4d4d50", blueGrays[2]],

    // Extensions item hover
    ["#3f3f40", blueGrays[2]],

    // Yellowy tooltip line
    ["#fefcc8", colors.amberLighter],

    // Start page arrow
    ["#4f4f53", colors.blues[16]],

    // Start page arrow hover
    ["#606060", colors.blues[20]],

    // Notification badge
    ["#8631c7", colors.blues[8]],

    // # Foregrounds

    // Start page `NEW`
    ["#ff8c00", colors.greenLighter],

    // Preview Selected Items border
    ["#3399ff", blues[24]],

    // `using`, `public class`
    ["#569cd6", blues[24]],

    // `form`, `option` (bold)
    ["#008080", blues[24]],

    // `&nbsp;`
    ["#00a0a0", blues[32]],

    // `Program`, `WebHost`, `Startup`
    ["#4ec9b0", blues[32]],

    // HTML attribute
    ["#9cdcfe", blues[32]],

    // Active tool window tab, `Import theme`
    [
      "#0097fb",
      configuration.environment.monochromaticText
        ? blueGrays[32 + c]
        : grays[31 + c]
    ],

    // launchSettings.json property
    ["#d7ba7d", grays[32]],

    // Punctuation, method names
    ["#dcdcdc", grays[32]],

    // Status bar, Visual Studio logo, active tab, selected Solution Explorer item
    ["#ffffff", blues[36]],

    // `<` and `>`
    [
      "#808080",
      configuration.environment.monochromaticText ? blueGrays[20] : grays[19]
    ],

    // Most UI text (menu bar items, tabs, non-selected tabs, console output, Solution Explorer item …)
    [
      "#f1f1f1",
      configuration.environment.monochromaticText
        ? blueGrays[28 + c]
        : grays[27 + c]
    ],

    // Inactive tabs in tool windows, tool window titles
    [
      "#d0d0d0",
      configuration.environment.monochromaticText
        ? blueGrays[24 + c]
        : grays[23 + c]
    ],

    // `Microsoft Visual Studio`
    [
      "#999999",
      configuration.environment.monochromaticText
        ? blueGrays[20 + c]
        : grays[19 + c]
    ],

    // Disabled menu item
    ["#656565", blueGrays[16 + c]],

    // Inactive tabs hover in tool windows
    [
      "#55aaff",
      configuration.environment.monochromaticText
        ? blueGrays[32 + c]
        : grays[31 + c]
    ],

    // Comments
    [
      "#57a64a",
      configuration.environment.additionalTextContrast
        ? blueGrays[20]
        : blueGrays[16]
    ],

    // XML doc comment
    [
      "#608b4e",
      configuration.environment.additionalTextContrast
        ? blueGrays[20]
        : blueGrays[16]
    ],

    // Numbers
    ["#b5cea8", colors.greenLighter],

    // `IWebHostBuilder`
    ["#b8d7a3", colors.purpleLight],

    // Less variable
    ["#c563bd", colors.purpleLight],

    // Strings
    ["#d69d85", colors.deepOrangeLight],

    // Start page heading
    ["#84ceff", colors.blueGrays[36]],

    // `Import Theme` hover
    ["#88ccfe", colors.blueGrays[36]]
  ];
}

function getFontsAndColorsReplacements(configuration) {
  function r(str) {
    return RGBToBGR(str)
      .replace("#", "")
      .toUpperCase();
  }

  return [
    ["OUTLINING_SQUARE_FOREGROUND", r(blueGrays[8])],
    ["OUTLINING_VERTICAL_RULE_FOREGROUND", r(blueGrays[8])],
    ["LINE_NUMBER_FOREGROUND", r(blueGrays[8])],
    ["BLOCK_STRUCTURE_ADORNMENTS_BACKGROUND", r(blueGrays[8])],
    ["HTML_SERVER_SIDE_SCRIPT_FOREGROUND", r(blues[24])],
    ["HTML_SERVER_SIDE_SCRIPT_BACKGROUND", r(blueGrays[4 - 1])],
    ["RAZOR_CODE_BACKGROUND", r(blueGrays[4 - 1])],
    ["SELECTED_TEXT_BACKGROUND", r(blues[24])],
    ["EDITOR_FONT_FAMILY", configuration.editor.fontFamily]
  ];
}

function getIndentGuidesReplacements(_configuration) {
  return [
    ["DEFAULT_DEFAULT_LINE_COLOR", toRGBString(blueGrays[4])],
    ["DEFAULT_DEFAULT_HIGHLIGHT_COLOR", toRGBString(blueGrays[8])],
    ["DEFAULT_UNALIGNED_LINE_COLOR", toRGBString(colors.purpleLight)],
    ["DEFAULT_UNALIGNED_HIGHLIGHT_COLOR", toRGBString(colors.purpleLight)]
  ];
}

async function transformTheme(configuration) {
  const source = path.join(__dirname, "templates/dark.vstheme");

  console.log(`Transforming \`${source}\`…`);

  const content = await readFile(source, "utf8");

  function prepareFind(str) {
    return str.replace("#", "ff").toUpperCase();
  }

  function prepareReplace(str) {
    return str.replace("#", "ff").toUpperCase();
  }

  const replacements = getThemeReplacements(configuration);

  const find = ["ThemeName", "ThemeGUID"].concat(
    replacements.map(r => prepareFind(r[0]))
  );
  const replace = ["Dainty", uuidv1()].concat(
    replacements.map(r => prepareReplace(r[1]))
  );

  return replaceOnce(content, find, replace, "g");
}

async function transformSettings(configuration) {
  let transformers = [
    transformFontsAndColors(getFontsAndColorsReplacements(configuration))
  ];

  if (configuration.extensions.indentGuides.includeSettings) {
    transformers.push(
      transformIndentGuides(getIndentGuidesReplacements(configuration))
    );
  }

  const settingsObjects = await Promise.all(transformers);
  const settingsObject = mergeSettingsObjects(settingsObjects);

  return convert.js2xml(settingsObject, { spaces: 4 });
}

function mergeSettingsObjects(settingsObjects) {
  if (settingsObjects.length === 1) {
    return settingsObjects[0];
  }

  let result = settingsObjects[0];

  for (let i = 1; i < settingsObjects.length; i++) {
    const userSettings = result.elements.find(e => e.name === "UserSettings")
      .elements;

    userSettings.push(
      settingsObjects[i].elements
        .find(e => e.name === "UserSettings")
        .elements.find(e => e.name === "Category")
    );
  }

  return result;
}

async function transformFontsAndColors(replacements) {
  const source = path.join(__dirname, "templates/fonts-and-colors.vssettings");

  console.log(`Transforming \`${source}\`…`);

  const find = replacements.map(r => r[0]);
  const replace = replacements.map(r => r[1]);

  const content = await readFile(source, "utf8");
  return convert.xml2js(replaceOnce(content, find, replace, "g"));
}

async function transformIndentGuides(replacements) {
  const source = path.join(__dirname, "templates/indent-guides.vssettings");

  console.log(`Transforming \`${source}\`…`);

  const find = replacements.map(r => r[0]);
  const replace = replacements.map(r => r[1]);

  const content = await readFile(source, "utf8");
  return convert.xml2js(replaceOnce(content, find, replace, "g"));
}

function generateColorReplacements() {
  let replacements = [];

  for (const key of Object.keys(colors)) {
    if (typeof colors[key] === "object") {
      for (let i = 0; i < colors[key].length; i++) {
        replacements.push([
          `"${key === "blueGrays" ? "bg" : key[0]}${i}"`,
          colors[key][i]
        ]);
      }
    } else {
      replacements.push([`"${key}"`, colors[key]]);
    }
  }

  return replacements;
}

async function transformIndex() {
  const source = path.join(__dirname, "templates/index.html");

  console.log(`Transforming \`${source}\`…`);

  const content = await readFile(source, "utf8");

  const replacements = generateColorReplacements();

  const find = replacements.map(r => r[0]);
  const replace = replacements.map(r => r[1]);

  return replaceOnce(content, find, replace, "g");
}

module.exports = {
  transformTheme,
  transformSettings,
  transformIndex
};
