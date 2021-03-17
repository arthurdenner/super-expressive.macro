# super-expressive.macro

A macro to generate regular expressions at build-time with super-expressive.

<!-- prettier-ignore-start -->
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)
[![version][version-badge]][package] [![MIT License][license-badge]][license]
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
<!-- prettier-ignore-end -->

> You may like to watch
> [this YouTube video](https://www.youtube.com/watch?v=1queadQ0048&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
> to get an idea of what macros are and how to use them.

## Motivation

[Super Expressive](https://github.com/francisrstokes/super-expressive) is
awesome, but it's a runtime library only.

Depending on the use case, Super Expressive is very useful for declaring the
regular expressions, but when building the project, the final expression is
preferred.

This library aims to be a drop-in replacement for Super Expressive where
applicable - see [restrictions](#restrictions).

## Installation

`npm install super-expressive.macro`

`yarn add super-expressive.macro`

> This library depends on `super-expressive`. Please make sure to install it.

## Usage

To use macros, make sure to
[set up `babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md).

## Example

```js
import SuperExpressive from 'super-expressive.macro'

const myRegex = SuperExpressive()
  .startOfInput.optional.string('0x')
  .capture.exactly(4)
  .anyOf.range('A', 'F')
  .range('a', 'f')
  .range('0', '9')
  .end()
  .end()
  .endOfInput.toRegex()
```

After compilation:

```js
const myRegex = /^(?:0x)?([A-Fa-f0-9]{4})$/
```

> Notice that the macro import disappeared after compilation

Check the
[`super-expressive`'s detailed API](https://github.com/francisrstokes/super-expressive/#api)
for more examples. Don't forget to check the [restrictions](#restrictions).

## Restrictions

Because this plugin runs at build-time, there are some restrictions to its
usage.

- You can't use dynamic variables inside the macro, all the params to its
  methods must be literals;
- You can't use constant variables inside the macro at the moment but
  [there's an issue](https://github.com/arthurdenner/super-expressive.macro/issues/2)
  to track if this is possible as we improve this macro;
- You can't use [subexpressions] inside the macro at the moment but
  [there's an issue](https://github.com/arthurdenner/super-expressive.macro/issues/3)
  to track if this is possible as we improve this macro;

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://linktr.ee/arthurdenner"><img src="https://avatars.githubusercontent.com/u/13774309?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arthur Denner</b></sub></a><br /><a href="https://github.com/arthurdenner/super-expressive.macro/commits?author=arthurdenner" title="Code">💻</a> <a href="#maintenance-arthurdenner" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!

## LICENSE

MIT

[license-badge]:
  https://img.shields.io/npm/l/super-expressive.macro.svg?style=flat-square
[license]:
  https://github.com/arthurdenner/super-expressive.macro/blob/main/LICENSE
[version-badge]:
  https://img.shields.io/npm/v/super-expressive.macro.svg?style=flat-square
[package]: https://www.npmjs.com/package/super-expressive.macro
