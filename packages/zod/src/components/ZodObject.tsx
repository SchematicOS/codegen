import { OasObject, Stringable } from '@schematicos/types'
import { match, P } from 'ts-pattern'
import { $, elements, Value } from '@schematicos/generate'

const { List, NameValue } = elements

type ZodObjectProps = {
  value: OasObject
}

export const ZodObject = ({ value }: ZodObjectProps) => {
  const { properties, required, additionalProperties } = value

  const objectProperties = properties ? (
    <ZodObjectProperties properties={properties} required={required} />
  ) : null

  const recordProperties = additionalProperties ? (
    <ZodObjectRecord additionalProperties={additionalProperties} />
  ) : null

  if (objectProperties && recordProperties) {
    return $`z.union([${objectProperties},${recordProperties}])`
  }

  return objectProperties ?? recordProperties ?? `z.object({})`
}

type ZodObjectPropertiesProps = {
  properties: Exclude<OasObject['properties'], undefined>
  required: OasObject['required']
}

const ZodObjectProperties = ({
  properties,
  required = []
}: ZodObjectPropertiesProps) => (
  <ZodObjectPlain>
    <List key="key" separator={`,\n`} wrapper="object">
      {Object.entries(properties).map(([name, property]) => (
        <NameValue key={name} name={name}>
          <Value value={property} required={required.includes(name)} />
        </NameValue>
      ))}
    </List>
  </ZodObjectPlain>
)

type ZodObjectPlainProps = {
  children?: Stringable
}

const ZodObjectPlain = ({ children }: ZodObjectPlainProps) => {
  return $`z.object(${children})`
}

type ZodObjectRecordProps = {
  additionalProperties: OasObject['additionalProperties']
}

const ZodObjectRecord = ({ additionalProperties }: ZodObjectRecordProps) => (
  <ZodRecordPlain>
    {match(additionalProperties)
      .with(true, () => 'true')
      .with(
        P.intersection(
          P.not({ schematicType: 'schema' }),
          P.not({ schematicType: 'ref' })
        ),
        () => 'true'
      )
      .with({ schematicType: 'ref' }, matched => {
        // Using true here since keys are optional, hence it makes not sense to make values optional too
        return <Value value={matched} required={true} />
      })
      .with({ schematicType: 'schema' }, matched => {
        // Using true here since keys are optional, hence it makes not sense to make values optional too
        return <Value value={matched} required={true} />
      })
      .exhaustive()}
  </ZodRecordPlain>
)

type ZodRecordPlainProps = {
  children?: Stringable
}

const ZodRecordPlain = ({ children }: ZodRecordPlainProps) => {
  return $`z.record(z.string(), ${children})`
}
