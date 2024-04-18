import {WrenchIcon, ArchiveIcon} from '@sanity/icons'
import React from 'react'

const JsonPreview = ({document}) => {
  return (
    <div style={{padding: '25px'}}>
      <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
    </div>
  )
}

export const customDocumentNodeResolver = (S) => {
  return S.document().views([S.view.form(), S.view.component(JsonPreview).title('JSON')])
}

export const customStructure = (S) => {
  return S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('playground'),
      S.documentTypeListItem('media.tag'),
      S.documentTypeListItem('redirects'),
      S.documentTypeListItem('robots'),
      S.listItem()
        .title('Settings')
        .icon(() => <WrenchIcon />)
        .child(
          S.list()
            .title('Settings Documents')
            .items([
              S.documentTypeListItem('cartPageConfig'),
              S.documentTypeListItem('SiteWideSettings'),
            ])
        ),
      S.listItem()
        .title('All Drafts')
        .icon(() => <ArchiveIcon />)
        .child(() =>
          S.documentList()
            .title('All Drafts')
            .filter('_id in path("drafts.**")')
            .apiVersion('v2024-01-22')
        ),
      S.divider(),
      S.documentTypeListItem('products'),
      S.documentTypeListItem('productCollections'),
      S.divider(),
      S.documentTypeListItem('influencerPage'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'playground',
            'media.tag',
            'cartPageConfig',
            'SiteWideSettings',
            'products',
            'productCollections',
            'influencerPage',
            'redirects',
            'robots',
          ].includes(listItem.getId())
      ),
    ])
}
