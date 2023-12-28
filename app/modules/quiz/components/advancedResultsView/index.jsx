import {useState} from 'react';

import ProductBox, {
  links as productBoxStyles,
} from '~/modules/plp/plpHorizontalProductBox';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...productBoxStyles()];
};

const AdvancedResultsView = ({content}) => {
  const {
    advancedResultsState,
    answerState,
    images,
    handleGetProductByID,
    handleRestart,
  } = content;

  const [isUserAnswersActive, setIsUserAnswersActive] = useState(false);
  const [isAdvRoutineActive, setIsAdvRoutineActive] = useState(false);

  function handleShowAdvanceRoutine() {
    setIsAdvRoutineActive((prevState) => !prevState);
  }

  function handleUserAnswers() {
    setIsUserAnswersActive((prevState) => !prevState);
  }

  return (
    <section className="advanceRoutineResults">
      <p className="preHedCaption">
        For best results, try all these
        <br />
        essentials in your routine.
      </p>

      <div className="hedWrapper">
        <h2 className="hed">STEP UP YOUR SKINCARE EVEN MORE</h2>
        <p className="dek">These work well with your essentials</p>
        <button onClick={handleShowAdvanceRoutine} className="expandBtn">
          {isAdvRoutineActive ? '-' : '+'}
        </button>
      </div>

      <div
        id="advanceRoutineWindow"
        className={
          isAdvRoutineActive
            ? ['advancedRoutineRecommendations', 'advanceRoutineActive'].join(
                ' ',
              )
            : 'advancedRoutineRecommendations'
        }
      >
        {Object.keys(advancedResultsState)
          .slice(0, 3)
          .map((item) => (
            <div key={item} className="productWrapper">
              <h4>BOOST</h4>

              {advancedResultsState[item] && (
                <ProductBox
                  product={handleGetProductByID(
                    advancedResultsState[item].productId,
                  )}
                  ctaOpensBlank={
                    handleGetProductByID(advancedResultsState[item].productId)
                      .variants.length > 1
                  }
                  is2Columns={true}
                  key={advancedResultsState[item].productId}
                />
              )}
            </div>
          ))}
      </div>

      <div className="reviewQuizAnswers">
        <div className="expansionBar">
          <p>REVIEW AND MODIFY YOUR ANSWERS</p>
          <button onClick={handleUserAnswers} className="expandBtn">
            {isUserAnswersActive ? '-' : '+'}
          </button>
        </div>
        <div
          id="quizAnswersWrapper"
          className={
            isUserAnswersActive
              ? ['userAnswersActive', 'quizAnswersWrapper'].join(' ')
              : 'quizAnswersWrapper'
          }
        >
          <div className="answers">
            <h4 className="answerHeader">Feel</h4>
            <ul>
              <li className="questionType">{answerState[0][0].name}</li>
            </ul>
          </div>

          <div className="answers">
            <h4 className="answerHeader">Sensitive</h4>
            <ul>
              <li className="questionType">{answerState[1][0].name}</li>
            </ul>
          </div>

          <div className="answers">
            <h4 className="answerHeader">Skin Tone</h4>
            <ul>
              <li className="questionType">{answerState[2][0].name}</li>
            </ul>
          </div>

          <div className="answers">
            <h4 className="answerHeader">Primary Goal</h4>
            <ul>
              <li className="questionType">{answerState[3][0].name}</li>
            </ul>
          </div>

          <button onClick={handleRestart}>CHANGE YOUR ANSWERS</button>
        </div>
      </div>

      <img
        src={images[0].asset.url + '?auto=format'}
        alt={images[0].asset.alt}
      />
    </section>
  );
};

export default AdvancedResultsView;
