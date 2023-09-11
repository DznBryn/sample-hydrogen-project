import MyAccountDropdown, { links as myAccountDropdownStyles } from '~/modules/mainNav/myAccountDropdown';
import AnnouncementHeader, { links as announcementHeaderStyles } from '~/modules/mainNav/announcementHeader';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...myAccountDropdownStyles(),
    ...announcementHeaderStyles(),
  ];
};

const NavTopHeader = ({ announcementHeader, announcementMessages }) => {

  const {
    backgroundColorHex,
    fontColorHex,
    referralUrl,
    referralText,
  } = announcementHeader;

  return (
    <div
      className={'topHeaderContainer'}
      style={{ background: backgroundColorHex, color: fontColorHex }}
    >
      <div className={'wrapper'}>
        <div>
          <a className={'referralText'} href={referralUrl}>
            {referralText}
          </a>
        </div>

        <div>
          <AnnouncementHeader
            announcementMessages={announcementMessages}
            fontColor={fontColorHex}
          />
        </div>

        <div>
          <MyAccountDropdown />
        </div>
      </div>
    </div>
  );
};

export default NavTopHeader;