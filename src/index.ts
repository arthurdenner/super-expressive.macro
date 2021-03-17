import type BabelCore from '@babel/core'
import {Node, NodePath} from '@babel/traverse'
import {createMacro, MacroError, MacroHandler} from 'babel-plugin-macros'
import SprExp from 'super-expressive'

const SuperExpressive = SprExp // to preverse the name

const CASTS = ['toRegex', 'toRegexString']

function checkForVariables(path: NodePath<Node>) {
  if (path.isCallExpression()) {
    path.get('arguments').forEach(arg => {
      if (arg.isIdentifier()) {
        throw new MacroError(
          `The macro doesn't support variables. Found '${arg.node.name}'`,
        )
      }
    })
  }
}

function isEndOfExpression(path: NodePath<Node>) {
  return (
    path.isMemberExpression() &&
    // @ts-expect-error
    CASTS.includes(path.node.property.name)
  )
}

function evaluate(source: string) {
  let x: string | RegExp
  eval(`x = ${source}`)
  // @ts-expect-error
  return x
}

const buildReplacement = (value: string | RegExp, babel: typeof BabelCore) => {
  if (typeof value === 'string') {
    return babel.types.stringLiteral(value)
  }

  const fileNode = babel.parse(`var x = ${value}`)

  // @ts-expect-error
  // @eslint-disable-next-line
  return fileNode.program.body[0].declarations[0].init
}

const superExpressiveMacro: MacroHandler = ({references, babel}) => {
  references.default.forEach(referencePath => {
    if (!referencePath.parentPath.isCallExpression()) {
      throw new MacroError(
        `The macro must be used as function call, with chained expressions`,
      )
    }

    const expressionPath = referencePath.findParent(path => {
      checkForVariables(path)

      return isEndOfExpression(path)
    })

    if (!expressionPath) {
      throw new MacroError(`The macro must end with ${CASTS.join(' or ')}`)
    }

    const source = expressionPath.parentPath
      .getSource()
      // @ts-expect-error
      .replace(referencePath.node.name, 'SuperExpressive')
    const valueNode = buildReplacement(evaluate(source), babel)

    expressionPath.parentPath.replaceWith(valueNode)
  })
}

export default createMacro(superExpressiveMacro) as typeof SuperExpressive
