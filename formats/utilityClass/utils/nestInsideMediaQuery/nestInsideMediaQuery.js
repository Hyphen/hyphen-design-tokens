const nestInsideMediaQuery = (css, breakpoint) => {
  let output = '';

  output += `@media (min-width: ${breakpoint.value}px) {\n`;
  output += css;
  output += `}\n\n`;

  return output;
};

module.exports = nestInsideMediaQuery;
