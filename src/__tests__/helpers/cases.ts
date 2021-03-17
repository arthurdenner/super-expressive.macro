import {TestObject} from 'babel-plugin-tester'

type GetCasesFn = (
  buildCode: (param: string) => string,
  buildOutput: (param: RegExp) => string,
) => Record<string, TestObject | string>

export const getCases: GetCasesFn = (buildCode, buildOutput) => ({
  'Empty regex': {
    code: buildCode('SuperExpressive()'),
    output: buildOutput(/(?:)/),
  },

  'Flag: g': {
    code: buildCode('SuperExpressive().allowMultipleMatches'),
    output: buildOutput(/(?:)/g),
  },
  'Flag: m': {
    code: buildCode('SuperExpressive().lineByLine'),
    output: buildOutput(/(?:)/m),
  },
  'Flag: i': {
    code: buildCode('SuperExpressive().caseInsensitive'),
    output: buildOutput(/(?:)/i),
  },
  'Flag: y': {
    code: buildCode('SuperExpressive().sticky'),
    output: buildOutput(/(?:)/y),
  },
  'Flag: u': {
    code: buildCode('SuperExpressive().unicode'),
    output: buildOutput(/(?:)/u),
  },
  'Flag: s': {
    code: buildCode('SuperExpressive().singleLine'),
    output: buildOutput(/(?:)/s),
  },

  anyChar: {
    code: buildCode('SuperExpressive().anyChar'),
    output: buildOutput(/./),
  },
  whitespaceChar: {
    code: buildCode('SuperExpressive().whitespaceChar'),
    output: buildOutput(/\s/),
  },
  nonWhitespaceChar: {
    code: buildCode('SuperExpressive().nonWhitespaceChar'),
    output: buildOutput(/\S/),
  },
  digit: {
    code: buildCode('SuperExpressive().digit'),
    output: buildOutput(/\d/),
  },
  nonDigit: {
    code: buildCode('SuperExpressive().nonDigit'),
    output: buildOutput(/\D/),
  },
  word: {
    code: buildCode('SuperExpressive().word'),
    output: buildOutput(/\w/),
  },
  nonWord: {
    code: buildCode('SuperExpressive().nonWord'),
    output: buildOutput(/\W/),
  },
  wordBoundary: {
    code: buildCode('SuperExpressive().wordBoundary'),
    output: buildOutput(/\b/),
  },
  nonWordBoundary: {
    code: buildCode('SuperExpressive().nonWordBoundary'),
    output: buildOutput(/\B/),
  },
  newline: {
    code: buildCode('SuperExpressive().newline'),
    output: buildOutput(/\n/),
  },
  carriageReturn: {
    code: buildCode('SuperExpressive().carriageReturn'),
    output: buildOutput(/\r/),
  },
  tab: {
    code: buildCode('SuperExpressive().tab'),
    output: buildOutput(/\t/),
  },
  nullByte: {
    code: buildCode('SuperExpressive().nullByte'),
    output: buildOutput(/\0/),
  },

  'anyOf: basic': {
    code: buildCode(`
    SuperExpressive()
      .anyOf
      .string('hello')
      .digit
      .word
      .char('.')
      .char('#')
    .end()`),
    output: buildOutput(/(?:hello|\d|\w|[\.#])/),
  },

  'anyOf: range fusion': {
    code: buildCode(`
    SuperExpressive()
      .anyOf
      .range('a', 'z')
      .range('A', 'Z')
      .range('0', '9')
      .char('.')
      .char('#')
    .end()`),
    output: buildOutput(/[a-zA-Z0-9\.#]/),
  },

  'anyOf: range fusion with other choices': {
    code: buildCode(`
    SuperExpressive()
      .anyOf
      .range('a', 'z')
      .range('A', 'Z')
      .range('0', '9')
      .char('.')
      .char('#')
      .string('XXX')
    .end()`),
    output: buildOutput(/(?:XXX|[a-zA-Z0-9\.#])/),
  },

  capture: {
    code: buildCode(`
    SuperExpressive()
      .capture
      .string('hello ')
      .word
      .char('!')
    .end()`),
    output: buildOutput(/(hello \w!)/),
  },

  namedCapture: {
    code: buildCode(`
    SuperExpressive()
      .namedCapture('this_is_the_name')
      .string('hello ')
      .word
      .char('!')
    .end()`),
    output: buildOutput(/(?<this_is_the_name>hello \w!)/),
  },

  namedBackreference: {
    code: buildCode(`
    SuperExpressive()
      .namedCapture('this_is_the_name')
        .string('hello ')
        .word
        .char('!')
      .end()
      .namedBackreference('this_is_the_name')`),
    output: buildOutput(/(?<this_is_the_name>hello \w!)\k<this_is_the_name>/),
  },

  backreference: {
    code: buildCode(`
    SuperExpressive()
      .capture
        .string('hello ')
        .word
        .char('!')
      .end()
      .backreference(1)`),
    output: buildOutput(/(hello \w!)\1/),
  },

  group: {
    code: buildCode(`
    SuperExpressive()
      .group
        .string('hello ')
        .word
        .char('!')
      .end()`),
    output: buildOutput(/(?:hello \w!)/),
  },

  assertAhead: {
    code: buildCode(`
    SuperExpressive()
      .assertAhead
        .range('a', 'f')
      .end()
      .range('a', 'z')`),
    output: buildOutput(/(?=[a-f])[a-z]/),
  },

  assertBehind: {
    code: buildCode(`
    SuperExpressive()
      .assertBehind
        .string('hello ')
      .end()
      .range('a', 'z')`),
    output: buildOutput(/(?<=hello )[a-z]/),
  },

  assertNotAhead: {
    code: buildCode(`
    SuperExpressive()
      .assertNotAhead
        .range('a', 'f')
      .end()
      .range('0', '9')`),
    output: buildOutput(/(?![a-f])[0-9]/),
  },

  assertNotBehind: {
    code: buildCode(`
    SuperExpressive()
      .assertNotBehind
        .string('hello ')
      .end()
      .range('a', 'z')`),
    output: buildOutput(/(?<!hello )[a-z]/),
  },

  optional: {
    code: buildCode('SuperExpressive().optional.word'),
    output: buildOutput(/\w?/),
  },
  zeroOrMore: {
    code: buildCode('SuperExpressive().zeroOrMore.word'),
    output: buildOutput(/\w*/),
  },
  zeroOrMoreLazy: {
    code: buildCode('SuperExpressive().zeroOrMoreLazy.word'),
    output: buildOutput(/\w*?/),
  },
  oneOrMore: {
    code: buildCode('SuperExpressive().oneOrMore.word'),
    output: buildOutput(/\w+/),
  },
  oneOrMoreLazy: {
    code: buildCode('SuperExpressive().oneOrMoreLazy.word'),
    output: buildOutput(/\w+?/),
  },
  exactly: {
    code: buildCode('SuperExpressive().exactly(4).word'),
    output: buildOutput(/\w{4}/),
  },
  atLeast: {
    code: buildCode('SuperExpressive().atLeast(4).word'),
    output: buildOutput(/\w{4,}/),
  },
  between: {
    code: buildCode('SuperExpressive().between(4, 7).word'),
    output: buildOutput(/\w{4,7}/),
  },
  betweenLazy: {
    code: buildCode('SuperExpressive().betweenLazy(4, 7).word'),
    output: buildOutput(/\w{4,7}?/),
  },

  startOfInput: {
    code: buildCode('SuperExpressive().startOfInput'),
    output: buildOutput(/^/),
  },
  endOfInput: {
    code: buildCode('SuperExpressive().endOfInput'),
    output: buildOutput(/$/),
  },
  anyOfChars: {
    code: buildCode(`SuperExpressive().anyOfChars('aeiou.-')`),
    output: buildOutput(/[aeiou\.\-]/),
  },
  anythingButChars: {
    code: buildCode(`SuperExpressive().anythingButChars('aeiou.-')`),
    output: buildOutput(/[^aeiou\.\-]/),
  },
  anythingButRange: {
    code: buildCode(`SuperExpressive().anythingButRange('0', '9')`),
    output: buildOutput(/[^0-9]/),
  },
  string: {
    code: buildCode(`SuperExpressive().string('hello')`),
    output: buildOutput(/hello/),
  },
  char: {
    code: buildCode(`SuperExpressive().string('h')`),
    output: buildOutput(/h/),
  },

  range: {
    code: buildCode(`SuperExpressive().range('a', 'z')`),
    output: buildOutput(/[a-z]/),
  },

  complex: {
    code: buildCode(`
    SuperExpressive()
      .startOfInput
      .optional.string('0x')
      .capture
        .exactly(4).anyOf
          .range('A', 'F')
          .range('a', 'f')
          .range('0', '9')
        .end()
      .end()
      .endOfInput`),
    output: buildOutput(/^(?:0x)?([A-Fa-f0-9]{4})$/),
  },
})
