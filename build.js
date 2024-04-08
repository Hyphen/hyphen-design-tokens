const StyleDictionary = require('style-dictionary');

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
// TODO

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
    dictionary.allProperties = dictionary.allProperties.map(token => {
      const { darkValue } = token;
      if (darkValue) {
        return Object.assign({}, token, {
          value: token.darkValue,
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

StyleDictionary.extend({
  source: ['tokens/**/*.json'],

  format: {
    cssDark: darkFormatWrapper(`css/variables`),
  },

  platforms: {
    web: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/css', 'size/rem'],
      buildPath: 'build/css/',
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
    json: {
      transformGroup: 'js',
      buildPath: 'build/json/',
      files: [
        {
          destination: '_variables.json',
          format: 'javascript/module',
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
    android: {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: [
        {
          destination: 'font_dimens.xml',
          format: 'android/fontDimens',
        },
        {
          destination: 'colors.xml',
          format: 'android/colors',
        },
      ],
    },
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
    'ios-swift': {
      transformGroup: 'ios-swift',
      buildPath: 'build/ios-swift/',
      files: [
        {
          destination: 'StyleDictionary+Class.swift',
          format: 'ios-swift/class.swift',
          className: 'StyleDictionaryClass',
          filter: {},
        },
        {
          destination: 'StyleDictionary+Enum.swift',
          format: 'ios-swift/enum.swift',
          className: 'StyleDictionaryEnum',
          filter: {},
        },
        {
          destination: 'StyleDictionary+Struct.swift',
          format: 'ios-swift/any.swift',
          className: 'StyleDictionaryStruct',
          filter: {},
          options: {
            imports: 'SwiftUI',
            objectType: 'struct',
            accessControl: 'internal',
          },
        },
      ],
    },
    'ios-swift-separate-enums': {
      transformGroup: 'ios-swift-separate',
      buildPath: 'build/ios-swift/',
      files: [
        {
          destination: 'StyleDictionaryColor.swift',
          format: 'ios-swift/enum.swift',
          className: 'StyleDictionaryColor',
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
        {
          destination: 'StyleDictionarySize.swift',
          format: 'ios-swift/enum.swift',
          className: 'StyleDictionarySize',
          filter: {
            attributes: {
              category: 'size',
            },
          },
        },
      ],
    },
  },
}).buildAllPlatforms();
