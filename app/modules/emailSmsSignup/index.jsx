import React from 'react';
import { submitFooterContact } from '~/utils/functions/listrakFunctions';
import getApiKeys from '~/utils/functions/getApiKeys';

// import RichText from 'frontend-ui/RichText';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const mockCommunications = {
  'name': 'Primary',
  'newsletterText': [
    {
      'children': [
        {
          'text': 'Take 15% off your first order and get exclusive offers and more.'
        }
      ],
      'type': 'h1'
    }
  ],
  'newsletterTextAfterEmailSubmit': [
    {
      'children': [
        {
          'text': 'Thanks! Look out for us in your inbox.'
        }
      ],
      'type': 'h1'
    }
  ],
  'newsletterSubtextAfterEmailSubmit': [
    {
      'children': [
        {
          'text': 'Optional: enter your bithday for a gift!'
        }
      ],
      'type': 'paragraph'
    }
  ],
  'newsletterFooterUS': 'For more information about our privacy practices, please visit our Privacy Policy and Notice of Financial Incentives for California residents.',
  'newsletterFooter': [
    {
      'type': 'paragraph',
      'children': [
        {
          'text': 'For more information about our privacy practices, please visit our Privacy Policy.'
        },
      ]
    }
  ],
  'smsFooterTextUS': 'By texting GLOW to 56529 you authorize TULA & its service providers to send you automated marketing texts to the provided number. No purchase required. Msg & data rates may apply. Text STOP to 56529 to opt-out of receiving messages. For more information please visit our Terms & Conditions & our Privacy Policy, and our Notice of Financial Incentives for California residents.',
  'smsFooterText': 'By texting GLOW to 56529 you authorize TULA & its service providers to send you automated marketing texts to the provided number. No purchase required. Msg & data rates may apply. Text STOP to 56529 to opt-out of receiving messages. For more information please visit our Terms & Conditions & our Privacy Policy.',
  'smsText1': [
    {
      'children': [
        {
          'text': 'get 15% off your next order & more smiles when you sign up for text alerts!'
        }
      ],
      'type': 'h1'
    }
  ],
  'smsText2': [
    {
      'children': [
        {
          'text': 'text GLOW to 56529'
        }
      ],
      'type': 'h1'
    }
  ],
  'newsletterButtonLabel': 'Get 15%'
};

const SuccessIcon = () => (
  <svg
    width={34}
    height={34}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.3334 17.7083L15.5834 21.9583L22.6667 13.4583"
      stroke="#47C6D9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 31.1666C24.8241 31.1666 31.1667 24.824 31.1667 17C31.1667 9.17595 24.8241 2.83331 17 2.83331C9.17601 2.83331 2.83337 9.17595 2.83337 17C2.83337 24.824 9.17601 31.1666 17 31.1666Z"
      stroke="#47C6D9"
      strokeWidth={2}
    />
  </svg>
);

const EmailSmsSignup = ({ communicationsConfig }) => {
  const communication = communicationsConfig?.name ? communicationsConfig : mockCommunications;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  const emailRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const headerBeforeEmailSubmit = React.useRef(null);
  const headerAfterEmailSubmit = React.useRef(null);

  function doFormat(x, pattern, mask) {
    var strippedValue = x.replace(/[^0-9]/g, '');
    var chars = strippedValue.split('');
    var count = 0;
    var formatted = '';
    for (var i = 0; i < pattern.length; i++) {
      const c = pattern[i];
      if (chars[count]) {
        if (/\*/.test(c)) {
          formatted += chars[count];
          count++;
        } else {
          formatted += c;
        }
      } else if (mask) {
        if (mask.split('')[i])
          formatted += mask.split('')[i];
      }
    }
    return formatted;
  }
  function format() {
    const val = doFormat(dateRef.current.value, dateRef.current.getAttribute('data-format'));
    dateRef.current.value = doFormat(dateRef.current.value, dateRef.current.getAttribute('data-format'), dateRef.current.getAttribute('data-mask'));
    if (dateRef.current.createTextRange) {
      var range = dateRef.current.createTextRange();
      range.move('character', val.length);
      range.select();
    } else if (dateRef.current.selectionStart) {
      dateRef.current.focus();
      dateRef.current.setSelectionRange(val.length, val.length);
    }
  }
  const handleClick = async () => {
    if (!emailRef.current.classList.contains('hide')) {
      if (emailRef.current.value.match(emailRegex)) {

        const isUK = getApiKeys().CURRENT_ENV.includes('UK');

        if (!isUK) {
          headerBeforeEmailSubmit.current.style.display = 'none';
          headerAfterEmailSubmit.current.style.display = 'block';

          setTimeout(() => {
            dateRef.current.classList.remove('hide');
            document.querySelector('#FooterNewsletterSubmit').innerText = 'get free gift!';
            dateRef.current.focus();
          }, 100);

        } else {
          const response = await submitFooterContact(emailRef.current.value);
          const isValidStatusCode = () => [200, 201].some(validStatus => validStatus === response.status);

          if (isValidStatusCode() || response.error === 'ERROR_UNSUBSCRIBED_EMAIL_ADDRESS') {
            document.querySelector('.email h1').classList.add('hide');
            document.querySelector('.formFootnote').classList.add('hide');
            document.querySelector('.emailButton').classList.add('hide');
            document.querySelector('.success_message').classList.remove('hide');
          }
        }

        emailRef.current.classList.add('hide');

        if (!document.querySelector('.error_message').classList.contains('hide')) {
          document.querySelector('.error_message').classList.add('hide');
        }
      } else {
        document.querySelector('.error_message').innerHTML = 'Please enter a valid Email';
        document.querySelector('.error_message').classList.remove('hide');
      }
    }
    if (!dateRef.current.classList.contains('hide')) {
      let cutoff = new Date();
      cutoff = cutoff.setFullYear(cutoff.getFullYear() - 16);
      const birthDate = new Date(dateRef.current.value);
      if (dateRef.current.value.match(dateRegex) && (birthDate < cutoff)) {
        const response = await submitFooterContact(emailRef.current.value, birthDate);
        const isValidStatusCode = () => [200, 201].some(validStatus => validStatus === response.status);
        if (isValidStatusCode() || response.error === 'ERROR_UNSUBSCRIBED_EMAIL_ADDRESS') {
          headerAfterEmailSubmit.current.style.display = 'none';
          dateRef.current.classList.add('hide');
          document.querySelector('.email h1').classList.add('hide');
          document.querySelector('.emailButton').classList.add('hide');
          document.querySelector('.formFootnote').classList.add('hide');
          document.querySelector('.success_message').classList.remove('hide');
          if (!document.querySelector('.error_message').classList.contains('hide')) {
            document.querySelector('.error_message').classList.add('hide');
          }
        }
        else {
          document.querySelector('.error_message').innerHTML = response.message;
          document.querySelector('.error_message').classList.remove('hide');
        }
      }
      else {
        if (!dateRef.current.value.match(dateRegex)) {
          document.querySelector('.error_message').innerHTML = 'Please enter a valid Birthdate';
        }
        if (!(birthDate < cutoff)) {
          document.querySelector('.error_message').innerHTML = 'Must be over 16 to subscribe';
        }
        document.querySelector('.error_message').classList.remove('hide');
      }
    }
  };

  return (
    <div className={'signupWrap'}>
      <div className={'email'} >
        <div ref={headerBeforeEmailSubmit} className={'beforeEmailSubmit'}>
          {/* <RichText source={communication.newsletterText} /> */}
        </div>
        <div ref={headerAfterEmailSubmit} className={'afterEmailSubmit'}>
          {/* <RichText source={communication.newsletterTextAfterEmailSubmit} />
          <RichText source={communication.newsletterSubtextAfterEmailSubmit} /> */}
        </div>
        <div className={'emailFormWrap'}>
          <form onSubmit={(e) => { e.preventDefault(); return false; }}>
            <input
              ref={emailRef}
              type="email"
              placeholder="enter your email"
              id="ltkSource"
              className={'emailText'} />
            <input
              ref={dateRef}
              type="text"
              className={'emailText hide'}
              name="birth_date"
              id="k_id_birth_date"
              placeholder="MM/DD/YYYY"
              autoComplete="bday"
              aria-label="MM/DD/YYYY"
              data-format="**/**/****"
              data-mask="MM/DD/YYYY"
              onKeyUp={format} />
            <button
              className={'emailButton'}
              id="FooterNewsletterSubmit"
              type="submit"
              onClick={() => handleClick()}>
              {communication.newsletterButtonLabel}
            </button>
          </form>
          <p className={'formFootnote'}>
            {/* <RichText source={communication.newsletterFooter} /> */}
          </p>
          <div className="submit_messages">
            <div className={'success_message hide'}><SuccessIcon />
              <h1>Thanks for signing up!</h1>
              <p>Look out for us in your inbox to receive your 15% off.</p>
            </div>
            <div className={'error_message hide'}></div>
          </div>
        </div>
      </div>
      <div className={'sms'} >
        <div className={'topText'}>
          {/* <RichText source={communication.smsText1} /> */}
        </div>
        <div className={'bottomText'}>
          {/* <RichText source={communication.smsText2} /> */}
        </div>
        <div className={'smsLegal'}>
          {/* <RichText source={communication.smsFooterText} /> */}
        </div>
      </div>
    </div>
  );
};
export default EmailSmsSignup;
