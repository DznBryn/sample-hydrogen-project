import classnames from 'classnames';
import getApiKeys from '~/utils/functions/getApiKeys';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

export const CertifiedBadge = ({ image, title, ...rest }) => {
  return (
    <div className={'certifiedBadge'} {...rest}>
      <img
        className={'certifiedBadgeIcon'}
        src={image}
        alt="certifield badge"
      />
      <p className={'certifiedBadgeLabel'}>{title}</p>
    </div>
  );
};

export const ExclusiveMemberBadge = ({ ...rest }) => (
  <div className={'exclusiveMemberBadgeContainer'} {...rest}>
    <p>MEMBER EXCLUSIVE</p>
  </div>
);

export const PDPBadges = ({ productDetails = [], selectedVariant }) => {
  const firstVariantObj = productDetails.variants[0];
  const selectedVariantObj =
    selectedVariant > 0
      ? productDetails.variants.find(data => data.externalId === selectedVariant)
      : null;

  const price = selectedVariantObj?.price || firstVariantObj?.price || 0;
  const originalPrice = selectedVariantObj?.originalPrice || firstVariantObj?.originalPrice || 0;

  const showTheBadge = originalPrice > price;

  const showHolidayBadge = productDetails.tags.some(tag => (tag.toLowerCase().split('badge:')[1]?.match(/^holiday$/) || tag.toLowerCase().match(/^holiday$/)));

  const pdpSpecificBadgeTags = productDetails.tags
    .filter(tag => tag.toLowerCase().includes('pdp-badge'))
    .map(badge => badge.toLowerCase().split('badge:')[1]);

  const badgeTags = productDetails.tags
    .filter(tag => tag.toLowerCase().includes('badge') && !tag.toLowerCase().includes('pdp') && !tag.toLowerCase().includes('holiday'))
    .map(badge => badge.toLowerCase().split('badge:')[1]);

  const roseGlowTagsFromShopify = productDetails.tags
    .filter(tag => tag.toLowerCase().includes('badge-chrome:'))
    .map(badge => badge.toLowerCase().split('badge-chrome:')[1]);

  if (badgeTags.includes('limited edition')) sendToInitOfArray(badgeTags, 'limited-edition');
  if (badgeTags.includes('bestseller')) sendToInitOfArray(badgeTags, 'bestseller');
  if (badgeTags.includes('new')) sendToInitOfArray(badgeTags, 'new');

  function sendToInitOfArray(array, value) {
    array.unshift(
      array.splice(
        array.findIndex(e => e === value),
        1,
      )[0],
    );
  }

  return (
    (badgeTags.length > 0 || showTheBadge || showHolidayBadge || roseGlowTagsFromShopify.length > 0) && (
      <div className={'container'}>

        {showHolidayBadge && <HolidayBadge />}

        {pdpSpecificBadgeTags && pdpSpecificBadgeTags.map(value => (
          <div key={value?.replace(' ', '-')} className={'pdp_badges'}>
            {value}
          </div>
        ))}
        {badgeTags.length > 0 && badgeTags.map(value => {
          if (value?.length > 0) {
            return (<div key={value?.replace(' ', '-')} className={'pdp_badges'}>
              {value}
            </div>);
          }

          return null;
        })}

        {getApiKeys().CURRENT_ENV.includes('US') && roseGlowTagsFromShopify.map(tag => (
          <div key={tag.replace(' ', '-')} className={'roseGlowBadgeContainer'}>
            {tag}
          </div>
        ))}
        {showTheBadge && (
          <SavingsBadges message={`Save ${Math.round((1 - price / originalPrice) * 100)}%`} />
        )}
      </div>
    )
  );
};

const HolidayBadge = () => {
  const HolidayIcon = () => (
    <svg
      width={9}
      height={9}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.0937 0C3.0937 2.3751 1.81017 4.5 0 4.5C1.81017 4.5 3.0937 6.62505 3.0937 9C3.0937 6.62505 4.37723 4.5 6.1874 4.5C4.37723 4.5 3.0937 2.3751 3.0937 0ZM6.74989 4.5C6.74989 5.6877 6.10835 6.75 5.20296 6.75C6.10835 6.75 6.74989 7.8126 6.74989 9C6.74989 7.8126 7.39143 6.75 8.29681 6.75C7.39143 6.75 6.74989 5.6877 6.74989 4.5ZM7.45308 0C7.45308 1.18755 6.81154 2.25 5.90615 2.25C6.81139 2.25 7.45308 3.3126 7.45308 4.5C7.45308 3.3126 8.09461 2.25 9 2.25C8.09461 2.25 7.45308 1.18755 7.45308 0Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div className={'holidayBadgeContainer'}>
      <HolidayIcon />
      <span>Holiday</span>
    </div>
  );
};

const SavingsBadges = ({ message = 'Save 40%', type = 'savings', smallStyleOnMobile }) => {
  const badgesStyle = classnames(
    'badgeContainer',
    smallStyleOnMobile && 'smallBadgeOnMobile',
  );

  if (type.toLowerCase() === 'savings') {
    return <p className={badgesStyle}>{message}</p>;
  }
  if (type.toLowerCase() === 'limited') {
    return <span className={classnames('badgeContainer primary')}>{message}</span>;
  }

  return <p className={badgesStyle}>{message}</p>;
};

export default SavingsBadges;