import SuperExpressive from './se.macro'

const myRegex = SuperExpressive()
  .startOfInput.optional.string('0x')
  .capture.exactly(4)
  .anyOf.range('A', 'F')
  .range('a', 'f')
  .range('0', '9')
  .end()
  .end()
  .endOfInput.toRegex()

console.log(myRegex)
