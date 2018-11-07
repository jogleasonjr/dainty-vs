const convert = require("xml-js");
const { transformFontsAndColors } = require("./fonts-and-colors");
const { transformIndentGuides } = require("./indent-guides");

async function transformSettings(configuration, colors) {
  let transformers = [transformFontsAndColors(configuration, colors)];

  if (configuration.extensions.indentGuides.includeSettings) {
    transformers.push(transformIndentGuides(configuration, colors));
  }

  const settingsObjects = await Promise.all(transformers);

  return convert.js2xml(mergeSettingsObjects(settingsObjects), { spaces: 4 });
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

module.exports = {
  transformSettings
};
