import { useMatches } from '@remix-run/react';
import { getFormData } from '~/utils/functions/eventFunctions';

export function useCustomerState() {

  const [root] = useMatches();

  const { id, firstName, email, phone } = root.data.customer;

  return {
    id,
    firstName,
    email,
    phone,
    isLoggedIn: Boolean(id),
  };
}

export function useCustomerActions() {

  const logout = async () => {

    try {

      await fetch('/account/logout', { method: 'POST' });
      return { success: true };

    } catch (error) {

      return {
        error: error.toString(),
      };

    }

  };

  const login = async (email, password) => {

    try {

      const res = await fetch('/account/login', {
        method: 'POST',
        body: getFormData({ email, password }),
      });

      return (res.ok) ? 
        { success: true } : 
        { success: false, message: 'Account not found! Please try again or sign up.' };

    } catch (error) {

      return { error: error.toString() };

    }

  };

  const register = async (email, password, firstName, lastName, acceptsMarketing) => {

    try {

      const res = await fetch('/account/register', {
        method: 'POST',
        body: getFormData({ email, password, firstName, lastName, acceptsMarketing }),
      });

      return (res.ok) ? 
        { success: true } : 
        { success: false, message: 'An account already exists with this email address. Sign in to your existing account or sign up with a different email.' };

    } catch (error) {

      return { error: error.toString() };

    }

  };

  return {
    logout,
    login,
    register,
    // resetPassword,
  };


}