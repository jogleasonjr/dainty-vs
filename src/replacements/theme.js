function getCategoryReplacements(colors) {
  const { blueGrays, blues } = colors;

  return {
    "ColorizedSignatureHelp colors": {
      "HTML Attribute Value": [null, colors.deepOrangeLighter],
      punctuation: [null, colors.blueGrays[26]],
      urlformat: [null, colors.blueLighter]
    },
    "Text Editor Text Marker Items": {
      "Current Statement": ["#eff284", null] // Revert
    },
    StartPage: {
      StartPageHeadingText: [null, colors.blues[34]],
      StartPageTitleText: [null, colors.blues[34]]
    }
  };
}

function getSearchReplaceReplacements(configuration, colors) {
  const { blueGrays, blues } = colors;

  const c = configuration.environment.additionalTextContrast ? 4 : 0;
  const cb = configuration.environment.additionalTextContrast ? 2 : 0;

  const environmentBackgroundColor = configuration.environment
    .additionalBackgroundContrast
    ? blueGrays[3]
    : blueGrays[2];
  const activeTabAndStatusbar =
    configuration.environment.accentColor === "transparent"
      ? environmentBackgroundColor
      : configuration.environment.accentColor === "blue"
      ? blues[8]
      : configuration.environment.additionalBackgroundContrast
      ? blueGrays[5 + cb]
      : blueGrays[4 + cb];

  return [
    // # Backgrounds

    // Active tab, statusbar
    ["#007acc", activeTabAndStatusbar],

    // Menu bar item hover
    ["#3e3e40", blueGrays[6]],

    // Menu
    ["#1b1b1c", blueGrays[2]],

    // Menu item hover
    ["#333334", blueGrays[6]],

    // Hover tab
    ["#1c97ea", blueGrays[4]],

    // Inactive tab hover close
    ["#52b0ef", blueGrays[8]],

    // Inactive tab active close
    ["#0e6198", blueGrays[10]],

    // Editor
    ["#1e1e1e", blueGrays[0]],

    // Toolbar separator
    ["#222222", blueGrays[0]],

    // Solution Explorer, Properties
    ["#252526", blueGrays[0]],

    // Title bar, menu bar
    ["#2d2d30", environmentBackgroundColor],

    // Breakpoints bar
    ["#333333", blueGrays[1]],

    // Search Solution Explorer, Quick Launch, Package Manager, menu separator line and borders around menu/menu item
    ["#333337", blueGrays[0]],

    // Scrollbar containers
    [
      "#3e3e42",
      configuration.environment.transparentScrollbarContainers
        ? blueGrays[0]
        : blueGrays[1]
    ],

    // Scrollbar
    [
      "#686868",
      configuration.environment.additionalScrollbarsContrast
        ? blueGrays[6]
        : blueGrays[4]
    ],

    // Scrollbar hover
    [
      "#9e9e9e",
      configuration.environment.additionalScrollbarsContrast
        ? blueGrays[8]
        : blueGrays[6]
    ],

    // Scrollbar active
    [
      "#efebef",
      configuration.environment.additionalScrollbarsContrast
        ? blueGrays[10]
        : blueGrays[8]
    ],

    // Scrollbar glyph disabled
    ["#555558", blueGrays[4]],

    // Selected item in Solution Explorer, thin borders across app
    [
      "#3f3f46",
      configuration.environment.transparentBorders
        ? environmentBackgroundColor
        : blueGrays[4]
    ],

    // Package Manger border
    ["#434346", blueGrays[8]],

    // Current line border
    ["#464646", blueGrays[2]],

    // Grip – inactive tool window
    [
      "#46464a",
      configuration.environment.transparentToolWindowGrips
        ? environmentBackgroundColor
        : blueGrays[8]
    ],

    // Grip – active tool window
    [
      "#59a8de",
      configuration.environment.transparentToolWindowGrips
        ? activeTabAndStatusbar
        : blueGrays[16]
    ],

    // File changes indicator, current debugging statement
    ["#eff284", blueGrays[2]],

    // File changes after save indicator
    ["#577430", blueGrays[2]],

    // Outline area
    ["#232323", blueGrays[2]],

    // File preview
    ["#68217a", blues[0]],

    // Tooltip
    ["#424245", blueGrays[2]],

    // Tooltip border
    ["#4d4d50", blueGrays[2]],

    // Extensions item hover
    ["#3f3f40", blueGrays[2]],

    // Yellowy tooltip line
    ["#fefcc8", colors.amberLighter],

    // Start page arrow
    ["#4f4f53", colors.blues[16]],

    // Start page arrow hover
    ["#606060", colors.blues[20]],

    // Notification badge
    ["#8631c7", colors.blues[8]],

    // `100%` box arrow hover
    ["#1f1f20", colors.blueGrays[16]],

    // Inactive tool window glyph hover
    ["#393939", colors.blueGrays[4]],

    // Team Explorer `Changes` label
    ["#2d2d2d", colors.blueGrays[4]],

    // Team Explorer `Changes` label icon
    ["#3d3d3d", colors.blueGrays[8]],

    // Team Explorer `Changes` label icon hover
    ["#525252", colors.blueGrays[12]],

    // Team Explorer `Changes` icon
    ["#c8c8c8", colors.blues[36]],

    // Team Explorer `Settings` blue indicator
    ["#0079ce", colors.blues[20]],

    // Team Explorer `Changes` red indicator
    ["#f05033", colors.greenLighter],

    // Diagnostic Tools tab hover
    ["#555555", colors.blueGrays[4]],

    // # Foregrounds

    // Start page `NEW`
    ["#ff8c00", colors.greenLighter],

    // Preview Selected Items border
    ["#3399ff", blues[24]],

    // `using`, `public class`
    ["#569cd6", blues[26]],

    // `form`, `option` (bold)
    ["#008080", blues[26]],

    // `&nbsp;`
    ["#00a0a0", blues[32]],

    // `Program`, `WebHost`, `Startup`
    ["#4ec9b0", blues[32]],

    // HTML attribute
    ["#9cdcfe", blues[32]],

    // Active tool window tab, `Import theme`
    ["#0097fb", blueGrays[32 + c]],

    // launchSettings.json property
    ["#d7ba7d", blueGrays[34]],

    // Punctuation, method names
    ["#dcdcdc", blueGrays[34]],

    // Status bar, Visual Studio logo, active tab, selected Solution Explorer item
    ["#ffffff", colors.blueLighter],

    ["#d0e6f5", blues[36]], // Close and pin icons on active tab

    // `<` and `>`
    ["#808080", blueGrays[24]],

    // Operator and HTML operator
    ["#b4b4b4", blueGrays[30]],

    // Most UI text (menu bar items, tabs, non-selected tabs, console output, Solution Explorer item …)
    ["#f1f1f1", blueGrays[28 + c]],

    // Inactive tabs in tool windows, tool window titles
    ["#d0d0d0", blueGrays[24 + c]],

    // `Microsoft Visual Studio`
    ["#999999", blueGrays[20 + c]],

    // Disabled menu item
    ["#656565", blueGrays[16 + c]],

    // Inactive tabs hover in tool windows
    ["#55aaff", blueGrays[32 + c]],

    // Comments
    [
      "#57a64a",
      configuration.environment.additionalCommentsContrast
        ? blueGrays[20]
        : blueGrays[16]
    ],

    // XML doc comment
    [
      "#608b4e",
      configuration.environment.additionalCommentsContrast
        ? blueGrays[20]
        : blueGrays[16]
    ],

    // Numbers
    ["#b5cea8", colors.greenLighter],

    // `IWebHostBuilder`
    ["#b8d7a3", colors.purpleLight],

    // Less variable
    ["#c563bd", colors.purpleLight],

    // Strings
    ["#d69d85", colors.deepOrangeLighter],

    // Start page heading
    ["#84ceff", colors.blueGrays[36]],

    // `Import Theme` hover
    ["#88ccfe", colors.blueGrays[36]]
  ];
}

module.exports = {
  getCategoryReplacements,
  getSearchReplaceReplacements
};
