const fs = require("fs");
const chroma = require("chroma-js");
const util = require("util");

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

function toRGBString(colorHex) {
  return chroma(colorHex)
    .rgb()
    .join(", ");
}

function RGBToBGR(colorHex) {
  return (
    colorHex[0] +
    colorHex[5] +
    colorHex[6] +
    colorHex[3] +
    colorHex[4] +
    colorHex[1] +
    colorHex[2]
  );
}

module.exports = {
  cloneDeep,
  writeFileLog,
  toRGBString,
  RGBToBGR,
  zip
};
