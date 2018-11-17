const fs = require("fs");
const util = require("util");
const replaceOnce = require("replace-once");

const writeFile = util.promisify(fs.writeFile);

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function zip(filenamesData) {
  const nodeZip = new require("node-zip")();

  for (const filenameData of filenamesData) {
    nodeZip.file(filenameData[0], filenameData[1]);
  }

  return nodeZip.generate({ base64: false, compression: "DEFLATE" });
}

async function writeFileLog(...args) {
  console.log(`Writing to \`${args[0]}\`…`);
  await writeFile(...args);
  console.log(`Done writing to \`${args[0]}\`.`);
}

function identity(value) {
  return value;
}

function applyReplacements(
  content,
  replacements,
  prepareFind = identity,
  prepareReplace = identity
) {
  const find = replacements.map(r => prepareFind(r[0]));
  const replace = replacements.map(r => prepareReplace(r[1]));

  return replaceOnce(content, find, replace, "g");
}

module.exports = {
  cloneDeep,
  writeFileLog,
  applyReplacements,
  zip
};
