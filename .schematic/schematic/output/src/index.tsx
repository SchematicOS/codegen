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

export const getApiResponse = z.void()
export type GetApiResponse = z.infer<typeof getApiResponse>
export const getApiArgs = z.void()
export const latest_schema_version = z.object({
  /** Note:
This is a Foreign Key to `schema.id`.<fk table='schema' column='id'/> */
  schema_id: z.string().optional(),
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string().optional(),
  name: z.string().optional(),
  content: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  schema_format: z.string().optional(),
  hash: z.string().optional()
})
export const getApiLatestSchemaVersionResponse = z.array(latest_schema_version)
export type GetApiLatestSchemaVersionResponse = z.infer<
  typeof getApiLatestSchemaVersionResponse
>
export const getApiLatestSchemaVersionArgs = z.object({
  schema_id: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  content: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  schema_format: z.string().optional(),
  hash: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const deployment_version = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.number().int(),
  created_at: z.string(),
  owner_id: z.string(),
  /** Note:
This is a Foreign Key to `deployment.id`.<fk table='deployment' column='id'/> */
  deployment_id: z.string(),
  url: z.string()
})
export const getApiDeploymentVersionResponse = z.array(deployment_version)
export type GetApiDeploymentVersionResponse = z.infer<
  typeof getApiDeploymentVersionResponse
>
export const getApiDeploymentVersionArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  deployment_id: z.string().optional(),
  url: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiDeploymentVersionResponse = z.void()
export type PostApiDeploymentVersionResponse = z.infer<
  typeof postApiDeploymentVersionResponse
>
export const postApiDeploymentVersionArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: deployment_version
})
export const deleteApiDeploymentVersionResponse = z.void()
export type DeleteApiDeploymentVersionResponse = z.infer<
  typeof deleteApiDeploymentVersionResponse
>
export const deleteApiDeploymentVersionArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  deployment_id: z.string().optional(),
  url: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiDeploymentVersionResponse = z.void()
export type PatchApiDeploymentVersionResponse = z.infer<
  typeof patchApiDeploymentVersionResponse
>
export const patchApiDeploymentVersionArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  deployment_id: z.string().optional(),
  url: z.string().optional(),
  Prefer: z.string().optional(),
  body: deployment_version
})
export const workflow = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  owner_id: z.string(),
  created_at: z.string(),
  name: z.string(),
  content: z.object({})
})
export const getApiWorkflowResponse = z.array(workflow)
export type GetApiWorkflowResponse = z.infer<typeof getApiWorkflowResponse>
export const getApiWorkflowArgs = z.object({
  id: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string().optional(),
  content: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiWorkflowResponse = z.void()
export type PostApiWorkflowResponse = z.infer<typeof postApiWorkflowResponse>
export const postApiWorkflowArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: workflow
})
export const deleteApiWorkflowResponse = z.void()
export type DeleteApiWorkflowResponse = z.infer<
  typeof deleteApiWorkflowResponse
>
export const deleteApiWorkflowArgs = z.object({
  id: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string().optional(),
  content: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiWorkflowResponse = z.void()
export type PatchApiWorkflowResponse = z.infer<typeof patchApiWorkflowResponse>
export const patchApiWorkflowArgs = z.object({
  id: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string().optional(),
  content: z.string().optional(),
  Prefer: z.string().optional(),
  body: workflow
})
export const organisation = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  created_at: z.string(),
  name: z.string(),
  slug: z.string()
})
export const getApiOrganisationResponse = z.array(organisation)
export type GetApiOrganisationResponse = z.infer<
  typeof getApiOrganisationResponse
>
export const getApiOrganisationArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiOrganisationResponse = z.void()
export type PostApiOrganisationResponse = z.infer<
  typeof postApiOrganisationResponse
>
export const postApiOrganisationArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: organisation
})
export const deleteApiOrganisationResponse = z.void()
export type DeleteApiOrganisationResponse = z.infer<
  typeof deleteApiOrganisationResponse
>
export const deleteApiOrganisationArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiOrganisationResponse = z.void()
export type PatchApiOrganisationResponse = z.infer<
  typeof patchApiOrganisationResponse
>
export const patchApiOrganisationArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  Prefer: z.string().optional(),
  body: organisation
})
export const deployment = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  created_at: z.string(),
  owner_id: z.string(),
  deno_project_id: z.string(),
  deno_project_name: z.string()
})
export const getApiDeploymentResponse = z.array(deployment)
export type GetApiDeploymentResponse = z.infer<typeof getApiDeploymentResponse>
export const getApiDeploymentArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  deno_project_id: z.string().optional(),
  deno_project_name: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiDeploymentResponse = z.void()
export type PostApiDeploymentResponse = z.infer<
  typeof postApiDeploymentResponse
>
export const postApiDeploymentArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: deployment
})
export const deleteApiDeploymentResponse = z.void()
export type DeleteApiDeploymentResponse = z.infer<
  typeof deleteApiDeploymentResponse
>
export const deleteApiDeploymentArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  deno_project_id: z.string().optional(),
  deno_project_name: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiDeploymentResponse = z.void()
export type PatchApiDeploymentResponse = z.infer<
  typeof patchApiDeploymentResponse
>
export const patchApiDeploymentArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  deno_project_id: z.string().optional(),
  deno_project_name: z.string().optional(),
  Prefer: z.string().optional(),
  body: deployment
})
export const transformer = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  owner_id: z.string(),
  content: z.object({}),
  description: z.string(),
  deployed: z.boolean(),
  settings: z.object({}).optional(),
  type: z.string().optional()
})
export const getApiTransformerResponse = z.array(transformer)
export type GetApiTransformerResponse = z.infer<
  typeof getApiTransformerResponse
>
export const getApiTransformerArgs = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  deployed: z.string().optional(),
  settings: z.string().optional(),
  type: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiTransformerResponse = z.void()
export type PostApiTransformerResponse = z.infer<
  typeof postApiTransformerResponse
>
export const postApiTransformerArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: transformer
})
export const deleteApiTransformerResponse = z.void()
export type DeleteApiTransformerResponse = z.infer<
  typeof deleteApiTransformerResponse
>
export const deleteApiTransformerArgs = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  deployed: z.string().optional(),
  settings: z.string().optional(),
  type: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiTransformerResponse = z.void()
export type PatchApiTransformerResponse = z.infer<
  typeof patchApiTransformerResponse
>
export const patchApiTransformerArgs = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  deployed: z.string().optional(),
  settings: z.string().optional(),
  type: z.string().optional(),
  Prefer: z.string().optional(),
  body: transformer
})
export const latest_deployment_version = z.object({
  /** Note:
This is a Foreign Key to `deployment.id`.<fk table='deployment' column='id'/> */
  deployment_id: z.string().optional(),
  /** Note:
This is a Primary Key.<pk/> */
  id: z.number().int().optional(),
  url: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional()
})
export const getApiLatestDeploymentVersionResponse = z.array(
  latest_deployment_version
)
export type GetApiLatestDeploymentVersionResponse = z.infer<
  typeof getApiLatestDeploymentVersionResponse
>
export const getApiLatestDeploymentVersionArgs = z.object({
  deployment_id: z.string().optional(),
  id: z.string().optional(),
  url: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const schema = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  meta: z.object({}),
  created_at: z.string(),
  owner_id: z.string(),
  schema_source: z.string()
})
export const getApiSchemaResponse = z.array(schema)
export type GetApiSchemaResponse = z.infer<typeof getApiSchemaResponse>
export const getApiSchemaArgs = z.object({
  id: z.string().optional(),
  meta: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  schema_source: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiSchemaResponse = z.void()
export type PostApiSchemaResponse = z.infer<typeof postApiSchemaResponse>
export const postApiSchemaArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: schema
})
export const deleteApiSchemaResponse = z.void()
export type DeleteApiSchemaResponse = z.infer<typeof deleteApiSchemaResponse>
export const deleteApiSchemaArgs = z.object({
  id: z.string().optional(),
  meta: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  schema_source: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiSchemaResponse = z.void()
export type PatchApiSchemaResponse = z.infer<typeof patchApiSchemaResponse>
export const patchApiSchemaArgs = z.object({
  id: z.string().optional(),
  meta: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  schema_source: z.string().optional(),
  Prefer: z.string().optional(),
  body: schema
})
export const schema_version = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  content: z.string(),
  owner_id: z.string(),
  created_at: z.string(),
  schema_format: z.string(),
  hash: z.string(),
  /** Note:
This is a Foreign Key to `schema.id`.<fk table='schema' column='id'/> */
  schema_id: z.string(),
  name: z.string(),
  private: z.boolean()
})
export const getApiSchemaVersionResponse = z.array(schema_version)
export type GetApiSchemaVersionResponse = z.infer<
  typeof getApiSchemaVersionResponse
>
export const getApiSchemaVersionArgs = z.object({
  id: z.string().optional(),
  content: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  schema_format: z.string().optional(),
  hash: z.string().optional(),
  schema_id: z.string().optional(),
  name: z.string().optional(),
  private: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiSchemaVersionResponse = z.void()
export type PostApiSchemaVersionResponse = z.infer<
  typeof postApiSchemaVersionResponse
>
export const postApiSchemaVersionArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: schema_version
})
export const deleteApiSchemaVersionResponse = z.void()
export type DeleteApiSchemaVersionResponse = z.infer<
  typeof deleteApiSchemaVersionResponse
>
export const deleteApiSchemaVersionArgs = z.object({
  id: z.string().optional(),
  content: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  schema_format: z.string().optional(),
  hash: z.string().optional(),
  schema_id: z.string().optional(),
  name: z.string().optional(),
  private: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiSchemaVersionResponse = z.void()
export type PatchApiSchemaVersionResponse = z.infer<
  typeof patchApiSchemaVersionResponse
>
export const patchApiSchemaVersionArgs = z.object({
  id: z.string().optional(),
  content: z.string().optional(),
  owner_id: z.string().optional(),
  created_at: z.string().optional(),
  schema_format: z.string().optional(),
  hash: z.string().optional(),
  schema_id: z.string().optional(),
  name: z.string().optional(),
  private: z.string().optional(),
  Prefer: z.string().optional(),
  body: schema_version
})
export const artifact_version = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  created_at: z.string(),
  owner_id: z.string(),
  /** Note:
This is a Foreign Key to `artifact.id`.<fk table='artifact' column='id'/> */
  artifact_id: z.string(),
  content: z.object({})
})
export const getApiArtifactVersionResponse = z.array(artifact_version)
export type GetApiArtifactVersionResponse = z.infer<
  typeof getApiArtifactVersionResponse
>
export const getApiArtifactVersionArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  artifact_id: z.string().optional(),
  content: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiArtifactVersionResponse = z.void()
export type PostApiArtifactVersionResponse = z.infer<
  typeof postApiArtifactVersionResponse
>
export const postApiArtifactVersionArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: artifact_version
})
export const deleteApiArtifactVersionResponse = z.void()
export type DeleteApiArtifactVersionResponse = z.infer<
  typeof deleteApiArtifactVersionResponse
>
export const deleteApiArtifactVersionArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  artifact_id: z.string().optional(),
  content: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiArtifactVersionResponse = z.void()
export type PatchApiArtifactVersionResponse = z.infer<
  typeof patchApiArtifactVersionResponse
>
export const patchApiArtifactVersionArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  artifact_id: z.string().optional(),
  content: z.string().optional(),
  Prefer: z.string().optional(),
  body: artifact_version
})
export const artifact = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  created_at: z.string(),
  owner_id: z.string(),
  /** Note:
This is a Foreign Key to `workflow.id`.<fk table='workflow' column='id'/> */
  workflow_id: z.string().optional()
})
export const getApiArtifactResponse = z.array(artifact)
export type GetApiArtifactResponse = z.infer<typeof getApiArtifactResponse>
export const getApiArtifactArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  workflow_id: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiArtifactResponse = z.void()
export type PostApiArtifactResponse = z.infer<typeof postApiArtifactResponse>
export const postApiArtifactArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: artifact
})
export const deleteApiArtifactResponse = z.void()
export type DeleteApiArtifactResponse = z.infer<
  typeof deleteApiArtifactResponse
>
export const deleteApiArtifactArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  workflow_id: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiArtifactResponse = z.void()
export type PatchApiArtifactResponse = z.infer<typeof patchApiArtifactResponse>
export const patchApiArtifactArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  owner_id: z.string().optional(),
  workflow_id: z.string().optional(),
  Prefer: z.string().optional(),
  body: artifact
})
export const organisation_member = z.object({
  /** Note:
This is a Primary Key.<pk/> */
  id: z.string(),
  created_at: z.string(),
  user_id: z.string(),
  /** Note:
This is a Foreign Key to `organisation.id`.<fk table='organisation' column='id'/> */
  organisation_id: z.string()
})
export const getApiOrganisationMemberResponse = z.array(organisation_member)
export type GetApiOrganisationMemberResponse = z.infer<
  typeof getApiOrganisationMemberResponse
>
export const getApiOrganisationMemberArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  user_id: z.string().optional(),
  organisation_id: z.string().optional(),
  select: z.string().optional(),
  order: z.string().optional(),
  Range: z.string().optional(),
  'Range-Unit': z.string().optional(),
  offset: z.string().optional(),
  limit: z.string().optional(),
  Prefer: z.string().optional()
})
export const postApiOrganisationMemberResponse = z.void()
export type PostApiOrganisationMemberResponse = z.infer<
  typeof postApiOrganisationMemberResponse
>
export const postApiOrganisationMemberArgs = z.object({
  select: z.string().optional(),
  Prefer: z.string().optional(),
  body: organisation_member
})
export const deleteApiOrganisationMemberResponse = z.void()
export type DeleteApiOrganisationMemberResponse = z.infer<
  typeof deleteApiOrganisationMemberResponse
>
export const deleteApiOrganisationMemberArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  user_id: z.string().optional(),
  organisation_id: z.string().optional(),
  Prefer: z.string().optional()
})
export const patchApiOrganisationMemberResponse = z.void()
export type PatchApiOrganisationMemberResponse = z.infer<
  typeof patchApiOrganisationMemberResponse
>
export const patchApiOrganisationMemberArgs = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  user_id: z.string().optional(),
  organisation_id: z.string().optional(),
  Prefer: z.string().optional(),
  body: organisation_member
})
export const getApiRpcInsertSecretResponse = z.void()
export type GetApiRpcInsertSecretResponse = z.infer<
  typeof getApiRpcInsertSecretResponse
>
export const getApiRpcInsertSecretArgs = z.object({
  name: z.string(),
  secret: z.string()
})
export const postApiRpcInsertSecretResponse = z.void()
export type PostApiRpcInsertSecretResponse = z.infer<
  typeof postApiRpcInsertSecretResponse
>
export const postApiRpcInsertSecretArgs = z.object({
  Prefer: z.string().optional(),
  body: z.object({ name: z.string(), secret: z.string() })
})
export const getApiRpcJsonschemaValidationErrorsResponse = z.void()
export type GetApiRpcJsonschemaValidationErrorsResponse = z.infer<
  typeof getApiRpcJsonschemaValidationErrorsResponse
>
export const getApiRpcJsonschemaValidationErrorsArgs = z.object({
  schema: z.string(),
  instance: z.string()
})
export const postApiRpcJsonschemaValidationErrorsResponse = z.void()
export type PostApiRpcJsonschemaValidationErrorsResponse = z.infer<
  typeof postApiRpcJsonschemaValidationErrorsResponse
>
export const postApiRpcJsonschemaValidationErrorsArgs = z.object({
  Prefer: z.string().optional(),
  body: z.object({ instance: z.object({}), schema: z.object({}) })
})
export const getApiRpcJsonschemaIsValidResponse = z.void()
export type GetApiRpcJsonschemaIsValidResponse = z.infer<
  typeof getApiRpcJsonschemaIsValidResponse
>
export const getApiRpcJsonschemaIsValidArgs = z.object({ schema: z.string() })
export const postApiRpcJsonschemaIsValidResponse = z.void()
export type PostApiRpcJsonschemaIsValidResponse = z.infer<
  typeof postApiRpcJsonschemaIsValidResponse
>
export const postApiRpcJsonschemaIsValidArgs = z.object({
  Prefer: z.string().optional(),
  body: z.object({ schema: z.object({}) })
})
export const getApiRpcJsonbMatchesSchemaResponse = z.void()
export type GetApiRpcJsonbMatchesSchemaResponse = z.infer<
  typeof getApiRpcJsonbMatchesSchemaResponse
>
export const getApiRpcJsonbMatchesSchemaArgs = z.object({
  schema: z.string(),
  instance: z.string()
})
export const postApiRpcJsonbMatchesSchemaResponse = z.void()
export type PostApiRpcJsonbMatchesSchemaResponse = z.infer<
  typeof postApiRpcJsonbMatchesSchemaResponse
>
export const postApiRpcJsonbMatchesSchemaArgs = z.object({
  Prefer: z.string().optional(),
  body: z.object({ instance: z.object({}), schema: z.object({}) })
})
export const getApiRpcReadSecretResponse = z.void()
export type GetApiRpcReadSecretResponse = z.infer<
  typeof getApiRpcReadSecretResponse
>
export const getApiRpcReadSecretArgs = z.object({ secret_name: z.string() })
export const postApiRpcReadSecretResponse = z.void()
export type PostApiRpcReadSecretResponse = z.infer<
  typeof postApiRpcReadSecretResponse
>
export const postApiRpcReadSecretArgs = z.object({
  Prefer: z.string().optional(),
  body: z.object({ secret_name: z.string() })
})
export const getApiRpcJsonMatchesSchemaResponse = z.void()
export type GetApiRpcJsonMatchesSchemaResponse = z.infer<
  typeof getApiRpcJsonMatchesSchemaResponse
>
export const getApiRpcJsonMatchesSchemaArgs = z.object({
  schema: z.string(),
  instance: z.string()
})
export const postApiRpcJsonMatchesSchemaResponse = z.void()
export type PostApiRpcJsonMatchesSchemaResponse = z.infer<
  typeof postApiRpcJsonMatchesSchemaResponse
>
export const postApiRpcJsonMatchesSchemaArgs = z.object({
  Prefer: z.string().optional(),
  body: z.object({ instance: z.object({}), schema: z.object({}) })
})

export const CreateDeploymentVersion = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.number().int(),
        created_at: z.string(),
        owner_id: z.string(),
        /** Note:
This is a Foreign Key to `deployment.id`.<fk table='deployment' column='id'/> */
        deployment_id: z.string(),
        url: z.string()
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="owner_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>owner_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="deployment_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>deployment_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="url"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>url</FormLabel>
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

export const CreateWorkflow = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        owner_id: z.string(),
        created_at: z.string(),
        name: z.string(),
        content: z.object({})
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="owner_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>owner_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
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
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>content</FormLabel>
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

export const CreateOrganisation = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        created_at: z.string(),
        name: z.string(),
        slug: z.string()
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
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
        name="slug"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>slug</FormLabel>
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

export const CreateDeployment = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        created_at: z.string(),
        owner_id: z.string(),
        deno_project_id: z.string(),
        deno_project_name: z.string()
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="owner_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>owner_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="deno_project_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>deno_project_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="deno_project_name"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>deno_project_name</FormLabel>
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

export const CreateTransformer = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        name: z.string(),
        created_at: z.string(),
        owner_id: z.string(),
        content: z.object({}),
        description: z.string(),
        deployed: z.boolean(),
        settings: z.object({}).optional(),
        type: z.string().optional()
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
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
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="owner_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>owner_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>content</FormLabel>
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
      <Controller
        name="deployed"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>deployed</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="settings"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>settings</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>type</FormLabel>
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

export const CreateSchema = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        meta: z.object({}),
        created_at: z.string(),
        owner_id: z.string(),
        schema_source: z.string()
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="meta"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>meta</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="owner_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>owner_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="schema_source"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>schema_source</FormLabel>
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

export const CreateSchemaVersion = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        content: z.string(),
        owner_id: z.string(),
        created_at: z.string(),
        schema_format: z.string(),
        hash: z.string(),
        /** Note:
This is a Foreign Key to `schema.id`.<fk table='schema' column='id'/> */
        schema_id: z.string(),
        name: z.string(),
        private: z.boolean()
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>content</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="owner_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>owner_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="schema_format"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>schema_format</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="hash"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>hash</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="schema_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>schema_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
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
        name="private"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>private</FormLabel>
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

export const CreateArtifactVersion = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        created_at: z.string(),
        owner_id: z.string(),
        /** Note:
This is a Foreign Key to `artifact.id`.<fk table='artifact' column='id'/> */
        artifact_id: z.string(),
        content: z.object({})
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="owner_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>owner_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="artifact_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>artifact_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>content</FormLabel>
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

export const CreateArtifact = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        created_at: z.string(),
        owner_id: z.string(),
        /** Note:
This is a Foreign Key to `workflow.id`.<fk table='workflow' column='id'/> */
        workflow_id: z.string().optional()
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="owner_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>owner_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="workflow_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>workflow_id</FormLabel>
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

export const CreateOrganisationMember = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        /** Note:
This is a Primary Key.<pk/> */
        id: z.string(),
        created_at: z.string(),
        user_id: z.string(),
        /** Note:
This is a Foreign Key to `organisation.id`.<fk table='organisation' column='id'/> */
        organisation_id: z.string()
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
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="created_at"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>created_at</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="user_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>user_id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="organisation_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>organisation_id</FormLabel>
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

export const CreateRpcInsertSecret = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(z.object({ name: z.string(), secret: z.string() }))
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
        name="secret"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>secret</FormLabel>
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

export const CreateRpcJsonschemaValidationErrors = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({ instance: z.object({}), schema: z.object({}) })
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
        name="instance"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>instance</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="schema"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>schema</FormLabel>
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

export const CreateRpcJsonschemaIsValid = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(z.object({ schema: z.object({}) }))
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
        name="schema"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>schema</FormLabel>
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

export const CreateRpcJsonbMatchesSchema = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({ instance: z.object({}), schema: z.object({}) })
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
        name="instance"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>instance</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="schema"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>schema</FormLabel>
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

export const CreateRpcReadSecret = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(z.object({ secret_name: z.string() }))
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
        name="secret_name"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>secret_name</FormLabel>
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

export const CreateRpcJsonMatchesSchema = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({ instance: z.object({}), schema: z.object({}) })
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
        name="instance"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>instance</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="schema"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>schema</FormLabel>
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
    getApi: build.query<GetApiResponse, GetApiResponse>({
      query: () => ({ path: `/`, method: GET })
    }),
    getApiLatestSchemaVersion: build.query<
      GetApiLatestSchemaVersionResponse,
      GetApiLatestSchemaVersionResponse
    >({
      query: queryArg => ({
        path: `/latest_schema_version`,
        method: GET,
        params: {
          schema_id: queryArg.schema_id,
          id: queryArg.id,
          name: queryArg.name,
          content: queryArg.content,
          owner_id: queryArg.owner_id,
          created_at: queryArg.created_at,
          schema_format: queryArg.schema_format,
          hash: queryArg.hash,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    getApiDeploymentVersion: build.query<
      GetApiDeploymentVersionResponse,
      GetApiDeploymentVersionResponse
    >({
      query: queryArg => ({
        path: `/deployment_version`,
        method: GET,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          deployment_id: queryArg.deployment_id,
          url: queryArg.url,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    postApiDeploymentVersion: build.mutation<
      PostApiDeploymentVersionResponse,
      PostApiDeploymentVersionResponse
    >({
      query: queryArg => ({
        path: `/deployment_version`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiDeploymentVersion: build.mutation<
      DeleteApiDeploymentVersionResponse,
      DeleteApiDeploymentVersionResponse
    >({
      query: queryArg => ({
        path: `/deployment_version`,
        method: DELETE,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          deployment_id: queryArg.deployment_id,
          url: queryArg.url
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiDeploymentVersion: build.mutation<
      PatchApiDeploymentVersionResponse,
      PatchApiDeploymentVersionResponse
    >({
      query: queryArg => ({
        path: `/deployment_version`,
        method: PATCH,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          deployment_id: queryArg.deployment_id,
          url: queryArg.url
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiWorkflow: build.query<GetApiWorkflowResponse, GetApiWorkflowResponse>(
      {
        query: queryArg => ({
          path: `/workflow`,
          method: GET,
          params: {
            id: queryArg.id,
            owner_id: queryArg.owner_id,
            created_at: queryArg.created_at,
            name: queryArg.name,
            content: queryArg.content,
            select: queryArg.select,
            order: queryArg.order,
            offset: queryArg.offset,
            limit: queryArg.limit
          },
          headers: {
            Range: queryArg.Range,
            'Range-Unit': queryArg['Range-Unit'],
            Prefer: queryArg.Prefer
          }
        })
      }
    ),
    postApiWorkflow: build.mutation<
      PostApiWorkflowResponse,
      PostApiWorkflowResponse
    >({
      query: queryArg => ({
        path: `/workflow`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiWorkflow: build.mutation<
      DeleteApiWorkflowResponse,
      DeleteApiWorkflowResponse
    >({
      query: queryArg => ({
        path: `/workflow`,
        method: DELETE,
        params: {
          id: queryArg.id,
          owner_id: queryArg.owner_id,
          created_at: queryArg.created_at,
          name: queryArg.name,
          content: queryArg.content
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiWorkflow: build.mutation<
      PatchApiWorkflowResponse,
      PatchApiWorkflowResponse
    >({
      query: queryArg => ({
        path: `/workflow`,
        method: PATCH,
        params: {
          id: queryArg.id,
          owner_id: queryArg.owner_id,
          created_at: queryArg.created_at,
          name: queryArg.name,
          content: queryArg.content
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiOrganisation: build.query<
      GetApiOrganisationResponse,
      GetApiOrganisationResponse
    >({
      query: queryArg => ({
        path: `/organisation`,
        method: GET,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          name: queryArg.name,
          slug: queryArg.slug,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    postApiOrganisation: build.mutation<
      PostApiOrganisationResponse,
      PostApiOrganisationResponse
    >({
      query: queryArg => ({
        path: `/organisation`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiOrganisation: build.mutation<
      DeleteApiOrganisationResponse,
      DeleteApiOrganisationResponse
    >({
      query: queryArg => ({
        path: `/organisation`,
        method: DELETE,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          name: queryArg.name,
          slug: queryArg.slug
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiOrganisation: build.mutation<
      PatchApiOrganisationResponse,
      PatchApiOrganisationResponse
    >({
      query: queryArg => ({
        path: `/organisation`,
        method: PATCH,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          name: queryArg.name,
          slug: queryArg.slug
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiDeployment: build.query<
      GetApiDeploymentResponse,
      GetApiDeploymentResponse
    >({
      query: queryArg => ({
        path: `/deployment`,
        method: GET,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          deno_project_id: queryArg.deno_project_id,
          deno_project_name: queryArg.deno_project_name,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    postApiDeployment: build.mutation<
      PostApiDeploymentResponse,
      PostApiDeploymentResponse
    >({
      query: queryArg => ({
        path: `/deployment`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiDeployment: build.mutation<
      DeleteApiDeploymentResponse,
      DeleteApiDeploymentResponse
    >({
      query: queryArg => ({
        path: `/deployment`,
        method: DELETE,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          deno_project_id: queryArg.deno_project_id,
          deno_project_name: queryArg.deno_project_name
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiDeployment: build.mutation<
      PatchApiDeploymentResponse,
      PatchApiDeploymentResponse
    >({
      query: queryArg => ({
        path: `/deployment`,
        method: PATCH,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          deno_project_id: queryArg.deno_project_id,
          deno_project_name: queryArg.deno_project_name
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiTransformer: build.query<
      GetApiTransformerResponse,
      GetApiTransformerResponse
    >({
      query: queryArg => ({
        path: `/transformer`,
        method: GET,
        params: {
          id: queryArg.id,
          name: queryArg.name,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          content: queryArg.content,
          description: queryArg.description,
          deployed: queryArg.deployed,
          settings: queryArg.settings,
          type: queryArg.type,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    postApiTransformer: build.mutation<
      PostApiTransformerResponse,
      PostApiTransformerResponse
    >({
      query: queryArg => ({
        path: `/transformer`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiTransformer: build.mutation<
      DeleteApiTransformerResponse,
      DeleteApiTransformerResponse
    >({
      query: queryArg => ({
        path: `/transformer`,
        method: DELETE,
        params: {
          id: queryArg.id,
          name: queryArg.name,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          content: queryArg.content,
          description: queryArg.description,
          deployed: queryArg.deployed,
          settings: queryArg.settings,
          type: queryArg.type
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiTransformer: build.mutation<
      PatchApiTransformerResponse,
      PatchApiTransformerResponse
    >({
      query: queryArg => ({
        path: `/transformer`,
        method: PATCH,
        params: {
          id: queryArg.id,
          name: queryArg.name,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          content: queryArg.content,
          description: queryArg.description,
          deployed: queryArg.deployed,
          settings: queryArg.settings,
          type: queryArg.type
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiLatestDeploymentVersion: build.query<
      GetApiLatestDeploymentVersionResponse,
      GetApiLatestDeploymentVersionResponse
    >({
      query: queryArg => ({
        path: `/latest_deployment_version`,
        method: GET,
        params: {
          deployment_id: queryArg.deployment_id,
          id: queryArg.id,
          url: queryArg.url,
          owner_id: queryArg.owner_id,
          created_at: queryArg.created_at,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    getApiSchema: build.query<GetApiSchemaResponse, GetApiSchemaResponse>({
      query: queryArg => ({
        path: `/schema`,
        method: GET,
        params: {
          id: queryArg.id,
          meta: queryArg.meta,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          schema_source: queryArg.schema_source,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    postApiSchema: build.mutation<PostApiSchemaResponse, PostApiSchemaResponse>(
      {
        query: queryArg => ({
          path: `/schema`,
          method: POST,
          params: { select: queryArg.select },
          headers: { Prefer: queryArg.Prefer },
          body: queryArg.body
        })
      }
    ),
    deleteApiSchema: build.mutation<
      DeleteApiSchemaResponse,
      DeleteApiSchemaResponse
    >({
      query: queryArg => ({
        path: `/schema`,
        method: DELETE,
        params: {
          id: queryArg.id,
          meta: queryArg.meta,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          schema_source: queryArg.schema_source
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiSchema: build.mutation<
      PatchApiSchemaResponse,
      PatchApiSchemaResponse
    >({
      query: queryArg => ({
        path: `/schema`,
        method: PATCH,
        params: {
          id: queryArg.id,
          meta: queryArg.meta,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          schema_source: queryArg.schema_source
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiSchemaVersion: build.query<
      GetApiSchemaVersionResponse,
      GetApiSchemaVersionResponse
    >({
      query: queryArg => ({
        path: `/schema_version`,
        method: GET,
        params: {
          id: queryArg.id,
          content: queryArg.content,
          owner_id: queryArg.owner_id,
          created_at: queryArg.created_at,
          schema_format: queryArg.schema_format,
          hash: queryArg.hash,
          schema_id: queryArg.schema_id,
          name: queryArg.name,
          private: queryArg.private,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    postApiSchemaVersion: build.mutation<
      PostApiSchemaVersionResponse,
      PostApiSchemaVersionResponse
    >({
      query: queryArg => ({
        path: `/schema_version`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiSchemaVersion: build.mutation<
      DeleteApiSchemaVersionResponse,
      DeleteApiSchemaVersionResponse
    >({
      query: queryArg => ({
        path: `/schema_version`,
        method: DELETE,
        params: {
          id: queryArg.id,
          content: queryArg.content,
          owner_id: queryArg.owner_id,
          created_at: queryArg.created_at,
          schema_format: queryArg.schema_format,
          hash: queryArg.hash,
          schema_id: queryArg.schema_id,
          name: queryArg.name,
          private: queryArg.private
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiSchemaVersion: build.mutation<
      PatchApiSchemaVersionResponse,
      PatchApiSchemaVersionResponse
    >({
      query: queryArg => ({
        path: `/schema_version`,
        method: PATCH,
        params: {
          id: queryArg.id,
          content: queryArg.content,
          owner_id: queryArg.owner_id,
          created_at: queryArg.created_at,
          schema_format: queryArg.schema_format,
          hash: queryArg.hash,
          schema_id: queryArg.schema_id,
          name: queryArg.name,
          private: queryArg.private
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiArtifactVersion: build.query<
      GetApiArtifactVersionResponse,
      GetApiArtifactVersionResponse
    >({
      query: queryArg => ({
        path: `/artifact_version`,
        method: GET,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          artifact_id: queryArg.artifact_id,
          content: queryArg.content,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    postApiArtifactVersion: build.mutation<
      PostApiArtifactVersionResponse,
      PostApiArtifactVersionResponse
    >({
      query: queryArg => ({
        path: `/artifact_version`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiArtifactVersion: build.mutation<
      DeleteApiArtifactVersionResponse,
      DeleteApiArtifactVersionResponse
    >({
      query: queryArg => ({
        path: `/artifact_version`,
        method: DELETE,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          artifact_id: queryArg.artifact_id,
          content: queryArg.content
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiArtifactVersion: build.mutation<
      PatchApiArtifactVersionResponse,
      PatchApiArtifactVersionResponse
    >({
      query: queryArg => ({
        path: `/artifact_version`,
        method: PATCH,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          artifact_id: queryArg.artifact_id,
          content: queryArg.content
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiArtifact: build.query<GetApiArtifactResponse, GetApiArtifactResponse>(
      {
        query: queryArg => ({
          path: `/artifact`,
          method: GET,
          params: {
            id: queryArg.id,
            created_at: queryArg.created_at,
            owner_id: queryArg.owner_id,
            workflow_id: queryArg.workflow_id,
            select: queryArg.select,
            order: queryArg.order,
            offset: queryArg.offset,
            limit: queryArg.limit
          },
          headers: {
            Range: queryArg.Range,
            'Range-Unit': queryArg['Range-Unit'],
            Prefer: queryArg.Prefer
          }
        })
      }
    ),
    postApiArtifact: build.mutation<
      PostApiArtifactResponse,
      PostApiArtifactResponse
    >({
      query: queryArg => ({
        path: `/artifact`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiArtifact: build.mutation<
      DeleteApiArtifactResponse,
      DeleteApiArtifactResponse
    >({
      query: queryArg => ({
        path: `/artifact`,
        method: DELETE,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          workflow_id: queryArg.workflow_id
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiArtifact: build.mutation<
      PatchApiArtifactResponse,
      PatchApiArtifactResponse
    >({
      query: queryArg => ({
        path: `/artifact`,
        method: PATCH,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          owner_id: queryArg.owner_id,
          workflow_id: queryArg.workflow_id
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiOrganisationMember: build.query<
      GetApiOrganisationMemberResponse,
      GetApiOrganisationMemberResponse
    >({
      query: queryArg => ({
        path: `/organisation_member`,
        method: GET,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          user_id: queryArg.user_id,
          organisation_id: queryArg.organisation_id,
          select: queryArg.select,
          order: queryArg.order,
          offset: queryArg.offset,
          limit: queryArg.limit
        },
        headers: {
          Range: queryArg.Range,
          'Range-Unit': queryArg['Range-Unit'],
          Prefer: queryArg.Prefer
        }
      })
    }),
    postApiOrganisationMember: build.mutation<
      PostApiOrganisationMemberResponse,
      PostApiOrganisationMemberResponse
    >({
      query: queryArg => ({
        path: `/organisation_member`,
        method: POST,
        params: { select: queryArg.select },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    deleteApiOrganisationMember: build.mutation<
      DeleteApiOrganisationMemberResponse,
      DeleteApiOrganisationMemberResponse
    >({
      query: queryArg => ({
        path: `/organisation_member`,
        method: DELETE,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          user_id: queryArg.user_id,
          organisation_id: queryArg.organisation_id
        },
        headers: { Prefer: queryArg.Prefer }
      })
    }),
    patchApiOrganisationMember: build.mutation<
      PatchApiOrganisationMemberResponse,
      PatchApiOrganisationMemberResponse
    >({
      query: queryArg => ({
        path: `/organisation_member`,
        method: PATCH,
        params: {
          id: queryArg.id,
          created_at: queryArg.created_at,
          user_id: queryArg.user_id,
          organisation_id: queryArg.organisation_id
        },
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiRpcInsertSecret: build.query<
      GetApiRpcInsertSecretResponse,
      GetApiRpcInsertSecretResponse
    >({
      query: queryArg => ({
        path: `/rpc/insert_secret`,
        method: GET,
        params: { name: queryArg.name, secret: queryArg.secret }
      })
    }),
    postApiRpcInsertSecret: build.mutation<
      PostApiRpcInsertSecretResponse,
      PostApiRpcInsertSecretResponse
    >({
      query: queryArg => ({
        path: `/rpc/insert_secret`,
        method: POST,
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiRpcJsonschemaValidationErrors: build.query<
      GetApiRpcJsonschemaValidationErrorsResponse,
      GetApiRpcJsonschemaValidationErrorsResponse
    >({
      query: queryArg => ({
        path: `/rpc/jsonschema_validation_errors`,
        method: GET,
        params: { schema: queryArg.schema, instance: queryArg.instance }
      })
    }),
    postApiRpcJsonschemaValidationErrors: build.mutation<
      PostApiRpcJsonschemaValidationErrorsResponse,
      PostApiRpcJsonschemaValidationErrorsResponse
    >({
      query: queryArg => ({
        path: `/rpc/jsonschema_validation_errors`,
        method: POST,
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiRpcJsonschemaIsValid: build.query<
      GetApiRpcJsonschemaIsValidResponse,
      GetApiRpcJsonschemaIsValidResponse
    >({
      query: queryArg => ({
        path: `/rpc/jsonschema_is_valid`,
        method: GET,
        params: { schema: queryArg.schema }
      })
    }),
    postApiRpcJsonschemaIsValid: build.mutation<
      PostApiRpcJsonschemaIsValidResponse,
      PostApiRpcJsonschemaIsValidResponse
    >({
      query: queryArg => ({
        path: `/rpc/jsonschema_is_valid`,
        method: POST,
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiRpcJsonbMatchesSchema: build.query<
      GetApiRpcJsonbMatchesSchemaResponse,
      GetApiRpcJsonbMatchesSchemaResponse
    >({
      query: queryArg => ({
        path: `/rpc/jsonb_matches_schema`,
        method: GET,
        params: { schema: queryArg.schema, instance: queryArg.instance }
      })
    }),
    postApiRpcJsonbMatchesSchema: build.mutation<
      PostApiRpcJsonbMatchesSchemaResponse,
      PostApiRpcJsonbMatchesSchemaResponse
    >({
      query: queryArg => ({
        path: `/rpc/jsonb_matches_schema`,
        method: POST,
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiRpcReadSecret: build.query<
      GetApiRpcReadSecretResponse,
      GetApiRpcReadSecretResponse
    >({
      query: queryArg => ({
        path: `/rpc/read_secret`,
        method: GET,
        params: { secret_name: queryArg.secret_name }
      })
    }),
    postApiRpcReadSecret: build.mutation<
      PostApiRpcReadSecretResponse,
      PostApiRpcReadSecretResponse
    >({
      query: queryArg => ({
        path: `/rpc/read_secret`,
        method: POST,
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    }),
    getApiRpcJsonMatchesSchema: build.query<
      GetApiRpcJsonMatchesSchemaResponse,
      GetApiRpcJsonMatchesSchemaResponse
    >({
      query: queryArg => ({
        path: `/rpc/json_matches_schema`,
        method: GET,
        params: { schema: queryArg.schema, instance: queryArg.instance }
      })
    }),
    postApiRpcJsonMatchesSchema: build.mutation<
      PostApiRpcJsonMatchesSchemaResponse,
      PostApiRpcJsonMatchesSchemaResponse
    >({
      query: queryArg => ({
        path: `/rpc/json_matches_schema`,
        method: POST,
        headers: { Prefer: queryArg.Prefer },
        body: queryArg.body
      })
    })
  }),
  overrideExisting: false
})

const getApiFn = async (deploymentId: string) => {
  const res = await fetch(`/`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiLatestSchemaVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/latest_schema_version`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(latest_schema_version).parse(data)
}

const getApiDeploymentVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/deployment_version`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(deployment_version).parse(data)
}

const postApiDeploymentVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/deployment_version`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiDeploymentVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/deployment_version`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiDeploymentVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/deployment_version`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiWorkflowFn = async (deploymentId: string) => {
  const res = await fetch(`/workflow`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(workflow).parse(data)
}

const postApiWorkflowFn = async (deploymentId: string) => {
  const res = await fetch(`/workflow`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiWorkflowFn = async (deploymentId: string) => {
  const res = await fetch(`/workflow`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiWorkflowFn = async (deploymentId: string) => {
  const res = await fetch(`/workflow`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiOrganisationFn = async (deploymentId: string) => {
  const res = await fetch(`/organisation`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(organisation).parse(data)
}

const postApiOrganisationFn = async (deploymentId: string) => {
  const res = await fetch(`/organisation`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiOrganisationFn = async (deploymentId: string) => {
  const res = await fetch(`/organisation`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiOrganisationFn = async (deploymentId: string) => {
  const res = await fetch(`/organisation`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiDeploymentFn = async (deploymentId: string) => {
  const res = await fetch(`/deployment`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(deployment).parse(data)
}

const postApiDeploymentFn = async (deploymentId: string) => {
  const res = await fetch(`/deployment`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiDeploymentFn = async (deploymentId: string) => {
  const res = await fetch(`/deployment`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiDeploymentFn = async (deploymentId: string) => {
  const res = await fetch(`/deployment`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiTransformerFn = async (deploymentId: string) => {
  const res = await fetch(`/transformer`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(transformer).parse(data)
}

const postApiTransformerFn = async (deploymentId: string) => {
  const res = await fetch(`/transformer`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiTransformerFn = async (deploymentId: string) => {
  const res = await fetch(`/transformer`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiTransformerFn = async (deploymentId: string) => {
  const res = await fetch(`/transformer`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiLatestDeploymentVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/latest_deployment_version`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(latest_deployment_version).parse(data)
}

const getApiSchemaFn = async (deploymentId: string) => {
  const res = await fetch(`/schema`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(schema).parse(data)
}

const postApiSchemaFn = async (deploymentId: string) => {
  const res = await fetch(`/schema`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiSchemaFn = async (deploymentId: string) => {
  const res = await fetch(`/schema`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiSchemaFn = async (deploymentId: string) => {
  const res = await fetch(`/schema`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiSchemaVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/schema_version`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(schema_version).parse(data)
}

const postApiSchemaVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/schema_version`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiSchemaVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/schema_version`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiSchemaVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/schema_version`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiArtifactVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/artifact_version`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(artifact_version).parse(data)
}

const postApiArtifactVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/artifact_version`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiArtifactVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/artifact_version`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiArtifactVersionFn = async (deploymentId: string) => {
  const res = await fetch(`/artifact_version`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiArtifactFn = async (deploymentId: string) => {
  const res = await fetch(`/artifact`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(artifact).parse(data)
}

const postApiArtifactFn = async (deploymentId: string) => {
  const res = await fetch(`/artifact`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiArtifactFn = async (deploymentId: string) => {
  const res = await fetch(`/artifact`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiArtifactFn = async (deploymentId: string) => {
  const res = await fetch(`/artifact`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiOrganisationMemberFn = async (deploymentId: string) => {
  const res = await fetch(`/organisation_member`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(organisation_member).parse(data)
}

const postApiOrganisationMemberFn = async (deploymentId: string) => {
  const res = await fetch(`/organisation_member`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiOrganisationMemberFn = async (deploymentId: string) => {
  const res = await fetch(`/organisation_member`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const patchApiOrganisationMemberFn = async (deploymentId: string) => {
  const res = await fetch(`/organisation_member`, {
    method: 'PATCH'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiRpcInsertSecretFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/insert_secret`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const postApiRpcInsertSecretFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/insert_secret`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiRpcJsonschemaValidationErrorsFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/jsonschema_validation_errors`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const postApiRpcJsonschemaValidationErrorsFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/jsonschema_validation_errors`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiRpcJsonschemaIsValidFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/jsonschema_is_valid`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const postApiRpcJsonschemaIsValidFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/jsonschema_is_valid`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiRpcJsonbMatchesSchemaFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/jsonb_matches_schema`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const postApiRpcJsonbMatchesSchemaFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/jsonb_matches_schema`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiRpcReadSecretFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/read_secret`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const postApiRpcReadSecretFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/read_secret`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiRpcJsonMatchesSchemaFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/json_matches_schema`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const postApiRpcJsonMatchesSchemaFn = async (deploymentId: string) => {
  const res = await fetch(`/rpc/json_matches_schema`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApi = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/`, {
    method: 'GET'
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiLatestSchemaVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/latest_schema_version`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(latest_schema_version).parse(data)
}
const getApiDeploymentVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployment_version`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(deployment_version).parse(data)
}
const postApiDeploymentVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployment_version`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiDeploymentVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployment_version`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiDeploymentVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/deployment_version`,
    { method: 'PATCH', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiWorkflow = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/workflow`, {
    method: 'GET'
  })

  if (error) {
    throw error
  }

  return z.array(workflow).parse(data)
}
const postApiWorkflow = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/workflow`, {
    method: 'POST',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiWorkflow = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/workflow`, {
    method: 'DELETE'
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiWorkflow = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/workflow`, {
    method: 'PATCH',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiOrganisation = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organisation`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(organisation).parse(data)
}
const postApiOrganisation = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organisation`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiOrganisation = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organisation`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiOrganisation = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organisation`,
    { method: 'PATCH', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiDeployment = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/deployment`, {
    method: 'GET'
  })

  if (error) {
    throw error
  }

  return z.array(deployment).parse(data)
}
const postApiDeployment = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/deployment`, {
    method: 'POST',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiDeployment = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/deployment`, {
    method: 'DELETE'
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiDeployment = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/deployment`, {
    method: 'PATCH',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiTransformer = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/transformer`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(transformer).parse(data)
}
const postApiTransformer = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/transformer`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiTransformer = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/transformer`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiTransformer = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/transformer`,
    { method: 'PATCH', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiLatestDeploymentVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/latest_deployment_version`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(latest_deployment_version).parse(data)
}
const getApiSchema = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/schema`, {
    method: 'GET'
  })

  if (error) {
    throw error
  }

  return z.array(schema).parse(data)
}
const postApiSchema = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/schema`, {
    method: 'POST',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiSchema = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/schema`, {
    method: 'DELETE'
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiSchema = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/schema`, {
    method: 'PATCH',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiSchemaVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/schema_version`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(schema_version).parse(data)
}
const postApiSchemaVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/schema_version`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiSchemaVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/schema_version`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiSchemaVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/schema_version`,
    { method: 'PATCH', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiArtifactVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/artifact_version`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(artifact_version).parse(data)
}
const postApiArtifactVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/artifact_version`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiArtifactVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/artifact_version`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiArtifactVersion = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/artifact_version`,
    { method: 'PATCH', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiArtifact = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/artifact`, {
    method: 'GET'
  })

  if (error) {
    throw error
  }

  return z.array(artifact).parse(data)
}
const postApiArtifact = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/artifact`, {
    method: 'POST',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiArtifact = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/artifact`, {
    method: 'DELETE'
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiArtifact = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/artifact`, {
    method: 'PATCH',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiOrganisationMember = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organisation_member`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(organisation_member).parse(data)
}
const postApiOrganisationMember = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organisation_member`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiOrganisationMember = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organisation_member`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const patchApiOrganisationMember = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/organisation_member`,
    { method: 'PATCH', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiRpcInsertSecret = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/insert_secret`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const postApiRpcInsertSecret = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/insert_secret`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiRpcJsonschemaValidationErrors = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/jsonschema_validation_errors`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const postApiRpcJsonschemaValidationErrors = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/jsonschema_validation_errors`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiRpcJsonschemaIsValid = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/jsonschema_is_valid`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const postApiRpcJsonschemaIsValid = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/jsonschema_is_valid`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiRpcJsonbMatchesSchema = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/jsonb_matches_schema`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const postApiRpcJsonbMatchesSchema = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/jsonb_matches_schema`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiRpcReadSecret = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/read_secret`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const postApiRpcReadSecret = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/read_secret`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiRpcJsonMatchesSchema = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/json_matches_schema`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const postApiRpcJsonMatchesSchema = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/rpc/json_matches_schema`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
