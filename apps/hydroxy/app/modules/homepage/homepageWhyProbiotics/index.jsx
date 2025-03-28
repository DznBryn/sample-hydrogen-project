import {useEffect} from 'react';
import {isInViewPort} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const HomepageWhyProbiotics = ({homepageWhyProbioticsContent}) => {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      isInViewPort(document.querySelector('.homepageWhyProbiotics'), () => {
        document
          .querySelector('.homepageWhyProbiotics .fadeInOne')
          .classList.add('fadedIn');
        setTimeout(() => {
          document
            .querySelector('.homepageWhyProbiotics .fadeInTwo')
            .classList.add('fadedIn');
        }, 400);
        setTimeout(() => {
          document
            .querySelector('.homepageWhyProbiotics .fadeInThree')
            .classList.add('fadedIn');
        }, 600);
        setTimeout(() => {
          document
            .querySelector('.homepageWhyProbiotics .fadeInFour')
            .classList.add('fadedIn');
        }, 800);
        setTimeout(() => {
          document
            .querySelector('.homepageWhyProbiotics .fadeInFive')
            .classList.add('fadedIn');
        }, 1000);
        setTimeout(() => {
          document
            .querySelector('.homepageWhyProbiotics .fadeInSix')
            .classList.add('fadedIn');
        }, 1200);
        setTimeout(() => {
          document
            .querySelector('.homepageWhyProbiotics .fadeInSeven')
            .classList.add('fadedIn');
        }, 1400);
        setTimeout(() => {
          document
            .querySelector('.homepageWhyProbiotics .fadeInEight')
            .classList.add('fadedIn');
        }, 1600);
        setTimeout(() => {
          document
            .querySelector('.homepageWhyProbiotics .fadeInNine')
            .classList.add('fadedIn');
        }, 1800);
      });
    });
  });

  return (
    <div>
      <img
        className={'bigImg mobile'}
        src={homepageWhyProbioticsContent.bigImage.asset.url + '?auto=format'}
      />
      <div className={'fixedWidthPage'}>
        <div className={'homepageWhyProbiotics'}>
          <div className={'section left'}>
            <img
              loading="lazy"
              className={'squareTwoBig bigImg desktop'}
              src={
                homepageWhyProbioticsContent.bigImage.asset.url +
                '?auto=format&w=480'
              }
            />
            <img
              loading="lazy"
              className={'squareTwo smallImg'}
              src={
                homepageWhyProbioticsContent.smallImage.asset.url +
                '?auto=format&w=250'
              }
            />
          </div>
          <div className={'section right'}>
            <h2 className={'fadeInOne'}>
              {homepageWhyProbioticsContent.header}
            </h2>
            <p className={'fadeInTwo'}>
              {homepageWhyProbioticsContent.sectionCopy}
            </p>
            <h3 className={'fadeInThree'}>
              {homepageWhyProbioticsContent.subheaderOne}
            </h3>
            <p className={'fadeInFour'}>
              {homepageWhyProbioticsContent.subtextOne}
            </p>
            <h3 className={'fadeInFive'}>
              {homepageWhyProbioticsContent.subheaderTwo}
            </h3>
            <p className={'fadeInSix'}>
              {homepageWhyProbioticsContent.subtextTwo}
            </p>
            <h3 className={'fadeInSeven'}>
              {homepageWhyProbioticsContent.subheaderThree}
            </h3>
            <p className={'fadeInEight'}>
              {homepageWhyProbioticsContent.subtextThree}
            </p>
            <a
              href={homepageWhyProbioticsContent.buttonUrl}
              className={'fadeInNine'}
            >
              <button className={'btn'}>
                {homepageWhyProbioticsContent.buttonText}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageWhyProbiotics;
