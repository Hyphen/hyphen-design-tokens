const svgr = require('@svgr/core').default;
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const pascalCase = require('../pascalCase/pascalCase');
const createFileHeader = require('../createFileHeader/createFileHeader');
const indentLine = require('../indentLine/indentLine');

const BABEL_OPTIONS = {
  plugins: [
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-transform-modules-commonjs',
  ],
};

async function createLogoComponents() {
  const logos = {};

  const sourceLogosDir = path.join(__dirname, '..', '..', 'assets/images/');
  const buildLogosDir = path.join(
    __dirname,
    '..',
    '..',
    'build/assets/images/react/',
  );

  const svgFiles = fs
    .readdirSync(sourceLogosDir)
    .filter(fileName => path.extname(fileName).toLowerCase() === '.svg');

  svgFiles.forEach(function (filename) {
    const fileContent = fs.readFileSync(sourceLogosDir + filename, 'utf-8');
    logos[filename.substr(0, filename.lastIndexOf('.'))] = fileContent;
  });

  for (let i = 0; i < Object.keys(logos).length; i++) {
    const logoName = Object.keys(logos)[i];
    const componentName = pascalCase(logoName);

    const reactComponent = await svgr(logos[logoName], { componentName });

    try {
      fs.readdirSync(buildLogosDir);
    } catch {
      fs.mkdirSync(buildLogosDir);
    }

    const compiledComponent = babel.transformSync(
      reactComponent,
      BABEL_OPTIONS,
    );

    fs.writeFileSync(
      buildLogosDir + `${componentName}.js`,
      compiledComponent.code,
    );
  }

  let logoComponentsIndexFile = '';
  let logoComponentsImports = '';
  let logoComponentsExport = `const logos = {\n`;
  logoComponentsIndexFile = createFileHeader(logoComponentsIndexFile);

  for (let i = 0; i < Object.keys(logos).length; i++) {
    const logoName = Object.keys(logos)[i];
    const componentName = pascalCase(logoName);
    logoComponentsImports = logoComponentsImports.concat(
      `import ${componentName} from './${componentName}';\n`,
    );
    logoComponentsExport = logoComponentsExport.concat(
      indentLine(`'${logoName}': ${componentName},\n`, 2),
    );
  }

  logoComponentsExport = logoComponentsExport.concat(
    '};\n\n export default logos;\n',
  );
  logoComponentsIndexFile = logoComponentsIndexFile.concat(
    logoComponentsImports,
  );
  logoComponentsIndexFile = logoComponentsIndexFile.concat('\n');
  logoComponentsIndexFile =
    logoComponentsIndexFile.concat(logoComponentsExport);

  const compiledIndex = babel.transformSync(
    logoComponentsIndexFile,
    BABEL_OPTIONS,
  );
  fs.writeFileSync(buildLogosDir + 'index.js', compiledIndex.code);
}

module.exports = createLogoComponents;
