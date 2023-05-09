//mock 
const storeId = '1e83734e-b29a-4caf-b575-9ee51ad4b9ef'; //stg

const storesIDs = {
  US: {
    DEV: '72c84931-eba5-4d46-9ad3-265966ef6a02',
    PROD: '1ab66bad-5861-4069-811d-256a147da4cb',
    STG: '1e83734e-b29a-4caf-b575-9ee51ad4b9ef'
  },
  CA: {
    PROD: '4bdc9c79-5b2b-404f-9864-3c814922fcc4'
  },
  UK: {
    PROD: 'ddd6be9a-d79b-4dd6-8652-4c61d3664548'
  }
};

const ogKeys = {
  US: {
    AD15: 'ddeeb16695fd11ea80bdbc764e10b970',
    AD20: 'fb58fa587a4411edbad7ce8f0c4adeb8'
  },
  CA: {
    AD15: 'c1ff625674af11ecbde3f2737e309b5b',
    AD20: 'dc673fbe7a4511ed8191ea4fad94f603'
  },
  UK: {
    AD15: 'ed2450c806a811edb66cda989c1a3bbf',
    AD20: 'f2f7719a7a4511ed9f3ece8f0c4adeb8'
  }
};

function getApiKeys() {

  switch (storeId) {

  case (storesIDs.US.DEV):    
    return {

      CURRENT_ENV: 'US_DEV',
      CURRENCY_SYMBOL: '$',
      CLOVERLY_ID: 40953533268141,
      AUDIOEYE_HASH: '686e7679eb385409922a704c9434649d',
      AUDIOEYE_URL: 'https://portal.audioeye.com/marketplace/accessibilitystatement/format/ajax/site/26580',
      OG_KEY: ogKeys.US.AD20,
      YOTPO_KEY: 'C0xryJ2odYUmfvBx6EmyD1JP9cAQPAjNA1KBWKwd',
      LISTRAK_SCRIPT: 'https://cdn.listrakbi.com/scripts/script.js?m=4aBATcUCndfp&v=1',
      GA_SCRIPT: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-5ZXFRC');`,
      GLADLY_CONFIG: {
        api: 'https://us-1.gladly.com',
        orgId: 'QW4MLmtCTR2XgALQ0o8IeA',
        brandId: 'tula.com-en-us',
        cdn: 'https://cdn.gladly.com',
        selector: '#gladly-help-center'
      },
      GLADLY_EMBED_CONFIG: { appId: 'tula.com' },
      GOOGLE_SITE_VERIFICATION_ID: 'O3zBsezZx0F3tdxnuN6KZOowjnNL9uEG30WLTNSmz4E',
      RETURNS_HREF: 'https://returns.tula.com/',
      LISTRAK_IDS: {
        // list_id: 345013,
        // birthday_segment_id: 431,
        externalEventName: 11771,
        fieldGroupName: 51,
        fieldName: 7810
      },
      YOTTA_KEY: 'zZisVju12QIJQg',
      YOTPO_PROD_GALLERY_ID: '5d3f111dd060a417368c1683',
      YOTPO_LOYALTY_GUID: '2WRlHAg5CQBSYTHLyTML2A',
      GIFT_CARD_ID: 33630516353,
      GIFT_CARDS_VARIANTS_IDS: [33630516353, 33630516417, 34008161345, 34008182785, 30290305187886],
      SHOW_FIREWORK: true,
      ONE_TRUST: {
        OtAutoBlock: 'https://cdn.cookielaw.org/consent/7df3cc93-89e6-4e2d-b2d6-bbb988cb41dd-test/OtAutoBlock.js',
        OtSDKStub: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
        // domain_script: '7df3cc93-89e6-4e2d-b2d6-bbb988cb41dd-test',
        otButtonMessage: 'Do Not Sell My Information'
      },
      FEATURE_FLAGS: {
        LOYALTY: true,
      },
      // API_TYPE: storePlatformApiType
    };

  case (storesIDs.US.STG):
    return {

      CURRENT_ENV: 'US_STG',
      CURRENCY_SYMBOL: '$',
      CLOVERLY_ID: 39694764015662,
      AUDIOEYE_HASH: '686e7679eb385409922a704c9434649d',
      AUDIOEYE_URL: 'https://portal.audioeye.com/marketplace/accessibilitystatement/format/ajax/site/26580',
      OG_KEY: ogKeys.US.AD20,
      YOTPO_KEY: 'C0xryJ2odYUmfvBx6EmyD1JP9cAQPAjNA1KBWKwd',
      LISTRAK_SCRIPT: 'https://cdn.listrakbi.com/scripts/script.js?m=4aBATcUCndfp&v=1',
      GA_SCRIPT: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-5ZXFRC');`,
      GLADLY_CONFIG: {
        api: 'https://us-1.gladly.com',
        orgId: 'QW4MLmtCTR2XgALQ0o8IeA',
        brandId: 'tula.com-en-us',
        cdn: 'https://cdn.gladly.com',
        selector: '#gladly-help-center'
      },
      GLADLY_EMBED_CONFIG: { appId: 'tula.com' },
      GOOGLE_SITE_VERIFICATION_ID: 'O3zBsezZx0F3tdxnuN6KZOowjnNL9uEG30WLTNSmz4E',
      RETURNS_HREF: 'https://returns.tula.com/',
      LISTRAK_IDS: {
        // list_id: 345013,
        // birthday_segment_id: 431,
        externalEventName: 11771,
        fieldGroupName: 51,
        fieldName: 7810
      },
      YOTTA_KEY: 'zZisVju12QIJQg',
      YOTPO_PROD_GALLERY_ID: '5d3f111dd060a417368c1683',
      YOTPO_LOYALTY_GUID: 'qfEoWaPmtkBoUMwPAGu1ow',
      YOTPO_LOYALTY_WIDGETS: {
        // receipt_uploader: '264193',
      },
      GIFT_CARD_ID: 33630516353,
      GIFT_CARDS_VARIANTS_IDS: [33630516353, 33630516417, 34008161345, 34008182785, 30290305187886],
      SHOW_FIREWORK: true,
      ONE_TRUST: {
        OtAutoBlock: 'https://cdn.cookielaw.org/consent/7df3cc93-89e6-4e2d-b2d6-bbb988cb41dd-test/OtAutoBlock.js',
        OtSDKStub: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
        // domain_script: '7df3cc93-89e6-4e2d-b2d6-bbb988cb41dd-test',
        otButtonMessage: 'Do Not Sell My Information'
      },
      FEATURE_FLAGS: {
        LOYALTY: true,
      },
      // API_TYPE: storePlatformApiType
    };

  case (storesIDs.US.PROD):
    return {

      CURRENT_ENV: 'US_PROD',
      CURRENCY_SYMBOL: '$',
      CLOVERLY_ID: 39694764015662,
      AUDIOEYE_HASH: '686e7679eb385409922a704c9434649d',
      AUDIOEYE_URL: 'https://portal.audioeye.com/marketplace/accessibilitystatement/format/ajax/site/26580',
      OG_KEY: ogKeys.US.AD20,
      YOTPO_KEY: 'C0xryJ2odYUmfvBx6EmyD1JP9cAQPAjNA1KBWKwd',
      LISTRAK_SCRIPT: 'https://cdn.listrakbi.com/scripts/script.js?m=4aBATcUCndfp&v=1',
      GA_SCRIPT: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-5ZXFRC');`,
      GLADLY_CONFIG: {
        api: 'https://us-1.gladly.com',
        orgId: 'QW4MLmtCTR2XgALQ0o8IeA',
        brandId: 'tula.com-en-us',
        cdn: 'https://cdn.gladly.com',
        selector: '#gladly-help-center'
      },
      GLADLY_EMBED_CONFIG: { appId: 'tula.com' },
      GOOGLE_SITE_VERIFICATION_ID: 'O3zBsezZx0F3tdxnuN6KZOowjnNL9uEG30WLTNSmz4E',
      RETURNS_HREF: 'https://returns.tula.com/',
      LISTRAK_IDS: {
        // list_id: 345013,
        // birthday_segment_id: 431,
        externalEventName: 11771,
        fieldGroupName: 51,
        fieldName: 7810
      },
      YOTTA_KEY: 'zZisVju12QIJQg',
      YOTPO_PROD_GALLERY_ID: '5d3f111dd060a417368c1683',
      YOTPO_LOYALTY_GUID: 'qfEoWaPmtkBoUMwPAGu1ow',
      GIFT_CARD_ID: 33630516353,
      GIFT_CARDS_VARIANTS_IDS: [33630516353, 33630516417, 34008161345, 34008182785, 30290305187886],
      SHOW_FIREWORK: true,
      ONE_TRUST: {
        OtAutoBlock: 'https://cdn.cookielaw.org/consent/7df3cc93-89e6-4e2d-b2d6-bbb988cb41dd-test/OtAutoBlock.js',
        OtSDKStub: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
        // domain_script: '7df3cc93-89e6-4e2d-b2d6-bbb988cb41dd-test',
        otButtonMessage: 'Do Not Sell My Information'
      },
      FEATURE_FLAGS: {
        LOYALTY: true,
      },
      // API_TYPE: storePlatformApiType
    };

  case (storesIDs.CA.PROD):
    return {

      CURRENT_ENV: 'CA_PROD',
      CURRENCY_SYMBOL: '$',
      CLOVERLY_ID: 40953533268141,
      AUDIOEYE_HASH: 'd5f4121320cf7d960ef0d5088649aff4',
      AUDIOEYE_URL: 'https://customer-portal.audioeye.com/accessibility-statement.html?domain=tulaskincare.ca',
      OG_KEY: ogKeys.CA.AD20,
      YOTPO_KEY: 'oyOGMszxVLKBCAkDrwDJVKw2huWE5begXY836FaN',
      LISTRAK_SCRIPT: 'https://cdn.listrakbi.com/scripts/script.js?m=XFjQ0i6x3CEB&v=1',
      GA_SCRIPT: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-MPMHT3S');`,
      GLADLY_CONFIG: {
        api: 'https://tula.gladly.com',
        orgId: 'QW4MLmtCTR2XgALQ0o8IeA',
        brandId: 'Cwlh9rPdSRKp6wkbJbmlxg',
        cdn: 'https://cdn.gladly.com',
        selector: '#gladly-help-center'
      },
      GLADLY_EMBED_CONFIG: { appId: 'tula.com-canada' },
      GOOGLE_SITE_VERIFICATION_ID: 'CXLFa98xjLun0wo4c4Fm9Nk21ZwpFiM5sRLIHL-Bzvc',
      RETURNS_HREF: 'https://returns.tulaskincare.ca/',
      LISTRAK_IDS: {
        // list_id: 346002,
        // birthday_segment_id: 25869,
        externalEventName: 13307,
        fieldGroupName: 2873,
        fieldName: 26307
      },
      YOTTA_KEY: 'P6Qr6e8GbjsV4g',
      YOTPO_PROD_GALLERY_ID: '625d7884cece0506720d4d38',
      YOTPO_LOYALTY_GUID: 'BQyPisPfp0K9qSSRoSTM9Q',
      GIFT_CARD_ID: 42936398807263,
      GIFT_CARDS_VARIANTS_IDS: [42936398807263, 42936398840031, 42936398872799, 42936398905567, 42936398938335],
      SHOW_FIREWORK: false,
      FEATURE_FLAGS: {
        LOYALTY: false,
      },
      // API_TYPE: storePlatformApiType
    };

  case (storesIDs.UK.PROD):
    return {

      CURRENT_ENV: 'UK_PROD',
      CURRENCY_SYMBOL: '£',
      CLOVERLY_ID: 40953533268141,
      AUDIOEYE_HASH: 'b2ff5a33ddb224387e0a0961f30fe6a0',
      AUDIOEYE_URL: 'https://customer-portal.audioeye.com/accessibility-statement.html?domain=tulaskincare.co.uk',
      OG_KEY: ogKeys.UK.AD20,
      YOTPO_KEY: 'hMVU5uRCT6zhUr2SOSA7rflNcZmjs5ZlTaSOzjWx',
      LISTRAK_SCRIPT: 'https://cdn.listrakbi.com/scripts/script.js?m=WXn2lO0vrk3n&v=1',
      GA_SCRIPT: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-N4P454X');`,
      GLADLY_CONFIG: {
        api: 'https://tula.gladly.com',
        orgId: 'QW4MLmtCTR2XgALQ0o8IeA',
        brandId: 'RFyIyiaISn2Uh6tM5J_ggA',
        cdn: 'https://cdn.gladly.com',
        selector: '#gladly-help-center'
      },
      GLADLY_EMBED_CONFIG: { appId: 'tula.com-canada' },
      GOOGLE_SITE_VERIFICATION_ID: '3fu79kDaiqWI3f6z55q1ZqEe3ENsbGWLDOoKR7PJmuI',
      RETURNS_HREF: '/pages/faq?a=What-is-your-return-policy---id--8SHAtr2IT0GpnbwAdBP50Q',
      LISTRAK_IDS: {
        // list_id: 346019,
        // birthday_segment_id: 26799,
        externalEventName: 13330,
        fieldGroupName: 2948,
        fieldName: 26886
      },
      YOTTA_KEY: 'P6Qr6e8GbjsV4g',
      YOTPO_PROD_GALLERY_ID: '625d7884cece0506720d4d38',
      YOTPO_LOYALTY_GUID: 'xpVaGpCDsSJoAZoBLKuxig',
      GIFT_CARD_ID: 7781918540017,
      GIFT_CARDS_VARIANTS_IDS: [43180565561585, 43180565627121, 43180565659889, 43180565692657, 43180565725425],
      SHOW_FIREWORK: false,
      ONE_TRUST: {
        OtAutoBlock: 'https://cdn.cookielaw.org/consent/de8c07e1-4b8c-47f4-a161-c9c1cd0402b7-test/OtAutoBlock.js',
        OtSDKStub: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js ',
        // domain_script: 'de8c07e1-4b8c-47f4-a161-c9c1cd0402b7-test',
        otButtonMessage: 'Cookie Preferences'
      },
      FEATURE_FLAGS: {
        LOYALTY: false,
      },
      // API_TYPE: storePlatformApiType
    };
  }

}

export default getApiKeys;