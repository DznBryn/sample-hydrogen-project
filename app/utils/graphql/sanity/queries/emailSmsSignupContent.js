import { gql } from '@apollo/client';

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
      # navLinkGroups{
      #   _id
      #   displayText
      #   url
      #   navLinks{
      #     _id
      #     displayText
      #     url
      #     emoji{
      #       asset{
      #         _id
      #         url
      #       }
      #     }
      #     fontColorHex
      #     calloutText
      #     calloutFontColorHex
      #     thumbnail{
      #       asset{
      #         _id
      #         url
      #       }
      #     }
      #   }
      #   fontColorHex
      #   emoji{
      #     asset{
      #       _id
      #       url
      #     }
      #   }
      #   order
      # }
    }
  }
`;