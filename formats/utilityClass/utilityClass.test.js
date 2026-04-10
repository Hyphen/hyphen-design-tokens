const utilityClass = require('./utilityClass');

const mockDictionary = {
  allTokens: [
    {
      value: '#f3f4f6',
      darkValue: '#1f2937',
      filePath: 'tokens/color/background.json',
      isSource: true,
      original: {
        value: '{color.base.grey.100.value}',
        darkValue: '{color.base.grey.800.value}',
      },
      name: 'ColorBackgroundSecondary',
      attributes: {
        category: 'color',
        type: 'background',
        item: 'secondary',
      },
      path: ['color', 'background', 'secondary'],
    },
    {
      value: '0.25rem',
      filePath: 'tokens/size/spacing.json',
      isSource: true,
      original: {
        value: '0.25',
      },
      name: 'SizeSpacingXs',
      attributes: {
        category: 'size',
        type: 'spacing',
        item: 'xs',
      },
      path: ['size', 'spacing', 'xs'],
    },
    {
      value: '0.0625rem',
      filePath: 'tokens/size/border.json',
      isSource: true,
      original: {
        value: 0.0625,
      },
      name: 'SizeBorderWidthSm',
      attributes: {
        category: 'size',
        type: 'border-width',
        item: 'sm',
      },
      path: ['size', 'border-width', 'sm'],
    },
    {
      value: '0.125rem',
      filePath: 'tokens/size/border.json',
      isSource: true,
      original: {
        value: 0.125,
      },
      name: 'SizeBorderRadiusXs',
      attributes: {
        category: 'size',
        type: 'border-radius',
        item: 'xs',
      },
      path: ['size', 'border-radius', 'xs'],
    },
    {
      value: '1280rem',
      filePath: 'tokens/size/breakpoint.json',
      isSource: true,
      original: {
        value: '1280',
      },
      name: 'SizeBreakpointHd',
      attributes: {
        category: 'size',
        type: 'breakpoint',
        item: 'hd',
      },
      path: ['size', 'breakpoint', 'hd'],
    },
  ],
};

const expectedOutput = `/**
 * Do not edit directly
 * Generated on Mon, 20 Jun 2016 12:08:10 GMT
 */

.background-color-secondary { background: var(--color-background-secondary); }

.hover\\:background-color-secondary:hover { background: var(--color-background-secondary); }

.focus\\:background-color-secondary:focus { background: var(--color-background-secondary); }

.m-xs { margin: var(--size-spacing-xs); }

.m-top-xs { margin-top: var(--size-spacing-xs); }

.m-right-xs { margin-right: var(--size-spacing-xs); }

.m-bottom-xs { margin-bottom: var(--size-spacing-xs); }

.m-left-xs { margin-left: var(--size-spacing-xs); }

.m-h-xs { margin-left: var(--size-spacing-xs); margin-right: var(--size-spacing-xs); }

.m-v-xs { margin-top: var(--size-spacing-xs); margin-bottom: var(--size-spacing-xs); }

.p-xs { padding: var(--size-spacing-xs); }

.p-top-xs { padding-top: var(--size-spacing-xs); }

.p-right-xs { padding-right: var(--size-spacing-xs); }

.p-bottom-xs { padding-bottom: var(--size-spacing-xs); }

.p-left-xs { padding-left: var(--size-spacing-xs); }

.p-h-xs { padding-left: var(--size-spacing-xs); padding-right: var(--size-spacing-xs); }

.p-v-xs { padding-top: var(--size-spacing-xs); padding-bottom: var(--size-spacing-xs); }

.g-xs { gap: var(--size-spacing-xs); }

.rg-xs { row-gap: var(--size-spacing-xs); }

.cg-xs { column-gap: var(--size-spacing-xs); }

.bw-sm { border-width: var(--size-border-width-sm); border-style: solid; }

.bw-top-sm { border-top-width: var(--size-border-width-sm); border-top-style: solid; }

.bw-right-sm { border-right-width: var(--size-border-width-sm); border-right-style: solid; }

.bw-bottom-sm { border-bottom-width: var(--size-border-width-sm); border-bottom-style: solid; }

.bw-left-sm { border-left-width: var(--size-border-width-sm); border-left-style: solid; }

.bw-h-sm { border-left-width: var(--size-border-width-sm); border-right-width: var(--size-border-width-sm); border-left-style: solid; border-right-style: solid; }

.bw-v-sm { border-top-width: var(--size-border-width-sm); border-bottom-width: var(--size-border-width-sm); border-top-style: solid; border-bottom-style: solid; }

.hover\\:bw-sm:hover { border-width: var(--size-border-width-sm); border-style: solid; }

.hover\\:bw-top-sm:hover { border-top-width: var(--size-border-width-sm); border-top-style: solid; }

.hover\\:bw-right-sm:hover { border-right-width: var(--size-border-width-sm); border-right-style: solid; }

.hover\\:bw-bottom-sm:hover { border-bottom-width: var(--size-border-width-sm); border-bottom-style: solid; }

.hover\\:bw-left-sm:hover { border-left-width: var(--size-border-width-sm); border-left-style: solid; }

.hover\\:bw-h-sm:hover { border-left-width: var(--size-border-width-sm); border-right-width: var(--size-border-width-sm); border-left-style: solid; border-right-style: solid; }

.hover\\:bw-v-sm:hover { border-top-width: var(--size-border-width-sm); border-bottom-width: var(--size-border-width-sm); border-top-style: solid; border-bottom-style: solid; }

.focus\\:bw-sm:focus { border-width: var(--size-border-width-sm); border-style: solid; }

.focus\\:bw-top-sm:focus { border-top-width: var(--size-border-width-sm); border-top-style: solid; }

.focus\\:bw-right-sm:focus { border-right-width: var(--size-border-width-sm); border-right-style: solid; }

.focus\\:bw-bottom-sm:focus { border-bottom-width: var(--size-border-width-sm); border-bottom-style: solid; }

.focus\\:bw-left-sm:focus { border-left-width: var(--size-border-width-sm); border-left-style: solid; }

.focus\\:bw-h-sm:focus { border-left-width: var(--size-border-width-sm); border-right-width: var(--size-border-width-sm); border-left-style: solid; border-right-style: solid; }

.focus\\:bw-v-sm:focus { border-top-width: var(--size-border-width-sm); border-bottom-width: var(--size-border-width-sm); border-top-style: solid; border-bottom-style: solid; }

.br-xs { border-radius: var(--size-border-radius-xs); }

.br-top-left-xs { border-top-left-radius: var(--size-border-radius-xs); }

.br-top-right-xs { border-top-right-radius: var(--size-border-radius-xs); }

.br-bottom-right-xs { border-bottom-right-radius: var(--size-border-radius-xs); }

.br-bottom-left-xs { border-bottom-left-radius: var(--size-border-radius-xs); }

@media (min-width: 1280rempx) {
  .m-xs-hd { margin: var(--size-spacing-xs); }

  .m-top-xs-hd { margin-top: var(--size-spacing-xs); }

  .m-right-xs-hd { margin-right: var(--size-spacing-xs); }

  .m-bottom-xs-hd { margin-bottom: var(--size-spacing-xs); }

  .m-left-xs-hd { margin-left: var(--size-spacing-xs); }

  .m-h-xs-hd { margin-left: var(--size-spacing-xs); margin-right: var(--size-spacing-xs); }

  .m-v-xs-hd { margin-top: var(--size-spacing-xs); margin-bottom: var(--size-spacing-xs); }

  .p-xs-hd { padding: var(--size-spacing-xs); }

  .p-top-xs-hd { padding-top: var(--size-spacing-xs); }

  .p-right-xs-hd { padding-right: var(--size-spacing-xs); }

  .p-bottom-xs-hd { padding-bottom: var(--size-spacing-xs); }

  .p-left-xs-hd { padding-left: var(--size-spacing-xs); }

  .p-h-xs-hd { padding-left: var(--size-spacing-xs); padding-right: var(--size-spacing-xs); }

  .p-v-xs-hd { padding-top: var(--size-spacing-xs); padding-bottom: var(--size-spacing-xs); }

  .g-xs-hd { gap: var(--size-spacing-xs); }

  .rg-xs-hd { row-gap: var(--size-spacing-xs); }

  .cg-xs-hd { column-gap: var(--size-spacing-xs); }

  .bw-sm-hd { border-width: var(--size-border-width-sm); border-style: solid; }

  .bw-top-sm-hd { border-top-width: var(--size-border-width-sm); border-top-style: solid; }

  .bw-right-sm-hd { border-right-width: var(--size-border-width-sm); border-right-style: solid; }

  .bw-bottom-sm-hd { border-bottom-width: var(--size-border-width-sm); border-bottom-style: solid; }

  .bw-left-sm-hd { border-left-width: var(--size-border-width-sm); border-left-style: solid; }

  .bw-h-sm-hd { border-left-width: var(--size-border-width-sm); border-right-width: var(--size-border-width-sm); border-left-style: solid; border-right-style: solid; }

  .bw-v-sm-hd { border-top-width: var(--size-border-width-sm); border-bottom-width: var(--size-border-width-sm); border-top-style: solid; border-bottom-style: solid; }

  .br-xs-hd { border-radius: var(--size-border-radius-xs); }

  .br-top-left-xs-hd { border-top-left-radius: var(--size-border-radius-xs); }

  .br-top-right-xs-hd { border-top-right-radius: var(--size-border-radius-xs); }

  .br-bottom-right-xs-hd { border-bottom-right-radius: var(--size-border-radius-xs); }

  .br-bottom-left-xs-hd { border-bottom-left-radius: var(--size-border-radius-xs); }

  .hover\\:bw-sm-hd:hover { border-width: var(--size-border-width-sm); border-style: solid; }

  .hover\\:bw-top-sm-hd:hover { border-top-width: var(--size-border-width-sm); border-top-style: solid; }

  .hover\\:bw-right-sm-hd:hover { border-right-width: var(--size-border-width-sm); border-right-style: solid; }

  .hover\\:bw-bottom-sm-hd:hover { border-bottom-width: var(--size-border-width-sm); border-bottom-style: solid; }

  .hover\\:bw-left-sm-hd:hover { border-left-width: var(--size-border-width-sm); border-left-style: solid; }

  .hover\\:bw-h-sm-hd:hover { border-left-width: var(--size-border-width-sm); border-right-width: var(--size-border-width-sm); border-left-style: solid; border-right-style: solid; }

  .hover\\:bw-v-sm-hd:hover { border-top-width: var(--size-border-width-sm); border-bottom-width: var(--size-border-width-sm); border-top-style: solid; border-bottom-style: solid; }

  .focus\\:bw-sm-hd:focus { border-width: var(--size-border-width-sm); border-style: solid; }

  .focus\\:bw-top-sm-hd:focus { border-top-width: var(--size-border-width-sm); border-top-style: solid; }

  .focus\\:bw-right-sm-hd:focus { border-right-width: var(--size-border-width-sm); border-right-style: solid; }

  .focus\\:bw-bottom-sm-hd:focus { border-bottom-width: var(--size-border-width-sm); border-bottom-style: solid; }

  .focus\\:bw-left-sm-hd:focus { border-left-width: var(--size-border-width-sm); border-left-style: solid; }

  .focus\\:bw-h-sm-hd:focus { border-left-width: var(--size-border-width-sm); border-right-width: var(--size-border-width-sm); border-left-style: solid; border-right-style: solid; }

  .focus\\:bw-v-sm-hd:focus { border-top-width: var(--size-border-width-sm); border-bottom-width: var(--size-border-width-sm); border-top-style: solid; border-bottom-style: solid; }

}

`;

describe('utilityClass format', () => {
  test('produces utility classes for the dictionary', () => {
    const mockDate = new Date(1466424490000);

    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(utilityClass.formatter(mockDictionary)).toBe(expectedOutput);
  });
});
