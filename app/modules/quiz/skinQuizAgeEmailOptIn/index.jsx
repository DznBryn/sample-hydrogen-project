/* eslint-disable react/no-unescaped-entities */
import {useRef, useState} from 'react';
import classNames from 'classnames';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const SkinQuizAgeEmailOptIn = ({setRangeAge}) => {
  const [dateInputted, setDateInputted] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const userEmailRef = useRef(null);

  const userBirthday = useRef({});
  const userYearRef = useRef(null);
  const userMonthRef = useRef(null);

  setRangeAge ??= function () {};

  //eslint-disable-next-line
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  function handleActiveTab(tab) {
    const rangeAge = getUserAgeGroup();
    if (rangeAge === null) {
      setRangeAge('no-age');
    } else {
      setRangeAge(
        rangeAge < 20
          ? 'teens'
          : `${rangeAge > 40 ? '50\'s+' : rangeAge + '\'s'}`,
      );
    }

    setActiveTab(tab);
  }

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  let years = [];
  let months = [
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

  function handleSubmit() {
    const userEmail = userEmailRef.current.value;
    const errorMessage = 'Please enter a valid Email';
    const emailIsNotValid = !userEmail.match(emailRegex);

    if (emailIsNotValid) return handleShowErrorMessage(errorMessage);

    handleShowSkinQuizResult();
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

  const getUserAgeGroup = () => {
    const userAge =
      year -
      parseInt(userBirthday.current.year) -
      (month - parseInt(userBirthday.current.month) < 0 ? 1 : 0);
    return isNaN(userAge) ? null : (Math.floor(userAge / 10) * 10).toString();
  };

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
            className={classNames(!dateInputted && styles.inactiveBtn)}
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

            <div className="infoText">
              By registering, I agree to receive emails from TULA Skincare. I
              have read and agree to the TULA Skincare{' '}
              <a href="/pages/terms-conditions" target="_blank">
                Terms & Conditions
              </a>{' '}
              and TULA Skincare{' '}
              <a href="/pages/privacy-policy" target="_blank">
                Privacy Policy
              </a>
              .
            </div>

            <p
              id="emailErrorMessage"
              style={{display: 'hidden', textAlign: 'left', color: 'red'}}
            ></p>

            <button
              id="submitEmail"
              // className={classNames(false && styles.inactiveBtn)}
              // className={classNames(checked && styles.inactiveBtn)}
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
        </div>
      )}
    </div>
  );
};

export default SkinQuizAgeEmailOptIn;
