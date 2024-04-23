import type { OpenAPIV3 } from 'openapi-types'

export const mockComponents: OpenAPIV3.ComponentsObject = {
  schemas: {
    UpdateProjectRequest: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'The name of the project to be updated to. This must be globally unique.\nIf this is `null`, no update will be made to the project name.',
          example: 'my-project2',
          nullable: true
        },
        description: {
          type: 'string',
          description:
            'The description of the project to be updated to. If this is `null`, no\nupdate will be made to the project description.',
          example: 'This is my project2.',
          nullable: true,
          maxLength: 1000
        }
      }
    }
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      description:
        'The request is authorized by a token issued to the user or organization.\nThe token is sent in a header that looks like this: `Authorization: \nBearer {token}`, for example: `Authorization: Bearer\nddw_AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrS`.'
    }
  }
}
