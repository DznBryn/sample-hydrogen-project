import SkinQuizAgeEmailOptIn, {
  links as skinQuizAgeEmailStyles,
} from '~/modules/quiz/skinQuizAgeEmailOptIn';

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
    advancedResultsState,
    advancedQuizContent,
  } = content;
  return (
    <main className="finalWrapper">
      <SkinQuizAgeEmailOptIn setRangeAge={setRangeAge} />

      <section className="quizResults">
        <h2>We’ve found your perfect eye care routine.</h2>

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
                {item}
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
