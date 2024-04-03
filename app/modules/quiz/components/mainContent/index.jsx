import classnames from 'classnames';

import styles from './styles.css';
import PortableTextCustom from '~/modules/portableTextCustom';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const MainContentQuiz = ({content}) => {
  const {
    step,
    questionText,
    textBoxRaw,
    multipleChoice,
    answers,
    answerState,
    multipleChoiceState,
    handleClick,
    handleAnswersSubmit,
  } = content;

  function handleOnClick(element) {
    handleClick(element);
  }

  const AnswerBtn = ({element}) => {
    const title = answerState.length > 0 && answerState[0][0]?.name;

    const includedIntoAnswerState =
      answerState.length > step &&
      element?.qualifiers[0]?.name === answerState[step][0]?.name;

    const includedIntoMultipleChoice =
      multipleChoice && multipleChoiceState.includes(element);

    const btnClassName = classnames(
      multipleChoice && 'smallerBtn',
      answers.length === 2 && 'booleanBtn',
      (includedIntoAnswerState || includedIntoMultipleChoice) &&
        'checkedButton',
      title,
    );

    const imgClassName = classnames(
      'answerWrapper',
      !element?.images?.length && 'textCentered',
    );

    const isDifferentName = title !== element?.qualifiers[0]?.name;

    return (
      (isDifferentName || step === 0) && (
        <button className={btnClassName} onClick={() => handleOnClick(element)}>
          {multipleChoiceState.includes(element) ? (
            <div className="priority">
              {multipleChoiceState.indexOf(element) + 1}
            </div>
          ) : null}
          {element?.images?.length ? (
            <img src={element.images[0].asset.url + '?auto=format'} />
          ) : null}
          <div className={imgClassName}>
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

  const shouldShowSubmitButton =
    multipleChoice && multipleChoiceState?.length > 0;

  return (
    <section className="mainContentContainer">
      <p className="step">Step {step + 1}</p>
      <p className="question">{questionText}</p>
      {multipleChoice ? (
        <p className="multipleChoiceDek">
          Select up to {multipleChoice} in order of priority.
        </p>
      ) : null}
      <br />
      <div className="buttons_grid">
        {answers.map((el) => (
          <AnswerBtn element={el} key={el?.qualifiers[0]?.name} />
        ))}
      </div>

      {textBoxRaw && (
        <div className="textBoxRaw">
          <PortableTextCustom value={textBoxRaw} />
        </div>
      )}

      {shouldShowSubmitButton ? (
        <button
          onClick={() => handleAnswersSubmit(multipleChoiceState)}
          className="multipleChoiceBtn"
        >
          Next
        </button>
      ) : null}
    </section>
  );
};

export default MainContentQuiz;
