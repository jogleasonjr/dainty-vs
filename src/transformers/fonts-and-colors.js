const path = require("path");
const util = require("util");
const fs = require("fs");
const replaceOnce = require("replace-once");
const convert = require("xml-js");
const {
  getFontsAndColorsReplacements
} = require("../replacements/fonts-and-colors");

const readFile = util.promisify(fs.readFile);

async function transformFontsAndColors(configuration, colors) {
  const source = path.join(
    __dirname,
    "../templates/fonts-and-colors.vssettings"
  );

  console.log(`Transforming \`${source}\`…`);

  const replacements = getFontsAndColorsReplacements(configuration, colors);

  const find = replacements.map(r => r[0]);
  const replace = replacements.map(r => r[1]);

  const content = await readFile(source, "utf8");
  return convert.xml2js(replaceOnce(content, find, replace, "g"));
}

module.exports = {
  transformFontsAndColors
};
