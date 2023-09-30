import {gql} from '@apollo/client';

export const GET_TULA_SCHOLARSHIP_PAGE = gql`
  query GetAllTulaScholarshipPage {
    allTulaScholarshipPage {
      _id
      name
      ContentRaw
      ContentTwoRaw
      ContentThreeRaw
      ContentFourRaw
      ContentFiveRaw
      ContentSixRaw
      ContentSevenRaw
      ContentEightRaw
      ContentNineRaw
      ContentTenRaw
      ContentElevenRaw
    }
  }
`;

export const GET_COOKIE_POLICY_PAGE = gql`
  query GetAllCookiePolicyPage {
    allCookiePolicyPage {
      _id
      name
      ContentRaw
      ContentTwoRaw
      ContentThreeRaw
      ContentFourRaw
    }
  }
`;

export const GET_PRIVACY_POLICY_PAGE = gql`
  query GetAllPrivacyPolicyPage {
    allPrivacyPolicyPage {
      _id
      name
      ContentRaw
      ContentTwoRaw
    }
  }
`;

export const GET_TERMS_CONDITIONS_PAGE = gql`
  query GetAllTermsConditionsPage {
    allTermsConditionsPage {
      _id
      name
      ContentRaw
    }
  }
`;

export const GET_PRESS_PAGE = gql`
  query GetAllPressPage {
    allPressPage {
      _id
      name
      topBanner {
        asset {
          _id
          url
        }
      }
      featuredBlockOneLogo {
        asset {
          _id
          url
        }
      }
      featuredBlockOneText
      featuredBlockTwoLogo {
        asset {
          _id
          url
        }
      }
      featuredBlockTwoText
      featuredBlockThreeLogo {
        asset {
          _id
          url
        }
      }
      featuredBlockThreeText
      featuredBlockFourLogo {
        asset {
          _id
          url
        }
      }
      featuredBlockFourText
      featuredBlockFiveLogo {
        asset {
          _id
          url
        }
      }
      featuredBlockFiveText
      featuredBlockSixLogo {
        asset {
          _id
          url
        }
      }
      featuredBlockSixText
      articleOneImage {
        asset {
          _id
          url
        }
      }
      articleOneLogo {
        asset {
          _id
          url
        }
      }
      articleOnePreviewText
      articleOneLink
      articleTwoImage {
        asset {
          _id
          url
        }
      }
      articleTwoLogo {
        asset {
          _id
          url
        }
      }
      articleTwoPreviewText
      articleTwoLink
      articleThreeImage {
        asset {
          _id
          url
        }
      }
      articleThreeLogo {
        asset {
          _id
          url
        }
      }
      articleThreePreviewText
      articleThreeLink
      articleFourImage {
        asset {
          _id
          url
        }
      }
      articleFourLogo {
        asset {
          _id
          url
        }
      }
      articleFourPreviewText
      articleFourLink
      articleFiveImage {
        asset {
          _id
          url
        }
      }
      articleFiveLogo {
        asset {
          _id
          url
        }
      }
      articleFivePreviewText
      articleFiveLink
      articleSixImage {
        asset {
          _id
          url
        }
      }
      articleSixLogo {
        asset {
          _id
          url
        }
      }
      articleSixPreviewText
      articleSixLink
      productRecommendationHeader
      productRecommendationSubHeader
      productRecommendations {
        name
        promoPosition1
        promoOneLink
        promoPosition2
        promoTwoLink
        promoPosition3
        promoThreeLink
        additionalProductsTitle
        additionalProducts
        showCompareButton
        fireworkStoryPosition
        collectionId
      }
      seoTitle
      seoDescription
      seoUrl
    }
  }
`;

export const GET_SMS_SIGNUP = gql`
  query GetAllSmsSignUp {
    allSmsSignUp {
      _id
      name
      headline
      subCopyRaw
      ctaLabel
      disclaimerRaw
      imageText
      backgroundImage {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_EMBRACE_YOUR_SKIN = gql`
  query GetAllEmbraceYourSkin {
    allEmbraceYourSkin {
      _id
      name
      tulaSkincareLogo {
        asset {
          _id
          url
        }
      }
      heartIcon {
        asset {
          _id
          url
        }
      }
      heartSms {
        asset {
          _id
          url
        }
      }
      drRaj {
        asset {
          _id
          url
        }
      }
      downArrow {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_AUTO_DELIVERY = gql`
  query GetAutoDelivery {
    allAutoDelivery {
      _id
      name
      featuredCollection {
        name
        promoPosition1
        promoOneLink
        promoPosition2
        promoTwoLink
        promoPosition3
        promoThreeLink
        additionalProductsTitle
        additionalProducts
        showCompareButton
        fireworkStoryPosition
        collectionId
      }
      heroBackgroundImage {
        asset {
          _id
          url
        }
      }
      heroBackgroundMobileImage {
        asset {
          _id
          url
        }
      }
      sectionTwoIconOne {
        asset {
          _id
          url
        }
      }
      sectionTwoIconTwo {
        asset {
          _id
          url
        }
      }
      sectionTwoIconThree {
        asset {
          _id
          url
        }
      }
      sectionThreeBigImage {
        asset {
          _id
          url
        }
      }
      sectionThreeSmallImage {
        asset {
          _id
          url
        }
      }
      sectionThreeMobileImage {
        asset {
          _id
          url
        }
      }
      checkmark {
        asset {
          _id
          url
        }
      }
      fullWidthBannerImage {
        asset {
          _id
          url
        }
      }
      fullWidthBannerMobileImage {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_CONTACT_US = gql`
  query GetAllContactUs {
    allContactUs {
      _id
      name
      contactMessage
      emailAddress
      contactEmailIcon {
        asset {
          _id
          url
        }
      }
      contactEmailHeader
      emailAddress
      contactPhoneIcon {
        asset {
          _id
          url
        }
      }
      contactPhoneHeader
      phoneNumber
      contactSocialIcon {
        asset {
          _id
          url
        }
      }
      officeHours
      ContactSocialHeader
      facebook
      twitter
      pinterest
      instagram
    }
  }
`;

export const GET_OUR_STORY = gql`
  query GetAllOurStory {
    allOurStoryAndFounder {
      _id
      name
      sectionOneImageLeft {
        asset {
          _id
          url
        }
      }
      sectionOneImageRight {
        asset {
          _id
          url
        }
      }
      sectionThreeImage {
        asset {
          _id
          url
        }
      }
      sectionFourImage {
        asset {
          _id
          url
        }
      }
      contentSectionOneRaw
      contentSectionTwoRaw
      contentSectionThreeRaw
      contentSectionFourRaw
      contentSectionFiveRaw
    }
  }
`;

export const GET_WHY_TULA = gql`
  query GetWhyTula {
    allWhyTula {
      _id
      name
      imageOne {
        asset {
          _id
          url
        }
      }
      imageTwo {
        asset {
          _id
          url
        }
      }
      imageThree {
        asset {
          _id
          url
        }
      }
      imageFour {
        asset {
          _id
          url
        }
      }
      imageOneMobile {
        asset {
          _id
          url
        }
      }
      imageTwoMobile {
        asset {
          _id
          url
        }
      }
      imageThreeMobile {
        asset {
          _id
          url
        }
      }
      imageFourMobile {
        asset {
          _id
          url
        }
      }
      sectionLinks
    }
  }
`;

export const GET_FOOTERS = gql`
  query GetAllFooters {
    allFooters {
      _id
      name
      navLinkGroups {
        _id
        displayText
        url
        navLinks {
          _id
          displayText
          url
          emoji {
            asset {
              _id
              url
            }
          }
          fontColorHex
          calloutText
          calloutFontColorHex
          thumbnail {
            asset {
              _id
              url
            }
          }
        }
        fontColorHex
        emoji {
          asset {
            _id
            url
          }
        }
        order
      }
    }
  }
`;

export const GET_EMAIL_SMS_SIGNUP_CONTENT = gql`
  query GetAllEmailSmsSignupContent {
    allEmailSmsSignupContent {
      _id
      name
      newsletterTextRaw
      newsletterTextAfterEmailSubmitRaw
      newsletterSubtextAfterEmailSubmitRaw
      smsText1Raw
      smsText2Raw
      newsletterButtonLabel
      newsletterFooterRaw
      smsFooterTextRaw
    }
  }
`;

export const GET_CART_PAGE_CONFIG = gql`
  query GetAllCartPageConfig {
    allCartPageConfig {
      _id
      name
      emptyCartMessageRaw
      emptyCartLeftCTARaw
      emptyCartRightCTARaw
      promoTextMobileRaw
      promoTextDesktopRaw
      footerLeftCTARaw
      footerRightCTARaw
      productLimit
      productLimitText
      freeShippingThreshold
      promoImageMobile {
        asset {
          _id
          url
        }
      }
      promoImageDesktop {
        asset {
          _id
          url
        }
      }
      autoDeliveryDiscount
      autoDeliveryMessage {
        name
        message
        promoMessage
        limitedTimeBadge
      }
      switchAutoDeliveryMessageRaw
      sellingPlans {
        name
        sellingPlanID
      }
      show_afterpay
      freeGiftPromoToggle
      freeGiftPromoProductExternalID
      freeGiftPromoProductPrice
      freeGiftPromoIsMisteryProductToggle
      freeGiftPromoMysteryImage {
        asset {
          _id
          url
        }
      }
      freeGiftPromoStartDate
      freeGiftPromoStartHour
      freeGiftPromoEndDate
      freeGiftPromoEndHour
      freeGiftPromoThreshold
      freeGiftPromoProgressCompleteMessage
      freeGiftPromoCombineAD
      enableCountdownTimerPromo
      countdownTimerPromoESTDeadlineDate
      countdownTimerPromoESTDeadlineHour
      countdownTimerPromoCopy
      countdownTimerPromoBannerColor
      emptyCartTemporaryWarnRaw
      cartTemporaryWarnRaw
      showTemporaryWarn
    }
  }
`;

export const GET_ANNOUNCEMENT_HEADER = gql`
  query GetAllAnnouncementHeader {
    allAnnouncementHeaders {
      _id
      name
      backgroundColorHex
      fontColorHex
      referralText
      referralUrl
      promoTextRaw
      promoModalLinkText
      modalRaw
      emoji {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_ANNOUNCEMENT_MESSAGES = gql`
  query GetAllAnnouncementMessages {
    allAnnouncementMessages {
      _id
      name
      announcementTextRaw
      announcementURL
      emoji {
        asset {
          _id
          url
        }
      }
      shouldOpenModal
      modalLinkText
      modalContentRaw
      shouldOpenLink
      linkToGo
    }
  }
`;

export const GET_MOBILE_NAV_BAR = gql`
  query GetAllAnnouncementMessages {
    allMobileNavbar {
      _id
      name
      navbarItems {
        _id
        displayText
        url
        navLinks {
          _id
          displayText
          url
          emoji {
            asset {
              _id
              url
            }
          }
          fontColorHex
          calloutText
          calloutFontColorHex
          thumbnail {
            asset {
              _id
              url
            }
          }
        }
        fontColorHex
        emoji {
          asset {
            _id
            url
          }
        }
        order
      }
    }
  }
`;

export const GET_HEADER_CONFIG = gql`
  query GetAllHeaderConfig {
    allHeaderConfig {
      _id
      name
      headerNavItems {
        name
        displayText
        linkUrl
        dropdownOverlay {
          name
          carouselProductCollection {
            name
            promoPosition1
            promoOneLink
            promoPosition2
            promoTwoLink
            promoPosition3
            promoThreeLink
            additionalProductsTitle
            additionalProducts
            showCompareButton
            fireworkStoryPosition
            collectionId
          }
          overlayNavLinks {
            _id
            displayText
            url
            emoji {
              asset {
                _id
                url
              }
            }
            fontColorHex
            calloutText
            calloutFontColorHex
            thumbnail {
              asset {
                _id
                url
              }
            }
          }
          megaMenuOverlay {
            name
            leftBackgroundMedia {
              asset {
                _id
                url
              }
            }
            leftCta
            leftCtaUrl
            rightBackgroundMedia {
              asset {
                _id
                url
              }
            }
            rightCta
            rightCtaUrl
            navLinkGroups {
              _id
              displayText
              url
              navLinks {
                _id
                displayText
                url
                emoji {
                  asset {
                    _id
                    url
                  }
                }
                fontColorHex
                calloutText
                calloutFontColorHex
                thumbnail {
                  asset {
                    _id
                    url
                  }
                }
              }
              fontColorHex
              emoji {
                asset {
                  _id
                  url
                }
              }
              order
            }
          }
          megaMenuSplit {
            name
            backgroundImage {
              asset {
                _id
                url
              }
            }
            imageText
            imageTextCta
            imageCollectionLink {
              name
              promoPosition1
              promoOneLink
              promoPosition2
              promoTwoLink
              promoPosition3
              promoThreeLink
              additionalProductsTitle
              additionalProducts
              showCompareButton
              fireworkStoryPosition
              collectionId
            }
            menuCollections {
              name
              promoPosition1
              promoOneLink
              promoPosition2
              promoTwoLink
              promoPosition3
              promoThreeLink
              additionalProductsTitle
              additionalProducts
              showCompareButton
              fireworkStoryPosition
              collectionId
            }
          }
        }
        emoji {
          asset {
            _id
            url
          }
        }
        fontColorHex
        viewAllText
        viewAllLink
      }
    }
  }
`;

export const GET_MOBILE_NAV_FOOTER_MAIN_BUTTON = gql`
  query GetAllFooters {
    allMobileNavFooterMainButton {
      _id
      name
      header
      contentText
      linkURL
      imageBackground {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_ANNOUNCEMENT_TOP_BANNER = gql`
  query GetAllFooters {
    allAnnouncementTopBanner {
      _id
      name
      messageRaw
      background
      closeButtonColor
      available
    }
  }
`;

export const GET_SITE_WIDE_SETTINGS = gql`
  query GetAllSiteWideSettings {
    allSiteWideSettings {
      _id
      name
      promoDiscountMessage
      promoDiscount
      excludeList
    }
  }
`;

export const GET_SEARCH_CONFIG = gql`
  query GetAllSearchConfig {
    allSearchConfig {
      _id
      name
      searchTags
      searchProducts {
        name
        richRaw
        alt_title
        reviews_average
        reviews_count
        shouldShowOOSForm
        ingredients_list
        full_ingredients_list
        productPromos {
          name
          promoMessage
          discount
          variantIds
          showPromo
        }
        recommendedSellingPlan
        sales_rank
        whatItDoes
        keyIngredients
        finish
        tabs {
          name
          tabName
          button {
            name
            showButton
            text
            buttonOutlineStyle
            slideContent {
              name
              title
              contentRaw
            }
          }
          contentBlock {
            name
            title
            contents {
              name
              headerRaw
              image {
                asset {
                  _id
                  url
                }
              }
              subtitle
              body
              htmlSubtitleRaw
              htmlBodyRaw
            }
          }
          useBackgroundGradient
        }
        certifiedBadges {
          name
          badges {
            name
            image {
              asset {
                _id
                url
              }
            }
            title
          }
        }
        description_WithPriority
        benefits_WithPriority
        gallery_WithPriority {
          asset {
            _id
            url
          }
        }
        exclusiveAtcColor
        exclusiveTextColor
        productId
      }
    }
  }
`;

export const GET_CAROUSEL_SLIDES_GROUP = gql`
  query GetAllCarouselSlidesGroup {
    allCarouselSlidesGroup {
      _id
      name
      slides {
        _id
        name
        fullWidth
        fullWidthImage {
          asset {
            _id
            url
          }
        }
        fullWidthMobileImage {
          asset {
            _id
            url
          }
        }
        slideBGColorHex
        slideEyebrowFontColorHex
        slideEyebrowText
        slideHeaderFontColorHex
        slideHeader
        slideCopyFontColorHex
        slideCopyRaw
        slideCtaFontColorHex
        slideCta
        slideCtaBGColorHex
        slideCtaLink
        slideImage {
          asset {
            _id
            url
          }
        }
        slideImageMobile {
          asset {
            _id
            url
          }
        }
        videoSlideHeader
        videoSlideCopy
        videoSlideCta
        videoSlideCtaLink
        video {
          asset {
            _id
            url
          }
        }
      }
    }
  }
`;

export const GET_HOME_PAGE_RECOMMENDATIONS = gql`
  query GetAllHomePageRecommendations {
    allHomepageRecommendations {
      _id
      name
      collectionOne {
        name
        promoPosition1
        promoOneLink
        promoPosition2
        promoTwoLink
        promoPosition3
        promoThreeLink
        additionalProductsTitle
        additionalProducts
        showCompareButton
        fireworkStoryPosition
        collectionId
      }
      collectionOneFontColorHex
      collectionOneEmoji {
        asset {
          _id
          url
        }
      }
      collectionTwo {
        name
        promoPosition1
        promoOneLink
        promoPosition2
        promoTwoLink
        promoPosition3
        promoThreeLink
        additionalProductsTitle
        additionalProducts
        showCompareButton
        fireworkStoryPosition
        collectionId
      }
      collectionTwoFontColorHex
      collectionTwoEmoji {
        asset {
          _id
          url
        }
      }
      collectionThree {
        name
        promoPosition1
        promoOneLink
        promoPosition2
        promoTwoLink
        promoPosition3
        promoThreeLink
        additionalProductsTitle
        additionalProducts
        showCompareButton
        fireworkStoryPosition
        collectionId
      }
      collectionThreeFontColorHex
      collectionThreeEmoji {
        asset {
          _id
          url
        }
      }
      collectionFour {
        name
        promoPosition1
        promoOneLink
        promoPosition2
        promoTwoLink
        promoPosition3
        promoThreeLink
        additionalProductsTitle
        additionalProducts
        showCompareButton
        fireworkStoryPosition
        collectionId
      }
      collectionFourFontColorHex
      collectionFourEmoji {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_HOMEPAGE_SHOP_BY_CONCERN = gql`
  query GetAllHomepageShopByConcern {
    allHomepageShopByConcern {
      _id
      name
      collectionLink
      concernImage {
        asset {
          _id
          url
        }
      }
      linkText
    }
  }
`;

export const GET_HOMEPAGE_WHY_PROBIOTICS = gql`
  query GetAllHomepageWhyProbiotics {
    allHomepageWhyProbiotics {
      _id
      name
      header
      sectionCopy
      subheaderOne
      subtextOne
      subheaderTwo
      subtextTwo
      subheaderThree
      subtextThree
      buttonText
      buttonUrl
      bigImage {
        asset {
          _id
          url
        }
      }
      smallImage {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_HOMEPAGE_SKIN_QUIZ = gql`
  query GetAllHomepageSkinQuiz {
    allHomepageSkinQuiz {
      _id
      name
      grayText
      boldHeader
      sectionCopy
      buttonText
      buttonUrl
      bigImage {
        asset {
          _id
          url
        }
      }
      smallImage {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_HOMEPAGE_COLLECTION_CALLOUT = gql`
  query GetAllHomepageCollectionCallout {
    allHomepageCollectionCallout {
      _id
      name
      grayText
      boldHeader
      sectionCopy
      buttonText
      buttonUrl
      bigImage {
        asset {
          _id
          url
        }
      }
      smallImage {
        asset {
          _id
          url
        }
      }
      mobileImage {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_PLP_FILTER_MENU = gql`
  query GetAllPlpFilterMenu {
    allPlpFilterMenu {
      _id
      name
      type
      input
      children
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetAllProducts {
    allProducts {
      name
      richRaw
      alt_title
      reviews_average
      reviews_count
      shouldShowOOSForm
      ingredients_list
      full_ingredients_list
      productPromos {
        name
        promoMessage
        discount
        variantIds
        showPromo
      }
      recommendedSellingPlan
      sales_rank
      whatItDoes
      keyIngredients
      finish
      tabs {
        name
        tabName
        button {
          name
          showButton
          text
          buttonOutlineStyle
          slideContent {
            name
            title
            contentRaw
          }
        }
        contentBlock {
          name
          title
          contents {
            name
            headerRaw
            image {
              asset {
                _id
                url
              }
            }
            subtitle
            body
            htmlSubtitleRaw
            htmlBodyRaw
          }
        }
        useBackgroundGradient
      }
      certifiedBadges {
        name
        badges {
          name
          image {
            asset {
              _id
              url
            }
          }
          title
        }
      }
      description_WithPriority
      benefits_WithPriority
      gallery_WithPriority {
        asset {
          _id
          url
        }
      }
      exclusiveAtcColor
      exclusiveTextColor
      productId
    }
  }
`;

export const GET_PRODUCT_COLLECTIONS = gql`
  query GetAllProductCollections {
    allProductCollections {
      name
      promoPosition1
      promoOneLink
      promoPosition2
      promoTwoLink
      promoPosition3
      promoThreeLink
      additionalProductsTitle
      additionalProducts
      showCompareButton
      fireworkStoryPosition
      collectionId
    }
  }
`;

export const GET_LISTRAK_REC = gql`
  query GetAllListrakRec {
    allListrakRec {
      name
      listrakId
      title
    }
  }
`;

export const GET_VARIANTS_OOS = gql`
  query GetAllVariantsOOS {
    allVariantsOOS {
      name
      storefrontId
    }
  }
`;

export const GET_IMAGES = gql`
  query GetAllImages {
    allImages {
      name
      alt
      role
      images {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_EXCLUSIVE_PRODUCT_BANNER_RELEASE_CONTENT = gql`
  query GetAllExclusiveProductBannerReleaseContent {
    allExclusiveProductBannerReleaseContent {
      name
      message
      slug
      messageColor
      background
      slugWhereItShouldAppear
      available
    }
  }
`;

export const GET_CONCEALER_SHADE_IMAGES = gql`
  query GetAllConcealerShadeImages {
    allConcealerShadeImages {
      name
      desktop {
        asset {
          _id
          url
        }
      }
      mobile {
        asset {
          _id
          url
        }
      }
      mobileNoLabels {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_AUTO_DELIVERY_INFO_MESSAGE = gql`
  query GetAllAutoDeliveryInfoMessage {
    allAutoDeliveryInfoMessage {
      name
      messageRaw
      disableInfomessage
    }
  }
`;

export const GET_INFLUENCER_PAGE = gql`
  query GetAllInfluencerPage {
    allInfluencerPage {
      name
      pageSlug
      influencerTitle
      influencerDescription
      influencerBanner {
        asset {
          _id
          url
        }
      }
      influencerProducts {
        name
        richRaw
        alt_title
        reviews_average
        reviews_count
        shouldShowOOSForm
        ingredients_list
        full_ingredients_list
        productPromos {
          name
          promoMessage
          discount
          variantIds
          showPromo
        }
        recommendedSellingPlan
        sales_rank
        whatItDoes
        keyIngredients
        finish
        tabs {
          name
          tabName
          button {
            name
            showButton
            text
            buttonOutlineStyle
            slideContent {
              name
              title
              contentRaw
            }
          }
          contentBlock {
            name
            title
            contents {
              name
              headerRaw
              image {
                asset {
                  _id
                  url
                }
              }
              subtitle
              body
              htmlSubtitleRaw
              htmlBodyRaw
            }
          }
          useBackgroundGradient
        }
        certifiedBadges {
          name
          badges {
            name
            image {
              asset {
                _id
                url
              }
            }
            title
          }
        }
        description_WithPriority
        benefits_WithPriority
        gallery_WithPriority {
          asset {
            _id
            url
          }
        }
        exclusiveAtcColor
        exclusiveTextColor
        productId
      }
      plpTitle
      plpCollection {
        name
        promoPosition1
        promoOneLink
        promoPosition2
        promoTwoLink
        promoPosition3
        promoThreeLink
        additionalProductsTitle
        additionalProducts
        showCompareButton
        fireworkStoryPosition
        collectionId
      }
    }
  }
`;

export const GET_CUSTOMER_REVIEWS = gql`
  query GetAllCustomerReviews {
    allCustomerReviews {
      name
      topHeader
      topRating
      topReviewCount
      topImageLeft {
        asset {
          _id
          url
        }
      }
      topImageMiddle {
        asset {
          _id
          url
        }
      }
      topImageRight {
        asset {
          _id
          url
        }
      }
      shopNowLink
      bottomLeftImage {
        asset {
          _id
          url
        }
      }
      bottomRightImage {
        asset {
          _id
          url
        }
      }
    }
  }
`;

export const GET_REDIRECTS = gql`
  query GetAllRedirects {
    allRedirects {
      destination
      source
      statusCode
    }
  }
`;
