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

export const compilerOptions = z
  .object({
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
  .optional()
export const encoding = z.enum(['utf-8', 'base64']).optional()
export const file = z
  .union([
    z
      .object({ content: z.string().optional(), encoding: encoding.optional() })
      .optional(),
    z.object({ gitSha1: z.string().optional() }).optional()
  ])
  .optional()
export const symlink = z.object({ target: z.string().optional() }).optional()
export const asset = z
  .discriminatedUnion(
    'status',
    file
      .optional()
      .and(z.object({ kind: z.literal('file').optional() }).optional())
      .optional(),
    symlink
      .optional()
      .merge(z.object({ kind: z.literal('symlink').optional() }).optional())
      .optional()
  )
  .optional()
export const assets = z.record(z.string(), asset.optional()).optional()
export const deploymentPermissions = z
  .object({ net: z.array(z.string().optional()).optional() })
  .optional()
export const deploymentPermissionsOverwrite = z
  .object({ net: z.array(z.string().optional()).optional() })
  .optional()
export const organization = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
  .optional()
export const getApiOrganizationsOrganizationIdResponse = organization.optional()
export type GetApiOrganizationsOrganizationIdResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdResponse
>
export const getApiOrganizationsOrganizationIdArgs = z
  .object({ organizationId: z.string().optional() })
  .optional()
export const analyticsFieldType =
  /** A data type that analytic data can be represented in.

Inspired by Grafana's data types defined at:
https://github.com/grafana/grafana/blob/e3288834b37b9aac10c1f43f0e621b35874c1f8a/packages/grafana-data/src/types/dataFrame.ts#L11-L23 */
  z.enum(['time', 'number', 'string', 'boolean', 'other']).optional()
export const analyticsFieldSchema = z
  .object({ name: z.string().optional(), type: analyticsFieldType.optional() })
  .optional()
export const analyticsDataValue = z
  .union([
    z.string().optional(),
    z.number().optional(),
    z.string().optional(),
    z.boolean().optional(),
    z.unknown().optional()
  ])
  .optional()
export const analytics = z
  .object({
    fields: z.array(analyticsFieldSchema.optional()).optional(),
    values: z
      .array(z.array(analyticsDataValue.optional()).optional())
      .optional()
  })
  .optional()
export const getApiOrganizationsOrganizationIdAnalyticsResponse =
  analytics.optional()
export type GetApiOrganizationsOrganizationIdAnalyticsResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdAnalyticsResponse
>
export const getApiOrganizationsOrganizationIdAnalyticsArgs = z
  .object({
    organizationId: z.string().optional(),
    since: z.string().optional(),
    until: z.string().optional()
  })
  .optional()
export const project = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
  .optional()
export const getApiOrganizationsOrganizationIdProjectsResponse = z
  .array(project.optional())
  .optional()
export type GetApiOrganizationsOrganizationIdProjectsResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdProjectsResponse
>
export const getApiOrganizationsOrganizationIdProjectsArgs = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    q: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    organizationId: z.string().optional()
  })
  .optional()
export const createProjectRequest = z
  .object({
    /** The name of the project. This must be globally unique. If this is `null`,
a random unique name will be generated. */
    name: z.string().optional(),
    /** The description of the project. If this is `null`, an empty string will be
set. */
    description: z.string().optional()
  })
  .optional()
export const postApiOrganizationsOrganizationIdProjectsResponse =
  project.optional()
export type PostApiOrganizationsOrganizationIdProjectsResponse = z.infer<
  typeof postApiOrganizationsOrganizationIdProjectsResponse
>
export const postApiOrganizationsOrganizationIdProjectsArgs = z
  .object({
    organizationId: z.string().optional(),
    body: createProjectRequest.optional()
  })
  .optional()
export const kvDatabase = z
  .object({
    /** A KV database ID */ id: z.string().optional(),
    /** An organization ID that this KV database belongs to */
    organizationId: z.string().optional(),
    /** A description of this KV database */ description: z.string().optional(),
    updatedAt: z.string().optional(),
    createdAt: z.string().optional()
  })
  .optional()
export const getApiOrganizationsOrganizationIdDatabasesResponse = z
  .array(kvDatabase.optional())
  .optional()
export type GetApiOrganizationsOrganizationIdDatabasesResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdDatabasesResponse
>
export const getApiOrganizationsOrganizationIdDatabasesArgs = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    q: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    organizationId: z.string().optional()
  })
  .optional()
export const createKvDatabaseRequest = z
  .object({
    /** The description of the KV database. If this is `null`, an empty string
will be set. */
    description: z.string().optional()
  })
  .optional()
export const postApiOrganizationsOrganizationIdDatabasesResponse =
  kvDatabase.optional()
export type PostApiOrganizationsOrganizationIdDatabasesResponse = z.infer<
  typeof postApiOrganizationsOrganizationIdDatabasesResponse
>
export const postApiOrganizationsOrganizationIdDatabasesArgs = z
  .object({
    organizationId: z.string().optional(),
    body: createKvDatabaseRequest.optional()
  })
  .optional()
export const updateKvDatabaseRequest = z
  .object({
    /** The description of the KV database to be updated to. If this is `null`, no
update will be made to the KV database description. */
    description: z.string().optional()
  })
  .optional()
export const patchApiDatabasesDatabaseIdResponse = kvDatabase.optional()
export type PatchApiDatabasesDatabaseIdResponse = z.infer<
  typeof patchApiDatabasesDatabaseIdResponse
>
export const patchApiDatabasesDatabaseIdArgs = z
  .object({
    databaseId: z.string().optional(),
    body: updateKvDatabaseRequest.optional()
  })
  .optional()
export const getApiProjectsProjectIdResponse = project.optional()
export type GetApiProjectsProjectIdResponse = z.infer<
  typeof getApiProjectsProjectIdResponse
>
export const getApiProjectsProjectIdArgs = z
  .object({ projectId: z.string().optional() })
  .optional()
export const deleteApiProjectsProjectIdResponse = z.void().optional()
export type DeleteApiProjectsProjectIdResponse = z.infer<
  typeof deleteApiProjectsProjectIdResponse
>
export const deleteApiProjectsProjectIdArgs = z
  .object({ projectId: z.string().optional() })
  .optional()
export const updateProjectRequest = z
  .object({
    /** The name of the project to be updated to. This must be globally unique.
If this is `null`, no update will be made to the project name. */
    name: z.string().optional(),
    /** The description of the project to be updated to. If this is `null`, no
update will be made to the project description. */
    description: z.string().optional()
  })
  .optional()
export const patchApiProjectsProjectIdResponse = project.optional()
export type PatchApiProjectsProjectIdResponse = z.infer<
  typeof patchApiProjectsProjectIdResponse
>
export const patchApiProjectsProjectIdArgs = z
  .object({
    projectId: z.string().optional(),
    body: updateProjectRequest.optional()
  })
  .optional()
export const getApiProjectsProjectIdAnalyticsResponse = analytics.optional()
export type GetApiProjectsProjectIdAnalyticsResponse = z.infer<
  typeof getApiProjectsProjectIdAnalyticsResponse
>
export const getApiProjectsProjectIdAnalyticsArgs = z
  .object({
    projectId: z.string().optional(),
    since: z.string().optional(),
    until: z.string().optional()
  })
  .optional()
export const deploymentId =
  /** A deployment ID

Note that this is not UUID v4, as opposed to organization ID and project ID. */
  z.string().optional()
export const deploymentStatus =
  /** The status of a deployment. */
  z.enum(['failed', 'pending', 'success']).optional()
export const deployment = z
  .object({
    id: deploymentId.optional(),
    projectId: z.string().optional(),
    /** The description of this deployment. This is present only when the `status`
is `success`. */
    description: z.string().optional(),
    status: deploymentStatus.optional(),
    domains: z.array(z.string().optional()).optional(),
    databases: z.record(z.string(), z.string().optional()).optional(),
    /** The wall-clock timeout in milliseconds for requests to the deployment.

This becomes `null` when no timeout is set, or the deployment has not been
done successfully yet. */
    requestTimeout: z.number().int().optional(),
    permissions: deploymentPermissions.optional().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
  .optional()
export const getApiProjectsProjectIdDeploymentsResponse = z
  .array(deployment.optional())
  .optional()
export type GetApiProjectsProjectIdDeploymentsResponse = z.infer<
  typeof getApiProjectsProjectIdDeploymentsResponse
>
export const getApiProjectsProjectIdDeploymentsArgs = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    q: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    projectId: z.string().optional()
  })
  .optional()
export const createDeploymentRequest = z
  .object({
    /** An URL of the entry point of the application.
This is the file that will be executed when the deployment is invoked. */
    entryPointUrl: z.string().optional(),
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
    compilerOptions: compilerOptions.optional().optional(),
    assets: assets.optional(),
    envVars: z.record(z.string(), z.string().optional()).optional(),
    databases: z.record(z.string(), z.string().optional()).optional(),
    /** The wall-clock timeout in milliseconds for requests to the deployment.

If not provided, the system default value will be used. */
    requestTimeout: z.number().int().optional(),
    permissions: deploymentPermissions.optional().optional(),
    /** A description of the created deployment. If not provided, an empty string
will be set. */
    description: z.string().optional()
  })
  .optional()
export const postApiProjectsProjectIdDeploymentsResponse = deployment.optional()
export type PostApiProjectsProjectIdDeploymentsResponse = z.infer<
  typeof postApiProjectsProjectIdDeploymentsResponse
>
export const postApiProjectsProjectIdDeploymentsArgs = z
  .object({
    projectId: z.string().optional(),
    body: createDeploymentRequest.optional()
  })
  .optional()
export const redeployRequest = z
  .object({
    envVars: z.record(z.string(), z.string().optional()).optional(),
    databases: z.record(z.string(), z.string().optional()).optional(),
    /** The wall-clock timeout in milliseconds for requests to the deployment.

If not provided, no update will happen to the existing request timeout. */
    requestTimeout: z.number().int().optional(),
    permissions: deploymentPermissionsOverwrite.optional().optional(),
    /** A description of the created deployment. If not provided, no update will
happen to the description. */
    description: z.string().optional()
  })
  .optional()
export const postApiDeploymentsDeploymentIdRedeployResponse =
  deployment.optional()
export type PostApiDeploymentsDeploymentIdRedeployResponse = z.infer<
  typeof postApiDeploymentsDeploymentIdRedeployResponse
>
export const postApiDeploymentsDeploymentIdRedeployArgs = z
  .object({
    deploymentId: deploymentId.optional(),
    body: redeployRequest.optional()
  })
  .optional()
export const getApiDeploymentsDeploymentIdResponse = deployment.optional()
export type GetApiDeploymentsDeploymentIdResponse = z.infer<
  typeof getApiDeploymentsDeploymentIdResponse
>
export const getApiDeploymentsDeploymentIdArgs = z
  .object({ deploymentId: deploymentId.optional() })
  .optional()
export const deleteApiDeploymentsDeploymentIdResponse = z.void().optional()
export type DeleteApiDeploymentsDeploymentIdResponse = z.infer<
  typeof deleteApiDeploymentsDeploymentIdResponse
>
export const deleteApiDeploymentsDeploymentIdArgs = z
  .object({ deploymentId: deploymentId.optional() })
  .optional()
export const buildLogsResponseEntry = z
  .object({ level: z.string().optional(), message: z.string().optional() })
  .optional()
export const getApiDeploymentsDeploymentIdBuildLogsResponse = z
  .array(buildLogsResponseEntry.optional())
  .optional()
export type GetApiDeploymentsDeploymentIdBuildLogsResponse = z.infer<
  typeof getApiDeploymentsDeploymentIdBuildLogsResponse
>
export const getApiDeploymentsDeploymentIdBuildLogsArgs = z
  .object({ deploymentId: z.string().optional() })
  .optional()
export const logLevel = z.enum(['error', 'warning', 'info', 'debug']).optional()
export const region = z
  .enum([
    'gcp-asia-east1',
    'gcp-asia-east2',
    'gcp-asia-northeast1',
    'gcp-asia-northeast2',
    'gcp-asia-northeast3',
    'gcp-asia-south1',
    'gcp-asia-south2',
    'gcp-asia-southeast1',
    'gcp-asia-southeast2',
    'gcp-australia-southeast1',
    'gcp-australia-southeast2',
    'gcp-europe-central2',
    'gcp-europe-north1',
    'gcp-europe-southwest1',
    'gcp-europe-west1',
    'gcp-europe-west2',
    'gcp-europe-west3',
    'gcp-europe-west4',
    'gcp-europe-west6',
    'gcp-europe-west8',
    'gcp-me-west1',
    'gcp-northamerica-northeast1',
    'gcp-northamerica-northeast2',
    'gcp-southamerica-east1',
    'gcp-southamerica-west1',
    'gcp-us-central1',
    'gcp-us-east1',
    'gcp-us-east4',
    'gcp-us-east5',
    'gcp-us-south1',
    'gcp-us-west1',
    'gcp-us-west2',
    'gcp-us-west3',
    'gcp-us-west4'
  ])
  .optional()
export const appLogsResponseEntry = z
  .object({
    /** Log timestamp */ time: z.string().optional(),
    level: logLevel.optional(),
    message: z.string().optional(),
    region: region.optional()
  })
  .optional()
export const getApiDeploymentsDeploymentIdAppLogsResponse = z
  .array(appLogsResponseEntry.optional())
  .optional()
export type GetApiDeploymentsDeploymentIdAppLogsResponse = z.infer<
  typeof getApiDeploymentsDeploymentIdAppLogsResponse
>
export const getApiDeploymentsDeploymentIdAppLogsArgs = z
  .object({
    q: z.string().optional(),
    level: logLevel.optional().optional(),
    region: region.optional().optional(),
    since: z.string().optional(),
    until: z.string().optional(),
    limit: z.number().int().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    cursor: z.string().optional(),
    deploymentId: z.string().optional()
  })
  .optional()
export const tlsCipher = z.enum(['rsa', 'ec']).optional()
export const domainCertificate = z
  .object({
    cipher: tlsCipher.optional(),
    expiresAt: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
  .optional()
export const provisioningStatus = z
  .discriminatedUnion(
    'status',
    z.object({ code: z.literal('success').optional() }).optional(),
    z
      .object({
        message: z.string().optional(),
        code: z.literal('failed').optional()
      })
      .optional(),
    z.object({ code: z.literal('pending').optional() }).optional(),
    z.object({ code: z.literal('manual').optional() }).optional()
  )
  .optional()
export const dnsRecord = z
  .object({
    type: z.string().optional(),
    name: z.string().optional(),
    content: z.string().optional()
  })
  .optional()
export const domain = z
  .object({
    /** The ID of the domain. */ id: z.string().optional(),
    /** The ID of the organization that the domain is associated with. */
    organizationId: z.string().optional(),
    /** The domain value. */ domain: z.string().optional(),
    token: z.string().optional(),
    /** Whether the domain's ownership is validated or not. */
    isValidated: z.boolean().optional(),
    certificates: z.array(domainCertificate.optional()).optional(),
    provisioningStatus: provisioningStatus.optional(),
    /** The ID of the project that the domain is associated with.

If the domain is not associated with any project, this field is omitted. */
    projectId: z.string().optional(),
    deploymentId: deploymentId.optional().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    dnsRecords: z.array(dnsRecord.optional()).optional()
  })
  .optional()
export const getApiOrganizationsOrganizationIdDomainsResponse = z
  .array(domain.optional())
  .optional()
export type GetApiOrganizationsOrganizationIdDomainsResponse = z.infer<
  typeof getApiOrganizationsOrganizationIdDomainsResponse
>
export const getApiOrganizationsOrganizationIdDomainsArgs = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    q: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    organizationId: z.string().optional()
  })
  .optional()
export const createDomainRequest = z
  .object({ domain: z.string().optional() })
  .optional()
export const postApiOrganizationsOrganizationIdDomainsResponse =
  domain.optional()
export type PostApiOrganizationsOrganizationIdDomainsResponse = z.infer<
  typeof postApiOrganizationsOrganizationIdDomainsResponse
>
export const postApiOrganizationsOrganizationIdDomainsArgs = z
  .object({
    organizationId: z.string().optional(),
    body: createDomainRequest.optional()
  })
  .optional()
export const getApiDomainsDomainIdResponse = domain.optional()
export type GetApiDomainsDomainIdResponse = z.infer<
  typeof getApiDomainsDomainIdResponse
>
export const getApiDomainsDomainIdArgs = z
  .object({ domainId: z.string().optional() })
  .optional()
export const deleteApiDomainsDomainIdResponse = z.void().optional()
export type DeleteApiDomainsDomainIdResponse = z.infer<
  typeof deleteApiDomainsDomainIdResponse
>
export const deleteApiDomainsDomainIdArgs = z
  .object({ domainId: z.string().optional() })
  .optional()
export const updateDomainAssociationRequest = z
  .object({ deploymentId: deploymentId.optional().optional() })
  .optional()
export const patchApiDomainsDomainIdResponse = z.void().optional()
export type PatchApiDomainsDomainIdResponse = z.infer<
  typeof patchApiDomainsDomainIdResponse
>
export const patchApiDomainsDomainIdArgs = z
  .object({
    domainId: z.string().optional(),
    body: updateDomainAssociationRequest.optional()
  })
  .optional()
export const postApiDomainsDomainIdVerifyResponse = z.void().optional()
export type PostApiDomainsDomainIdVerifyResponse = z.infer<
  typeof postApiDomainsDomainIdVerifyResponse
>
export const postApiDomainsDomainIdVerifyArgs = z
  .object({ domainId: z.string().optional() })
  .optional()
export const addDomainCertificateRequest = z
  .object({
    /** The PEM encoded private key for the TLS certificate */
    privateKey: z.string().optional(),
    /** The PRM encoded certificate chain for the TLS certificate */
    certificateChain: z.string().optional()
  })
  .optional()
export const postApiDomainsDomainIdCertificatesResponse = z.void().optional()
export type PostApiDomainsDomainIdCertificatesResponse = z.infer<
  typeof postApiDomainsDomainIdCertificatesResponse
>
export const postApiDomainsDomainIdCertificatesArgs = z
  .object({
    domainId: z.string().optional(),
    body: addDomainCertificateRequest.optional()
  })
  .optional()
export const postApiDomainsDomainIdCertificatesProvisionResponse = z
  .void()
  .optional()
export type PostApiDomainsDomainIdCertificatesProvisionResponse = z.infer<
  typeof postApiDomainsDomainIdCertificatesProvisionResponse
>
export const postApiDomainsDomainIdCertificatesProvisionArgs = z
  .object({ domainId: z.string().optional() })
  .optional()
export const cursorLinkHeader =
  /** Pagination links.
This header provides a URL for the `next` page.
The format conforms to [RFC 8288](https://tools.ietf.org/html/rfc8288). */
  z.string().optional()
export const errorBody = z
  .object({
    /** The error code */ code: z.string().optional(),
    /** The error message */ message: z.string().optional()
  })
  .optional()
export const paginationLinkHeader =
  /** Pagination links.
This header provides URLS for the `prev`, `next`, `first`, and `last` pages.
The format conforms to [RFC 8288](https://tools.ietf.org/html/rfc8288). */
  z.string().optional()

export const CreateOrganizationsOrganizationIdProjects = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z
        .object({
          /** The name of the project. This must be globally unique. If this is `null`,
a random unique name will be generated. */
          name: z.string().optional(),
          /** The description of the project. If this is `null`, an empty string will be
set. */
          description: z.string().optional()
        })
        .optional()
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
      z
        .object({
          /** The description of the KV database. If this is `null`, an empty string
will be set. */
          description: z.string().optional()
        })
        .optional()
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
      z
        .object({
          /** An URL of the entry point of the application.
This is the file that will be executed when the deployment is invoked. */
          entryPointUrl: z.string().optional(),
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
          compilerOptions: compilerOptions.optional().optional(),
          assets: assets.optional(),
          envVars: z.record(z.string(), z.string().optional()).optional(),
          databases: z.record(z.string(), z.string().optional()).optional(),
          /** The wall-clock timeout in milliseconds for requests to the deployment.

If not provided, the system default value will be used. */
          requestTimeout: z.number().int().optional(),
          permissions: deploymentPermissions.optional().optional(),
          /** A description of the created deployment. If not provided, an empty string
will be set. */
          description: z.string().optional()
        })
        .optional()
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
      z
        .object({
          envVars: z.record(z.string(), z.string().optional()).optional(),
          databases: z.record(z.string(), z.string().optional()).optional(),
          /** The wall-clock timeout in milliseconds for requests to the deployment.

If not provided, no update will happen to the existing request timeout. */
          requestTimeout: z.number().int().optional(),
          permissions: deploymentPermissionsOverwrite.optional().optional(),
          /** A description of the created deployment. If not provided, no update will
happen to the description. */
          description: z.string().optional()
        })
        .optional()
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
    resolver: zodResolver(
      z.object({ domain: z.string().optional() }).optional()
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
      z
        .object({
          /** The PEM encoded private key for the TLS certificate */
          privateKey: z.string().optional(),
          /** The PRM encoded certificate chain for the TLS certificate */
          certificateChain: z.string().optional()
        })
        .optional()
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
