import plugin from 'babel-plugin-macros'
import pluginTester from 'babel-plugin-tester'
import {getCases} from './helpers/cases'

const buildCode = (expression: string) => `
import SuperExpressive from './helpers/se.macro';

const rgx = ${expression}.toRegexString()
`

const buildOutput = (regex: RegExp) =>
  `const rgx = ${JSON.stringify(regex.toString()).replace(/"/g, "'")}`

pluginTester({
  plugin,
  pluginName: 'SuperExpressiveMacro',
  babelOptions: {filename: __filename},
  tests: getCases(buildCode, buildOutput),
})
