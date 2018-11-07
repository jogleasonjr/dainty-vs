const fs = require("fs");
const util = require("util");
const path = require("path");
const minify = require("html-minifier").minify;
const {
  transformTheme,
  transformSettings,
  transformIndex,
  transformCoverage
} = require("./transform");
const { zip, writeFileLog } = require("./utils");
const { generateColorPalette } = require("./colors");

const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

const colors = generateColorPalette();

async function buildThemeZip(configuration) {
  const [vstheme, vssettings] = await Promise.all([
    transformTheme(configuration, colors),
    transformSettings(configuration, colors)
  ]);

  return zip([["dainty.vstheme", vstheme], ["dainty.vssettings", vssettings]]);
}

async function buildThemeFiles(configuration) {
  const vsthemeTarget = path.join(__dirname, "../dist/dainty.vstheme");
  const vssettingsTarget = path.join(__dirname, "../dist/dainty.vssettings");

  await createDistDirectory();

  const [[error, vstheme], vssettings] = await Promise.all([
    transformTheme(configuration, colors),
    transformSettings(configuration, colors)
  ]);

  if (error) {
    console.error(error);
    return;
  }

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

async function buildIndex() {
  const indexTarget = path.join(__dirname, "../public/index.html");

  const index = await transformIndex(colors);

  writeFileLog(
    indexTarget,
    minify(index, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })
  );
}

async function buildIndex() {
  const target = path.join(__dirname, "../public/index.html");
  const data = await transformIndex(colors);

  writeFileLog(
    target,
    minify(data, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })
  );
}

async function buildCoverage() {
  const target = path.join(__dirname, "../public/coverage.html");
  const data = await transformCoverage(colors);

  writeFileLog(
    target,
    data
    /*minify(data, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })*/
  );
}

module.exports = {
  buildThemeZip,
  buildThemeFiles,
  buildIndex,
  buildCoverage
};
