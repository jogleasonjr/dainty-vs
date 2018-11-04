const fs = require("fs");
const util = require("util");
const path = require("path");
const {
  transformTheme,
  transformSettings,
  transformIndex
} = require("./transform");
const { zip, writeFileLog } = require("./utils");
var minify = require("html-minifier").minify;

const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

async function buildThemeZip(configuration) {
  const [vstheme, vssettings] = await Promise.all([
    transformTheme(configuration),
    transformSettings(configuration)
  ]);

  return zip([["dainty.vstheme", vstheme], ["dainty.vssettings", vssettings]]);
}

async function buildThemeFiles(configuration) {
  const vsthemeTarget = path.join(__dirname, "../dist/dainty.vstheme");
  const vssettingsTarget = path.join(__dirname, "../dist/dainty.vssettings");

  await createDistDirectory();

  const [vstheme, vssettings] = await Promise.all([
    transformTheme(configuration),
    transformSettings(configuration)
  ]);

  await Promise.all([
    writeFileLog(vsthemeTarget, vstheme),
    writeFileLog(vssettingsTarget, vssettings)
  ]);
}

async function createDistDirectory() {
  const dist = path.join(__dirname, "../dist");

  if (!(await exists(dist))) {
    await mkdir(dist);
  }
}

async function buildWebsite(configuration) {
  const indexTarget = path.join(__dirname, "../public/index.html");

  const index = await transformIndex(configuration);

  writeFileLog(
    indexTarget,
    minify(index, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })
  );
}

module.exports = {
  buildThemeZip,
  buildThemeFiles,
  buildWebsite
};
