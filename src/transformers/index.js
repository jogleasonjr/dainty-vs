const path = require("path");
const util = require("util");
const fs = require("fs");
const { applyReplacements, generateColorReplacements } = require("../utils");

const readFile = util.promisify(fs.readFile);

async function transformIndex(colors) {
  const source = path.join(__dirname, "../templates/index.html");
  const daintyCss = path.join(__dirname, "../templates/dainty.css");

  console.log(`Transforming \`${source}\`…`);

  content = (await readFile(source, "utf8")).replace(
    "/* INSERT_DAINTY_CSS */",
    await readFile(daintyCss, "utf8")
  );

  return applyReplacements(content, generateColorReplacements(colors));
}

module.exports = {
  transformIndex
};
