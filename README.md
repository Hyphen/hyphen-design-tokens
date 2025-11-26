# Hyphen Design Tokens

[![npm version](https://badge.fury.io/js/%40hyphen%2Fhyphen-design-tokens.svg)](https://badge.fury.io/js/%40hyphen%2Fhyphen-design-tokens)

A central location to store shared attributes of the hyphen Design System. These attributes include: colors, fonts, spacing, and more. Using [Amazon's Style Dictionary](https://amzn.github.io/style-dictionary/) we transform attributes into usable variables for a variety of platforms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Tokens](#available-tokens)
- [Local Development](#local-development)
- [Update Tokens via file](#update-tokens-via-file)
- [Updating Icons](#updating-icons)
- [Releases](#releases)
- [How to Publish to NPM](#how-to-publish-to-npm)

## Usage

### Install The package in your project

```terminal
pnpm add @hyphen/hyphen-design-tokens
```

### Import tokens into your project based on your platform requirements

Ideally you'd want to import them into a file that exposes them to your entire application.

CSS Variables imported into a .css file

```css
@import "~@hyphen/hyphen-design-tokens/build/css/variables.css";
```

SASS Variables imported into a .scss file

```scss
@import "~@hyphen/hyphen-design-tokens/build/scss/variables.scss";
```

CSS Utility Classes imported into a .css file

```css
@import "~@hyphen/hyphen-design-tokens/build/utilities/utilities.css";
```

### Use variables as needed

CSS

```css
.class-with-base-text-color: {
  color: var(--color-font-base);
}
--my-own-shadow-variable: 1rem 1rem var(--color-base-black);
```

### Using Icons

The library includes custom svg icons from the design system. They are provided in two formats, `svg` or as React components.

They can be pulled from the build here:

```text
@hyphen/hyphen-design-tokens/build/assets/icons/ // <-- SVG ICONS
@hyphen/hyphen-design-tokens/build/assets/icons/react // <-- React Components. NOTE: there is an index file that maps all icons in a dictionary, but they can also be used individually.
```

USING RAW SVGs

```html
<img src="../user.svg" alt="user" />
```

USING REACT COMPONENTS

```react
import UserIcon from '@hyphen/hyphen-design-tokens/build/assets/icons/react/Add'; <-- Single Icon Import

// or
import icons from '@hyphen/hyphen-design-tokens/build/assets/icons/react; <-- Icon map

const MyUserIcon = icons['user']; <-- Use icon name to.

<MyUserIcon {...props} />


// All icon names are documented in the IconName union type.
import { IconName } from '@hyphen/hyphen-design-tokens/build/types';
```

## Available Tokens

- Assets
  - Font Family
- Color
  - Brand
  - Font
  - Border
- Size
  - Border
  - Border Radius
  - Box Shadow
  - Breakpoint
  - Height
  - Font Size
  - Font Weight
  - Line-Height
  - Spacing
  - Width
  - Z-Index

## Local Development

To build tokens locally run `pnpm run build`. NOTE: you will need a local `.env` file with a Figma access token assigned to `FIGMA_PERSONAL_ACCESS_TOKEN`. See [HOW TO GET A FIGMA ACCESS TOKEN](https://www.figma.com/developers/api#authentication). If you are still unsure how to get a working access token, or the process is not working for you, please reach out to one of our library owners.

In order to test any local changes you'll need to build tokens, and symlink your local package into any project that consumes it. See [pnpm link](https://pnpm.io/cli/link), [npm link](https://docs.npmjs.com/cli/link) or [yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) for more details.

## Updating Icons

The build process handles the following:

- mapping any svg icons in the `/icons` folder into the appropriate build directory
- updating the `IconName` type based on the file names in the directory.
- Creating corresponding react components for each svg, and transpiling the resulting JSX with babel.
- Regenerating the icons index map for use in react applications.

As a developer, to update icons all that needs to be done is add them to the `/icons` folder with the name that you want the icon to have. Please follow
these rules when exporting and adding icons:

- SVGs should be exported with a size of 16x16px since this will be the size of our default viewbox.
- SVGS should be exported with default width, height of `1em` so they will inherit their size from the adjacent element font sizes, or a class/style applied directly.
- SVGs must not include fill or stroke color, instead being exported with a value of `'currentColor'` for both these attributes. This will ensure proper inheritance.
- Remove any `classNames` or `title` that might be in the svg file
- SVG files should be named using `kebab-case`.
- Commit your changes using the following commit message format: 'feat(Icon): new-icon-name, new-icon-name2`
- Open a pull request and get it approved for publishing

## Releases

[↥ back to top](#top)

hyphen Components uses the [semantic-release](https://github.com/semantic-release/semantic-release) npm package to fully automate the release workflow. Instead of manually updating the release version in `package.json`, and creating a new release tag in GitHub for each release, they are automatically triggered by prefixing the commit message when merging to `main`. Upon triggering a release, the package version is bumped depending on the type specified, a release tag is created in GitHub, and the new version is automatically published to [npm](https://www.npmjs.com/).

For example, opening a PR to main with the commit message `fix: Resolve bug`, will trigger a minor release and bump the package's version from `0.0.0` to `0.0.1`. Opening a PR with `feat(Table): Finalize tests` will trigger a feature release and bump the package's version from `0.0.0` to `0.1.0`.

The link above provides full documentation for this workflow. However, a comprehensive list of the prefix types, and their intended uses are provide below for quick reference:

### Release Types

Must be one of the following:

### Major

- **BREAKING CHANGE**: A set of breaking changes.

### Minor

- **feat**: A new feature

### Patch

- **fix**: A bug fix
- **perf**: A code change that improves performance
- **ci**: A change to our CI pipelines/workflows.
- **build**: A change to the library build process (That does not break the consumer API).
- **test**: Added or improved testing in some area of the library.
- **refactor**: Changed code structure without affecting features.
- **docs**: Added to, or improved documentation.
- **style**: Change in code style without affecting features.

### Prerelease

If your code includes major changes or any breaking changes to the codebase, I.E, a new major version, or a large refactor, that will require a pre-release,
and more extensive testing. To publish a pre-release, open (and eventually merge) your PR against the `beta` branch. This will
publish the package with a @beta tag which can then be easily consumed and tested by other consumers locally.

## How to Publish to NPM

Publishing to NPM is handled automatically by the CI/CD pipeline. Here are the steps:

1. Bump the version in `package.json` to the appropriate type, and merge your PR to `main`.
2. Create a `release` in github with the appropriate version number. This will trigger the CI/CD pipeline to publish the package to NPM.

If you need to publish a pre-release, or a hotfix, you can do so manually by following these steps:

1. Checkout the `main` branch
2. Run `pnpm run build` to ensure the package is up to date
3. Run `pnpm version [major | minor | patch | prerelease]` to bump the package version
4. Run `pnpm publish --tag <insert tag>` to publish the package to NPM
