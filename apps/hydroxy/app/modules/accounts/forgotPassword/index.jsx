/* eslint-disable react/no-unescaped-entities */
import {Link, useFetcher} from '@remix-run/react';
import {useState} from 'react';
import {API_METHODS, FETCHER, MESSAGE_ERROR} from '~/utils/constants';
import styles from './styles.css';
import Button, {links as buttonStyles} from '~/modules/global/button';

export function links() {
  return [...buttonStyles(), {rel: 'stylesheet', href: styles}];
}
export default function ForgotPasswordForm() {
  const fetcher = useFetcher();
  const [email, setEmail] = useState('');
  const disabledButton =
    email === '' ||
    fetcher?.state === FETCHER.STATE.LOADING ||
    fetcher?.state === FETCHER.STATE.SUBMIT;

  return (
    <div className={'templateCustomersLogin'}>
      <div className={'formBox'}>
        {fetcher?.data?.status === 200 ? (
          <>
            <h1>Check your inbox!</h1>
            <p>
              We've just sent you an email - follow the reset instructions to
              change your password.
            </p>
          </>
        ) : (
          <>
            <h1>Forgot Password</h1>
            <p>
              Enter your email and we will send you a password reset link to
              your inbox.
            </p>
            <fetcher.Form
              action="/account/recover"
              method={API_METHODS.POST}
              className=""
            >
              <input
                className="inputText"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              {fetcher.data?.length > 0 &&
                fetcher.data.map(
                  (error, index) =>
                    error?.field?.includes('email') && (
                      <p className={'errorText'} key={index}>
                        {MESSAGE_ERROR.EMAIL[error.code] ?? error.message}
                      </p>
                    ),
                )}
              <Button type={'submit'} color={'blue'} disabled={disabledButton}>
                {fetcher?.state === FETCHER.STATE.SUBMIT
                  ? 'Submitting'
                  : fetcher?.state === FETCHER.STATE.LOADING
                  ? 'Loading'
                  : 'Reset'}
              </Button>
              <br />
              <Link to="/account/login">Go back to login</Link>
              {fetcher?.data?.status === 500 && (
                <p className={'errorText'}>
                  <strong>{fetcher?.data?.message}</strong>
                </p>
              )}
            </fetcher.Form>
          </>
        )}
      </div>
    </div>
  );
}
