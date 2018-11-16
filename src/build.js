const fs = require("fs");
const util = require("util");
const path = require("path");
const minify = require("html-minifier").minify;
const {
  transformTheme,
  transformSettings,
  transformIndex,
  transformSyntax,
  transformColors,
  transformDaintyCss,
  transformCoverage
} = require("./transform");
const { zip, writeFileLog } = require("./utils");

const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

async function buildThemeZip(configuration, colors) {
  const [[_, vstheme], vssettings] = await Promise.all([
    transformTheme(configuration, colors),
    transformSettings(configuration, colors)
  ]);

  return zip([["dainty.vstheme", vstheme], ["dainty.vssettings", vssettings]]);
}

async function buildThemeFiles(configuration, colors) {
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

async function buildIndex(colors) {
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

async function buildSyntax(colors) {
  const target = path.join(__dirname, "../public/syntax.html");
  const data = await transformSyntax(colors);
  writeFileLog(target, data);
}

async function buildColors(colors) {
  const target = path.join(__dirname, "../public/colors.html");
  const data = await transformColors(colors);
  writeFileLog(target, data);
}

async function buildCoverage(colors) {
  const target = path.join(__dirname, "../public/coverage.html");
  const data = await transformCoverage(colors);
  writeFileLog(target, data);
}

async function buildDaintyCss(colors) {
  const target = path.join(__dirname, "../public/dainty-css.html");
  const data = await transformDaintyCss(colors);
  writeFileLog(target, data);
}

module.exports = {
  buildThemeZip,
  buildThemeFiles,
  buildIndex,
  buildSyntax,
  buildColors,
  buildDaintyCss,
  buildCoverage
};
