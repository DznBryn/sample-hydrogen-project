import {useEffect} from 'react';
import classnames from 'classnames';
import {isInViewPort} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const HomepageCollectionCallout = ({homepageCollectionCallout}) => {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      isInViewPort(document.querySelector('.homepageCollectionCallout'), () => {
        document
          .querySelector('.homepageCollectionCallout .fadeInOne')
          .classList.add('fadedIn');
        setTimeout(() => {
          document
            .querySelector('.homepageCollectionCallout .fadeInTwo')
            .classList.add('fadedIn');
        }, 400);
        setTimeout(() => {
          document
            .querySelector('.homepageCollectionCallout .fadeInThree')
            .classList.add('fadedIn');
        }, 600);
        setTimeout(() => {
          document
            .querySelector('.homepageCollectionCallout .fadeInFour')
            .classList.add('fadedIn');
        }, 800);
      });
    });
  });

  return (
    <div className={'fixedWidthPage'}>
      <div className={'homepageCollectionCallout'}>
        <img
          className={'mobileImage'}
          src={homepageCollectionCallout.mobileImage.asset.url + '?auto=format'}
          alt={homepageCollectionCallout.mobileImage.alt}
        />
        <div className={'section left'}>
          <h2 className={classnames('fadeInOne')}>
            {homepageCollectionCallout.grayText}
          </h2>
          <h3 className={classnames('fadeInTwo')}>
            {homepageCollectionCallout.boldHeader}
          </h3>
          <p className={classnames('fadeInThree')}>
            {homepageCollectionCallout.sectionCopy}
          </p>
          <a
            href={homepageCollectionCallout.buttonUrl}
            className={classnames('fadeInFour')}
          >
            <button className={'btn'}>
              {homepageCollectionCallout.buttonText}
            </button>
          </a>
        </div>
        <div className={'section right'}>
          <img
            src={
              homepageCollectionCallout.bigImage.asset.url +
              '?auto=format&w=480'
            }
            className={'squareOneBig bigImg'}
          />
          <img
            src={
              homepageCollectionCallout.smallImage.asset.url +
              '?auto=format&w=250'
            }
            className={'squareOne smallImg'}
          />
        </div>
      </div>
    </div>
  );
};
export default HomepageCollectionCallout;
