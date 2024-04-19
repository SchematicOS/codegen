import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { default as FormLabel } from '@mui/joy/FormLabel'
import { default as Input } from '@mui/joy/Input'
import { default as FormControl } from '@mui/joy/FormControl'
import { default as FormHelperText } from '@mui/joy/FormHelperText'
import { default as React } from 'react'
import { default as Box } from '@mui/joy/Box'
import { zodResolver } from '@hookform/resolvers/zod'
import { default as Button } from '@mui/joy/Button'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const compilerOptions =
  /** Compiler options to be used when building the deployment.

If `null` is given, Deno's config file (i.e. `deno.json` or `deno.jsonc`)
will be auto-discovered, which may contain a `compilerOptions` field. If
found, that compiler options will be applied.

If an empty object `{}` is given, [the default compiler options](https://docs.deno.com/runtime/manual/advanced/typescript/configuration#how-deno-uses-a-configuration-file)
will be applied. */
  z.object({
    /** Whether to enable TypeScript's experimental decorators. If set to `false`,
ECMAScript decorators will be enabled instead.

If omitted, this field will be interpreted as `false`.

If the code being deployed uses any kind of decorators, this field must be
set. Otherwise, the build process will fail. */
    experimentalDecorators: z.boolean().optional(),
    jsx: z.string().optional(),
    jsxFactory: z.string().optional(),
    jsxFragmentFactory: z.string().optional(),
    jsxImportSource: z.string().optional()
  })
export const encoding = z.string()
export const file = z.union([
  z.object({ content: z.string(), encoding: encoding.optional() }),
  z.object({ gitSha1: z.string() })
])
export const symlink = z.object({ target: z.string() })
export const asset = z.discriminatedUnion(
  'status',
  file.and(z.object({ kind: z.string() })),
  symlink.merge(z.object({ kind: z.string() }))
)
export const assets =
  /** A map whose key represents a file path, and the value is an asset that
composes the deployment.

Each asset is one of the following three kinds:

1. A file with content data (which is UTF-8 for text, or base64 for binary)
2. A file with a hash
3. A symbolic link to another asset

Assets that were uploaded in some of the previous deployments don't need to
be uploaded again. In this case, in order to identify the asset, just
provide the SHA-1 hash of the content. */
  z.record(z.string(), asset)
export const deploymentPermissions =
  /** Permissions to be set for the deployment.

Currently only `net` is supported, where you can specify a list of IP
addresses and/or hostnames that the deployment is allowed to make outbound
network requests to. */
  z.object({
    /** A list of IP addresses that the deployment is allowed to make outbound
network requests to.

Each element must be a valid IPv4, IPv6, or a hostname like `example.com`
although outbound network requests using IPv6 are not supported yet in
Deno Deploy regardless.
In addition to these, a special value `*` can be used, which means all
accesses are allowed. Also note the following:

- If omitted, all accesses will be allowed.
- If an empty list is provided, all accesses will be **denied**. */
    net: z.array(z.string()).optional()
  })
export const deploymentPermissionsOverwrite =
  /** Permissions to be overwritten for the deployment's existing permissions.

Currently only `net` is supported, where you can specify a list of IP
addresses and/or hostnames that the deployment is allowed to make outbound
network requests to. */
  z.object({
    /** A list of IP addresses that the deployment is allowed to make outbound
network requests to.

Each element must be a valid IPv4, IPv6, or a hostname like `example.com`
although outbound network requests using IPv6 are not supported yet in
Deno Deploy regardless.
In addition to these, a special value `*` can be used, which means all
accesses are allowed. Also note the following:

- If omitted, no update will happen to the existing permissions.
- If an empty list is provided, all accesses will be **denied**. */
    net: z.array(z.string()).optional()
  })
export const organization = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})
export const getApiOrganizationsOrganizationIdResponse = organization
export type GetApiOrganizationsOrganizationIdResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdResponse
>
export const getApiOrganizationsOrganizationIdArgs = z.object({
  organizationId: z.string()
})
export const analyticsFieldType =
  /** A data type that analytic data can be represented in.

Inspired by Grafana's data types defined at:
https://github.com/grafana/grafana/blob/e3288834b37b9aac10c1f43f0e621b35874c1f8a/packages/grafana-data/src/types/dataFrame.ts#L11-L23 */
  z.string()
export const analyticsFieldSchema = z.object({
  name: z.string(),
  type: analyticsFieldType
})
export const analyticsDataValue = z.union([
  z.string(),
  z.number(),
  z.string(),
  z.boolean(),
  z.unknown()
])
export const analytics =
  /** Project analytics data */
  z.object({
    fields: z.array(analyticsFieldSchema),
    values: z.array(z.array(analyticsDataValue))
  })
export const getApiOrganizationsOrganizationIdAnalyticsResponse = analytics
export type GetApiOrganizationsOrganizationIdAnalyticsResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdAnalyticsResponse
>
export const getApiOrganizationsOrganizationIdAnalyticsArgs = z.object({
  organizationId: z.string(),
  since: z.string(),
  until: z.string()
})
export const project = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})
export const getApiOrganizationsOrganizationIdProjectsResponse =
  z.array(project)
export type GetApiOrganizationsOrganizationIdProjectsResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdProjectsResponse
>
export const getApiOrganizationsOrganizationIdProjectsArgs = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  q: z.string().optional(),
  sort: z.string().optional(),
  order: z.string().optional(),
  organizationId: z.string()
})
export const createProjectRequest = z.object({
  /** The name of the project. This must be globally unique. If this is `null`,
a random unique name will be generated. */
  name: z.string().optional(),
  /** The description of the project. If this is `null`, an empty string will be
set. */
  description: z.string().optional()
})
export const postApiOrganizationsOrganizationIdProjectsResponse = project
export type PostApiOrganizationsOrganizationIdProjectsResponse = z.infer<
  typeof postApiOrganizationsOrganizationIdProjectsResponse
>
export const postApiOrganizationsOrganizationIdProjectsArgs = z.object({
  organizationId: z.string(),
  body: createProjectRequest
})
export const kvDatabase = z.object({
  /** A KV database ID */ id: z.string(),
  /** An organization ID that this KV database belongs to */
  organizationId: z.string(),
  /** A description of this KV database */ description: z.string(),
  updatedAt: z.string(),
  createdAt: z.string()
})
export const getApiOrganizationsOrganizationIdDatabasesResponse =
  z.array(kvDatabase)
export type GetApiOrganizationsOrganizationIdDatabasesResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdDatabasesResponse
>
export const getApiOrganizationsOrganizationIdDatabasesArgs = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  q: z.string().optional(),
  sort: z.string().optional(),
  order: z.string().optional(),
  organizationId: z.string()
})
export const createKvDatabaseRequest = z.object({
  /** The description of the KV database. If this is `null`, an empty string
will be set. */
  description: z.string().optional()
})
export const postApiOrganizationsOrganizationIdDatabasesResponse = kvDatabase
export type PostApiOrganizationsOrganizationIdDatabasesResponse = z.infer<
  typeof postApiOrganizationsOrganizationIdDatabasesResponse
>
export const postApiOrganizationsOrganizationIdDatabasesArgs = z.object({
  organizationId: z.string(),
  body: createKvDatabaseRequest
})
export const updateKvDatabaseRequest = z.object({
  /** The description of the KV database to be updated to. If this is `null`, no
update will be made to the KV database description. */
  description: z.string().optional()
})
export const patchApiDatabasesDatabaseIdResponse = kvDatabase
export type PatchApiDatabasesDatabaseIdResponse = z.infer<
  typeof patchApiDatabasesDatabaseIdResponse
>
export const patchApiDatabasesDatabaseIdArgs = z.object({
  databaseId: z.string(),
  body: updateKvDatabaseRequest
})
export const getApiProjectsProjectIdResponse = project
export type GetApiProjectsProjectIdResponse = z.infer<
  typeof getApiProjectsProjectIdResponse
>
export const getApiProjectsProjectIdArgs = z.object({ projectId: z.string() })
export const deleteApiProjectsProjectIdResponse = z.void()
export type DeleteApiProjectsProjectIdResponse = z.infer<
  typeof deleteApiProjectsProjectIdResponse
>
export const deleteApiProjectsProjectIdArgs = z.object({
  projectId: z.string()
})
export const updateProjectRequest = z.object({
  /** The name of the project to be updated to. This must be globally unique.
If this is `null`, no update will be made to the project name. */
  name: z.string().optional(),
  /** The description of the project to be updated to. If this is `null`, no
update will be made to the project description. */
  description: z.string().optional()
})
export const patchApiProjectsProjectIdResponse = project
export type PatchApiProjectsProjectIdResponse = z.infer<
  typeof patchApiProjectsProjectIdResponse
>
export const patchApiProjectsProjectIdArgs = z.object({
  projectId: z.string(),
  body: updateProjectRequest
})
export const getApiProjectsProjectIdAnalyticsResponse = analytics
export type GetApiProjectsProjectIdAnalyticsResponse = z.infer<
  typeof getApiProjectsProjectIdAnalyticsResponse
>
export const getApiProjectsProjectIdAnalyticsArgs = z.object({
  projectId: z.string(),
  since: z.string(),
  until: z.string()
})
export const deploymentId =
  /** A deployment ID

Note that this is not UUID v4, as opposed to organization ID and project ID. */
  z.string()
export const deploymentStatus = /** The status of a deployment. */ z.string()
export const deployment = z.object({
  id: deploymentId,
  projectId: z.string(),
  /** The description of this deployment. This is present only when the `status`
is `success`. */
  description: z.string().optional(),
  status: deploymentStatus,
  domains: z.array(z.string()).optional(),
  /** The KV databases that this deployment has access to.
Currently, only `"default"` database is supported. */
  databases: z.record(z.string(), z.string()),
  /** The wall-clock timeout in milliseconds for requests to the deployment.

This becomes `null` when no timeout is set, or the deployment has not been
done successfully yet. */
  requestTimeout: z.number().int().optional(),
  permissions: deploymentPermissions.optional(),
  createdAt: z.string(),
  updatedAt: z.string()
})
export const getApiProjectsProjectIdDeploymentsResponse = z.array(deployment)
export type GetApiProjectsProjectIdDeploymentsResponse = z.infer<
  typeof getApiProjectsProjectIdDeploymentsResponse
>
export const getApiProjectsProjectIdDeploymentsArgs = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  q: z.string().optional(),
  sort: z.string().optional(),
  order: z.string().optional(),
  projectId: z.string()
})
export const createDeploymentRequest = z.object({
  /** An URL of the entry point of the application.
This is the file that will be executed when the deployment is invoked. */
  entryPointUrl: z.string(),
  /** An URL of the import map file.

If `null` is given, import map auto-discovery logic will be performed,
where it looks for Deno's config file (i.e. `deno.json` or `deno.jsonc`)
which may contain an embedded import map or a path to an import map file.
If found, that import map will be used.

If an empty string is given, no import map will be used. */
  importMapUrl: z.string().optional(),
  /** An URL of the lock file.

If `null` is given, lock file auto-discovery logic will be performed,
where it looks for Deno's config file (i.e. `deno.json` or `deno.jsonc`)
which may contain a path to a lock file or boolean value, such as `"lock":
false` or `"lock": "my-lock.lock"`. If a config file is found, the
semantics of the lock field is the same as the Deno CLI, so refer to [the
CLI doc page](https://docs.deno.com/runtime/manual/basics/modules/integrity_checking#auto-generated-lockfile).

If an empty string is given, no lock file will be used. */
  lockFileUrl: z.string().optional(),
  compilerOptions: compilerOptions.optional(),
  assets: assets,
  /** A dictionary of environment variables to be set in the runtime environment
of the deployment. */
  envVars: z.record(z.string(), z.string()),
  /** KV database ID mappings to associate with the deployment.

A key represents a KV database name (e.g. `"default"`), and a value is a
KV database ID.

Currently, only `"default"` database is supported. If any other database
name is specified, that will be rejected.

If not provided, the deployment will be created with no KV database
attached. */
  databases: z.record(z.string(), z.string()).optional(),
  /** The wall-clock timeout in milliseconds for requests to the deployment.

If not provided, the system default value will be used. */
  requestTimeout: z.number().int().optional(),
  permissions: deploymentPermissions.optional(),
  /** A description of the created deployment. If not provided, an empty string
will be set. */
  description: z.string().optional()
})
export const postApiProjectsProjectIdDeploymentsResponse = deployment
export type PostApiProjectsProjectIdDeploymentsResponse = z.infer<
  typeof postApiProjectsProjectIdDeploymentsResponse
>
export const postApiProjectsProjectIdDeploymentsArgs = z.object({
  projectId: z.string(),
  body: createDeploymentRequest
})
export const redeployRequest = z.object({
  /** A dictionary of environment variables to be set in the runtime environment
of the deployment.

The provided environment variables will be _merged_ with the existing one.
For example, if the existing environment variables are:

```json
{
"a": "alice",
"b": "bob"
"c": "charlie"
}
```

and you pass the following environment variables in your redeploy request:

```json
{
"a": "alice2",
"b": null,
"d": "david"
}
```

then the result will be:

```json
{
"a": "alice2",
"c": "charlie",
"d": "david"
}
```

If `envVars` itself is not provided, no update will happen to the
existing environment variables.

For a historical reason, `env_vars` is also accepted as well as `envVars`,
although `env_vars` is deprecated. */
  envVars: z.record(z.string(), z.string()).optional(),
  /** KV database ID mappings to associate with the deployment.

A key represents a KV database name (e.g. `"default"`), and a value is a
KV database ID.

Currently, only `"default"` database is supported. If any other database
name is specified, that will be rejected.

The provided KV database mappings will be _merged_ with the existing one,
just like `env_vars`.

If `databases` itself is not provided, no update will happen to the
existing KV database mappings. */
  databases: z.record(z.string(), z.string()).optional(),
  /** The wall-clock timeout in milliseconds for requests to the deployment.

If not provided, no update will happen to the existing request timeout. */
  requestTimeout: z.number().int().optional(),
  permissions: deploymentPermissionsOverwrite.optional(),
  /** A description of the created deployment. If not provided, no update will
happen to the description. */
  description: z.string().optional()
})
export const postApiDeploymentsDeploymentIdRedeployResponse = deployment
export type PostApiDeploymentsDeploymentIdRedeployResponse = z.infer<
  typeof postApiDeploymentsDeploymentIdRedeployResponse
>
export const postApiDeploymentsDeploymentIdRedeployArgs = z.object({
  deploymentId: deploymentId,
  body: redeployRequest
})
export const getApiDeploymentsDeploymentIdResponse = deployment
export type GetApiDeploymentsDeploymentIdResponse = z.infer<
  typeof getApiDeploymentsDeploymentIdResponse
>
export const getApiDeploymentsDeploymentIdArgs = z.object({
  deploymentId: deploymentId
})
export const deleteApiDeploymentsDeploymentIdResponse = z.void()
export type DeleteApiDeploymentsDeploymentIdResponse = z.infer<
  typeof deleteApiDeploymentsDeploymentIdResponse
>
export const deleteApiDeploymentsDeploymentIdArgs = z.object({
  deploymentId: deploymentId
})
export const buildLogsResponseEntry = z.object({
  level: z.string(),
  message: z.string()
})
export const getApiDeploymentsDeploymentIdBuildLogsResponse = z.array(
  buildLogsResponseEntry
)
export type GetApiDeploymentsDeploymentIdBuildLogsResponse = z.infer<
  typeof getApiDeploymentsDeploymentIdBuildLogsResponse
>
export const getApiDeploymentsDeploymentIdBuildLogsArgs = z.object({
  deploymentId: z.string()
})
export const logLevel = z.string()
export const region = z.string()
export const appLogsResponseEntry = z.object({
  /** Log timestamp */ time: z.string(),
  level: logLevel,
  message: z.string(),
  region: region
})
export const getApiDeploymentsDeploymentIdAppLogsResponse =
  z.array(appLogsResponseEntry)
export type GetApiDeploymentsDeploymentIdAppLogsResponse = z.infer<
  typeof getApiDeploymentsDeploymentIdAppLogsResponse
>
export const getApiDeploymentsDeploymentIdAppLogsArgs = z.object({
  q: z.string().optional(),
  level: logLevel.optional(),
  region: region.optional(),
  since: z.string().optional(),
  until: z.string().optional(),
  limit: z.number().int().optional(),
  sort: z.string().optional(),
  order: z.string().optional(),
  cursor: z.string().optional(),
  deploymentId: z.string()
})
export const tlsCipher = z.string()
export const domainCertificate = z.object({
  cipher: tlsCipher,
  expiresAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})
export const provisioningStatus = z.discriminatedUnion(
  'status',
  z.object({ code: z.string() }),
  z.object({ message: z.string(), code: z.string() }),
  z.object({ code: z.string() }),
  z.object({ code: z.string() })
)
export const dnsRecord = z.object({
  type: z.string(),
  name: z.string(),
  content: z.string()
})
export const domain = z.object({
  /** The ID of the domain. */ id: z.string(),
  /** The ID of the organization that the domain is associated with. */
  organizationId: z.string(),
  /** The domain value. */ domain: z.string(),
  token: z.string(),
  /** Whether the domain's ownership is validated or not. */
  isValidated: z.boolean(),
  /** TLS certificates for the domain. */
  certificates: z.array(domainCertificate),
  provisioningStatus: provisioningStatus,
  /** The ID of the project that the domain is associated with.

If the domain is not associated with any project, this field is omitted. */
  projectId: z.string().optional(),
  deploymentId: deploymentId.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  /** These records are used to verify the ownership of the domain. */
  dnsRecords: z.array(dnsRecord)
})
export const getApiOrganizationsOrganizationIdDomainsResponse = z.array(domain)
export type GetApiOrganizationsOrganizationIdDomainsResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdDomainsResponse
>
export const getApiOrganizationsOrganizationIdDomainsArgs = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  q: z.string().optional(),
  sort: z.string().optional(),
  order: z.string().optional(),
  organizationId: z.string()
})
export const createDomainRequest = z.object({ domain: z.string() })
export const postApiOrganizationsOrganizationIdDomainsResponse = domain
export type PostApiOrganizationsOrganizationIdDomainsResponse = z.infer<
  typeof postApiOrganizationsOrganizationIdDomainsResponse
>
export const postApiOrganizationsOrganizationIdDomainsArgs = z.object({
  organizationId: z.string(),
  body: createDomainRequest
})
export const getApiDomainsDomainIdResponse = domain
export type GetApiDomainsDomainIdResponse = z.infer<
  typeof getApiDomainsDomainIdResponse
>
export const getApiDomainsDomainIdArgs = z.object({ domainId: z.string() })
export const deleteApiDomainsDomainIdResponse = z.void()
export type DeleteApiDomainsDomainIdResponse = z.infer<
  typeof deleteApiDomainsDomainIdResponse
>
export const deleteApiDomainsDomainIdArgs = z.object({ domainId: z.string() })
export const updateDomainAssociationRequest = z.object({
  deploymentId: deploymentId.optional()
})
export const patchApiDomainsDomainIdResponse = z.void()
export type PatchApiDomainsDomainIdResponse = z.infer<
  typeof patchApiDomainsDomainIdResponse
>
export const patchApiDomainsDomainIdArgs = z.object({
  domainId: z.string(),
  body: updateDomainAssociationRequest
})
export const postApiDomainsDomainIdVerifyResponse = z.void()
export type PostApiDomainsDomainIdVerifyResponse = z.infer<
  typeof postApiDomainsDomainIdVerifyResponse
>
export const postApiDomainsDomainIdVerifyArgs = z.object({
  domainId: z.string()
})
export const addDomainCertificateRequest = z.object({
  /** The PEM encoded private key for the TLS certificate */
  privateKey: z.string(),
  /** The PRM encoded certificate chain for the TLS certificate */
  certificateChain: z.string()
})
export const postApiDomainsDomainIdCertificatesResponse = z.void()
export type PostApiDomainsDomainIdCertificatesResponse = z.infer<
  typeof postApiDomainsDomainIdCertificatesResponse
>
export const postApiDomainsDomainIdCertificatesArgs = z.object({
  domainId: z.string(),
  body: addDomainCertificateRequest
})
export const postApiDomainsDomainIdCertificatesProvisionResponse = z.void()
export type PostApiDomainsDomainIdCertificatesProvisionResponse = z.infer<
  typeof postApiDomainsDomainIdCertificatesProvisionResponse
>
export const postApiDomainsDomainIdCertificatesProvisionArgs = z.object({
  domainId: z.string()
})
export const cursorLinkHeader =
  /** Pagination links.
This header provides a URL for the `next` page.
The format conforms to [RFC 8288](https://tools.ietf.org/html/rfc8288). */
  z.string()
export const errorBody = z.object({
  /** The error code */ code: z.string(),
  /** The error message */ message: z.string()
})
export const paginationLinkHeader =
  /** Pagination links.
This header provides URLS for the `prev`, `next`, `first`, and `last` pages.
The format conforms to [RFC 8288](https://tools.ietf.org/html/rfc8288). */
  z.string()

export const CreateOrganizationsOrganizationIdProjects = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** The name of the project. This must be globally unique. If this is `null`,
a random unique name will be generated. */
        name: z.string().optional(),
        /** The description of the project. If this is `null`, an empty string will be
set. */
        description: z.string().optional()
      })
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>name</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>description</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const CreateOrganizationsOrganizationIdDatabases = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** The description of the KV database. If this is `null`, an empty string
will be set. */
        description: z.string().optional()
      })
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>description</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const CreateProjectsProjectIdDeployments = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** An URL of the entry point of the application.
This is the file that will be executed when the deployment is invoked. */
        entryPointUrl: z.string(),
        /** An URL of the import map file.

If `null` is given, import map auto-discovery logic will be performed,
where it looks for Deno's config file (i.e. `deno.json` or `deno.jsonc`)
which may contain an embedded import map or a path to an import map file.
If found, that import map will be used.

If an empty string is given, no import map will be used. */
        importMapUrl: z.string().optional(),
        /** An URL of the lock file.

If `null` is given, lock file auto-discovery logic will be performed,
where it looks for Deno's config file (i.e. `deno.json` or `deno.jsonc`)
which may contain a path to a lock file or boolean value, such as `"lock":
false` or `"lock": "my-lock.lock"`. If a config file is found, the
semantics of the lock field is the same as the Deno CLI, so refer to [the
CLI doc page](https://docs.deno.com/runtime/manual/basics/modules/integrity_checking#auto-generated-lockfile).

If an empty string is given, no lock file will be used. */
        lockFileUrl: z.string().optional(),
        compilerOptions: compilerOptions.optional(),
        assets: assets,
        /** A dictionary of environment variables to be set in the runtime environment
of the deployment. */
        envVars: z.record(z.string(), z.string()),
        /** KV database ID mappings to associate with the deployment.

A key represents a KV database name (e.g. `"default"`), and a value is a
KV database ID.

Currently, only `"default"` database is supported. If any other database
name is specified, that will be rejected.

If not provided, the deployment will be created with no KV database
attached. */
        databases: z.record(z.string(), z.string()).optional(),
        /** The wall-clock timeout in milliseconds for requests to the deployment.

If not provided, the system default value will be used. */
        requestTimeout: z.number().int().optional(),
        permissions: deploymentPermissions.optional(),
        /** A description of the created deployment. If not provided, an empty string
will be set. */
        description: z.string().optional()
      })
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="entryPointUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>entryPointUrl</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="importMapUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>importMapUrl</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="lockFileUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>lockFileUrl</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="compilerOptions"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>compilerOptions</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="assets"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>assets</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="envVars"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>envVars</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="databases"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>databases</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="requestTimeout"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>requestTimeout</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="permissions"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>permissions</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>description</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const CreateDeploymentsDeploymentIdRedeploy = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** A dictionary of environment variables to be set in the runtime environment
of the deployment.

The provided environment variables will be _merged_ with the existing one.
For example, if the existing environment variables are:

```json
{
"a": "alice",
"b": "bob"
"c": "charlie"
}
```

and you pass the following environment variables in your redeploy request:

```json
{
"a": "alice2",
"b": null,
"d": "david"
}
```

then the result will be:

```json
{
"a": "alice2",
"c": "charlie",
"d": "david"
}
```

If `envVars` itself is not provided, no update will happen to the
existing environment variables.

For a historical reason, `env_vars` is also accepted as well as `envVars`,
although `env_vars` is deprecated. */
        envVars: z.record(z.string(), z.string()).optional(),
        /** KV database ID mappings to associate with the deployment.

A key represents a KV database name (e.g. `"default"`), and a value is a
KV database ID.

Currently, only `"default"` database is supported. If any other database
name is specified, that will be rejected.

The provided KV database mappings will be _merged_ with the existing one,
just like `env_vars`.

If `databases` itself is not provided, no update will happen to the
existing KV database mappings. */
        databases: z.record(z.string(), z.string()).optional(),
        /** The wall-clock timeout in milliseconds for requests to the deployment.

If not provided, no update will happen to the existing request timeout. */
        requestTimeout: z.number().int().optional(),
        permissions: deploymentPermissionsOverwrite.optional(),
        /** A description of the created deployment. If not provided, no update will
happen to the description. */
        description: z.string().optional()
      })
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="envVars"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>envVars</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="databases"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>databases</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="requestTimeout"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>requestTimeout</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="permissions"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>permissions</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>description</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const CreateOrganizationsOrganizationIdDomains = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(z.object({ domain: z.string() }))
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="domain"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>domain</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const CreateDomainsDomainIdCertificates = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** The PEM encoded private key for the TLS certificate */
        privateKey: z.string(),
        /** The PRM encoded certificate chain for the TLS certificate */
        certificateChain: z.string()
      })
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="privateKey"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>privateKey</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="certificateChain"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>certificateChain</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const injectedRtkApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    getApiOrganizationsOrganizationId: build.query<
      GetApiOrganizationsOrganizationIdResponse,
      GetApiOrganizationsOrganizationIdResponse
    >({
      query: queryArg => ({
        path: `/organizations/${queryArg.organizationId}`,
        method: GET,
        params: {
          organizationId: queryArg.organizationId
        }
      })
    }),
    getApiOrganizationsOrganizationIdAnalytics: build.query<
      GetApiOrganizationsOrganizationIdAnalyticsResponse,
      GetApiOrganizationsOrganizationIdAnalyticsResponse
    >({
      query: queryArg => ({
        path: `/organizations/${queryArg.organizationId}/analytics`,
        method: GET,
        params: {
          organizationId: queryArg.organizationId,
          since: queryArg.since,
          until: queryArg.until
        }
      })
    }),
    getApiOrganizationsOrganizationIdProjects: build.query<
      GetApiOrganizationsOrganizationIdProjectsResponse,
      GetApiOrganizationsOrganizationIdProjectsResponse
    >({
      query: queryArg => ({
        path: `/organizations/${queryArg.organizationId}/projects`,
        method: GET,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          q: queryArg.q,
          sort: queryArg.sort,
          order: queryArg.order,
          organizationId: queryArg.organizationId
        }
      })
    }),
    postApiOrganizationsOrganizationIdProjects: build.mutation<
      PostApiOrganizationsOrganizationIdProjectsResponse,
      PostApiOrganizationsOrganizationIdProjectsResponse
    >({
      query: queryArg => ({
        path: `/organizations/${queryArg.organizationId}/projects`,
        method: POST,
        params: {
          organizationId: queryArg.organizationId
        },
        body: queryArg.body
      })
    }),
    getApiOrganizationsOrganizationIdDatabases: build.query<
      GetApiOrganizationsOrganizationIdDatabasesResponse,
      GetApiOrganizationsOrganizationIdDatabasesResponse
    >({
      query: queryArg => ({
        path: `/organizations/${queryArg.organizationId}/databases`,
        method: GET,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          q: queryArg.q,
          sort: queryArg.sort,
          order: queryArg.order,
          organizationId: queryArg.organizationId
        }
      })
    }),
    postApiOrganizationsOrganizationIdDatabases: build.mutation<
      PostApiOrganizationsOrganizationIdDatabasesResponse,
      PostApiOrganizationsOrganizationIdDatabasesResponse
    >({
      query: queryArg => ({
        path: `/organizations/${queryArg.organizationId}/databases`,
        method: POST,
        params: {
          organizationId: queryArg.organizationId
        },
        body: queryArg.body
      })
    }),
    patchApiDatabasesDatabaseId: build.mutation<
      PatchApiDatabasesDatabaseIdResponse,
      PatchApiDatabasesDatabaseIdResponse
    >({
      query: queryArg => ({
        path: `/databases/${queryArg.databaseId}`,
        method: PATCH,
        params: {
          databaseId: queryArg.databaseId
        },
        body: queryArg.body
      })
    }),
    getApiProjectsProjectId: build.query<
      GetApiProjectsProjectIdResponse,
      GetApiProjectsProjectIdResponse
    >({
      query: queryArg => ({
        path: `/projects/${queryArg.projectId}`,
        method: GET,
        params: {
          projectId: queryArg.projectId
        }
      })
    }),
    deleteApiProjectsProjectId: build.mutation<
      DeleteApiProjectsProjectIdResponse,
      DeleteApiProjectsProjectIdResponse
    >({
      query: queryArg => ({
        path: `/projects/${queryArg.projectId}`,
        method: DELETE,
        params: {
          projectId: queryArg.projectId
        }
      })
    }),
    patchApiProjectsProjectId: build.mutation<
      PatchApiProjectsProjectIdResponse,
      PatchApiProjectsProjectIdResponse
    >({
      query: queryArg => ({
        path: `/projects/${queryArg.projectId}`,
        method: PATCH,
        params: {
          projectId: queryArg.projectId
        },
        body: queryArg.body
      })
    }),
    getApiProjectsProjectIdAnalytics: build.query<
      GetApiProjectsProjectIdAnalyticsResponse,
      GetApiProjectsProjectIdAnalyticsResponse
    >({
      query: queryArg => ({
        path: `/projects/${queryArg.projectId}/analytics`,
        method: GET,
        params: {
          projectId: queryArg.projectId,
          since: queryArg.since,
          until: queryArg.until
        }
      })
    }),
    getApiProjectsProjectIdDeployments: build.query<
      GetApiProjectsProjectIdDeploymentsResponse,
      GetApiProjectsProjectIdDeploymentsResponse
    >({
      query: queryArg => ({
        path: `/projects/${queryArg.projectId}/deployments`,
        method: GET,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          q: queryArg.q,
          sort: queryArg.sort,
          order: queryArg.order,
          projectId: queryArg.projectId
        }
      })
    }),
    postApiProjectsProjectIdDeployments: build.mutation<
      PostApiProjectsProjectIdDeploymentsResponse,
      PostApiProjectsProjectIdDeploymentsResponse
    >({
      query: queryArg => ({
        path: `/projects/${queryArg.projectId}/deployments`,
        method: POST,
        params: {
          projectId: queryArg.projectId
        },
        body: queryArg.body
      })
    }),
    postApiDeploymentsDeploymentIdRedeploy: build.mutation<
      PostApiDeploymentsDeploymentIdRedeployResponse,
      PostApiDeploymentsDeploymentIdRedeployResponse
    >({
      query: queryArg => ({
        path: `/deployments/${queryArg.deploymentId}/redeploy`,
        method: POST,
        params: {
          deploymentId: queryArg.deploymentId
        },
        body: queryArg.body
      })
    }),
    getApiDeploymentsDeploymentId: build.query<
      GetApiDeploymentsDeploymentIdResponse,
      GetApiDeploymentsDeploymentIdResponse
    >({
      query: queryArg => ({
        path: `/deployments/${queryArg.deploymentId}`,
        method: GET,
        params: {
          deploymentId: queryArg.deploymentId
        }
      })
    }),
    deleteApiDeploymentsDeploymentId: build.mutation<
      DeleteApiDeploymentsDeploymentIdResponse,
      DeleteApiDeploymentsDeploymentIdResponse
    >({
      query: queryArg => ({
        path: `/deployments/${queryArg.deploymentId}`,
        method: DELETE,
        params: {
          deploymentId: queryArg.deploymentId
        }
      })
    }),
    getApiDeploymentsDeploymentIdBuildLogs: build.query<
      GetApiDeploymentsDeploymentIdBuildLogsResponse,
      GetApiDeploymentsDeploymentIdBuildLogsResponse
    >({
      query: queryArg => ({
        path: `/deployments/${queryArg.deploymentId}/build_logs`,
        method: GET,
        params: {
          deploymentId: queryArg.deploymentId
        }
      })
    }),
    getApiDeploymentsDeploymentIdAppLogs: build.query<
      GetApiDeploymentsDeploymentIdAppLogsResponse,
      GetApiDeploymentsDeploymentIdAppLogsResponse
    >({
      query: queryArg => ({
        path: `/deployments/${queryArg.deploymentId}/app_logs`,
        method: GET,
        params: {
          q: queryArg.q,
          level: queryArg.level,
          region: queryArg.region,
          since: queryArg.since,
          until: queryArg.until,
          limit: queryArg.limit,
          sort: queryArg.sort,
          order: queryArg.order,
          cursor: queryArg.cursor,
          deploymentId: queryArg.deploymentId
        }
      })
    }),
    getApiOrganizationsOrganizationIdDomains: build.query<
      GetApiOrganizationsOrganizationIdDomainsResponse,
      GetApiOrganizationsOrganizationIdDomainsResponse
    >({
      query: queryArg => ({
        path: `/organizations/${queryArg.organizationId}/domains`,
        method: GET,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          q: queryArg.q,
          sort: queryArg.sort,
          order: queryArg.order,
          organizationId: queryArg.organizationId
        }
      })
    }),
    postApiOrganizationsOrganizationIdDomains: build.mutation<
      PostApiOrganizationsOrganizationIdDomainsResponse,
      PostApiOrganizationsOrganizationIdDomainsResponse
    >({
      query: queryArg => ({
        path: `/organizations/${queryArg.organizationId}/domains`,
        method: POST,
        params: {
          organizationId: queryArg.organizationId
        },
        body: queryArg.body
      })
    }),
    getApiDomainsDomainId: build.query<
      GetApiDomainsDomainIdResponse,
      GetApiDomainsDomainIdResponse
    >({
      query: queryArg => ({
        path: `/domains/${queryArg.domainId}`,
        method: GET,
        params: {
          domainId: queryArg.domainId
        }
      })
    }),
    deleteApiDomainsDomainId: build.mutation<
      DeleteApiDomainsDomainIdResponse,
      DeleteApiDomainsDomainIdResponse
    >({
      query: queryArg => ({
        path: `/domains/${queryArg.domainId}`,
        method: DELETE,
        params: {
          domainId: queryArg.domainId
        }
      })
    }),
    patchApiDomainsDomainId: build.mutation<
      PatchApiDomainsDomainIdResponse,
      PatchApiDomainsDomainIdResponse
    >({
      query: queryArg => ({
        path: `/domains/${queryArg.domainId}`,
        method: PATCH,
        params: {
          domainId: queryArg.domainId
        },
        body: queryArg.body
      })
    }),
    postApiDomainsDomainIdVerify: build.mutation<
      PostApiDomainsDomainIdVerifyResponse,
      PostApiDomainsDomainIdVerifyResponse
    >({
      query: queryArg => ({
        path: `/domains/${queryArg.domainId}/verify`,
        method: POST,
        params: {
          domainId: queryArg.domainId
        }
      })
    }),
    postApiDomainsDomainIdCertificates: build.mutation<
      PostApiDomainsDomainIdCertificatesResponse,
      PostApiDomainsDomainIdCertificatesResponse
    >({
      query: queryArg => ({
        path: `/domains/${queryArg.domainId}/certificates`,
        method: POST,
        params: {
          domainId: queryArg.domainId
        },
        body: queryArg.body
      })
    }),
    postApiDomainsDomainIdCertificatesProvision: build.mutation<
      PostApiDomainsDomainIdCertificatesProvisionResponse,
      PostApiDomainsDomainIdCertificatesProvisionResponse
    >({
      query: queryArg => ({
        path: `/domains/${queryArg.domainId}/certificates/provision`,
        method: POST,
        params: {
          domainId: queryArg.domainId
        }
      })
    })
  }),
  overrideExisting: false
})

const getApiOrganizationsOrganizationId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organizations/${organizationId}`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return organization.parse(data)
}

const getApiOrganizationsOrganizationIdAnalytics = async (
  deploymentId: string
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organizations/${organizationId}/analytics`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return analytics.parse(data)
}

const getApiOrganizationsOrganizationIdProjects = async (
  deploymentId: string
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organizations/${organizationId}/projects`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return z.array(project).parse(data)
}

const postApiOrganizationsOrganizationIdProjects = async (
  deploymentId: string
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organizations/${organizationId}/projects`,
    {
      method: 'POST'
    }
  )

  if (error) {
    throw error
  }

  return project.parse(data)
}

const getApiOrganizationsOrganizationIdDatabases = async (
  deploymentId: string
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organizations/${organizationId}/databases`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return z.array(kvDatabase).parse(data)
}

const postApiOrganizationsOrganizationIdDatabases = async (
  deploymentId: string
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organizations/${organizationId}/databases`,
    {
      method: 'POST'
    }
  )

  if (error) {
    throw error
  }

  return kvDatabase.parse(data)
}

const patchApiDatabasesDatabaseId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/databases/${databaseId}`,
    {
      method: 'PATCH'
    }
  )

  if (error) {
    throw error
  }

  return kvDatabase.parse(data)
}

const getApiProjectsProjectId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/projects/${projectId}`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return project.parse(data)
}

const deleteApiProjectsProjectId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/projects/${projectId}`,
    {
      method: 'DELETE'
    }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}

const patchApiProjectsProjectId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/projects/${projectId}`,
    {
      method: 'PATCH'
    }
  )

  if (error) {
    throw error
  }

  return project.parse(data)
}

const getApiProjectsProjectIdAnalytics = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/projects/${projectId}/analytics`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return analytics.parse(data)
}

const getApiProjectsProjectIdDeployments = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/projects/${projectId}/deployments`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return z.array(deployment).parse(data)
}

const postApiProjectsProjectIdDeployments = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/projects/${projectId}/deployments`,
    {
      method: 'POST'
    }
  )

  if (error) {
    throw error
  }

  return deployment.parse(data)
}

const postApiDeploymentsDeploymentIdRedeploy = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployments/${deploymentId}/redeploy`,
    {
      method: 'POST'
    }
  )

  if (error) {
    throw error
  }

  return deployment.parse(data)
}

const getApiDeploymentsDeploymentId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployments/${deploymentId}`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return deployment.parse(data)
}

const deleteApiDeploymentsDeploymentId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployments/${deploymentId}`,
    {
      method: 'DELETE'
    }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}

const getApiDeploymentsDeploymentIdBuildLogs = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployments/${deploymentId}/build_logs`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return z.array(buildLogsResponseEntry).parse(data)
}

const getApiDeploymentsDeploymentIdAppLogs = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployments/${deploymentId}/app_logs`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return z.array(appLogsResponseEntry).parse(data)
}

const getApiOrganizationsOrganizationIdDomains = async (
  deploymentId: string
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organizations/${organizationId}/domains`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return z.array(domain).parse(data)
}

const postApiOrganizationsOrganizationIdDomains = async (
  deploymentId: string
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organizations/${organizationId}/domains`,
    {
      method: 'POST'
    }
  )

  if (error) {
    throw error
  }

  return domain.parse(data)
}

const getApiDomainsDomainId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/domains/${domainId}`,
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return domain.parse(data)
}

const deleteApiDomainsDomainId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/domains/${domainId}`,
    {
      method: 'DELETE'
    }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}

const patchApiDomainsDomainId = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/domains/${domainId}`,
    {
      method: 'PATCH'
    }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}

const postApiDomainsDomainIdVerify = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/domains/${domainId}/verify`,
    {
      method: 'POST'
    }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}

const postApiDomainsDomainIdCertificates = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/domains/${domainId}/certificates`,
    {
      method: 'POST'
    }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}

const postApiDomainsDomainIdCertificatesProvision = async (
  deploymentId: string
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/domains/${domainId}/certificates/provision`,
    {
      method: 'POST'
    }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
