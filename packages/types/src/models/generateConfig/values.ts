import { GenerateConfigType } from 'models/generateConfig/types.ts'

export const defaultGenerateConfig: GenerateConfigType = {
  language: 'typescript',
  transformerIds: [],
  typeSystemId: undefined
}
