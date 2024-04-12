import {useState, useEffect} from 'react';

import {useCollection} from '~/hooks/useCollection';
import quizzService from '~/utils/services/quiz';

import LandingCover, {
  links as landingCoverStyles,
} from '~/modules/quiz/components/landingCover';

import MainContentQuizView, {
  links as mainContentQuizViewStyles,
} from '~/modules/quiz/components/mainContent';

import ResultView, {
  links as resultViewStyles,
} from '~/modules/quiz/components/resultView';

import styles from './styles.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...landingCoverStyles(),
    ...mainContentQuizViewStyles(),
    ...resultViewStyles(),
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

  const {quizBannerContent, quizQuestions, quizResults} = content;

  const {questionText, answers, multipleChoice} = quizQuestions[0];

  const {
    backgroundColor,
    calloutPillFontColor,
    calloutPillColor,
    ctaFontColor,
    ctaButtonColor,
    headerFontColor,
    skinQuizCopy,
    backgroundImage,
  } = quizBannerContent;

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

    const result = quizz.handleGetRegularResultsByCategory(
      quizResults,
      answersArr,
      multipleChoiceState,
      productQualifierKey,
    );

    return {result, answersArr};
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

  let resultContent = {setRangeAge, resultState, handleGetProductByID};

  if (Object.keys(resultState).length) {
    const {answersArr} = getResult();

    resultContent = {...resultContent, answers: answersArr};
  }

  useEffect(() => {
    if (quizQuestions.length === step && rangeAge) {
      const {result} = getResult();

      setResultState(result);
    }
  }, [step, rangeAge]);

  return (
    <main id="skinQuizLandingWrapper" className="minHeight">
      <LandingCover content={landingCoverContent} />

      <div id="quizWrapper" className="container">
        {quizQuestions.length - 1 < step ? (
          <ResultView content={resultContent} />
        ) : (
          <MainContentQuizView content={mainQuizContent} />
        )}
      </div>
    </main>
  );
};

export default EyeQuiz;
