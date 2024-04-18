export default {
  name: 'SiteWideSettings',
  description: '',
  type: 'document',
  title: 'SiteWideSettings',
  preview: {
    select: {
      name: 'name',
      siteWideSettingsName: 'activeSitewideSettings.name',
    },
    prepare({name, siteWideSettingsName}: {name: string; siteWideSettingsName: string}) {
      return {
        title: `Active Sitewide Settings`,
        subtitle: `Current active: ${siteWideSettingsName || 'None'}`,
      }
    },
  },
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
      readOnly: true,
      initialValue: 'SiteWideSettings',
    },
    {
      title: 'Active Sitewide Settings',
      name: 'activeSitewideSettings',
      description: '',
      type: 'reference',
      to: [{type: 'siteWideSettingsList'}],
    },
  ],
}
