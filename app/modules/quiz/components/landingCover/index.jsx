import {useEffect} from 'react';

import PortableTextCustom from '~/modules/portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const LandingCover = ({content}) => {
  const {
    landingBackgroundColor,
    calloutBackgroundColor,
    calloutFontColor,
    skinQuizCopy,
    quizHeaderFontColor,
    quizCtaFontColor,
    quizCtaButtonColor,
    backgroundImage,
  } = content;

  useEffect(() => {
    const handleClick = () => {
      document.querySelector('#landingCover').style.display = 'none';
      document.querySelector('#quizWrapper').style.display = 'flex';
    };

    document
      .querySelector('#startQuizBtn')
      .addEventListener('click', handleClick);

    return () =>
      document
        .querySelector('#startQuizBtn')
        .removeEventListener('click', handleClick);
  }, []);

  return (
    <main id="landingCover" className="fixedWidthPage">
      <section className="skinQuizWrapper" style={{...landingBackgroundColor}}>
        <aside className="left">
          <div className="textWrapper">
            <p
              className="calloutPill"
              style={{...calloutFontColor, ...calloutBackgroundColor}}
            >
              <PortableTextCustom value={skinQuizCopy[0].richTextBlockRaw} />
            </p>
            <header className="header" style={{...quizHeaderFontColor}}>
              <PortableTextCustom value={skinQuizCopy[1].richTextBlockRaw} />
            </header>
            <button
              id="startQuizBtn"
              style={{...quizCtaFontColor, ...quizCtaButtonColor}}
            >
              <PortableTextCustom value={skinQuizCopy[2].richTextBlockRaw} />
            </button>
          </div>
        </aside>
        <aside className="right">
          <img id="desktop" src={backgroundImage[0].asset.url} />
          <img id="mobile" src={backgroundImage[1].asset.url} />
        </aside>
      </section>
    </main>
  );
};

export default LandingCover;
