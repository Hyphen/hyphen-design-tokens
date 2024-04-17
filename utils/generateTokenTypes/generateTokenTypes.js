const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const BABEL_OPTIONS = {
  plugins: [
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-transform-modules-commonjs',
  ],
};

const designTokens = require('../../build/json/variables.json');

/**
 * COLORS
 */
const color = designTokens.color;

const baseColors = color.base;
const borderColors = color.border;
const backgroundColors = color.background;
const fontColors = color.font;
const BASE_COLORS = 'BASE_COLORS';
const BACKGROUND_COLORS = 'BACKGROUND_COLORS';
const BORDER_COLORS = 'BORDER_COLORS';
const FONT_COLORS = 'FONT_COLORS';
const BASE_COLOR_NAMES = 'BASE_COLOR_NAMES';
const BACKGROUND_COLOR_NAMES = 'BACKGROUND_COLOR_NAMES';
const BORDER_COLOR_NAMES = 'BORDER_COLOR_NAMES';
const FONT_COLOR_NAMES = 'FONT_COLOR_NAMES';

const baseColorNames = Object.keys(baseColors);
const backgroundColorNames = Object.keys(backgroundColors);
const borderColorNames = Object.keys(borderColors);
const fontColorNames = Object.keys(fontColors);

const baseColorOptions = [].concat.apply(
  [],
  Object.keys(baseColors).map(colorName => {
    if (
      colorName === 'white' ||
      colorName === 'black' ||
      colorName === 'magenta'
    ) {
      return colorName;
    }

    return Object.keys(baseColors[colorName]).map(colorGrade =>
      colorGrade === 'base' ? colorName : `${colorName}-${colorGrade}`,
    );
  }),
);
const backgroundColorOptions = [].concat.apply(
  [],
  Object.keys(backgroundColors).map(colorName => colorName),
);
const borderColorOptions = [].concat.apply(
  [],
  Object.keys(borderColors).map(colorName => colorName),
);
const fontColorOptions = [].concat.apply(
  [],
  Object.keys(fontColors).map(colorName => colorName),
);

/**
 * SIZES
 */
const size = designTokens.size;

const borderWidthOptions = Object.keys(size['border-width']);
const borderRadiusSizeOptions = Object.keys(size['border-radius']);
const boxShadowSizeOptions = Object.keys(size['box-shadow']);
const breakpointSizeOptions = Object.keys(size.breakpoint);
const fontSizeOptions = Object.keys(size['font-size']);
const fontWeightOptions = Object.keys(size['font-weight']);
const headingSizeOptions = Object.keys(size.heading);
const heightSizeOptions = Object.keys(size.dimension);
const lineHeightSizeOptions = Object.keys(size['line-height']);
// const opacitySizeOptions = Object.keys(size.opacity);
const spacingSizeOptions = Object.keys(size.spacing);
const widthSizeOptions = Object.keys(size.dimension);
const zIndexSizeOptions = Object.keys(size['z-index']);

const BORDER_WIDTHS = 'BORDER_WIDTHS';
const BORDER_RADIUS_SIZES = 'BORDER_RADIUS_SIZES';
const BOX_SHADOW_SIZES = 'BOX_SHADOW_SIZES';
const BREAKPOINT_SIZES = 'BREAKPOINT_SIZES';
const FONT_SIZES = 'FONT_SIZES';
const FONT_WEIGHTS = 'FONT_WEIGHTS';
const HEIGHT_SIZES = 'HEIGHT_SIZES';
const HEADING = 'HEADING';
const LINE_HEIGHT_SIZES = 'LINE_HEIGHT_SIZES';
// const OPACITY_SIZES = 'OPACITY_SIZES';
const SPACING_SIZES = 'SPACING_SIZES';
const WIDTH_SIZES = 'WIDTH_SIZES';
const Z_INDEX_SIZES = 'Z_INDEX_SIZES';

/**
 * ASSETS
 */
const assets = designTokens.assets;

const fontFamilyOptions = Object.keys(assets['font-family']);

const FONT_FAMILY_OPTIONS = 'FONT_FAMILY_OPTIONS';

/**
 * ICONS
 */
const sourceIconsDir = path.join(__dirname, '..', '..', 'icons/');
const iconFiles = fs
  .readdirSync(sourceIconsDir)
  .filter(fileName => path.extname(fileName).toLowerCase() === '.svg');
const iconNames = iconFiles.map(iconFile =>
  iconFile.substr(0, iconFile.lastIndexOf('.')),
);
const ICON_NAMES = 'ICON_NAMES';

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
    writeExport(writeArray(backgroundColorOptions, BACKGROUND_COLORS)),
  );
  result = result.concat(
    writeExport(writeArray(borderColorOptions, BORDER_COLORS)),
  );
  result = result.concat(
    writeExport(writeArray(fontColorOptions, FONT_COLORS)),
  );
  result = result.concat(writeArray(baseColorNames, BASE_COLOR_NAMES));
  result = result.concat(
    writeArray(backgroundColorNames, BACKGROUND_COLOR_NAMES),
  );
  result = result.concat(writeArray(borderColorNames, BORDER_COLOR_NAMES));
  result = result.concat(writeArray(fontColorNames, FONT_COLOR_NAMES));

  return result;
};

const createSizeTokens = currentFile => {
  let result = currentFile;

  result = result.concat(
    writeExport(writeArray(borderWidthOptions, BORDER_WIDTHS)),
  );
  result = result.concat(
    writeExport(writeArray(borderRadiusSizeOptions, BORDER_RADIUS_SIZES)),
  );
  result = result.concat(
    writeExport(writeArray(boxShadowSizeOptions, BOX_SHADOW_SIZES)),
  );
  result = result.concat(
    writeExport(writeArray(breakpointSizeOptions, BREAKPOINT_SIZES)),
  );
  result = result.concat(writeExport(writeArray(fontSizeOptions, FONT_SIZES)));
  result = result.concat(
    writeExport(writeArray(fontWeightOptions, FONT_WEIGHTS)),
  );
  result = result.concat(writeArray(headingSizeOptions, HEADING));
  result = result.concat(writeArray(heightSizeOptions, HEIGHT_SIZES));
  // result = result.concat(writeExport(writeArray(headingOptions, HEADING)));
  result = result.concat(
    writeExport(writeArray(lineHeightSizeOptions, LINE_HEIGHT_SIZES)),
  );
  // result = result.concat(writeExport(writeArray(opacitySizeOptions, OPACITY_SIZES)));
  result = result.concat(
    writeExport(writeArray(spacingSizeOptions, SPACING_SIZES)),
  );
  result = result.concat(writeArray(widthSizeOptions, WIDTH_SIZES));
  result = result.concat(
    writeExport(writeArray(zIndexSizeOptions, Z_INDEX_SIZES)),
  );

  return result;
};

const createAssetTokens = currentFile => {
  let result = currentFile;

  result = result.concat(writeArray(fontFamilyOptions, FONT_FAMILY_OPTIONS));

  return result;
};

const createIconNames = (currentFile, asConst = true) => {
  let result = currentFile;

  result = result.concat(
    writeExport(writeArray(iconNames, ICON_NAMES, { asConst })),
  );

  return result;
};

/**
 * TYPE CREATION
 */
const createColorTypes = currentFile => {
  let result = currentFile;

  result = result.concat(
    writeExport(writeUnionTypeFromArray('BaseColor', BASE_COLORS)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('BackgroundColor', BACKGROUND_COLORS)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('BorderColor', BORDER_COLORS)),
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
    writeExport(writeUnionTypeFromArray('HeadingSize', HEADING)),
  );
  result = result.concat(
    writeExport(writeUnionTypeFromArray('HeightSize', HEIGHT_SIZES)),
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
    writeExport(writeUnionTypeFromArray('WidthSize', WIDTH_SIZES)),
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

const createIconTypes = currentFile => {
  let result = currentFile;
  result = result.concat(
    writeExport(writeUnionTypeFromArray('IconName', ICON_NAMES)),
  );

  return result;
};

/**
 * WRITE FILE
 */
const writeFile = () => {
  let tokensData = '';

  tokensData = createFileHeader(tokensData);
  tokensData = createColorTokens(tokensData);
  tokensData = createSizeTokens(tokensData);
  tokensData = createAssetTokens(tokensData);
  tokensData = createIconNames(tokensData);

  tokensData = createColorTypes(tokensData);
  tokensData = createSizeTypes(tokensData);
  tokensData = createAssetTypes(tokensData);
  tokensData = createIconTypes(tokensData);

  if (!fs.existsSync(`${__dirname}/../../build/types`)) {
    fs.mkdirSync(`${__dirname}/../../build/types`);
  }

  fs.writeFileSync(`${__dirname}/../../build/types/index.d.ts`, tokensData);

  let icons = '';
  icons = createFileHeader(icons);
  icons = babel.transformSync(
    createIconNames(icons, false),
    BABEL_OPTIONS,
  ).code;
  fs.writeFileSync(`${__dirname}/../../build/icons/index.js`, icons);
};

module.exports = writeFile;
