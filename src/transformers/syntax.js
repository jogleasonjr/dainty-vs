const path = require("path");
const util = require("util");
const fs = require("fs");
const { applyReplacements, generateColorReplacements } = require("../utils");

const readFile = util.promisify(fs.readFile);

async function transformSyntax(colors) {
  const source = path.join(__dirname, "../templates/syntax.html");

  console.log(`Transforming \`${source}\`…`);

  return applyReplacements(
    await readFile(source, "utf8"),
    generateColorReplacements(colors)
  );
}

module.exports = {
  transformSyntax
};
