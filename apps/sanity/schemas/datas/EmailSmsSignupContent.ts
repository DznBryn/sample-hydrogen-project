import richBlockType from '../../customFields/richBlockType'

export default {
  name: 'emailSmsSignupContent',
  description: '',
  type: 'document',
  title: 'EmailSmsSignupContent',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'NewsletterText',
      name: 'newsletterText',
      ...richBlockType,
    },
    {
      title: 'NewsletterTextAfterEmailSubmit',
      name: 'newsletterTextAfterEmailSubmit',
      ...richBlockType,
    },
    {
      title: 'NewsletterSubtextAfterEmailSubmit',
      name: 'newsletterSubtextAfterEmailSubmit',
      ...richBlockType,
    },
    {
      title: 'SmsText1',
      name: 'smsText1',
      ...richBlockType,
    },
    {
      title: 'SmsText2',
      name: 'smsText2',
      ...richBlockType,
    },
    {
      title: 'NewsletterButtonLabel',
      name: 'newsletterButtonLabel',
      description: '',
      type: 'string',
    },
    {
      title: 'NewsletterFooter',
      name: 'newsletterFooter',
      ...richBlockType,
    },
    {
      title: 'SmsFooterText',
      name: 'smsFooterText',
      ...richBlockType,
    },
  ],
}
