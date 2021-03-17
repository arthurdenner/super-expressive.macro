import plugin from 'babel-plugin-macros'
import pluginTester from 'babel-plugin-tester'
import {getCases} from './helpers/cases'

const buildCode = (expression: string) => `
import SuperExpressive from './helpers/se.macro';

const rgx = ${expression}.toRegex()
`

const buildOutput = (regex: RegExp) => `const rgx = ${regex}`

pluginTester({
  plugin,
  pluginName: 'SuperExpressiveMacro',
  babelOptions: {filename: __filename},
  tests: {
    ...getCases(buildCode, buildOutput),
    'replace param': {
      code: `
      import SuperExpressive from './helpers/se.macro';
      'a1b2c3'.replace(SuperExpressive().anyOfChars("123").allowMultipleMatches.toRegex(), "-")
      `,
      output: "'a1b2c3'.replace(/[123]/g, '-')",
    },
    'readme example': {
      code: `import SuperExpressive from './helpers/se.macro'
  
      const myRegex = SuperExpressive()
        .startOfInput.optional.string('0x')
        .capture.exactly(4)
        .anyOf.range('A', 'F')
        .range('a', 'f')
        .range('0', '9')
        .end()
        .end()
        .endOfInput.toRegex()`,
      output: `const myRegex = /^(?:0x)?([A-Fa-f0-9]{4})$/`,
    },
  },
})
