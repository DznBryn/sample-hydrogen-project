/* eslint-disable quotes */
import SkinQuizAgeEmailOptIn, {
  links as skinQuizAgeEmailStyles,
} from '~/modules/quiz/components/skinQuizAgeEmailOptIn';

import ProductBox, {
  links as productBoxStyles,
} from '~/modules/plp/plpHorizontalProductBox';

import AdvancedResultsView, {
  links as advancedResultsViewStyles,
} from '~/modules/quiz/components/advancedResultsView';

import styles from './styles.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...skinQuizAgeEmailStyles(),
    ...productBoxStyles(),
    ...advancedResultsViewStyles(),
  ];
};

const ResultView = ({content}) => {
  const {
    setRangeAge,
    resultState,
    handleGetProductByID,
    answers,
    advancedResultsState,
    advancedQuizContent,
  } = content;

  const provisionalH2 = advancedQuizContent
    ? "We've found your perfect skincare routine to:"
    : "We've found your perfect eye care routine.";

  function resultSubTitle() {
    const goalsArray = answers?.slice(3);
    const answersArr = {
      1: goalsArray[0],
      2: `${goalsArray[0]}, and ${goalsArray[1]}`,
      3: `${goalsArray[0]},  ${goalsArray[1]}, and ${goalsArray[2]}`,
    };

    return answersArr[goalsArray.length];
  }

  function getLTPostResult() {
    let aResults = [];
    let aAdvResults = [];

    for (let i in resultState) {
      if (resultState[i][0]) {
        aResults.push(handleGetProductByID(resultState[i][0].productId));
      }
    }

    aAdvResults = advancedResultsState
      ? advancedResultsState
          .slice(0, 3)
          .map((prod) => handleGetProductByID(prod.productId))
      : [];

    return [...aResults, ...aAdvResults];
  }

  function parserCategory(category) {
    const parsedCategory = category.replace('-', ' ').replace('&', ' & ');

    return parsedCategory;
  }

  return (
    <main className="finalWrapper">
      <SkinQuizAgeEmailOptIn
        setRangeAge={setRangeAge}
        quizAnswers={answers}
        concatResults={getLTPostResult()}
      />

      <section className="quizResults">
        <h2>{provisionalH2}</h2>
        {advancedQuizContent ? <p className="dek">{resultSubTitle()}</p> : null}

        <br />

        <div className="resultsProductGrid">
          {Object.keys(resultState).map((item, idx) => (
            <div key={item} className="productWrapper">
              <h4>
                <span>
                  {(idx + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                  })}
                </span>
                <br />
                <br />
                {parserCategory(item)}
              </h4>

              {resultState[item][0] && (
                <ProductBox
                  product={handleGetProductByID(resultState[item][0].productId)}
                  ctaOpensBlank={
                    handleGetProductByID(resultState[item][0].productId)
                      .variants.length > 1
                  }
                  is2Columns={true}
                  key={resultState[item][0].productId}
                />
              )}
            </div>
          ))}
        </div>

        {advancedResultsState?.length && (
          <AdvancedResultsView content={advancedQuizContent} />
        )}
      </section>
    </main>
  );
};

export default ResultView;
