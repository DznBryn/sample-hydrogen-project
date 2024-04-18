import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'mstl3bgb',
    dataset: 'production',
  },
  graphql: [
    {
      playground: false,
      tag: 'uk-production',
      workspace: 'uk-production-workspace',
      id: 'uk-production',
    },
    {
      playground: false,
      tag: 'ca-production',
      workspace: 'ca-production-workspace',
      id: 'ca-production',
    },
    {
      playground: false,
      tag: 'production',
      workspace: 'production-workspace',
      id: 'production',
    },
    {
      playground: false,
      tag: 'staging',
      workspace: 'staging-workspace',
      id: 'staging',
    },
  ],
})
