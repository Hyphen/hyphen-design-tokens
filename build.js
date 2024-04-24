const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const utilityClass = require('./formats/utilityClass/utilityClass');
const createIconComponents = require('./utils/createIconComponents/createIconComponents');

const webPath = `build/css/`;
const scssPath = `build/scss/`;
const jsPath = `build/js/`;
const jsonPath = `build/json/`;
const icons = `build/icons/`;
const typesPath = `build/types/`;
const utilitiesPath = `build/utilities/`;

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
    dictionary.allTokens = dictionary.allTokens.map(token => {
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
    return StyleDictionary.format[format]({ ...args, dictionary });
  };
}

StyleDictionary.registerTransform({
  name: 'size/remAuto',
  type: 'value',
  matcher: function (token) {
    return token.attributes.category === 'size';
  },
  transformer: function (token) {
    if (token.value === 'auto') return token.value;
    const val = parseFloat(token.value);
    if (isNaN(val)) throwSizeError(token.name, token.value, 'rem');
    return val + 'rem';
  },
});

StyleDictionary.registerTransform({
  name: 'size/breakpoint',
  type: 'value',
  matcher: function (token) {
    return (
      token.attributes.category === 'size' &&
      token.attributes.type === 'breakpoint'
    );
  },
  transformer: function (token) {
    return parseInt(token.original.value).toString() + 'px';
  },
});

StyleDictionary.registerTransform({
  name: 'size/unitless',
  type: 'value',
  matcher: function (token) {
    return (
      token.attributes.type === 'font-weight' ||
      token.attributes.type === 'z-index' ||
      token.attributes.type === 'line-height' ||
      token.attributes.type === 'box-shadow'
    );
  },
  transformer: function (token) {
    return token.original.value.toString();
  },
});

StyleDictionary.registerTransform({
  name: 'size/percentage',
  type: 'value',
  matcher: function (token) {
    return (
      token.attributes.category === 'size' &&
      token.attributes.type === 'percentage'
    );
  },
  transformer: function (token) {
    return parseInt(token.original.value).toString() + '%';
  },
});

StyleDictionary.registerFormat(utilityClass);

StyleDictionary.extend({
  source: ['tokens/**/*.json'],

  format: {
    cssDark: darkFormatWrapper(`css/variables`),
  },

  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'color/css',
        'size/remAuto',
        'size/breakpoint',
        'size/percentage',
        'size/unitless',
      ],
      buildPath: webPath,
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
        {
          destination: `variables-dark.css`,
          format: `cssDark`,
          filter: token =>
            token.darkValue && token.attributes.category === `color`,
        },
      ],
    },
    cssUtilities: {
      buildPath: 'build/utilities/',
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'color/css',
      ],
      files: [
        {
          destination: 'utilities.css',
          format: 'css/utility-classes',
        },
      ],
    },
    json: {
      transforms: [
        'attribute/cti',
        'name/cti/pascal',
        'size/remAuto',
        'size/breakpoint',
        'color/hex',
      ],
      buildPath: 'build/json/',
      files: [
        {
          destination: 'variables.json',
          format: 'json',
        },
      ],
    },
    js: {
      transforms: [
        'attribute/cti',
        'name/cti/pascal',
        'size/remAuto',
        'size/breakpoint',
        'color/hex',
      ],
      buildPath: 'build/js/',
      files: [
        {
          destination: 'variables.js',
          format: 'javascript/object',
        },
      ],
    },
    scss: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'color/css',
        'size/remAuto',
        'size/breakpoint',
        'size/percentage',
        'size/unitless',
      ],
      buildPath: 'build/scss/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
        },
        {
          destination: `variables-dark.scss`,
          format: `cssDark`,
          filter: token =>
            token.darkValue && token.attributes.category === `color`,
        },
      ],
    },
    // android: {
    //   transformGroup: 'android',
    //   buildPath: 'build/android/',
    //   files: [
    //     {
    //       destination: 'font_dimens.xml',
    //       format: 'android/fontDimens',
    //     },
    //     {
    //       destination: 'colors.xml',
    //       format: 'android/colors',
    //     },
    //   ],
    // },
    // ios: {
    //   transformGroup: 'ios',
    //   buildPath: 'build/ios/',
    //   files: [
    //     {
    //       destination: 'StyleDictionaryColor.h',
    //       format: 'ios/colors.h',
    //       className: 'StyleDictionaryColor',
    //       type: 'StyleDictionaryColorName',
    //       filter: {
    //         attributes: {
    //           category: 'color',
    //         },
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionaryColor.m',
    //       format: 'ios/colors.m',
    //       className: 'StyleDictionaryColor',
    //       type: 'StyleDictionaryColorName',
    //       filter: {
    //         attributes: {
    //           category: 'color',
    //         },
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionarySize.h',
    //       format: 'ios/static.h',
    //       className: 'StyleDictionarySize',
    //       type: 'float',
    //       filter: {
    //         attributes: {
    //           category: 'size',
    //         },
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionarySize.m',
    //       format: 'ios/static.m',
    //       className: 'StyleDictionarySize',
    //       type: 'float',
    //       filter: {
    //         attributes: {
    //           category: 'size',
    //         },
    //       },
    //     },
    //   ],
    // },
    // 'ios-swift': {
    //   transformGroup: 'ios-swift',
    //   buildPath: 'build/ios-swift/',
    //   files: [
    //     {
    //       destination: 'StyleDictionary+Class.swift',
    //       format: 'ios-swift/class.swift',
    //       className: 'StyleDictionaryClass',
    //       filter: {},
    //     },
    //     {
    //       destination: 'StyleDictionary+Enum.swift',
    //       format: 'ios-swift/enum.swift',
    //       className: 'StyleDictionaryEnum',
    //       filter: {},
    //     },
    //     {
    //       destination: 'StyleDictionary+Struct.swift',
    //       format: 'ios-swift/any.swift',
    //       className: 'StyleDictionaryStruct',
    //       filter: {},
    //       options: {
    //         imports: 'SwiftUI',
    //         objectType: 'struct',
    //         accessControl: 'internal',
    //       },
    //     },
    //   ],
    // },
    // 'ios-swift-separate-enums': {
    //   transformGroup: 'ios-swift-separate',
    //   buildPath: 'build/ios-swift/',
    //   files: [
    //     {
    //       destination: 'StyleDictionaryColor.swift',
    //       format: 'ios-swift/enum.swift',
    //       className: 'StyleDictionaryColor',
    //       filter: {
    //         attributes: {
    //           category: 'color',
    //         },
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionarySize.swift',
    //       format: 'ios-swift/enum.swift',
    //       className: 'StyleDictionarySize',
    //       filter: {
    //         attributes: {
    //           category: 'size',
    //         },
    //       },
    //     },
    //   ],
    // },
  },
}).buildAllPlatforms();

// Process Icons
const iconsSource = './icons';
const iconsDestination = './build/icons/svg';
fs.copySync(iconsSource, iconsDestination);
console.log('\n==============================================');
console.log('\nIcons successfully copied to build');

// Create React components based on SVG icons.
createIconComponents();
console.log('\n==============================================');
console.log('\nReact icons created!');

// From the built dictionary, generate constants of all token options.
// File can't be required at the top since build files are a dependency for this function
// and they do not exist until the style dictionary is built.
const generateTokenTypes = require('./utils/generateTokenTypes/generateTokenTypes');
generateTokenTypes();
console.log('\n==============================================');
console.log('\nToken types generated!');
