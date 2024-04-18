import {useState, useEffect} from 'react';
import HomepageRecs, {links as HomepageRecsStyles} from '../homepageRecs';
import {Link} from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...HomepageRecsStyles()];
};

const HomepageRecommendations = ({hpRecs}) => {
  const collectionOne = hpRecs.collectionOne;
  const collectionTwo = hpRecs.collectionTwo;
  const collectionThree = hpRecs.collectionThree;
  const collectionFour = hpRecs.collectionFour;

  const currentTab = 1;
  const [activeTab, setActiveTab] = useState(currentTab);

  function handleActiveTab(tab) {
    setActiveTab(() => tab);
  }

  useEffect(() => {
    document.querySelectorAll('.recommendationTab').forEach((elem, index) => {
      if (index !== 0) {
        elem.style.color = '#C9C9C9';
      }
    });

    document.querySelector('.activeTab').style.borderColor =
      hpRecs.collectionOneFontColorHex;
    document.querySelector('.activeTab').style.color =
      hpRecs.collectionOneFontColorHex;

    document.querySelectorAll('.add_to_cart').forEach((elem) => {
      elem.style.backgroundColor = hpRecs.collectionOneFontColorHex;
      elem.style.borderColor = hpRecs.collectionOneFontColorHex;
    });

    document.querySelectorAll('.productButton').forEach((elem) => {
      elem.style.backgroundColor = hpRecs.collectionOneFontColorHex;
      elem.style.borderColor = hpRecs.collectionOneFontColorHex;
    });
  });

  return (
    <div className="fixedWidthPage">
      <div className="hpRecsSection">
        <div className={'hpRecommendations'}>
          <div className={'hpRecTabs'}>
            <div className={'tabWrapper'}>
              <div
                className={
                  activeTab === 1
                    ? 'recommendationTab activeTab'
                    : 'recommendationTab'
                }
                onClick={() => handleActiveTab(1)}
                style={{
                  color: hpRecs.collectionOneFontColorHex
                    ? hpRecs.collectionOneFontColorHex
                    : null,
                }}
              >
                {hpRecs.collectionOneEmoji && (
                  <img
                    className={styles.emoji}
                    src={hpRecs.collectionOneEmoji.src}
                  />
                )}
                {collectionOne.name}
              </div>

              <div
                className={
                  activeTab === 2
                    ? 'recommendationTab activeTab'
                    : 'recommendationTab'
                }
                onClick={() => handleActiveTab(2)}
                style={{
                  color:
                    hpRecs.collectionTwoFontColorHex && activeTab === 2
                      ? hpRecs.collectionTwoFontColorHex
                      : null,
                }}
              >
                {hpRecs.collectionTwoEmoji && (
                  <img
                    className={styles.emoji}
                    src={hpRecs.collectionTwoEmoji.src}
                  />
                )}
                {collectionTwo.name}
              </div>

              <div
                className={
                  activeTab === 3
                    ? 'recommendationTab activeTab'
                    : 'recommendationTab'
                }
                onClick={() => handleActiveTab(3)}
                style={{
                  color:
                    hpRecs.collectionThreeFontColorHex && activeTab === 3
                      ? hpRecs.collectionThreeFontColorHex
                      : null,
                }}
              >
                {hpRecs.collectionThreeEmoji && (
                  <img
                    className={styles.emoji}
                    src={hpRecs.collectionThreeEmoji.src}
                  />
                )}
                {collectionThree.name}
              </div>

              <div
                className={
                  activeTab === 4
                    ? 'recommendationTab activeTab'
                    : 'recommendationTab'
                }
                onClick={() => handleActiveTab(4)}
                style={{
                  color:
                    hpRecs.collectionFourFontColorHex && activeTab === 4
                      ? hpRecs.collectionFourFontColorHex
                      : null,
                }}
              >
                {hpRecs.collectionFourEmoji && (
                  <img
                    className={styles.emoji}
                    src={hpRecs.collectionFourEmoji.src}
                  />
                )}
                {collectionFour.name}
              </div>

              <div className={'recommendationTab'}>
                <Link to="/collections/all">See All &gt;</Link>
              </div>
            </div>
          </div>
          <div className={'hpRecProducts'}>
            <HomepageRecs
              active={activeTab === 1}
              collection={hpRecs.collectionOne}
            />
            <HomepageRecs
              active={activeTab === 2}
              collection={hpRecs.collectionTwo}
            />
            <HomepageRecs
              active={activeTab === 3}
              collection={hpRecs.collectionThree}
            />
            <HomepageRecs
              active={activeTab === 4}
              collection={hpRecs.collectionFour}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageRecommendations;
