import plugin from 'babel-plugin-macros'
import pluginTester from 'babel-plugin-tester'

const buildCode = (expression: string) => `
import SuperExpressive from './helpers/se.macro';

const rgx = ${expression}
`

pluginTester({
  plugin,
  pluginName: 'SuperExpressiveMacro',
  babelOptions: {filename: __filename},
  tests: {
    "can't be used as template string": {
      code: buildCode('SuperExpressive`hello`'),
      error: /The macro must be used as function/,
    },

    'macro must end with valid casts': {
      code: buildCode(`SuperExpressive().string('hello').end()`),
      error: /The macro must end with/,
    },

    'variables in arguments are not allowed': {
      code: buildCode(`SuperExpressive().string(x).end().toRegex()`),
      error: /The macro doesn't support variables/,
    },
  },
})
