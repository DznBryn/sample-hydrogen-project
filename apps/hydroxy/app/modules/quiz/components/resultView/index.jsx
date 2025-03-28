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
import {useEffect, useRef} from 'react';
import {
  getIdFromGid,
  triggerAnalyticsOnScroll,
} from '~/utils/functions/eventFunctions';

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
    multipleChoiceState,
    advancedResultsState,
    advancedQuizContent,
    submitType,
  } = content;

  const skinQuizContainer = useRef(null);

  const provisionalH2 = advancedQuizContent
    ? "We've found your perfect skincare routine to:"
    : "We've found your perfect eye care routine.";

  function parserCategory(category) {
    const parsedCategory = category
      ?.replaceAll('-', ' ')
      ?.replaceAll('&', ' & ');

    return parsedCategory;
  }

  function parseResultSubTitle() {
    const answersArr = {
      1: multipleChoiceState[0]?.answerText,
      2: `${
        multipleChoiceState[0]?.answerText
      }, and ${multipleChoiceState[1]?.answerText.toLowerCase()}`,
      3: `${
        multipleChoiceState[0]?.answerText
      }, and ${multipleChoiceState[1]?.answerText.toLowerCase()}, and ${multipleChoiceState[2]?.answerText.toLowerCase()}`,
    };

    const answersIndex = multipleChoiceState.length;

    return answersArr[answersIndex];
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

  useEffect(() => {
    if (resultState) {
      const products = Object.keys(resultState).map((item) => {
        return handleGetProductByID(resultState[item][0].productId);
      });
      triggerAnalyticsOnScroll(
        skinQuizContainer.current,
        products,
        'Skin Quiz Results',
      );
    }
  }, [resultState]);

  return (
    <main className="finalWrapper">
      <SkinQuizAgeEmailOptIn
        setRangeAge={setRangeAge}
        quizAnswers={answers}
        concatResults={getLTPostResult()}
        submitType={submitType}
      />

      <section className="quizResults">
        <h2>{provisionalH2}</h2>
        {advancedQuizContent ? (
          <p className="dek">{parseResultSubTitle()}</p>
        ) : null}

        <br />

        <div className="resultsProductGrid" ref={skinQuizContainer}>
          {Object.keys(resultState).map((item, idx) => (
            <div
              key={item}
              className="productWrapper"
              id={`product-${
                handleGetProductByID(resultState[item][0].productId)?.handle
                  ? handleGetProductByID(resultState[item][0].productId).handle
                  : handleGetProductByID(resultState[item][0].productId).slug
              }`}
            >
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
                  analytics={{
                    click: {
                      actionField: {list: 'Skin Quiz Results'},
                      products: [
                        {
                          name: handleGetProductByID(
                            resultState[item][0].productId,
                          ).title,
                          id: getIdFromGid(
                            handleGetProductByID(resultState[item][0].productId)
                              .id,
                          ),
                          price: parseFloat(
                            handleGetProductByID(resultState[item][0].productId)
                              .priceRange?.minVariantPrice?.amount,
                          )?.toFixed(2),
                          category: handleGetProductByID(
                            resultState[item][0].productId,
                          ).productType,
                          variant: '',
                          position: 0,
                        },
                      ],
                    },
                  }}
                  ctaOpensBlank={
                    handleGetProductByID(resultState[item][0].productId)
                      ?.variants.length > 1
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
