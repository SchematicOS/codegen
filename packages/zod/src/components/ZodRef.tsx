import {
  File,
  useFile,
  useRegisterImportsLazy,
  Value,
  Definition,
  useTransformer,
  Identifier
} from '@schematicos/generate'
import { OasSchemaRef } from '@schematicos/types'

type ZodRefProps = {
  value: OasSchemaRef
}

export const ZodRef = ({ value }: ZodRefProps) => {
  const ctx = useTransformer()
  const { destination } = useFile()
  const registerImports = useRegisterImportsLazy()

  const identifier = Identifier.from$Ref({
    $ref: value.$ref,
    type: ctx.typeSystem.type,
    ctx
  })

  const labelName = identifier.toLabelName()

  const isImported = identifier.isImported(destination)

  const schemaValue = ctx.resolveRef(value)

  // Refererenced value is being rendered in another file
  if (isImported) {
    // 1. We need to register the import so that this file
    // will import the value from the correct location

    registerImports({
      [identifier.toImportFrom()]: [identifier.name]
    })

    // 2. We need to render the value in its own file
    // so that its exported for our use
    return (
      <>
        <File destination={identifier.source}>
          <Definition identifier={identifier}>
            <Value value={schemaValue} required />
          </Definition>
        </File>
        {labelName}
      </>
    )
  }

  // If referenced value is rendered in current file
  // we render the value in its definitions

  // 'IDENTIFIER', identifier.name, identifier.type)

  return (
    <>
      <Definition identifier={identifier}>
        <Value value={schemaValue} required />
      </Definition>
      {labelName}
    </>
  )
}
