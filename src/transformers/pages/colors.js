const path = require("path");
const util = require("util");
const fs = require("fs");
const changeCase = require("change-case");
const { applyReplacements } = require("../../utils");
const { generateColorConstantReplacements } = require("../../colors");

const readFile = util.promisify(fs.readFile);

async function transformColorsPage(colors) {
  const source = path.join(__dirname, "../../templates/colors.html");
  const daintyCss = path.join(__dirname, "../../templates/dainty.css");

  console.log(`Transforming \`${source}\`…`);

  let html = [];

  for (color of Object.keys(colors)) {
    if (color === "accent") {
      continue;
    }

    html.push(`
      <section>
        <h2>${color}</h2>
        <table>
          <thead>
            <tr>
              <th width="20%">Index</th>
              <th width="20%">Swatch</th>
              <th width="20%">Text</th>
              <th width="20%">Hex</th>
              <th width="20%">Constant</th>
            </tr>
          </thead>
          <tbody>
    `);

    for ([index, shade] of colors[color].entries()) {
      let mod = [];

      if (index % 2 == 0) {
        mod.push("mod-2");
      }

      if (index % 4 == 0) {
        mod.push("mod-4");
      }

      if (index % 8 == 0) {
        mod.push("mod-8");
      }

      html.push(
        `<tr class="mod mod-1 ${mod.join(" ")}">
          <td>${index}</td>
          <td width="20%">
            <div class="swatch" style="background-color: ${shade}"></div>
          </td>
          <td width="20%">
            <div style="color: ${shade}">Lorem ipsum</div>
          </td>
          <td width="20%"><code>${shade}</code></td>
          <td width="20%">
            <code>${changeCase.constantCase(color)}_${index}</code>
          </td>
        </tr>`
      );
    }

    html.push(`</tbody></table></section>`);
  }

  content = (await readFile(source, "utf8")).replace(
    "/* INSERT_DAINTY_CSS */",
    await readFile(daintyCss, "utf8")
  );

  return applyReplacements(
    content,
    generateColorConstantReplacements(colors)
  ).replace("<!-- INSERT_CONTENT -->", html.join("\n"));
}

module.exports = {
  transformColorsPage
};
