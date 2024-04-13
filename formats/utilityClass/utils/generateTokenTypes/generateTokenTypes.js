const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const BABEL_OPTIONS = {
  plugins: [
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-transform-modules-commonjs',
  ],
};

const designTokens = require('../../../../build/json/_variables.json');

/**
 * COLORS
 */
const baseColors = designTokens.color.base;
const BASE_COLORS = 'BASE_COLORS';
const FONT_COLORS = 'FONT_COLORS';
const BASE_COLOR_NAMES = 'BASE_COLOR_NAMES';

const baseColorOptions = [].concat.apply(
  [],
  Object.keys(baseColors).map(colorName =>
    Object.keys(baseColors[colorName]).map(colorGrade =>
      colorGrade === 'base' ? colorName : `${colorName}-${colorGrade}`,
    ),
  ),
);

const baseColorNames = Object.keys(baseColors);

const fontColorOptions = [].concat.apply(
  [],
  Object.keys(baseColors).map(colorName =>
    Object.keys(baseColors[colorName]).map(colorGrade =>
      colorGrade === 'base' ? colorName : `${colorName}-${colorGrade}`,
    ),
  ),
);

/**
 * SIZES
 */
const size = designTokens.size;

const borderWidthOptions = Object.keys(size['border-width']);
const borderRadiusSizeOptions = Object.keys(size['border-radius']);
const boxShadowSizeOptions = Object.keys(size['box-shadow']);
const breakpointSizeOptions = Object.keys(size.breakpoint);
const fontSizeOptions = Object.keys(size.font.size);
const fontWeightOptions = Object.keys(size.font.weight);
const fontHeadingOptions = Object.keys(size.heading);
const lineHeightSizeOptions = Object.keys(size['line-height']);
// const opacitySizeOptions = Object.keys(size.opacity);
const spacingSizeOptions = Object.keys(size.spacing);
const zIndexSizeOptions = Object.keys(size['z-index']);

const BORDER_WIDTHS = 'BORDER_WIDTHS';
const BORDER_RADIUS_SIZES = 'BORDER_RADIUS_SIZES';
const BOX_SHADOW_SIZES = 'BOX_SHADOW_SIZES';
const BREAKPOINT_SIZES = 'BREAKPOINT_SIZES';
const FONT_SIZES = 'FONT_SIZES';
const FONT_WEIGHTS = 'FONT_WEIGHTS';
const HEADING = 'HEADING';
const LINE_HEIGHT_SIZES = 'LINE_HEIGHT_SIZES';
// const OPACITY_SIZES = 'OPACITY_SIZES';
const SPACING_SIZES = 'SPACING_SIZES';
const Z_INDEX_SIZES = 'Z_INDEX_SIZES';

// /**
//  * ASSETS
//  */
const assets = designTokens.assets;

const fontFamilyOptions = Object.keys(assets['font-family']);

const FONT_FAMILY_OPTIONS = 'FONT_FAMILY_OPTIONS';

/**
 * ICONS
 */
// const sourceIconsDir = path.join(__dirname, '..', '..', 'icons/');
// const iconFiles = fs
//   .readdirSync(sourceIconsDir)
//   .filter(fileName => path.extname(fileName).toLowerCase() === '.svg');
// const iconNames = iconFiles.map(iconFile =>
//   iconFile.substr(0, iconFile.lastIndexOf('.')),
// );
// const ICON_NAMES = 'ICON_NAMES';

/**
 * UTILITY FUNCTIONS
 */
const writeArray = (
  array,
  arrayName,
  options = { lineBreak: true, asConst: true },
) => {
  const { lineBreak, asConst } = options;

  let result = `const ${arrayName} = [`;

  array.forEach(element => {
    result = `${result}\n  '${element}',`;
  });

  return `${result}\n]${asConst ? ' as const' : ''};\n${lineBreak ? '\n' : ''}`;
};

const writeExport = string => 'export '.concat(string);

const writeUnionTypeFromArray = (typeName, arrayName) => {
  return `type ${typeName} = typeof ${arrayName}[number];\n`;
};

const createFileHeader = currentFile =>
  `/**\n* This file was auto-generated. DO NOT edit the contents of this file directly.\n*/\n\n${currentFile}`; // eslint-disable-line max-len

/**
 * TOKEN CONSTANT CREATION
 */
const createColorTokens = currentFile => {
  let result = currentFile;

  result = result.concat(
    writeExport(writeArray(baseColorOptions, BASE_COLORS)),
  );
  result = result.concat(
    writeExport(writeArray(fontColorOptions, FONT_COLORS)),
  );
  result = result.concat(writeArray(baseColorNames, BASE_COLOR_NAMES));

  return result;
};

const createSizeTokens = currentFile => {
  let result = currentFile;

  result = result.concat(writeArray(borderWidthOptions, BORDER_WIDTHS));
  result = result.concat(
    writeArray(borderRadiusSizeOptions, BORDER_RADIUS_SIZES),
  );
  result = result.concat(writeArray(boxShadowSizeOptions, BOX_SHADOW_SIZES));
  result = result.concat(writeArray(breakpointSizeOptions, BREAKPOINT_SIZES));
  result = result.concat(writeArray(fontSizeOptions, FONT_SIZES));
  result = result.concat(writeArray(fontWeightOptions, FONT_WEIGHTS));
  // result = result.concat(writeArray(headingOptions, HEADING));
  result = result.concat(writeArray(lineHeightSizeOptions, LINE_HEIGHT_SIZES));
  // result = result.concat(writeArray(opacitySizeOptions, OPACITY_SIZES));
  result = result.concat(writeArray(spacingSizeOptions, SPACING_SIZES));
  result = result.concat(writeArray(zIndexSizeOptions, Z_INDEX_SIZES));

  return result;
};

const createAssetTokens = currentFile => {
  let result = currentFile;

  result = result.concat(writeArray(fontFamilyOptions, FONT_FAMILY_OPTIONS));

  return result;
};

// const createIconNames = (currentFile, asConst = true) => {
//   let result = currentFile;

//   result = result.concat(
//     writeExport(writeArray(iconNames, ICON_NAMES, { asConst })),
//   );

//   return result;
// };

/**
 * TYPE CREATION
 */
const createColorTypes = currentFile => {
  let result = currentFile;

  result = result.concat(
    writeExport(writeUnionTypeFromArray('BaseColor', BASE_COLORS)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('FontColor', FONT_COLORS)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('ColorName', BASE_COLOR_NAMES)),
  );

  return result;
};

const createSizeTypes = currentFile => {
  let result = currentFile;

  result = result.concat(
    writeExport(writeUnionTypeFromArray('BorderSize', BORDER_WIDTHS)),
  );
  result = result.concat(
    writeExport(
      writeUnionTypeFromArray('BorderRadiusSize', BORDER_RADIUS_SIZES),
    ),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('BoxShadowSize', BOX_SHADOW_SIZES)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('BreakpointSize', BREAKPOINT_SIZES)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('FontSize', FONT_SIZES)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('FontWeight', FONT_WEIGHTS)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('LineHeightSize', LINE_HEIGHT_SIZES)),
  );
  // result = result.concat(
  //   writeExport(writeUnionTypeFromArray('OpacitySize', OPACITY_SIZES)),
  // );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('SpacingSize', SPACING_SIZES)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('ZIndexSize', Z_INDEX_SIZES)),
  );

  return result;
};

const createAssetTypes = currentFile => {
  let result = currentFile;
  result = result.concat(
    writeExport(writeUnionTypeFromArray('FontFamily', FONT_FAMILY_OPTIONS)),
  );

  return result;
};

// const createIconTypes = currentFile => {
//   let result = currentFile;
//   result = result.concat(
//     writeExport(writeUnionTypeFromArray('IconName', ICON_NAMES)),
//   );

//   return result;
// };

/**
 * WRITE FILE
 */
const writeFile = () => {
  let tokensData = '';

  tokensData = createFileHeader(tokensData);
  tokensData = createColorTokens(tokensData);
  tokensData = createSizeTokens(tokensData);
  tokensData = createAssetTokens(tokensData);
  // tokensData = createIconNames(tokensData);

  tokensData = createColorTypes(tokensData);
  tokensData = createSizeTypes(tokensData);
  tokensData = createAssetTypes(tokensData);
  // tokensData = createIconTypes(tokensData);

  if (!fs.existsSync(`${__dirname}/../../../../build/types`)) {
    fs.mkdirSync(`${__dirname}/../../../../build/types`);
  }

  fs.writeFileSync(
    `${__dirname}/../../../../build/types/index.d.ts`,
    tokensData,
  );

  // let icons = '';
  // icons = createFileHeader(icons);
  // icons = babel.transformSync(
  //   createIconNames(icons, false),
  //   BABEL_OPTIONS,
  // ).code;
  // fs.writeFileSync(`${__dirname}/../../build/icons/index.js`, icons);
};

module.exports = writeFile;
