import {defineConfig} from 'sanity'
import {schemaTypes} from './schemas'
import {colorInput} from '@sanity/color-input'
import {media} from 'sanity-plugin-media'
import {documentListWidget} from 'sanity-plugin-dashboard-widget-document-list'
import {dashboardTool, projectUsersWidget, projectInfoWidget} from '@sanity/dashboard'
import {customDocumentNodeResolver, customStructure} from './deskStructure'
import {scheduledPublishing} from '@sanity/scheduled-publishing'
import {crossDatasetDuplicator} from '@sanity/cross-dataset-duplicator'
import {DuplicatorAction} from './studioSettings/actions'
import {structureTool} from 'sanity/structure'

const plugins = [
  dashboardTool({
    widgets: [
      projectInfoWidget(),
      projectUsersWidget(),
      documentListWidget({title: 'New', order: '_createdAt desc'}),
      documentListWidget({title: 'Last edited', order: '_updatedAt  desc'}),
    ],
  }),
  structureTool({
    defaultDocumentNode: customDocumentNodeResolver,
    structure: customStructure,
  }),
  crossDatasetDuplicator({
    types: ['document'],
    tool: false, //switch to true to add the tool to move a lot of components using querys
  }),
  colorInput(),
  media(),
  scheduledPublishing(),
]

export default defineConfig([
  {
    projectId: 'mstl3bgb',
    dataset: 'staging',
    name: 'staging-workspace',
    basePath: '/staging',
    title: 'Staging',
    plugins,
    document: {
      actions: [DuplicatorAction],
    },
    schema: {
      types: schemaTypes,
    },
  },
  {
    projectId: 'mstl3bgb',
    dataset: 'production',
    name: 'production-workspace',
    basePath: '/production',
    title: 'Production',
    plugins,
    document: {
      actions: [DuplicatorAction],
    },
    schema: {
      types: schemaTypes,
    },
  },
  {
    projectId: 'mstl3bgb',
    dataset: 'canada_prod',
    name: 'ca-production-workspace',
    basePath: '/ca-production',
    title: 'CA-Production',
    plugins,
    document: {
      actions: [DuplicatorAction],
    },
    schema: {
      types: schemaTypes,
    },
  },
  {
    projectId: 'mstl3bgb',
    dataset: 'uk_prod',
    name: 'uk-production-workspace',
    basePath: '/uk-production',
    title: 'UK-Production',
    plugins,
    document: {
      actions: [DuplicatorAction],
    },
    schema: {
      types: schemaTypes,
    },
  },
])
