import { Link, useFetcher } from '@remix-run/react';
import styles from './styles.css';
import getApiKeys from '~/utils/functions/getApiKeys';
import Button, { links as buttonStyles } from '~/modules/global/button';
import { useRef, useState } from 'react';
import { API_METHODS, FETCHER, MESSAGE_ERROR } from '~/utils/constants';

export function links() {
  return [{ rel: 'stylesheet', href: styles }, ...buttonStyles()];
}
export default function Register() {
  const fetcher = useFetcher();
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: ''
  });
  const disableLoginButton = registerForm.email === '' || registerForm.password === '' || fetcher?.state === FETCHER.STATE.SUBMIT || fetcher?.state === FETCHER.STATE.LOADING;

  return (
    <div>
      <div className="templateCustomersLogin">
        <Header />
        <div className='formBox'>
          <fetcher.Form
            method={API_METHODS.POST}
            noValidate
            action='/account/register'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <input
              className='inputText'
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="firstName"
              required
              placeholder="First Name"
              aria-label="First Name"
              autoFocus
            />
            <input
              className='inputText'
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="lastName"
              placeholder="Last Name"
              aria-label="Last Name"
              autoFocus
            />
            <div>
              <input
                className='inputText'
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email@example.com"
                aria-label="Email address"
                autoFocus
                value={registerForm.email}
                onChange={(e) => setRegisterForm({
                  ...registerForm,
                  [e.target.name]: e.target.value
                })}
              />
              {
                fetcher.data && fetcher.data?.length > 0 && fetcher.data.map((error, index) => error?.field?.includes('email') && (
                  <p className={'errorText'} key={index}>
                    {
                      MESSAGE_ERROR.EMAIL[error.code] ?? error.message
                    }
                  </p>
                ))
              }

            </div>

            <div>
              <input
                className={fetcher.data && fetcher.data?.length > 0 && fetcher.data?.[0]?.field?.includes('password') ? 'inputText inputTextError' : 'inputText'}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                minLength={8}
                required
                autoFocus
                value={registerForm.password}
                onChange={(e) => setRegisterForm({
                  ...registerForm,
                  [e.target.name]: e.target.value
                })}
              />
              {
                fetcher.data && fetcher.data?.length > 0 && fetcher.data.map((error, index) => error?.field?.includes('password') && (
                  <p className={'errorText'} key={index}>
                    {
                      MESSAGE_ERROR.PASSWORD[error.code] ?? error.message
                    }
                  </p>
                ))
              }
            </div>
            {
              (getApiKeys().CURRENT_ENV.includes('UK')) ? (
                <p className={'infoText'}>
                  You are registering as a user of Tula UK for which <a href="/pages/privacy-policy">Tula Life, Inc.</a> is the data controller.
                  By registering for an account, you acknowledge: You would like to receive emails, offers, and coupons from TULA UK.
                  You can exercise your <a href="/pages/privacy-policy#content-section-nine">Data Protection Rights</a> or
                  change your preferences and subscriptions by <a href="/pages/privacy-policy#content-section-fifteen">clicking here.</a> You are at least
                  16 and have read and agree to the <a href="/pages/terms-conditions">Tula Terms & Conditions</a> and <a href="/pages/privacy-policy">Privacy Policy.</a>
                  To better customize our communications to your interests, we will <a href="/pages/privacy-policy#content-section-fifteen">combine the data</a> you are providing
                  above with other data we may have collected about you from multiple sources and third parties.
                </p>
              ) : (
                <p className={'infoTextAlt'}>
                  By registering, I agree to receive emails from TULA Skincare. I have read and agree to the TULA Skincare <a href="/pages/terms-conditions">Terms & Conditions</a> and TULA Skincare <a href="/pages/privacy-policy">Privacy Policy</a>.
                </p>
              )
            }
            <Button type="submit" color="blue" disabled={disableLoginButton} >
              {
                fetcher?.state === FETCHER.STATE.SUBMIT ? 'Submitting' :
                  fetcher?.state === FETCHER.STATE.LOADING ? 'Loading' :
                    'Register'
              }
            </Button>
          </fetcher.Form>
          <p className='text-center'>
            Already have an account?{' '}
            <Link to="/account/login" alt="Login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const Header = () => {

  if (getApiKeys().FEATURE_FLAGS.LOYALTY) {

    return (
      <>
        <div className={'header__banner'}>
          <div>TULA 24-7 REWARDS</div>
          <p>Start earning points online and in store, choose your favorite rewards, and gain exclusive access</p>
          <Icons.ArrowDown />
        </div>
        <div className={'header__title'}>Create an account</div>
        <p className={'header__copy'}>earn rewards, check your orders & manage auto-deliveries in one convenient place</p>
      </>
    );

  } else {

    return (
      <>
        <div className={'header__title'}>Create an account</div>
        <p className={'header__copy'}>easily check your orders & manage <br />auto-deliveries in one convenient place</p>
      </>
    );

  }

};

const Icons = {
  ArrowDown: () => <svg width={23} height={13} viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.83301 1.875L11.4997 11.5417L21.1663 1.875" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

export function RegisterForm({ fetcher = useFetcher() }) {

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: ''
  });
  const disableLoginButton = registerForm.email === '' || registerForm.password === '' || fetcher?.state === FETCHER.STATE.SUBMIT || fetcher?.state === FETCHER.STATE.LOADING;

  const passwordRef = useRef(null);

  function togglePassword() {
    const curValue = passwordRef.current.getAttribute('type');
    const label = passwordRef.current.parentElement.querySelector('span');

    passwordRef.current.setAttribute('type', (curValue === 'text') ? 'password' : 'text');
    label.innerHTML = (label.innerHTML === 'hide') ? 'show' : 'hide';
  }

  return (
    <fetcher.Form
      method={API_METHODS.POST}
      noValidate
      action='/account/register'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <input type="hidden" name="form_location" value={'sliderAccount'} />
      <input
        className='input'
        id="firstName"
        name="firstName"
        type="text"
        autoComplete="firstName"
        required
        placeholder="First Name*"
        aria-label="First Name"
        autoFocus
      />
      <input
        className='input'
        id="lastName"
        name="lastName"
        type="text"
        autoComplete="lastName"
        placeholder="Last Name*"
        aria-label="Last Name"
        autoFocus
      />
      <div>
        <input
          className='input'
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email*"
          aria-label="Email address"
          autoFocus
          value={registerForm.email}
          onChange={(e) => setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
          })}
        />
        {
          fetcher.data && fetcher.data?.length > 0 && fetcher.data.map((error, index) => error?.field?.includes('email') && (
            <p className={'errorText'} key={index}>
              {
                MESSAGE_ERROR.EMAIL[error.code] ?? error.message
              }
            </p>
          ))
        }

      </div>

      <div className='input'>
        <input
          className={'passwordInput'}
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password*"
          aria-label="Password"
          minLength={5}
          required
          autoFocus
          value={registerForm.password}
          onChange={(e) => setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
          })}
        />
        <span onClick={togglePassword}>show</span>
      </div>
      {
        fetcher.data && fetcher.data?.length > 0 && fetcher.data.map((error, index) => error?.field?.includes('password') && (
          <p className={'errorText'} key={index}>
            {
              MESSAGE_ERROR.PASSWORD[error.code] ?? error.message
            }
          </p>
        ))
      }
      <span className='smallText'>Password must be at least 5 characters</span>
      <Button type="submit" className={`button ${disableLoginButton && 'disabledButton'}`} color="blue" disabled={disableLoginButton} >
        {
          fetcher?.state === FETCHER.STATE.SUBMIT ? 'Submitting' :
            fetcher?.state === FETCHER.STATE.LOADING ? 'Loading' :
              'REGISTER'
        }
      </Button>
      {
        (getApiKeys().CURRENT_ENV.includes('UK')) ? (
          <p className={'infoText'}>
            You are registering as a user of Tula UK for which <a href="/pages/privacy-policy">Tula Life, Inc.</a> is the data controller.
            By registering for an account, you acknowledge: You would like to receive emails, offers, and coupons from TULA UK.
            You can exercise your <a href="/pages/privacy-policy#content-section-nine">Data Protection Rights</a> or
            change your preferences and subscriptions by <a href="/pages/privacy-policy#content-section-fifteen">clicking here.</a> You are at least
            16 and have read and agree to the <a href="/pages/terms-conditions">Tula Terms & Conditions</a> and <a href="/pages/privacy-policy">Privacy Policy.</a>
            To better customize our communications to your interests, we will <a href="/pages/privacy-policy#content-section-fifteen">combine the data</a> you are providing
            above with other data we may have collected about you from multiple sources and third parties.
          </p>
        ) : (
          <p className={'infoTextAlt'}>
            By registering, I agree to receive emails from TULA Skincare. I have read and agree to the TULA Skincare <a href="/pages/terms-conditions">Terms & Conditions</a> and TULA Skincare <a href="/pages/privacy-policy">Privacy Policy</a>.
          </p>
        )
      }

    </fetcher.Form>
  );
}
