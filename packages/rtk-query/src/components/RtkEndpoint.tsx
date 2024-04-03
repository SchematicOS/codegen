import { useEndpointArg } from '@/components/useEndpointArg.ts'
import { useEndpointResponse } from '@/components/useEndpointResponse.tsx'
import { QueryCall } from '@/components/QueryCall.tsx'
import { toEndpointName, toEndpointType } from '@/components/util.ts'
import { $, Value, TypeName } from '@schematicos/generate'
import { OasOperation } from '@schematicos/types'

export type RtkEndpointProps = {
  operation: OasOperation
}

export const RtkEndpoint = ({ operation }: RtkEndpointProps) => {
  const endpointResponse = useEndpointResponse(operation)

  const endpointArg = useEndpointArg(operation)

  const queryCall = <QueryCall key="key" operation={operation} />

  return $`${toEndpointName(operation)}: build.${toEndpointType(operation)}<${(
    <TypeName key="response" identifier={endpointResponse.identifier}>
      <Value value={endpointResponse.value} required />
    </TypeName>
  )},${(
    <TypeName key="args" identifier={endpointArg.identifier}>
      <Value value={endpointArg.value} required />
    </TypeName>
  )}>
    ({query: ${queryCall}})`
}
