import {CrossDatasetDuplicatorAction} from '@sanity/cross-dataset-duplicator'
import {DocumentActionComponent} from 'sanity'
import {TransferIcon} from '@sanity/icons'
import {useState} from 'react'

export const DuplicatorAction: DocumentActionComponent = ({published, onComplete}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [duplicated, setDuplicated] = useState(false)

  const openComp = dialogOpen && published !== null

  return {
    label: 'Migrate to',
    title: 'Migrate to',
    tone: 'positive',
    disabled: submitting || duplicated || published === null,
    loading: submitting,
    icon: TransferIcon,
    dialog: openComp && {
      type: 'popover',
      title: 'Cross Dataset Duplicator',
      content: (
        <CrossDatasetDuplicatorAction
          docs={[published]}
          onDuplicated={async () => {
            alert('Data migrated')
            await new Promise((resolve) => {
              setTimeout(() => {
                setDialogOpen(false)
                setDuplicated(true)
                resolve({})
              }, 1000)
            })
          }}
        />
      ),
      onClose: () => {
        onComplete()
        setDialogOpen(false)
        setSubmitting(false)
      },
    },
    onHandle: () => {
      setDialogOpen(true)
    },
  }
}
