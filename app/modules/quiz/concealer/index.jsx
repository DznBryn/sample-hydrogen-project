import {useState, useEffect} from 'react';
import PDPAddToCart, {links as pdpAddToCartStyles} from '../../addToCartButton';

import {useMatches} from '@remix-run/react';
import {useStore} from '~/hooks/useStore';
import {getIdFromGid} from '~/utils/functions/eventFunctions';

import quizService from '~/utils/services/quiz';
import styles from './styles.css';

import {switchSliderPanelVisibility} from '~/modules/sliderPanel';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...pdpAddToCartStyles()];
};

const CONCEALER_QUIZ_MODEL = {
  quizID: 'US-concealer',
  marketAvailability: ['US'],
  categories: ['only'],
  resultTypes: ['only'],
  quizType: 'concealer',
};

const productQualifierKey = 'qualifier';

const Component = () => {
  const [root] = useMatches();
  const {Concealer, ConcealerImages} = root.data.mainNavFooterCMSData;
  const {concealerQuizQuestions, concealerQuizResults} = Concealer;
  const [questionsState, setQuestionsState] = useState(concealerQuizQuestions);
  const [selectedShade, setSelectedShade] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [answerState, setAnswerState] = useState([]);
  const [resultState, setResultState] = useState({});
  const [step, setStep] = useState(0);
  const [added, setAdded] = useState(false);

  const {store, setStore} = useStore();

  const quiz = quizService(CONCEALER_QUIZ_MODEL);

  const hasResult = !!resultState?.shadeRecommended;
  const hasRadiantRecommendation = !!resultState.radiantRecommendation;

  const questionStep =
    questionsState.length > step ? step : questionsState.length - 1;

  const {questionText, answers} = questionsState[questionStep];

  const StartOverArrow = () => (
    <svg
      className={'concealer_startOverArrow'}
      width="4"
      height="7"
      viewBox="0 0 4 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5998 0.299805L0.299805 3.5998L3.5998 6.89981V0.299805Z"
        fill="#666666"
      />
    </svg>
  );

  function Header() {
    return (
      <>
        <div className={'concealer_mainHeader'}>
          <p className={'concealer_closeBtn'} onClick={() => handleClose()}>
            Close
          </p>
          {hasResult ? (
            <span
              className={'concealer_startOverBtn'}
              onClick={() => handleRestart()}
            >
              <StartOverArrow />
              Start over
            </span>
          ) : (
            <div className={'concealer_sfQuestion'}>{questionText}</div>
          )}
        </div>
      </>
    );
  }

  const Selected = () => (
    <div className={'concealer_selected'}>
      <svg
        width="11"
        height="9"
        viewBox="0 0 11 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1.21524L9.88322 0L3.83709 6.58218L1.11678 3.62026L0 4.83605L3.82692 9L11 1.21524Z"
          fill="white"
        />
      </svg>
    </div>
  );

  const Arrow = () => (
    <svg
      className={'concealer_arrow'}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0001 4.99981C10.0001 5.16557 9.93429 5.32455 9.81708 5.44176C9.69987 5.55897 9.5409 5.62481 9.37514 5.62481H2.13389L4.81764 8.30731C4.87575 8.36542 4.92185 8.43441 4.9533 8.51033C4.98474 8.58626 5.00093 8.66763 5.00093 8.74981C5.00093 8.83199 4.98474 8.91337 4.9533 8.98929C4.92185 9.06522 4.87575 9.1342 4.81764 9.19231C4.75953 9.25042 4.69055 9.29652 4.61462 9.32797C4.5387 9.35942 4.45732 9.3756 4.37514 9.3756C4.29296 9.3756 4.21159 9.35942 4.13566 9.32797C4.05974 9.29652 3.99075 9.25042 3.93264 9.19231L0.182641 5.44231C0.124437 5.38426 0.0782578 5.31529 0.0467498 5.23935C0.0152417 5.16342 -0.000976563 5.08202 -0.000976562 4.99981C-0.000976563 4.9176 0.0152417 4.8362 0.0467498 4.76027C0.0782578 4.68434 0.124437 4.61537 0.182641 4.55731L3.93264 0.807313C4.05 0.689955 4.20917 0.624023 4.37514 0.624023C4.54111 0.624023 4.70028 0.689955 4.81764 0.807313C4.935 0.924671 5.00093 1.08384 5.00093 1.24981C5.00093 1.41578 4.935 1.57496 4.81764 1.69231L2.13389 4.37481H9.37514C9.5409 4.37481 9.69987 4.44066 9.81708 4.55787C9.93429 4.67508 10.0001 4.83405 10.0001 4.99981Z"
        fill="white"
      />
    </svg>
  );

  const GoBackButton = () => {
    return (
      <div className={'concealer_goBackButton'} onClick={() => stepBack()}>
        <Arrow />
        go back
      </div>
    );
  };

  function stepBack() {
    if (step === 0) {
      switchSliderPanelVisibility('ShadeFinderSlider');
      setTimeout(() => {
        handleRestart();
      }, 600);
      return;
    }
    setStep((oldState) => (oldState > 0 ? oldState - 1 : oldState));
    setQuestionsState((oldState) => oldState.slice(0, -1));
  }

  function handleAnswersSubmit(answer) {
    let answersArray = answerState;
    let questions = structuredClone(questionsState);

    answersArray[step] = answer.qualifiers;

    if (answer.subQuestion) {
      const returnQuestions = quiz.handleAddSubQuestionIntoQuestionsQueue(
        questions,
        answer,
      );

      setQuestionsState(returnQuestions);
    }

    setAnswerState(answersArray);

    increaseStep();
  }

  function increaseStep() {
    setTimeout(function () {
      setStep((oldState) => oldState + 1);
    }, 500);
  }

  function handleClose() {
    switchSliderPanelVisibility('ConcealerSlider');
    setTimeout(() => {
      handleRestart();
    }, 600);
    return;
  }

  function handleRestart() {
    setQuestionsState(concealerQuizQuestions);
    setResultState({});
    setAnswerState([]);
    setStep(0);
    setSelectedImage(0);

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'concealerStartOver',
      });
    }
  }

  function getResult() {
    let answersArr = quiz.handleGetUserAnswers(
      answerState,
      productQualifierKey,
    );

    const result = quiz.handleGetRegularResultsByCategory(
      concealerQuizResults,
      answersArr,
      [],
      productQualifierKey,
    );

    return {result, answersArr};
  }

  const getBackgroundColorByShade = (shade) => {
    const image = ConcealerImages.find(
      (additionalShade) => additionalShade.name === getNumberByShade(shade),
    );
    return image?.desktop?.asset.url;
  };

  const getBackgroundImageByShade = (shade) => {
    const {resultImage: backgroundImage} = concealerQuizResults.find(
      (additionalShade) => additionalShade?.shadeRecommended === shade,
    );

    return {
      backgroundImage:
        backgroundImage[selectedImage ? selectedImage : 0]?.asset?.url,
      length: backgroundImage?.length,
    };
  };

  const getNumberByShade = (shade) => {
    return shade.split(' ')[0];
  };

  const sendSelectedShadeToStore = () => {
    const shadeNumber = getNumberByShade(selectedShade);
    // Change atc copy
    setAdded(true);
    const product = store?.product?.variants?.find(
      (variant) => variant?.title.split(' ')[1] === shadeNumber,
    );

    const selectedVariant = product?.id;

    setStore({
      ...store,
      selectedShade,
      productPage: {
        ...store.productPage,
        selectedVariant,
        selectedVariantId: selectedVariant,
        variantId: getIdFromGid(selectedVariant),
        concealerShade: selectedShade,
        addToCart: {
          ...store?.productPage?.addToCart,
          quantity: 1,
          discount: 0,
        },
      },
    });

    setTimeout(() => {
      setAdded(false);
    }, 300);

    switchSliderPanelVisibility('ConcealerSlider');

    !hasRadiantRecommendation
      ? switchSliderPanelVisibility('ConcealerSlider')
      : null;

    if (window?.dataLayer) {
      window.dataLayer.push({
        event: 'concealerSelectShade',
      });
    }
  };

  const sendUserToShadeFinderWithRecommendation = () => {
    const shadeFinderUrl =
      '/products/radiant-skin-brightening-serum-skin-tint-spf-30';

    localStorage.setItem('recommendation', resultState?.radiantRecommendation);
    switchSliderPanelVisibility('ConcealerSlider');

    window.location.replace(shadeFinderUrl);
  };

  const RadiantRecommendation = () => {
    const radiantImage =
      'https://cdn.shopify.com/s/files/1/1736/9637/files/concealer_upsell.png?v=1692382620' ||
      '';

    return (
      <div className={'concealer_radiantContainer'}>
        <img className={'concealer_radiantImage'} src={radiantImage}></img>
        <div className={'concealer_radiantTextContainer'}>
          <p>
            we found your <b>skin tint</b> match, too!
          </p>
          <p
            onClick={() => sendUserToShadeFinderWithRecommendation()}
            className={'concealer_radiantSelection'}
          >
            complete my routine
          </p>
        </div>
      </div>
    );
  };

  const SelectShadeButton = () => {
    const shadeNumber = getNumberByShade(selectedShade);
    const product = store?.product?.variants?.find(
      (variant) => variant?.title.split(' ')[1] === shadeNumber,
    );

    return (
      <div className={'concealer_selectShadeButtonContainer'}>
        <div onClick={sendSelectedShadeToStore}>
          {added ? (
            <div className={'concealer_addedToCart'}>Added to Cart!</div>
          ) : (
            <PDPAddToCart
              addItem={{
                product,
                variantId: product?.id,

                quantity: 1,
              }}
            />
          )}
        </div>
        {!hasRadiantRecommendation && (
          <p>
            free 60 day returns on all orders. auto-delivery options in cart.
          </p>
        )}
      </div>
    );
  };

  const handleShade = (shade) => {
    setSelectedImage(0);
    setSelectedShade(shade);
  };

  const handleArrowAction = (imgsLength, action) => {
    const lastPositionImage = imgsLength - 1;
    switch (true) {
      case selectedImage === 0 && action === 'prev':
        setSelectedImage(lastPositionImage);
        break;
      case selectedImage === lastPositionImage && action === 'next':
        setSelectedImage(0);
        break;
      case action === 'prev':
        setSelectedImage(selectedImage - 1);
        break;
      case action === 'next':
        setSelectedImage(selectedImage + 1);
        break;
      default:
        break;
    }
  };

  const RightArrow = ({onClick}) => (
    <div onClick={() => onClick()} className={'concealer_rightArrow'}>
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.96782 8.87028C9.93764 8.67028 9.84713 8.48529 9.70632 8.34029L1.98219 0.340293C1.80995 0.137794 1.56228 0.0153013 1.29702 0.00154132C1.03176 -0.0134587 0.771526 0.0815413 0.579163 0.262793C0.385557 0.445292 0.277438 0.699049 0.278696 0.962793C0.278696 1.22779 0.389328 1.47905 0.584191 1.6603L7.67463 9.00046L0.584191 16.3406C0.389327 16.5219 0.278695 16.7731 0.278695 17.0381C0.277438 17.3019 0.385556 17.5556 0.579162 17.7381C0.771512 17.9194 1.03173 18.0144 1.29702 17.9994C1.56229 17.9856 1.80997 17.8631 1.98219 17.6606L9.70504 9.66062C9.9087 9.45062 10.0042 9.15937 9.96653 8.8706L9.96782 8.87028Z"
          fill="black"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );

  const LeftArrow = ({onClick}) => (
    <div onClick={() => onClick()} className={'concealer_leftArrow'}>
      <svg
        width="11"
        height="18"
        viewBox="0 0 11 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.323198 9.12972C0.353371 9.32972 0.443888 9.51471 0.584692 9.65971L8.30883 17.6597C8.48106 17.8622 8.72873 17.9847 8.99399 17.9985C9.25926 18.0135 9.51949 17.9185 9.71185 17.7372C9.90546 17.5547 10.0136 17.301 10.0123 17.0372C10.0123 16.7722 9.90169 16.521 9.70682 16.3397L2.61639 8.99954L9.70682 1.65938C9.90169 1.47813 10.0123 1.22687 10.0123 0.961878C10.0136 0.698128 9.90546 0.444374 9.71185 0.261879C9.5195 0.0806276 9.25928 -0.0143718 8.99399 0.000625714C8.72873 0.0143758 8.48104 0.136877 8.30883 0.339378L0.585979 8.33938C0.382316 8.54938 0.286769 8.84063 0.324485 9.1294L0.323198 9.12972Z"
          fill="black"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );

  const setNeutralAsAnswer = (answers) => {
    console.log(answers);
    // const neutralAnswer = answers.find(
    //   (answer) => answer.answerQualifiers[0]?.name.toLowerCase() === 'neutral',
    // );
    // // deleting subquestions to avoid new steps
    // delete neutralAnswer.subQuestions;
    // if (neutralAnswer) {
    //   handleAnswersSubmit(neutralAnswer);
    // }

    // return;
  };

  const renderResult = () => {
    const {additionalRecommendation, shadeRecommended} = resultState;

    const resultHaveOtherShades = additionalRecommendation?.find(
      (recommendation) => recommendation !== '',
    );
    const {backgroundImage, length} = getBackgroundImageByShade(selectedShade);

    return (
      <>
        <div className={'concealer_resultContainer'}>
          <LeftArrow onClick={() => handleArrowAction(length, 'prev')} />
          <RightArrow onClick={() => handleArrowAction(length, 'next')} />
          <img className={'concealer_shadeImage'} src={backgroundImage} />
          <div className={'concealer_dotsContainer'}>
            {Array.from({length}).map((_, index) => (
              <div
                className={'concealer_dots'}
                style={{
                  background: `${
                    selectedImage === index ? '#BCBCBC' : '#DEDEDE'
                  }`,
                }}
                onClick={() => setSelectedImage(index)}
                key={index}
              ></div>
            ))}
          </div>
          <p className={'concealer_shadeFounded'}>we found your shade!</p>
          <div
            className={'concealer_recommendedShadeContainer'}
            onClick={() => handleShade(shadeRecommended)}
          >
            <div className={'concealer_shadeIconContainer'}>
              {selectedShade === shadeRecommended && <Selected />}
              <div
                className={'concealer_shadeIcon'}
                style={{
                  backgroundImage: `url(${getBackgroundColorByShade(
                    shadeRecommended,
                  )})`,
                }}
              ></div>
            </div>
            <p className={'concealer_recommendedShade'}>{shadeRecommended}</p>
            <div className={'concealer_recommendedBadge'}>RECOMMENDED</div>
          </div>
        </div>
        <div>
          {!!resultHaveOtherShades && (
            <div className={'concealer_additionalShadeContainer'}>
              <p className={'concealer_helpingText'}>
                other shades to consider:
              </p>
              {additionalRecommendation.map((additionalShade) => {
                return (
                  <div
                    className={'concealer_additionalShade'}
                    onClick={() => handleShade(additionalShade)}
                    key={additionalShade}
                  >
                    <div className={'concealer_shadeIconContainer'}>
                      <div
                        className={'concealer_shadeIcon'}
                        style={{
                          backgroundImage: `url(${getBackgroundColorByShade(
                            additionalShade,
                          )})`,
                        }}
                      ></div>
                      {selectedShade === additionalShade && (
                        <Selected additionalShade />
                      )}
                    </div>
                    <p className={'concealer_recommendedShade'}>
                      {additionalShade}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    if (questionsState.length === step) {
      const {result} = getResult();

      const sortedResult = result.only.sort(
        (a, b) =>
          b.quizAttributes.qualifiers.length -
          a.quizAttributes.qualifiers.length,
      )[0];

      const {shadeRecommended} = sortedResult;

      setSelectedShade(shadeRecommended);

      setStore((currStore) => ({
        ...currStore,
        selectedShade,
      }));

      setResultState(sortedResult);
    }
  }, [step]);

  return (
    <>
      <div className={'concealer_wrapper'}>
        <Header />
        <div
          className={`${
            hasResult ? 'concealer_resultWrapper' : 'concealer_quizContainer'
          }`}
        >
          {step === 2 ? (
            <p className={'concealer_infoText'}>
              (hint: check the inside of your wrist to identify your vein color)
            </p>
          ) : null}
          {hasResult ? (
            renderResult()
          ) : (
            <>
              {answers.map(
                (answer) =>
                  ((answerState.length > 0 && step < 4) || step === 0) && (
                    <div
                      key={answer.name}
                      className={
                        step === 2
                          ? 'concealer_quizItemFinal'
                          : 'concealer_quizItem'
                      }
                      style={step === 3 ? {height: 110} : {}}
                      onClick={() => handleAnswersSubmit(answer)}
                    >
                      {step === 2 ? (
                        <div className={'concealer_undertoneContainer'}>
                          <div
                            className={'concealer_sfItem'}
                            style={{
                              backgroundColor: `${answer.image.skinTone}`,
                              border: `1px solid ${answer.image.labelColor}`,
                            }}
                          >
                            <p
                              className={'concealer_sfItemText'}
                              style={{color: `${answer.image.labelColor}`}}
                            >
                              {answer.answerText}
                            </p>
                          </div>
                          <ul>
                            {answer.helpingText.map((helpingText) => (
                              <li
                                key={helpingText}
                                className={'concealer_undertoneInfo'}
                                dangerouslySetInnerHTML={{__html: helpingText}}
                              ></li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <>
                          <div
                            className={'concealer_itemBorder'}
                            style={{background: `${answer.image.labelColor}`}}
                          ></div>
                          <div
                            style={{display: 'flex', flexDirection: 'column'}}
                          >
                            <p className={'concealer_item'}>
                              {answer.answerText}
                            </p>
                            {step === 3 && answer?.helpingText && (
                              <div
                                className={
                                  'concealer_helpTextUndertoneContainer'
                                }
                              >
                                {answer?.helpingText.map((helpingText, i) => (
                                  <div
                                    key={i}
                                    className={'concealer_helpTextUndertone'}
                                  >
                                    {helpingText}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <img
                            className={'concealer_img'}
                            src={
                              answer?.image?.image?.asset?.url + '?auto=format'
                            }
                            alt={answer?.image?.alt}
                          />
                        </>
                      )}
                    </div>
                  ),
              )}
              {step === 3 && (
                <div className={'concealer_neutralAnswerContainer'}>
                  <p>
                    Not sure which one is you? Go with{' '}
                    <b>
                      <span onClick={() => setNeutralAsAnswer(answers)}>
                        neutral
                      </span>
                      .
                    </b>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {hasResult ? (
          <>
            <SelectShadeButton />
            {hasRadiantRecommendation && <RadiantRecommendation />}
          </>
        ) : (
          <GoBackButton />
        )}
      </div>
    </>
  );
};

export default Component;
