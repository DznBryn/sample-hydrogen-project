import { Link, useFetcher } from '@remix-run/react';
import { useState } from 'react';
import { API_METHODS, FETCHER} from '~/utils/constants';
import styles from './styles.css';
import Button, { links as buttonStyles } from '~/modules/global/button';

export function links() {
  return [
    ...buttonStyles(),
    { rel: 'stylesheet', href: styles }
  ];
}
export default function ResetPasswordForm() {
  const fetcher = useFetcher();
  const [auth, setAuth] = useState({
    password: '',
    confirmPassword: ''
  });
  const disabledButton = (auth.password === '' && auth.confirmPassword === '') || fetcher?.state === FETCHER.STATE.LOADING || fetcher?.state === FETCHER.STATE.SUBMIT;

  return (
    <section className={'reset'}>
      <div className={'formBox'}>
        <h1>Reset password</h1>
        <fetcher.Form
          method={API_METHODS.POST}
          noValidate
          className=''
        >
          <label>
            New password
            <input
              className='inputText'
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              required
              placeholder="******"
              aria-label="New Password"
              value={auth.password}
              onChange={(e) => setAuth({
                ...auth,
                [e.target.name]: e.target.value
              })}
              autoFocus
            />
          </label>
          <label>
            Confirm new password
            <input
              className='inputText'
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="password"
              required
              placeholder="******"
              aria-label="Confirm Password"
              value={auth.confirmPassword}
              onChange={(e) => setAuth({
                ...auth,
                [e.target.name]: e.target.value
              })}
              autoFocus
            />
          </label>
          {fetcher?.data?.message && (
            <p className={'errorText'} >
              <strong>
                {fetcher?.data?.message}
              </strong>
            </p>
          )}
          <Button type={'submit'} color={'blue'} disabled={disabledButton}>
            {
              fetcher?.state === FETCHER.STATE.SUBMIT ? 'Submitting' :
                fetcher?.state === FETCHER.STATE.LOADING ? 'Loading' :
                  'Reset Password'
            }
          </Button>
          <p>
            Already have an account?{' '}
            <Link to='/account/login'>Login</Link>
          </p>
        </fetcher.Form>
      </div>
    </section>

  );
}
