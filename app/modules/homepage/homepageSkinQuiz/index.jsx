import {useEffect} from 'react';
import classnames from 'classnames';
import {isInViewPort} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const HomepageSkinQuiz = ({homepageSkinQuizContent}) => {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      isInViewPort(document.querySelector('.homepageSkinQuiz'), () => {
        document.querySelector('.fadeInOne').classList.add('fadedIn');
        setTimeout(() => {
          document.querySelector('.fadeInTwo').classList.add('fadedIn');
        }, 400);
        setTimeout(() => {
          document.querySelector('.fadeInThree').classList.add('fadedIn');
        }, 600);
        setTimeout(() => {
          document.querySelector('.fadeInFour').classList.add('fadedIn');
        }, 800);
      });
    });
  }, []);

  return (
    <div className={'fixedWidthPage'}>
      <div className={'homepageSkinQuiz'}>
        <div className={'section left'}>
          <h2 className={classnames('fadeInOne')}>
            {homepageSkinQuizContent.grayText}
          </h2>
          <h3 className={classnames('fadeInTwo')}>
            {homepageSkinQuizContent.boldHeader}
          </h3>
          <p className={classnames('fadeInThree')}>
            {homepageSkinQuizContent.sectionCopy}
          </p>
          <a
            href={homepageSkinQuizContent.buttonUrl}
            className={classnames('fadeInFour')}
          >
            <button className={'btn'}>
              {homepageSkinQuizContent.buttonText}
            </button>
          </a>
        </div>
        <div className={'section right'}>
          <img
            src={
              homepageSkinQuizContent.bigImage.asset.url + '?auto=format&w=480'
            }
            className={'squareOneBig bigImg'}
          />
          <img
            src={
              homepageSkinQuizContent.smallImage.asset.url +
              '?auto=format&w=250'
            }
            className={'squareOne smallImg'}
          />
        </div>
      </div>
    </div>
  );
};
export default HomepageSkinQuiz;
