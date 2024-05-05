const utilities = [
  {
    name: 'background-color',
    tokenCategory: 'color',
    tokenType: 'background',
    cssProp: 'background',
    variations: [''],
    responsive: false,
    hover: true,
    focus: true,
  },
  {
    name: 'background-color',
    tokenCategory: 'color',
    tokenType: 'brand',
    cssProp: 'background-color',
    variations: [''],
    responsive: false,
    hover: true,
    focus: true,
  },
  {
    name: 'border-color',
    tokenCategory: 'color',
    tokenType: 'border',
    cssProp: 'border-color',
    variations: [''],
    responsive: false,
    hover: true,
    focus: true,
  },
  {
    name: 'font-color',
    tokenCategory: 'color',
    tokenType: 'font',
    cssProp: 'color',
    variations: [''],
    responsive: false,
    hover: true,
    focus: true,
  },
  {
    name: 'font-family',
    tokenCategory: 'assets',
    tokenType: 'font-family',
    cssProp: 'font-family',
    variations: [''],
    responsive: false,
    hover: false,
    focus: false,
  },
  {
    name: 'font-size',
    tokenCategory: 'size',
    tokenType: 'font-size',
    cssProp: 'font-size',
    variations: [''],
    responsive: true,
    hover: true,
    focus: false,
  },
  {
    name: 'font-weight',
    tokenCategory: 'size',
    tokenType: 'font-weight',
    cssProp: 'font-weight',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'heading',
    tokenCategory: 'size',
    tokenType: 'heading',
    cssProp: 'font-size',
    variations: [''],
    responsive: true,
    hover: true,
    focus: false,
  },
  {
    name: 'border-radius',
    abbreviation: 'br',
    tokenCategory: 'size',
    tokenType: 'border-radius',
    cssProp: 'border-radius',
    variations: ['', 'top-left', 'top-right', 'bottom-right', 'bottom-left'],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'border-width',
    abbreviation: 'bw',
    tokenCategory: 'size',
    tokenType: 'border-width',
    cssProp: 'border',
    variations: ['', 'top', 'right', 'bottom', 'left', 'h', 'v'],
    responsive: true,
    hover: true,
    focus: true,
  },
  {
    name: 'margin',
    abbreviation: 'm',
    tokenCategory: 'size',
    tokenType: 'spacing',
    cssProp: 'margin',
    variations: ['', 'top', 'right', 'bottom', 'left', 'h', 'v'],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'padding',
    abbreviation: 'p',
    tokenCategory: 'size',
    tokenType: 'spacing',
    cssProp: 'padding',
    variations: ['', 'top', 'right', 'bottom', 'left', 'h', 'v'],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'gap',
    abbreviation: 'g',
    tokenCategory: 'size',
    tokenType: 'spacing',
    cssProp: 'gap',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'row-gap',
    abbreviation: 'rg',
    tokenCategory: 'size',
    tokenType: 'spacing',
    cssProp: 'row-gap',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'column-gap',
    abbreviation: 'cg',
    tokenCategory: 'size',
    tokenType: 'spacing',
    cssProp: 'column-gap',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'box-shadow',
    abbreviation: 'shadow',
    tokenCategory: 'size',
    tokenType: 'box-shadow',
    cssProp: 'box-shadow',
    variations: [''],
    responsive: true,
    hover: true,
    focus: true,
  },
  {
    name: 'z-index',
    tokenCategory: 'size',
    tokenType: 'z-index',
    cssProp: 'z-index',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'dimension',
    abbreviation: 'w',
    tokenCategory: 'size',
    tokenType: 'dimension',
    cssProp: 'width',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'dimension',
    abbreviation: 'h',
    tokenCategory: 'size',
    tokenType: 'dimension',
    cssProp: 'height',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'percentage',
    abbreviation: 'w',
    tokenCategory: 'size',
    tokenType: 'percentage',
    cssProp: 'width',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'percentage',
    abbreviation: 'h',
    tokenCategory: 'size',
    tokenType: 'percentage',
    cssProp: 'height',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'dimension',
    abbreviation: 'mw',
    tokenCategory: 'size',
    tokenType: 'dimension',
    cssProp: 'max-width',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'dimension',
    abbreviation: 'mh',
    tokenCategory: 'size',
    tokenType: 'dimension',
    cssProp: 'max-height',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'dimension',
    abbreviation: 'minw',
    tokenCategory: 'size',
    tokenType: 'dimension',
    cssProp: 'min-width',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
  {
    name: 'dimension',
    abbreviation: 'minh',
    tokenCategory: 'size',
    tokenType: 'dimension',
    cssProp: 'min-height',
    variations: [''],
    responsive: true,
    hover: false,
    focus: false,
  },
];

module.exports = utilities;
