const fs = require("fs");
const util = require("util");
const path = require("path");
const Ajv = require("ajv");
const betterAjvErrors = require("better-avj-errors");
const { cloneDeep, writeFileLog } = require("./utils");

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
    return JSON.parse(await readConfigurationSchema());
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

async function readConfigurationJson(filename) {
  const filename_ = path.join(
    __dirname,
    "..",
    filename ? filename : "configuration.json"
  );

  if (filename && !(await exists(filename_))) {
    throw new Error(`Could not find configuration ${filename_}.`);
  }

  if (!(await exists(filename_))) {
    await createConfigurationJson();
    return "{}";
  } else {
    return await readFile(filename_, "utf8");
  }
}

async function getConfigurationJson(filename) {
  let configurationJson;

  try {
    configurationJson = JSON.parse(await readConfigurationJson(filename));
  } catch (error) {
    return [error, null];
  }

  return await getConfiguration(configurationJson);
}

module.exports = {
  getConfiguration,
  getConfigurationJson
};
