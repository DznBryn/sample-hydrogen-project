/* eslint-disable react/no-unescaped-entities */
import {useRef, useState} from 'react';
import classNames from 'classnames';

import {
  submitFooterContact,
  submitSkinQuizForm,
} from '~/utils/functions/listrakFunctions';

import styles from './styles.css';
import {handleSignUpTracking} from '~/utils/functions/eventFunctions';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const SkinQuizAgeEmailOptIn = ({
  setRangeAge,
  currentTab = 1,
  concatResults,
  quizAnswers,
  submitType = 'sendAnswers',
}) => {
  const [dateInputted, setDateInputted] = useState(false);
  const [activeTab, setActiveTab] = useState(currentTab);

  const userEmailRef = useRef(null);

  const userBirthday = useRef({});
  const userYearRef = useRef(null);
  const userMonthRef = useRef(null);

  setRangeAge ??= () => {};

  //eslint-disable-next-line
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const years = [];
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  for (let i = year - 16; i >= 1922; i--) {
    years.push(i);
  }

  async function handleSubmit() {
    const userEmail = userEmailRef.current.value;
    const errorMessage = 'Please enter a valid Email';
    const emailIsNotValid = !userEmail.match(emailRegex);

    if (emailIsNotValid) return handleShowErrorMessage(errorMessage);

    let response;

    switch (submitType) {
      case 'sendAnswers':
        response = await sendAnswersToLT(userEmail);
        break;
      case 'onlySubscribe':
        response = await subscribeEmailOnLT(userEmail);
        break;
    }

    handleSignUpTracking('skin_quiz', userEmail);

    const isValidStatusCode = () =>
      [200, 201]?.some((validStatus) => validStatus === response.status);

    isValidStatusCode() || response.error === 'ERROR_UNSUBSCRIBED_EMAIL_ADDRESS'
      ? handleShowSkinQuizResult()
      : handleShowErrorMessage(response.message);
  }

  async function sendAnswersToLT(userEmail) {
    return await submitSkinQuizForm(userEmail, getLTPostObject());
  }

  function Text() {
    return (
      <div className="infoText">
        Some of the information you will be providing us may indicate or imply
        information about your past, present, or future health conditions,
        including your product interests, individual health conditions,
        treatments, diseases, bodily function, and vital signs and measurements
        (“Consumer Health Data”). Please note that Tula will collect, retain,
        and process your personally identifiable information (“Personal
        Information”), including Consumer Health Data, in accordance with our
        website{' '}
        <a href="/pages/privacy-policy" target="_blank">
          Privacy Policy
        </a>{' '}
        and our{' '}
        <a href="/pages/consumer-health-data-privacy-policy" target="_blank">
          Consumer Health Data Privacy Policy
        </a>{' '}
        (collectively, the “Privacy Statements”). For example, we will use your
        Personal Information, including your Consumer Health Data, to provide
        you products and services, create and deliver relevant advertising, and
        manage your accounts. Your Personal Information, including your Consumer
        Health Data, will be shared with our service providers and data
        processors who assist Tula in providing goods and services to you and
        for other legal and business operational purposes, as outlined in our
        Privacy Statements. You have read and you agree to our Privacy
        Statements and{' '}
        <a href="/pages/terms-conditions" target="_blank">
          Terms & Condition
        </a>
        {'.'}
      </div>
    );
  }

  async function subscribeEmailOnLT(userEmail) {
    const birthdayIsValid = Object.keys(userBirthday.current).length !== 0;
    const birthdayFormatted = birthdayIsValid
      ? `${userBirthday.current.month}/${userBirthday.current.year}`
      : '';

    return await submitFooterContact(userEmail, birthdayFormatted);
  }

  function handleDateSubmit() {
    userBirthday.current = {
      year: userYearRef.current.value,
      month: userMonthRef.current.value,
    };
    handleActiveTab(2);
  }

  function handleDateInput() {
    const userYear = userYearRef.current.value.toUpperCase();
    const userMonth = userMonthRef.current.value.toUpperCase();

    setDateInputted(userYear !== 'YYYY' && userMonth !== 'MM');
  }

  function handleShowSkinQuizResult() {
    document.querySelector('.SkinQuizEmailOptIn').style.display = 'none';
    document.querySelector('.quizResults').style.display = 'block';
  }

  function handleShowErrorMessage(errorMessage) {
    const errorElement = document.getElementById('emailErrorMessage');
    errorElement.innerHTML = errorMessage;
    errorElement.style.display = 'block';
  }

  function getUserAgeGroup() {
    const userAge =
      year -
      parseInt(userBirthday.current.year) -
      (month - parseInt(userBirthday.current.month) < 0 ? 1 : 0);

    return isNaN(userAge) ? null : (Math.floor(userAge / 10) * 10).toString();
  }

  function getRangeAge() {
    const rangeAge = getUserAgeGroup();
    let age = null;
    if (rangeAge === null) {
      age = 'no-age';
    } else {
      age =
        rangeAge < 20
          ? 'teens'
          : // eslint-disable-next-line quotes
            `${rangeAge > 40 ? "50's+" : rangeAge + "'s"}`;
    }
    return age;
  }

  function handleActiveTab(tab) {
    const age = getRangeAge();
    setRangeAge(age);

    setActiveTab(tab);
  }

  function getLTPostObject() {
    const getPrice = (price) => '$' + price;
    const getSkinGoal = () => quizAnswers.at(-1);
    const getEyetarget = () => (quizAnswers[4] ? quizAnswers[4] : null);
    const getLinkURL = (product) => 'http://tula.com/products/' + product;
    const getAllSkinGoals = () => quizAnswers?.slice(3).join(', ');
    const getAllQuizAnswers = () =>
      `${quizAnswers[0]},${quizAnswers[1]},${quizAnswers[2]}`;

    return [
      {
        segmentationFieldId: 7810,
        value: 'on',
      },
      {
        segmentationFieldId: 6492,
        value: concatResults[0]?.name || 'name',
      },
      {
        segmentationFieldId: 6493,
        value: concatResults[0]?.whatItDoes || 'whatItDoes',
      },
      {
        segmentationFieldId: 6494,
        value: concatResults[0]?.images.nodes[0]?.url || '',
      },
      {
        segmentationFieldId: 6495,
        value: getLinkURL(concatResults[0]?.productId || 'productId'),
      },
      {
        segmentationFieldId: 6500,
        value: getPrice(
          concatResults[0]?.priceRange.maxVariantPrice.amount || 'price',
        ),
      },
      {
        segmentationFieldId: 6501,
        value: concatResults[1]?.name || 'name',
      },
      {
        segmentationFieldId: 6502,
        value: concatResults[1]?.whatItDoes || 'whatItDoes',
      },
      {
        segmentationFieldId: 6503,
        value: concatResults[1]?.images.nodes[0]?.url || '',
      },
      {
        segmentationFieldId: 6504,
        value: getLinkURL(concatResults[1]?.productId || 'productId'),
      },
      {
        segmentationFieldId: 6505,
        value: getPrice(
          concatResults[1]?.priceRange.maxVariantPrice.amount || 'price',
        ),
      },
      {
        segmentationFieldId: 6506,
        value: concatResults[2]?.name || 'name' || 'name',
      },
      {
        segmentationFieldId: 6507,
        value: concatResults[2]?.whatItDoes || 'whatItDoes',
      },
      {
        segmentationFieldId: 6508,
        value: concatResults[2]?.images.nodes[0]?.url || '',
      },
      {
        segmentationFieldId: 6509,
        value: getLinkURL(concatResults[2]?.productId || 'productId'),
      },
      {
        segmentationFieldId: 6510,
        value: getPrice(
          concatResults[2]?.priceRange.maxVariantPrice.amount || 'price',
        ),
      },
      {
        segmentationFieldId: 18275,
        value: concatResults[3]?.name || 'name',
      },
      {
        segmentationFieldId: 18277,
        value: concatResults[3]?.whatItDoes || 'whatItDoes',
      },
      {
        segmentationFieldId: 18278,
        value: concatResults[3]?.images.nodes[0]?.url || '',
      },
      {
        segmentationFieldId: 18279,
        value: getLinkURL(concatResults[3]?.productId || 'productId'),
      },
      {
        segmentationFieldId: 18280,
        value: getPrice(
          concatResults[3]?.priceRange.maxVariantPrice.amount || 'price',
        ),
      },
      {
        segmentationFieldId: 18281,
        value: concatResults[4]?.name || 'name',
      },
      {
        segmentationFieldId: 18282,
        value: concatResults[4]?.whatItDoes || 'whatItDoes',
      },
      {
        segmentationFieldId: 18283,
        value: concatResults[4]?.images.nodes[0]?.url || '',
      },
      {
        segmentationFieldId: 18284,
        value: getLinkURL(concatResults[4]?.productId || 'productId'),
      },
      {
        segmentationFieldId: 18285,
        value: getPrice(
          concatResults[4]?.priceRange.maxVariantPrice.amount || 'price',
        ),
      },
      {
        segmentationFieldId: 18286,
        value: concatResults[5]?.name || 'name',
      },
      {
        segmentationFieldId: 18287,
        value: concatResults[5]?.whatItDoes || 'whatItDoes',
      },
      {
        segmentationFieldId: 18288,
        value: concatResults[5]?.images.nodes[0]?.url || '',
      },
      {
        segmentationFieldId: 18289,
        value: getLinkURL(concatResults[5]?.productId || 'productId'),
      },
      {
        segmentationFieldId: 18290,
        value: getPrice(
          concatResults[5]?.priceRange.maxVariantPrice.amount || 'price',
        ),
      },
      {
        segmentationFieldId: 18291,
        value: concatResults[6]?.name || 'name',
      },
      {
        segmentationFieldId: 18292,
        value: concatResults[6]?.whatItDoes || 'whatItDoes',
      },
      {
        segmentationFieldId: 18293,
        value: concatResults[6]?.images.nodes[0]?.url || '',
      },
      {
        segmentationFieldId: 18294,
        value: getLinkURL(concatResults[6]?.productId || 'productId'),
      },
      {
        segmentationFieldId: 18295,
        value: getPrice(
          concatResults[6]?.priceRange.maxVariantPrice.amount || 'price',
        ),
      },
      {
        segmentationFieldId: 18296,
        value: concatResults[7]?.name || 'name',
      },
      {
        segmentationFieldId: 18297,
        value: concatResults[7]?.whatItDoes || 'whatItDoes',
      },
      {
        segmentationFieldId: 18298,
        value: concatResults[7]?.images.nodes[0]?.url || '',
      },
      {
        segmentationFieldId: 18299,
        value: getLinkURL(concatResults[7]?.productId || 'productId'),
      },
      {
        segmentationFieldId: 18300,
        value: getPrice(
          concatResults[7]?.priceRange.maxVariantPrice.amount || 'price',
        ),
      },
      {
        segmentationFieldId: 18336,
        value: concatResults[0]?.reviews_average || 'reviews_average',
      },
      {
        segmentationFieldId: 18337,
        value: concatResults[1]?.reviews_average || 'reviews_average',
      },
      {
        segmentationFieldId: 18338,
        value: concatResults[2]?.reviews_average || 'reviews_average',
      },
      {
        segmentationFieldId: 18339,
        value: concatResults[3]?.reviews_average || 'reviews_average',
      },
      {
        segmentationFieldId: 18340,
        value: concatResults[4]?.reviews_average || 'reviews_average',
      },
      {
        segmentationFieldId: 18341,
        value: concatResults[5]?.reviews_average || 'reviews_average',
      },
      {
        segmentationFieldId: 18342,
        value: concatResults[6]?.reviews_average || 'reviews_average',
      },
      {
        segmentationFieldId: 18343,
        value: concatResults[7]?.reviews_average || 'reviews_average',
      },
      {
        segmentationFieldId: 18344,
        value: concatResults[0]?.reviews_count || 'reviews_count',
      },
      {
        segmentationFieldId: 18345,
        value: concatResults[1]?.reviews_count || 'reviews_count',
      },
      {
        segmentationFieldId: 18346,
        value: concatResults[2]?.reviews_count || 'reviews_count',
      },
      {
        segmentationFieldId: 18347,
        value: concatResults[3]?.reviews_count || 'reviews_count',
      },
      {
        segmentationFieldId: 18348,
        value: concatResults[4]?.reviews_count || 'reviews_count',
      },
      {
        segmentationFieldId: 18349,
        value: concatResults[5]?.reviews_count || 'reviews_count',
      },
      {
        segmentationFieldId: 18350,
        value: concatResults[6]?.reviews_count || 'reviews_count',
      },
      {
        segmentationFieldId: 18351,
        value: concatResults[7]?.reviews_count || 'reviews_count',
      },
      {
        segmentationFieldId: 18352,
        value: concatResults[0]?.alt_title || 'CutesyName1',
      },
      {
        segmentationFieldId: 18353,
        value: concatResults[1]?.alt_title || 'CutesyName2',
      },
      {
        segmentationFieldId: 18354,
        value: concatResults[2]?.alt_title || 'CutesyName3',
      },
      {
        segmentationFieldId: 18355,
        value: concatResults[3]?.alt_title || 'CutesyName4',
      },
      {
        segmentationFieldId: 18356,
        value: concatResults[4]?.alt_title || 'CutesyName5',
      },
      {
        segmentationFieldId: 18357,
        value: concatResults[5]?.alt_title || 'CutesyName6',
      },
      {
        segmentationFieldId: 18358,
        value: concatResults[6]?.alt_title || 'CutesyName7',
      },
      {
        segmentationFieldId: 18359,
        value: concatResults[7]?.alt_title || 'CutesyName8',
      },
      {
        segmentationFieldId: 6511,
        value: getUserAgeGroup() || 'agegroup',
      },
      {
        segmentationFieldId: 6513,
        value: quizAnswers[0] || 'SkinType',
      },
      {
        segmentationFieldId: 6514,
        value: quizAnswers[1] || 'SensitiveSkin',
      },
      {
        segmentationFieldId: 6515,
        value: getAllQuizAnswers() || 'skinconcerns',
      },
      {
        segmentationFieldId: 7559, //SkinGoals
        value: getAllSkinGoals() || 'SkinGoals',
      },
      /*{
          "segmentationFieldId": 10319, //gender
          "value": "gender"
        },*/
      /*{
          "segmentationFieldId": 10320, //routine
          "value": "routine"
        },*/
      {
        segmentationFieldId: 18269,
        value: quizAnswers[2] || 'SkinTone',
      },
      {
        segmentationFieldId: 18270,
        value: getSkinGoal()[0] || 'skincaregoal1',
      },
      {
        segmentationFieldId: 18271,
        value: getSkinGoal()[1] || 'skincaregoal2',
      },
      {
        segmentationFieldId: 18272,
        value: getSkinGoal()[2] || 'skincaregoal3',
      },
      /*{
          "segmentationFieldId": 18273, //breakouttype
          "value": "breakouttype"
        },*/
      {
        segmentationFieldId: 18323,
        value: getEyetarget() || 'eyetarget',
      },
    ];
  }

  return (
    <div className="SkinQuizEmailOptIn">
      {activeTab === 1 ? (
        <div className="ageConfirmation">
          <h2>When's your birthday?</h2>
          <p className="dek">
            Our skin has different needs in different life stages—we're here to
            help you achieve your best skin at any age.
          </p>

          <div className="selectWrapper">
            <div>
              <select
                id="birthYear"
                ref={userYearRef}
                onChange={handleDateInput.bind(this)}
              >
                <option selected disabled hidden>
                  YYYY
                </option>
                {years.map((i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <select
                id="birthMonth"
                ref={userMonthRef}
                onChange={handleDateInput.bind(this)}
              >
                <option selected disabled hidden>
                  MM
                </option>
                {months.map((i, ind) => {
                  return (
                    <option key={i} value={ind}>
                      {i}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            onClick={() => handleDateSubmit()}
            id="nextBtnAge"
            className={classNames(!dateInputted && 'inactiveBtn')}
            disabled={!dateInputted}
          >
            Next
          </button>
          <a
            onClick={() => handleActiveTab(2)}
            id="skipQuestion"
            className="skipQuestion"
          >
            I prefer to skip this question
          </a>
        </div>
      ) : (
        <div className="emailOptIn">
          <h2>What's the best email address to send your results to?</h2>
          <p className="dek">
            Plus get special deals, score early access to new products & more.
            We promise not to spam you.
          </p>
          <div className="form">
            <input type="email" placeholder="Email" ref={userEmailRef} />
            <p
              id="emailErrorMessage"
              style={{display: 'hidden', textAlign: 'left', color: 'red'}}
            ></p>
            <button
              id="submitEmail"
              // className={classNames(false && styles.inactiveBtn)}
              // disabled={checked}
              onClick={() => handleSubmit()}
            >
              Get My Result{' '}
            </button>
          </div>

          <p
            className="skipQuestion"
            onClick={() => handleShowSkinQuizResult()}
          >
            No thanks! Just show me my results now
          </p>

          <Text />
        </div>
      )}
    </div>
  );
};

export default SkinQuizAgeEmailOptIn;
