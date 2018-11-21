const fs = require("fs");
const util = require("util");
const path = require("path");
const Ajv = require("ajv");
const merge = require("lodash.merge");
const betterAjvErrors = require("better-avj-errors");
const decomment = require("decomment");
const parseJson = require("parse-json");

const { cloneDeep, writeFileLog, removeComments } = require("./utils");

const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);

var ajv = new Ajv({ useDefaults: true, jsonPointers: true });

async function readConfigurationSchema() {
  return await readFile(
    path.join(__dirname, "../configuration-schema.json"),
    "utf8"
  );
}

async function getConfigurationSchema() {
  try {
    return parseJson(await readConfigurationSchema());
  } catch (error) {
    throw Error("Could not parse JSON.");
  }
}

async function getConfiguration(mergeObj) {
  const schema = await getConfigurationSchema();
  let configuration = cloneDeep(mergeObj);
  const validate = ajv.compile(schema);
  const valid = validate(configuration);

  if (!valid) {
    const print = betterAjvErrors({ schema, mode: "return", indent: 2 });
    return [print(configuration, validate.errors), null];
  } else {
    return [null, configuration];
  }
}

async function createConfigurationJson() {
  const schema = await getConfigurationSchema();
  let configuration = {};
  const validate = ajv.compile(schema);
  validate(configuration);
  await writeFileLog(
    path.join(__dirname, "../configuration.json"),
    JSON.stringify(configuration, null, 2)
  );
}

async function readConfigurationJson() {
  const filename = path.join(__dirname, "../configuration.json");

  if (!(await exists(filename))) {
    await createConfigurationJson();
    return "{}";
  } else {
    return decomment(await readFile(filename, "utf8"));
  }
}

async function readPresetJson(preset) {
  const filename = path.join(__dirname, "..", preset);

  if (!(await exists(filename))) {
    throw new Error(`Could not find configuration preset ${filename}.`);
  } else {
    return decomment(await readFile(filename, "utf8"));
  }
}

async function readVscodeThemeJson(theme) {
  const filename = path.join(__dirname, "..", theme);

  if (!(await exists(filename))) {
    throw new Error(`Could not find VS Code theme ${filename}.`);
  } else {
    return decomment(await readFile(filename, "utf8"));
  }
}

function transformVscodeTheme(theme) {
  function c(property) {
    return theme.colors[property];
  }

  function tc(...scopes) {
    for (const scope of scopes) {
      const tokenColor = theme.tokenColors.find(tc => {
        return tc.scope && tc.scope.includes(scope);
      });

      if (!tokenColor) {
        console.log(
          `Token color for scope \`${scope}\` not found in VS Code theme.`
        );
        continue;
      }

      if (!tokenColor.settings) {
        console.log(
          `\`"settings"\` for scope \`${scope}\` not found in VS Code theme.`
        );
        continue;
      }

      console.log(`Token for scope \`${scope}\` found.`);

      return tokenColor.settings;
    }

    throw new Error(`Token color for scope not found in VS Code theme.`);
  }

  let configuration = {
    colors: {
      overrides: {
        blueGray: c("editor.background")
        // blue: tc("storage.type").foreground
      }
    },
    replacements: {
      overrides: {
        searchReplace: {
          // Strings
          "#d69d85": [
            tc("string.quoted", "string").foreground,
            tc("string.quoted", "string").foreground
          ],

          // Numbers
          "#b5cea8": [
            tc("constant.numeric").foreground,
            tc("constant.numeric").foreground
          ],

          // `using`, `public class`
          "#569cd6": [tc("keyword").foreground, tc("keyword").foreground],

          // `form`, `option` (bold)
          "#008080": [tc("keyword").foreground, tc("keyword").foreground],

          // `Program`, `WebHost`, `Startup`
          "#4ec9b0": [
            tc("support.type").foreground,
            tc("support.type").foreground
          ],

          // `IWebHostBuilder`
          "#b8d7a3": [
            tc("storage.type").foreground,
            tc("storage.type").foreground
          ],

          // Comment
          "#57a64a": [tc("comment").foreground, tc("comment").foreground]
        },
        categories: {
          "ColorizedSignatureHelp colors": {
            "HTML Attribute Value": [
              [null, tc("string.quoted", "string").foreground],
              [null, tc("string.quoted", "string").foreground]
            ]
            // punctuation: [null, blueGray[edfc(28)]],
            // urlformat: [null, dark ? accent[34] : accent[16]]
          }
        }
      }
    }
  };

  console.dir({ configuration }, { depth: null });

  return configuration;
}

async function getConfigurationJson(type, filename) {
  let configurationJson;

  try {
    configurationJson = parseJson(await readConfigurationJson());
  } catch (error) {
    return [error, null];
  }

  switch (type) {
    case "CONFIGURATION_PRESET":
      try {
        const json = parseJson(await readPresetJson(filename));
        return await getConfiguration(merge(json, configurationJson));
      } catch (error) {
        return [error, null];
      }
    case "VSCODE_THEME":
      try {
        const json = transformVscodeTheme(
          parseJson(await readVscodeThemeJson(filename))
        );
        return await getConfiguration(merge(json, configurationJson));
      } catch (error) {
        return [error, null];
      }
    default:
      return await getConfiguration(configurationJson);
  }
}

module.exports = {
  getConfiguration,
  getConfigurationJson
};
