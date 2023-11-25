import {useState, useEffect} from 'react';

import {useCollection} from '~/hooks/useCollection';
import quizzService from '~/utils/services/quizz';

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

const SKIN_QUIZ_MODEL = {
  quizID: 'US-skin-quiz',
  marketAvailability: ['US'],
  categories: ['eye-balm', 'moisturizer', 'treat&prep', 'cleanser', 'spf'],
  resultTypes: ['regular', 'advanced'],
  quizType: 'skin-quiz',
};

const productQualifierKey = 'qualifier';

const SkinQuiz = ({content}) => {
  const {quizBannerContent, quizQuestions, quizResults, quizAdvancedResults} =
    content;

  const [advancedResultsState, setAdvancedResultsState] = useState([]);
  const [questionsState, setQuestionsState] = useState(quizQuestions);
  const [multipleChoiceState, setMultipleChoiceState] = useState([]);
  const [answerState, setAnswerState] = useState([]);
  const [resultState, setResultState] = useState({});

  const [step, setStep] = useState(0);

  const {products} = useCollection('all');

  const quizz = quizzService(SKIN_QUIZ_MODEL);

  const questionStep =
    questionsState.length > step ? step : questionsState.length - 1;

  const {questionText, answers, multipleChoice} = questionsState[questionStep];

  const {
    backgroundColor,
    calloutPillFontColor,
    calloutPillColor,
    ctaFontColor,
    ctaButtonColor,
    headerFontColor,
    skinQuizCopy,
    backgroundImage,
    images,
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
    /* Manage status bar fill */

    const questionPercent = Math.floor(100 / questionsState.length);
    const statusBarWidth = step + 1;

    const statusBar = document.querySelector('.status');

    questionsState.length === step + 1
      ? (statusBar.style.width = '100%')
      : (statusBar.style.width = statusBarWidth * questionPercent + '%');

    let arr = answerState;
    let questions = structuredClone(questionsState);

    if (multipleChoice) {
      arr[step] = [];
      answer.forEach((ans) => {
        arr[step] = [...arr[step], ...ans.qualifiers];

        if (ans.subQuestion) {
          const returnQuestions = quizz.handleAddSubQuestionIntoQuestionsQueue(
            questions,
            ans,
          );

          setQuestionsState(returnQuestions);
        }

        setAnswerState(arr);
      });

      return increaseStep();
    }

    arr[step] = answer.qualifiers;

    if (answer.subQuestion) {
      const returnQuestions = quizz.handleAddSubQuestionIntoQuestionsQueue(
        questions,
        answer,
      );

      setQuestionsState(returnQuestions);
    }

    setAnswerState(arr);

    increaseStep();
  }

  function handleGetProductByID(_productId) {
    const product = products.find((prod) => prod.handle === _productId);
    return product;
  }

  function getAdvancedRoutine(_answersArr, _coreRoutine) {
    const advancedRoutine = quizz.handleGetAdvancedResults(
      quizAdvancedResults,
      _answersArr,
      quizResults,
      _coreRoutine,
      multipleChoiceState,
      productQualifierKey,
    );

    return advancedRoutine;
  }

  function getResult() {
    let answersArr = quizz.handleGetUserAnswers(
      answerState,
      productQualifierKey,
    );

    const result = quizz.handleGetRegularResultsByCategory(
      quizResults,
      answersArr,
      multipleChoiceState,
      productQualifierKey,
    );

    const advancedResult = getAdvancedRoutine(answersArr, result);

    return {result, advancedResult, answersArr};
  }

  function handleRestart() {
    setQuestionsState(quizQuestions);
    setAdvancedResultsState([]);
    setMultipleChoiceState([]);
    setResultState({});
    setAnswerState([]);
    setStep(0);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    document.querySelector('.status').style.width = '0%';
  }

  function stepBack() {
    setStep((oldState) => (oldState > 0 ? oldState - 1 : oldState));

    /* Manage status fill going back */
    const questionPercent = Math.floor(100 / questionsState.length);
    const statusBarWidth = step - 1;
    const statusBar = document.querySelector('.status');
    statusBar.style.width = statusBarWidth * questionPercent + '%';
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

  const hasStatusBar = true;

  const mainQuizContent = {
    step,
    questionText,
    multipleChoice,
    answers,
    answerState,
    multipleChoiceState,
    handleClick,
    handleAnswersSubmit,
    stepBack,
    hasStatusBar,
  };

  const advancedQuizContent = {
    advancedResultsState,
    answerState,
    images,
    handleGetProductByID,
    handleRestart,
  };

  let resultContent = {
    setRangeAge: () => {},
    resultState,
    handleGetProductByID,
    advancedResultsState,
  };

  if (advancedResultsState.length) {
    resultContent = {...resultContent, advancedQuizContent};
  }

  useEffect(() => {
    if (questionsState.length === step) {
      const {result, advancedResult} = getResult();

      setResultState(result);
      setAdvancedResultsState(advancedResult);
    }
  }, [step]);

  return (
    <main id="skinQuizLandingWrapper" className="minHeight">
      <LandingCover content={landingCoverContent} />

      <div id="quizWrapper" className="container">
        {questionsState.length - 1 < step ? (
          <ResultView content={resultContent} />
        ) : (
          <MainContentQuizView content={mainQuizContent} />
        )}
      </div>
    </main>
  );
};

export default SkinQuiz;
