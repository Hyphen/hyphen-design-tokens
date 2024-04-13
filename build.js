const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const utilityClass = require('./formats/utilityClass/utilityClass');

const webPath = `build/css/`;

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
console.log(`cleaning ${webPath}...`);
fs.removeSync(webPath);

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
      token.attributes.type === 'box-shadow' ||
      (token.attributes.category === 'size' &&
        token.attributes.type === 'spacing' &&
        token.attributes.item === 'auto')
    );
  },
  transformer: function (token) {
    return token.original.value.toString();
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
        'size/rem',
        'size/breakpoint',
        'size/unitless',
      ],
      buildPath: webPath,
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
        },
        {
          destination: `_variables-dark.css`,
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
      transformGroup: 'js',
      buildPath: 'build/json/',
      files: [
        {
          destination: '_variables.json',
          format: 'json',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: '_variables.js',
          format: 'javascript/object',
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
        {
          destination: `_variables-dark.scss`,
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
    ios: {
      transformGroup: 'ios',
      buildPath: 'build/ios/',
      files: [
        {
          destination: 'StyleDictionaryColor.h',
          format: 'ios/colors.h',
          className: 'StyleDictionaryColor',
          type: 'StyleDictionaryColorName',
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
        {
          destination: 'StyleDictionaryColor.m',
          format: 'ios/colors.m',
          className: 'StyleDictionaryColor',
          type: 'StyleDictionaryColorName',
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
        {
          destination: 'StyleDictionarySize.h',
          format: 'ios/static.h',
          className: 'StyleDictionarySize',
          type: 'float',
          filter: {
            attributes: {
              category: 'size',
            },
          },
        },
        {
          destination: 'StyleDictionarySize.m',
          format: 'ios/static.m',
          className: 'StyleDictionarySize',
          type: 'float',
          filter: {
            attributes: {
              category: 'size',
            },
          },
        },
      ],
    },
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

// From the built dictionary, generate constants of all token options.
// File can't be required at the top since build files are a dependency for this function
// and they do not exist until the style dictionary is built.
const generateTokenTypes = require('./formats/utilityClass/utils/generateTokenTypes/generateTokenTypes');
generateTokenTypes();
console.log('\n==============================================');
console.log('\nToken types generated!');
