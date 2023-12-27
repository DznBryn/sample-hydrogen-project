import {useCallback, useMemo, useState} from 'react';
import LoadingSkeleton from '../global/loadingSkeleton';
import {useYotpo} from '~/hooks/useYotpo';
import {useLayoutEffect} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

//

const REVIEWS_LABEL = 'Reviews';
const NO_REVIEW_LABEL = 'Write a review';
const REVIEW_WIDGET_ID = 'yotpoWrapper';

//

const cacheData = {};

const YotpoStarReviews = ({productExternalID, hideIfNoReview = false}) => {
  const {getProductReviewsData} = useYotpo();
  const [reviewsObj, setReviewsObj] = useState(getCache());

  const fetchData = useCallback(() => {
    getProductReviewsData(productExternalID).then((data) => {
      cacheData[productExternalID] = data;
      setReviewsObj(data);
    });
  }, [productExternalID]);

  useLayoutEffect(() => {
    if (!getCache()) fetchData();
  }, []);

  function scrollToReviews() {
    if (typeof document === 'object') {
      document.getElementById(REVIEW_WIDGET_ID)?.scrollIntoView();
    }
  }

  function shouldHide() {
    return reviewsObj?.total_reviews <= 0 && hideIfNoReview;
  }

  function getCache() {
    return cacheData[productExternalID] || null;
  }

  return (
    <div
      id="yotpoStarsReviews__container"
      className={shouldHide() ? 'hideStarReviews' : undefined}
      onClick={scrollToReviews}
    >
      {reviewsObj !== null ? (
        <>
          <PLPStarsAverage average={reviewsObj?.average_score} />
          <ReviewsInfo totalReviews={reviewsObj?.total_reviews} />
        </>
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
};

export default YotpoStarReviews;

//

const ReviewsInfo = ({totalReviews = 0}) => {
  return totalReviews > 0 ? (
    <span>{`${totalReviews} ${REVIEWS_LABEL}`}</span>
  ) : (
    <span>{NO_REVIEW_LABEL}</span>
  );
};

//

const PLPStarsAverage = ({average = '0'}) => {
  const intPart = parseInt(average);
  const decimalPart = Number(average) % 1 > 0;
  const emptyPart = 5 - intPart - Number(decimalPart);

  const fullStars = useMemo(() => getStarsIcons(intPart, FullStar), [average]);
  const emptyStars = useMemo(
    () => getStarsIcons(emptyPart, EmptyStar),
    [average],
  );

  function getStarsIcons(num, Component) {
    return Array.from(new Array(num)).map((_, index) => (
      <Component key={`${num}_${index}`} />
    ));
  }

  return (
    <div id="yotpoStarsReview__stars">
      {fullStars}
      {decimalPart && <HalfStar />}
      {emptyStars}
    </div>
  );
};

//

const starWidth = 16;
const starHeight = 15;

const FullStar = () => (
  <svg
    width={starWidth}
    height={starHeight}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.75.152l2.077 5.98h6.72L13.11 9.827l2.077 5.98L9.75 12.11l-5.437 3.695 2.077-5.98L.953 6.133h6.72L9.75.152z"
      fill="#FFD200"
    />
  </svg>
);

const HalfStar = () => (
  <svg
    width={starWidth}
    height={starHeight}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.25.152l2.077 5.98h6.72l-5.436 3.695 2.076 5.98L9.25 12.11l-5.437 3.695 2.077-5.98L.453 6.133h6.72L9.25.152z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.327 6.132L9.25.152l-2.076 5.98H.454L5.89 9.827l-2.077 5.98L9.25 12.11l5.437 3.695-2.076-5.98 5.437-3.694h-6.72zm4.781.596h-5.205L9.25 1.971 7.598 6.728H2.393l4.211 2.863L4.968 14.3l4.282-2.91 4.282 2.91-1.635-4.71 4.211-2.862z"
      fill="#FFD200"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.952 1.012v11.302l-5.14 3.493 2.078-5.98L.597 6.23v-.098h6.576l1.779-5.12z"
      fill="#FFD200"
    />
  </svg>
);

const EmptyStar = () => (
  <svg
    width={starWidth}
    height={starHeight}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.25.152l2.077 5.98h6.72l-5.436 3.695 2.076 5.98L9.25 12.11l-5.437 3.695 2.077-5.98L.453 6.133h6.72L9.25.152z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.327 6.132L9.25.152l-2.076 5.98H.454L5.89 9.827l-2.077 5.98L9.25 12.11l5.437 3.695-2.076-5.98 5.437-3.694h-6.72zm4.781.596h-5.205L9.25 1.971 7.598 6.728H2.393l4.211 2.863L4.968 14.3l4.282-2.91 4.282 2.91-1.635-4.71 4.211-2.862z"
      fill="#FFD200"
    />
  </svg>
);
