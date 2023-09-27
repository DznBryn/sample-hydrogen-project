import {useEffect} from 'react';
import {useYotpo} from '~/hooks/useYotpo';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const CustomerReviews = ({content}) => {
  const {refreshWidgets} = useYotpo();

  useEffect(() => {
    refreshWidgets();
  });

  return (
    <>
      <div className={'fixedWidthPage minHeight'}>
        <div className={'customerReviewsTop'}>
          <div className={'topLeftWrap'}>
            <img
              className={'topImages columnOne'}
              src={content.topImageLeft.asset.url}
            />
            <img
              className={'topImages columnTwo'}
              src={content.topImageMiddle.asset.url}
            />
          </div>

          <div className={'topImages columnThree'}>
            <div className={'top'}>
              <h1>{content.topHeader}</h1>
              <div className={'starRatingWrapper'}>
                <div className={'starWrapper'}>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.75.152l2.077 5.98h6.72L13.11 9.827l2.077 5.98L9.75 12.11l-5.437 3.695 2.077-5.98L.953 6.133h6.72L9.75.152z"
                      fill="#FFD200"
                    />
                  </svg>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.75.152l2.077 5.98h6.72L13.11 9.827l2.077 5.98L9.75 12.11l-5.437 3.695 2.077-5.98L.953 6.133h6.72L9.75.152z"
                      fill="#FFD200"
                    />
                  </svg>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.75.152l2.077 5.98h6.72L13.11 9.827l2.077 5.98L9.75 12.11l-5.437 3.695 2.077-5.98L.953 6.133h6.72L9.75.152z"
                      fill="#FFD200"
                    />
                  </svg>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.75.152l2.077 5.98h6.72L13.11 9.827l2.077 5.98L9.75 12.11l-5.437 3.695 2.077-5.98L.953 6.133h6.72L9.75.152z"
                      fill="#FFD200"
                    />
                  </svg>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.75.152l2.077 5.98h6.72L13.11 9.827l2.077 5.98L9.75 12.11l-5.437 3.695 2.077-5.98L.953 6.133h6.72L9.75.152z"
                      fill="#FFD200"
                    />
                  </svg>
                </div>
                <p className={'avgStarCount'}>{content.topRating}</p>
              </div>
              <p>{content.topReviewCount}</p>
            </div>

            <img className={'bottom'} src={content.topImageRight.asset.url} />
          </div>
        </div>
      </div>
      <div className="fixedWidthPage">
        <div id="yotpo-testimonials-custom-tab" data-yotpo-element-id="1">
          {' '}
        </div>
      </div>
      <div className="fixedWidthPage">
        <div className={'customerReviewsBottom'}>
          <img className={'left'} src={content.bottomLeftImage.asset.url} />
          <div className={'right'}>
            <a href={content.shopNowLink}>Shop Now</a>
            <img
              className={'bottomImage'}
              src={content.bottomRightImage.asset.url}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerReviews;
