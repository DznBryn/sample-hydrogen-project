import { gql } from '@apollo/client';

export const GET_FOOTERS = gql`
  query GetAllFooters {
    allFooters {
      _id
      name
      navLinkGroups{
        _id
        displayText
        url
        navLinks{
          _id
          displayText
          url
          emoji{
            asset{
              _id
              url
            }
          }
          fontColorHex
          calloutText
          calloutFontColorHex
          thumbnail{
            asset{
              _id
              url
            }
          }
        }
        fontColorHex
        emoji{
          asset{
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
        asset{
          _id
          url
        }
      }
      promoImageDesktop {
        asset{
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
        asset{
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
      emoji{
        asset{
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
      emoji{
        asset{
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
      navbarItems{
        _id
        displayText
        url
        navLinks{
          _id
          displayText
          url
          emoji{
            asset{
              _id
              url
            }
          }
          fontColorHex
          calloutText
          calloutFontColorHex
          thumbnail{
            asset{
              _id
              url
            }
          }
        }
        fontColorHex
        emoji{
          asset{
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
      headerNavItems{
        name
        displayText
        linkUrl
        dropdownOverlay{
          name
          carouselProductCollection{
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
          overlayNavLinks{
            _id
            displayText
            url
            emoji{
              asset{
                _id
                url
              }
            }
            fontColorHex
            calloutText
            calloutFontColorHex
            thumbnail{
              asset{
                _id
                url
              }
            }
          }
          megaMenuOverlay{
            name
            leftBackgroundMedia{
              asset{
                _id
                url
              }
            }
            leftCta
            leftCtaUrl
            rightBackgroundMedia{
              asset{
                _id
                url
              }
            }
            rightCta
            rightCtaUrl
            navLinkGroups{
              _id
              displayText
              url
              navLinks{
                _id
                displayText
                url
                emoji{
                  asset{
                    _id
                    url
                  }
                }
                fontColorHex
                calloutText
                calloutFontColorHex
                thumbnail{
                  asset{
                    _id
                    url
                  }
                }
              }
              fontColorHex
              emoji{
                asset{
                  _id
                  url
                }
              }
              order
            }
          }
          megaMenuSplit{
            name
            backgroundImage{
                asset{
                  _id
                  url
                }
              }
            imageText
            imageTextCta
            imageCollectionLink{
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
            menuCollections{
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
        emoji{
          asset{
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
      imageBackground{
        asset{
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