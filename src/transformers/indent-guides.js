const path = require("path");
const util = require("util");
const fs = require("fs");
const replaceOnce = require("replace-once");
const convert = require("xml-js");
const {
  getIndentGuidesReplacements
} = require("../replacements/indent-guides");

const readFile = util.promisify(fs.readFile);

async function transformIndentGuides(configuration, colors) {
  const source = path.join(__dirname, "../templates/indent-guides.vssettings");

  console.log(`Transforming \`${source}\`…`);

  const replacements = getIndentGuidesReplacements(configuration, colors);

  const find = replacements.map(r => r[0]);
  const replace = replacements.map(r => r[1]);

  const content = await readFile(source, "utf8");
  return convert.xml2js(replaceOnce(content, find, replace, "g"));
}

module.exports = {
  transformIndentGuides
};
