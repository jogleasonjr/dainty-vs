const fs = require("fs");
const culori = require("culori");
const util = require("util");
const replaceOnce = require("replace-once");
const changeCase = require("change-case");

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

// In: "#00cc44"
// Out: "0, 204, 68"
function toRGBString(colorHex) {
  const color = culori.parse(colorHex);

  return `${color.r * 255}, ${color.g * 255}, ${color.b * 255}`;
}

// In: "#00cc44"
// Out: "#44cc00"
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

// In: "8000CC44"
// Out: "#00CC4480"
function toColorHex(str) {
  if (str[0] === "F" && str[1] === "F") {
    return `#${str.substr(2).toLowerCase()}`;
  } else {
    return `#${str.substr(2)}${str.substr(0, 2)}`.toLowerCase();
  }
}

// In: "#00CC4480"
// Out: "80CC4400"
function toVsColorHex(str) {
  if (str.length === 9) {
    return `${str.substr(7, 2)}${str.substr(1, 6)}`.toUpperCase();
  } else {
    return `FF${str.substr(1, 6)}`.toUpperCase();
  }
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

function generateColorReplacements(colors, quotedKeys = true) {
  let replacements = [];

  for (const key of Object.keys(colors)) {
    for (let i = 0; i < colors[key].length; i++) {
      if (quotedKeys) {
        replacements.push([
          `"${changeCase.constantCase(key)}_${i}"`,
          colors[key][i]
        ]);
      } else {
        replacements.push([
          `${changeCase.constantCase(key)}_${i}`,
          colors[key][i]
        ]);
      }
    }
  }

  return replacements;
}

module.exports = {
  cloneDeep,
  writeFileLog,
  toRGBString,
  RGBToBGR,
  toColorHex,
  toVsColorHex,
  applyReplacements,
  zip,
  generateColorReplacements
};
