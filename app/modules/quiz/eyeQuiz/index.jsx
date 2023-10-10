import {useState, useEffect} from 'react';
import classnames from 'classnames';

import PortableTextCustom from '~/modules/portableTextCustom';
import {useCollection} from '~/hooks/useCollection';
import quizzService from '~/utils/services/quizz';

import SkinQuizAgeEmailOptIn, {
  links as skinQuizAgeEmailStyles,
} from '~/modules/quiz/skinQuizAgeEmailOptIn';

import ProductBox, {
  links as productBoxStyles,
} from '~/modules/plp/plpHorizontalProductBox';

import styles from './styles.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...skinQuizAgeEmailStyles(),
    ...productBoxStyles(),
  ];
};

const EYE_QUIZ_MODEL = {
  quizID: 'US-eye-quiz',
  marketAvailability: ['US'],
  categories: ['morning', 'night'],
  quizType: 'eye-quiz',
};

const productQualifierKey = 'qualifier';

const EyeQuiz = ({content}) => {
  const [multipleChoiceState, setMultipleChoiceState] = useState([]);
  const [answerState, setAnswerState] = useState([]);
  const [resultState, setResultState] = useState({});
  const [rangeAge, setRangeAge] = useState();
  const [step, setStep] = useState(0);

  const {products} = useCollection('all');

  const quizz = quizzService(EYE_QUIZ_MODEL);

  const {allEyeQuizQuestions, allEyeQuizResults, allEyeQuizContent} = content;

  const {questionText, answers, multipleChoice} = allEyeQuizQuestions[0];

  const {
    backgroundColor,
    calloutPillFontColor,
    calloutPillColor,
    ctaFontColor,
    ctaButtonColor,
    headerFontColor,
    skinQuizCopy,
    backgroundImage,
  } = allEyeQuizContent[0];

  function increaseStep() {
    setTimeout(function () {
      setStep((oldState) => oldState + 1);
    }, 500);
  }

  function handleClick(el) {
    if (multipleChoice) {
      if (multipleChoiceState.includes(el)) {
        return setMultipleChoiceState((oldState) =>
          oldState.filter((old) => old !== el),
        );
      }

      if (multipleChoiceState.length < multipleChoice) {
        return setMultipleChoiceState((oldState) => [...oldState, el]);
      }
      return;
    }

    handleAnswersSubmit(el);
  }

  function handleAnswersSubmit(answer) {
    let arr = answerState;

    if (multipleChoice) {
      arr[step] = [];
      answer.forEach((ans) => {
        arr[step] = [...arr[step], ...ans.qualifiers];

        setAnswerState(arr);
      });

      return increaseStep();
    }

    arr[step] = answer.qualifiers;

    setAnswerState(arr);

    increaseStep();
  }

  function handleGetProductByID(_productId) {
    const product = products.find((prod) => prod.handle === _productId);
    return product;
  }

  function getResult() {
    let answersArr = quizz.handleGetUserAnswers(
      answerState,
      productQualifierKey,
    );

    answersArr =
      answersArr.length < 2
        ? [...answersArr, 'no-care', rangeAge]
        : [...answersArr, rangeAge];

    const catProducts = quizz.handleGetRegularResultsByCategory(
      allEyeQuizResults,
      answersArr,
      productQualifierKey,
      multipleChoiceState,
    );

    return catProducts;
  }

  const calloutFontColor = {
    color: calloutPillFontColor,
  };

  const landingBackgroundColor = {
    backgroundColor: backgroundColor,
  };

  const calloutBackgroundColor = {
    backgroundColor: calloutPillColor,
  };

  const quizCtaFontColor = {
    color: ctaFontColor,
  };

  const quizHeaderFontColor = {
    color: headerFontColor,
  };

  const quizCtaButtonColor = {
    backgroundColor: ctaButtonColor,
  };

  const landingCoverContent = {
    landingBackgroundColor,
    calloutBackgroundColor,
    calloutFontColor,
    skinQuizCopy,
    quizHeaderFontColor,
    quizCtaFontColor,
    quizCtaButtonColor,
    backgroundImage,
  };

  const mainQuizContent = {
    step,
    questionText,
    multipleChoice,
    answers,
    answerState,
    multipleChoiceState,
    handleClick,
    handleAnswersSubmit,
  };

  const resultContent = {setRangeAge, resultState, handleGetProductByID};

  useEffect(() => {
    if (allEyeQuizQuestions.length === step && rangeAge) {
      const result = getResult();

      setResultState(result);
    }
  }, [step, rangeAge]);

  return (
    <body id="skinQuizLandingWrapper" className="minHeight">
      <LandingCover content={landingCoverContent} />

      <div id="quizWrapper" className="container">
        {allEyeQuizQuestions.length - 1 < step ? (
          <ResultView content={resultContent} />
        ) : (
          <MainContentQuiz content={mainQuizContent} />
        )}
      </div>
    </body>
  );
};

export default EyeQuiz;

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

const MainContentQuiz = ({content}) => {
  const {
    step,
    questionText,
    multipleChoice,
    answers,
    answerState,
    multipleChoiceState,
    handleClick,
    handleAnswersSubmit,
  } = content;

  function handleOnClick(element) {
    handleClick(element);
    if (!multipleChoice) {
      window.scrollTo(0, 0);
    }
  }

  const AnswerBtn = ({element}) => {
    const name = answerState.length > 0 && answerState[0][0]?.name;
    const btnClassName = classnames(
      multipleChoice ? 'smallerBtn' : 'biggerBtn',
      answers.length === 2 ? 'booleanBtn' : null,
      ((answerState.length > step &&
        element?.qualifiers[0]?.name === answerState[step][0]?.name) ||
        (multipleChoice && multipleChoiceState.includes(element))) &&
        'checkedButton',
      name,
    );
    return (
      (name !== element?.qualifiers[0]?.name || step === 0) && (
        <button className={btnClassName} onClick={() => handleOnClick(element)}>
          {multipleChoiceState.includes(element) ? (
            <div className="priority">
              {multipleChoiceState.indexOf(element) + 1}
            </div>
          ) : null}
          {element?.images?.length ? (
            <img src={element.images[0].asset.url} />
          ) : null}
          <div
            className={
              element?.images?.length
                ? 'answerWrapper'
                : ['textCentered', 'answerWrapper'].join(' ')
            }
          >
            <span className="answerText">{element.answerText}</span>
            <br />
            {element.answerSubCopy && (
              <span className="answerSubCopy">{element.answerSubCopy}</span>
            )}
          </div>
        </button>
      )
    );
  };

  return (
    <main>
      <p className="step">Step {step + 1}</p>

      <p className="question">{questionText}</p>
      {multipleChoice ? (
        <p className="multipleChoiceDek">
          Select up to {multipleChoice} by order of priority.
        </p>
      ) : null}
      <br />
      <section className="buttons_grid">
        {answers.map((el) => (
          <AnswerBtn element={el} key={el?.qualifiers[0]?.name} />
        ))}
      </section>

      {multipleChoice && multipleChoiceState.length > 0 ? (
        <button
          onClick={() => handleAnswersSubmit(multipleChoiceState)}
          className="multipleChoiceBtn"
        >
          Next
        </button>
      ) : null}
    </main>
  );
};

const ResultView = ({content}) => {
  const {setRangeAge, resultState, handleGetProductByID} = content;
  return (
    <main className="finalWrapper">
      <SkinQuizAgeEmailOptIn setRangeAge={setRangeAge} />

      <section className="quizResults">
        <h2>We’ve found the best routine for your eye care to help you</h2>

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
                  key={resultState[item][0].productId}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
