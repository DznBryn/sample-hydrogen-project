import {useState} from 'react';
import styles from './styles.css';

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};
const RewardsFAQSection = ({yotpoFAQ}) => {
  const [activeIndex, setActiveIndex] = useState();

  const AccordionItem = ({showDescription, ariaExpanded, item, onClick}) => {
    return (
      <div key={item.questions}>
        <dt>
          <button
            aria-expanded={ariaExpanded}
            className={'loyaltyRewardsTab_faq__questionButton'}
            onClick={onClick}
          >
            <span>{item.questions}</span>
            <span
              className={`loyaltyRewardsTab_faq__questionCloseButton
              ${
                showDescription &&
                'loyaltyRewardsTab_faq__questionCloseButtonRotate'
              }
            `}
            >
              +
            </span>
          </button>
        </dt>
        <dd>
          <div
            className={`loyaltyRewardsTab_faq__answer ${
              showDescription && 'loyaltyRewardsTab_faq_showDescription'
            }`}
          >
            <div className={'loyaltyRewardsTab_faq__divider'} />
            <p dangerouslySetInnerHTML={{__html: item.answers}} />
          </div>
        </dd>
      </div>
    );
  };

  function handleToggleAccordion(index) {
    const tab = index !== activeIndex ? index : null;
    setActiveIndex(tab);
  }

  const RenderedQuestionsAnswers = ({item, index}) => {
    const showDescription = index === activeIndex ? true : false;
    const ariaExpanded = index === activeIndex ? true : false;

    return (
      <>
        <AccordionItem
          showDescription={showDescription}
          ariaExpanded={ariaExpanded}
          item={item}
          teste={item}
          index={index}
          onClick={() => handleToggleAccordion(index)}
        />
        <div className={'loyaltyRewardsTab_faq__divider'} />
      </>
    );
  };

  return (
    <div className={'loyaltyRewardsTab_faq__container'}>
      <h1 className={'loyaltyRewardsTab_faq__title'}>rewards FAQ</h1>
      <div className={'loyaltyRewardsTab_faq__divider'} />

      <dl className="loyaltyRewardsTab_faq__list">
        {yotpoFAQ[0]?.yotpoQuestions?.map((item, index) => (
          <RenderedQuestionsAnswers
            key={item.questions}
            index={index}
            item={item}
          />
        ))}
      </dl>
    </div>
  );
};

export default RewardsFAQSection;
