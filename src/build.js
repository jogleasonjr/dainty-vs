const fs = require("fs");
const util = require("util");
const path = require("path");
const minify = require("html-minifier").minify;
const {
  transformTheme,
  transformSettings,
  transformColorsPage,
  transformCoveragePage,
  transformDaintyCssPage,
  transformIndexPage,
  transformSyntaxPage
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

async function buildIndexPage(colors) {
  const target = path.join(__dirname, "../public/index.html");
  const data = await transformIndexPage(colors);

  writeFileLog(
    target,
    minify(data, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })
  );
}

async function buildColorsPage(colors) {
  const target = path.join(__dirname, "../public/colors.html");
  const data = await transformColorsPage(colors);
  writeFileLog(target, data);
}

async function buildCoveragePage(colors) {
  const target = path.join(__dirname, "../public/coverage.html");
  const data = await transformCoveragePage(colors);
  writeFileLog(target, data);
}

async function buildDaintyCssPage(colors) {
  const target = path.join(__dirname, "../public/dainty-css.html");
  const data = await transformDaintyCssPage(colors);
  writeFileLog(target, data);
}

async function buildSyntaxPage(colors) {
  const target = path.join(__dirname, "../public/syntax.html");
  const data = await transformSyntaxPage(colors);
  writeFileLog(target, data);
}

module.exports = {
  buildThemeZip,
  buildThemeFiles,
  buildIndexPage,
  buildColorsPage,
  buildCoveragePage,
  buildDaintyCssPage,
  buildSyntaxPage
};
