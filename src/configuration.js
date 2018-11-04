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

async function readConfigurationJson() {
  const filename = path.join(__dirname, "../configuration.json");

  if (!(await exists(filename))) {
    await createConfigurationJson();
    return {};
  } else {
    return await readFile(filename, "utf8");
  }
}

async function getConfigurationJson() {
  let configurationJson;

  try {
    configurationJson = JSON.parse(await readConfigurationJson());
  } catch (error) {
    return ["Could not parse JSON.", null];
  }

  return await getConfiguration(configurationJson);
}

module.exports = {
  getConfiguration,
  getConfigurationJson
};
