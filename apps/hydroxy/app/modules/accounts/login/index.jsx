import React, {useRef, useState} from 'react';
import {useFetcher} from 'react-router-dom';
import styles from './styles.css';
import Button, {links as buttonStyles} from '~/modules/global/button';
import {Link} from '@remix-run/react';
import {API_METHODS} from '~/utils/constants';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...buttonStyles()];
};

export default function LoginForm() {
  const fetcher = useFetcher();
  const LOGIN_BUTTON_TEXT = 'Sign In';
  const FORGOT_PASSWORD = 'Forgot your password?';
  const REGISTER_LINK_TEXT = 'Create Account';

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const disableLoginButton =
    loginForm.email === '' ||
    loginForm.password === '' ||
    fetcher.state === 'submitting';

  const passwordRef = useRef(null);

  function togglePassword() {
    const curValue = passwordRef.current.getAttribute('type');
    const label = passwordRef.current.parentElement.querySelector('span');

    passwordRef.current.setAttribute(
      'type',
      curValue === 'text' ? 'password' : 'text',
    );
    label.innerHTML = label.innerHTML === 'hide' ? 'show' : 'hide';
  }

  return (
    <div className="alllogin">
      <div className="templateCustomersLogin">
        <div className="formBox">
          <h1>WELCOME TO TULA</h1>
          <fetcher.Form method={API_METHODS.POST} action="/account/login">
            <input
              id="email"
              className={
                fetcher.data?.[0]?.code ? 'inputText invalid' : 'inputText'
              }
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              aria-label="Email address"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  [e.target.name]: e.target.value,
                })
              }
              autoFocus
            />
            <div
              className={
                fetcher.data?.[0]?.code
                  ? 'login_password_input invalid'
                  : 'login_password_input'
              }
            >
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                minLength={8}
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    [e.target.name]: e.target.value,
                  })
                }
                required={fetcher.data?.[0]?.code}
                autoFocus
              />
              <span onClick={togglePassword}>show</span>
            </div>
            <div className="flexWrapper">
              <div className="row">
                <Link to={'/account/recover'}>{FORGOT_PASSWORD}</Link>
                <Link to={'/account/register'}>{REGISTER_LINK_TEXT}</Link>
              </div>
            </div>
            {fetcher.data &&
              fetcher.data?.length > 0 &&
              fetcher.data.map(
                (error, index) =>
                  !error.field && (
                    <p className={'errorText'} key={index}>
                      The email address and password you entered don`t match any
                      TULA account. Please try again.
                    </p>
                  ),
              )}
            <Button type="submit" color="blue" disabled={disableLoginButton}>
              {LOGIN_BUTTON_TEXT}
            </Button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
