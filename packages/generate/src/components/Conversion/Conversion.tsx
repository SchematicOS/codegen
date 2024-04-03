import { Identifier } from '@/lib/Identifier.ts'

type ConversionProps = {
  tsIdentifier: Identifier
  zodIdentifier: Identifier
}

// @TODO: Zod specific functionality should not be in shared components
export const Conversion = ({
  tsIdentifier,
  zodIdentifier
}: ConversionProps) => {
  return `export type ${tsIdentifier.toLabelName()} = z.infer<typeof ${zodIdentifier}>\n\n`
}
