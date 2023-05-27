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