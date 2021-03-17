import plugin from 'babel-plugin-macros'
import pluginTester from 'babel-plugin-tester'

const buildCode = (expression: string) => `
import SuperExpressive from './helpers/se.macro';

const rgx = ${expression}.toRegex()
`

pluginTester({
  plugin,
  pluginName: 'SuperExpressiveMacro',
  babelOptions: {filename: __filename},
  tests: {
    'namedCapture error on bad name': {
      code: buildCode(`
      SuperExpressive()
        .namedCapture('hello world')
        .string('hello ')
        .word
        .char('!')
        .end()`),
      error:
        'name "hello world" is not valid (only letters, numbers, and underscores)',
    },

    'namedCapture error same name more than once': {
      code: buildCode(`
      SuperExpressive()
        .namedCapture('hello')
        .string('hello ')
        .word
        .char('!')
        .end()
        .namedCapture('hello')
        .string('hello ')
        .word
        .char('!')
        .end()
      `),
      error: 'cannot use hello again for a capture group',
    },

    'namedBackreference no capture group exists': {
      code: buildCode(`SuperExpressive().namedBackreference('not_here')`),
      error:
        'no capture group called "not_here" exists (create one with .namedCapture())',
    },

    'backreference no capture group exists': {
      code: buildCode(`SuperExpressive().backreference(1)`),
      error:
        'invalid index 1. There are 0 capture groups on this SuperExpression',
    },

    'end: error when called with no stack': {
      code: buildCode(`SuperExpressive().end()`),
      error: 'Cannot call end while building the root expression',
    },

    'char: more than one': {
      code: buildCode(`SuperExpressive().char('hello')`),
      error: 'char() can only be called with a single character (got hello)',
    },
  },
})
