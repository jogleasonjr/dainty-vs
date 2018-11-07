const path = require("path");
const util = require("util");
const fs = require("fs");
const convert = require("xml-js");
const {
  toColorHex,
  applyReplacements,
  generateColorReplacements
} = require("../utils");

const readFile = util.promisify(fs.readFile);

async function transformCoverage(colors) {
  const source = path.join(__dirname, "../templates/coverage.html");
  const darkThemeSource = path.join(__dirname, "../templates/dark.vstheme");
  const daintyThemeSource = path.join(__dirname, "../../dist/dainty.vstheme");

  console.log(`Transforming \`${source}\`…`);

  const sourceContent = await readFile(source, "utf8");

  function sortCategories(a, b) {
    return b.elements.length - a.elements.length;
  }

  const darkContent = await readFile(darkThemeSource, "utf8");
  const darkCategories = convert
    .xml2js(darkContent)
    .elements[0].elements[0].elements.sort(sortCategories);

  const daintyContent = await readFile(daintyThemeSource, "utf8");
  const daintyCategories = convert
    .xml2js(daintyContent)
    .elements[0].elements[0].elements.sort(sortCategories);

  let html = [
    `
    <h1>Coverage</h1>
    <section>
    <h2>Categories</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 20%;">Category</th>
          <th style="width: 20%;">Color</th>
          <th style="width: 10%;">Dark Background</th>
          <th style="width: 10%;">Dark Foreground</th>
          <th style="width: 10%;">Dark Rendered</th>
          <th style="width: 10%;">Dainty Background</th>
          <th style="width: 10%;">Dainty Foreground</th>
          <th style="width: 10%;">Dainty Rendered</th>
        </tr>
      </thead>
    <tbody>`
  ];

  let colorsMap = [];
  let typesMap = [];

  for (const [categoryIndex, category] of darkCategories.entries()) {
    for (const [colorsGroupIndex, colorsGroup] of category.elements.entries()) {
      let foregroundColor;
      let backgroundColor;
      let daintyForegroundColor;
      let daintyBackgroundColor;

      for ([colorIndex, color] of colorsGroup.elements.entries()) {
        if (color.name === "Foreground") {
          foregroundColor = toColorHex(color.attributes.Source);
          daintyForegroundColor = toColorHex(
            daintyCategories[categoryIndex].elements[colorsGroupIndex].elements[
              colorIndex
            ].attributes.Source
          );
        } else if (color.name === "Background") {
          backgroundColor = toColorHex(color.attributes.Source);
          daintyBackgroundColor = toColorHex(
            daintyCategories[categoryIndex].elements[colorsGroupIndex].elements[
              colorIndex
            ].attributes.Source
          );
        } else {
          throw new Exception(
            `${color.name} is not a recognized color element name.`
          );
        }

        const index = colorsMap.findIndex(
          c => c.color === color.attributes.Source
        );

        if (index === -1) {
          colorsMap.push({ color: color.attributes.Source, count: 1 });
        } else {
          colorsMap[index] = {
            ...colorsMap[index],
            count: colorsMap[index].count + 1
          };
        }

        const indexType = typesMap.findIndex(
          t => t.type === color.attributes.Type
        );

        if (indexType === -1) {
          typesMap.push({ type: color.attributes.Type, count: 1 });
        } else {
          typesMap[indexType] = {
            ...typesMap[indexType],
            count: typesMap[indexType].count + 1
          };
        }
      }

      let styles = [];

      if (backgroundColor) {
        styles.push(`background-color: ${backgroundColor};`);
      }
      if (foregroundColor) {
        styles.push(`color: ${foregroundColor};`);
      }

      let daintyStyles = [];

      if (daintyBackgroundColor) {
        daintyStyles.push(`background-color: ${daintyBackgroundColor};`);
      }
      if (daintyForegroundColor) {
        daintyStyles.push(`color: ${daintyForegroundColor};`);
      }

      function cssClass(categoryName) {
        return categoryName.replace(/\-|\s|\.|/g, "").toLowerCase();
      }

      const categoryAndLength = `${category.attributes.Name} (${
        category.elements.length
      })`;

      const expandHtml = `
      <tr class="category category-collapse category-${cssClass(
        category.attributes.Name
      )} visible">
        <td colspan="8" class="toggle-category" onClick="toggleCategory('${cssClass(
          category.attributes.Name
        )}')">
          <i>${categoryAndLength}</i>
        </td>
      </tr>`;

      html.push(
        `
        ${colorsGroupIndex === 0 ? expandHtml : ""}
        <tr class="category category-expand category-${cssClass(
          category.attributes.Name
        )}">
          <td class="toggle-category" style="width: 20%;" onClick="toggleCategory('${cssClass(
            category.attributes.Name
          )}')">
            ${colorsGroupIndex === 0 ? categoryAndLength : ""}
          </td>
          <td style="width: 20%;">
            ${colorsGroup.attributes.Name}
          </td>
          <td style="width: 10%;">
            ${backgroundColor ? backgroundColor : ""}
          </td>
          <td style="width: 10%;">
            ${foregroundColor ? foregroundColor : ""}
          </td>
          <td style="width: 10%; ${styles.join(" ")}">Lorem ipsum</td>
          <td style="width: 10%;">
            ${
              daintyBackgroundColor
                ? daintyBackgroundColor === backgroundColor
                  ? `<span class="dim">${daintyBackgroundColor}</span>`
                  : daintyBackgroundColor
                : ""
            }
          </td>
          <td style="width: 10%;">
          ${
            daintyForegroundColor
              ? daintyForegroundColor === foregroundColor
                ? `<span class="dim">${daintyForegroundColor}</span>`
                : daintyForegroundColor
              : ""
          }
        </td>
          <td style="width: 10%; ${daintyStyles.join(" ")}">Lorem ipsum</td>
        </tr>`
      );
    }
  }

  html.push(
    `
          </tbody>
        </table>
      </section>
    `
  );

  colorsMap.sort((a, b) => b.count - a.count);
  typesMap.sort((a, b) => b.count - a.count);

  html.push(
    `
    <section>
      <h2>Types count</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 50%;">Type</th>
            <th style="width: 50%;">Count</th>
          </tr>
        </thead>`
  );

  for (const type of typesMap) {
    html.push(
      `
        <tr>
          <td style="width: 50%;">${type.type}</td>
          <td style="width: 50%;">${type.count}</td>
        </tr>`
    );
  }

  html.push(`
      </table>
    </section>
  `);

  html.push(
    `
    <section>
      <h2>Colors count</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 50%;">Color</th>
            <th style="width: 50%;">Count</th>
          </tr>
        </thead>`
  );

  for (const color of colorsMap) {
    html.push(
      `
        <tr>
          <td style="width: 50%;">${toColorHex(color.color)}</td>
          <td style="width: 50%;">${color.count}</td>
        </tr>`
    );
  }

  html.push(`
      </table>
    </section>
  `);

  return applyReplacements(
    sourceContent,
    generateColorReplacements(colors)
  ).replace("<!-- INSERT_CONTENT -->", html.join("\n"));
}

module.exports = {
  transformCoverage
};
