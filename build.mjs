import StyleDictionary from "style-dictionary";
import fs from "fs-extra";

import utilityClass from "./formats/utilityClass/utilityClass.js";
import createIconComponents from "./utils/createIconComponents/createIconComponents.js";
import createLogoComponents from "./utils/createLogoComponents/createLogoComponents.js";

const webPath = `build/css/`;
const scssPath = `build/scss/`;
const jsPath = `build/js/`;
const jsonPath = `build/json/`;
const icons = `build/icons/`;
const typesPath = `build/types/`;
const utilitiesPath = `build/utilities/`;
const assetPath = `build/assets/`;

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
console.log(`cleaning ${webPath}...`);
fs.removeSync(webPath);
console.log(`cleaning ${scssPath}...`);
fs.removeSync(scssPath);
console.log(`cleaning ${jsPath}...`);
fs.removeSync(jsPath);
console.log(`cleaning ${jsonPath}...`);
fs.removeSync(jsonPath);
console.log(`cleaning ${icons}...`);
fs.removeSync(icons);
console.log(`cleaning ${typesPath}...`);
fs.removeSync(typesPath);
console.log(`cleaning ${utilitiesPath}...`);
fs.removeSync(utilitiesPath);
console.log(`cleaning ${assetPath}...`);
fs.removeSync(assetPath);

/**
 * This function will wrap a built-in format and replace `.value` with `.darkValue`
 * if a token has a `.darkValue`.
 * @param {String} format - the name of the built-in format
 * @returns {Function}
 */
function darkFormatWrapper(format) {
  return function (args) {
    const dictionary = Object.assign({}, args.dictionary);
    // Override each token's `value` with `darkValue`
    dictionary.allTokens = dictionary.allTokens.map((token) => {
      const { darkValue } = token;
      if (darkValue) {
        return Object.assign({}, token, {
          value: token.darkValue,
          original: {
            value: token.darkValue,
            darkValue: token.darkValue,
          },
        });
      } else {
        return token;
      }
    });

    // Use the built-in format but with our customized dictionary object
    // so it will output the darkValue instead of the value
    return StyleDictionary.hooks.formats[format]({ ...args, dictionary });
  };
}

StyleDictionary.registerTransform({
  name: "size/remAuto",
  type: "value",
  filter: function (token) {
    return token.attributes.category === "size";
  },
  transform: function (token) {
    if (
      token.value === "auto" ||
      token.value === "fit-content" ||
      token.value === "min-content" ||
      token.value === "max-content"
    )
      return token.value;

    const val = parseFloat(token.value);
    if (isNaN(val))
      throw new Error(
        `Invalid size value "${token.value}" for token "${token.name}": expected a number or a CSS sizing keyword.`,
      );
    return val + "rem";
  },
});

StyleDictionary.registerTransform({
  name: "size/breakpoint",
  type: "value",
  filter: function (token) {
    return (
      token.attributes.category === "size" &&
      token.attributes.type === "breakpoint"
    );
  },
  transform: function (token) {
    return parseInt(token.original.value).toString() + "px";
  },
});

StyleDictionary.registerTransform({
  name: "size/unitless",
  type: "value",
  filter: function (token) {
    return (
      token.attributes.type === "font-weight" ||
      token.attributes.type === "z-index" ||
      token.attributes.type === "line-height" ||
      token.attributes.type === "box-shadow"
    );
  },
  transform: function (token) {
    return token.original.value.toString();
  },
});

StyleDictionary.registerTransform({
  name: "size/percentage",
  type: "value",
  filter: function (token) {
    return (
      token.attributes.category === "size" &&
      token.attributes.type === "percentage"
    );
  },
  transform: function (token) {
    return parseInt(token.original.value).toString() + "%";
  },
});

StyleDictionary.registerFormat(utilityClass);

const styleDictionary = new StyleDictionary({
  source: ["tokens/**/*.json"],

  hooks: {
    formats: {
      cssDark: darkFormatWrapper(`css/variables`),
    },
  },

  platforms: {
    css: {
      transforms: [
        "attribute/cti",
        "name/kebab",
        "color/css",
        "size/remAuto",
        "size/breakpoint",
        "size/percentage",
        "size/unitless",
      ],
      buildPath: webPath,
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
        // for dark mode using "dark" class applied to root
        {
          destination: `variables-root-dark.css`,
          options: { selector: ":root.dark" },
          format: `cssDark`,
          filter: (token) =>
            token.darkValue && token.attributes.category === `color`,
        },
        // for dark mode using prefers-color-scheme
        {
          destination: `variables-dark.css`,
          format: `cssDark`,
          filter: (token) =>
            token.darkValue && token.attributes.category === `color`,
        },
      ],
    },
    assets: {
      transformGroup: "assets",
      buildPath: "build/",
      files: [],
      actions: ["copy_assets"],
    },
    cssUtilities: {
      buildPath: "build/utilities/",
      transforms: [
        "attribute/cti",
        "name/kebab",
        "time/seconds",
        "html/icon",
        "color/css",
      ],
      files: [
        {
          destination: "utilities.css",
          format: "css/utility-classes",
        },
      ],
    },
    json: {
      transforms: [
        "attribute/cti",
        "name/pascal",
        "size/remAuto",
        "size/breakpoint",
        "color/hex",
      ],
      buildPath: "build/json/",
      files: [
        {
          destination: "variables.json",
          format: "json",
        },
      ],
    },
    js: {
      transforms: [
        "attribute/cti",
        "name/pascal",
        "size/remAuto",
        "size/breakpoint",
        "color/hex",
      ],
      buildPath: "build/js/",
      files: [
        {
          destination: "variables.js",
          format: "javascript/object",
        },
      ],
    },
    scss: {
      transforms: [
        "attribute/cti",
        "name/kebab",
        "color/css",
        "size/remAuto",
        "size/breakpoint",
        "size/percentage",
        "size/unitless",
      ],
      buildPath: "build/scss/",
      files: [
        {
          destination: "variables.scss",
          format: "scss/variables",
        },
        {
          destination: `variables-dark.scss`,
          format: `cssDark`,
          filter: (token) =>
            token.darkValue && token.attributes.category === `color`,
        },
      ],
    },
  },
});

await styleDictionary.buildAllPlatforms();

// Create React components based on SVG icons.
createIconComponents();
console.log("\n==============================================");
console.log("\nReact icons created!");

// Create React logos based on SVG logos.
createLogoComponents();
console.log("\n==============================================");
console.log("\nReact logos created!");

// From the built dictionary, generate constants of all token options.
// File can't be imported at the top since build files are a dependency for this function
// and they do not exist until the style dictionary is built.
const { default: generateTokenTypes } = await import(
  "./utils/generateTokenTypes/generateTokenTypes.js"
);
generateTokenTypes();
console.log("\n==============================================");
console.log("\nToken types generated!");
