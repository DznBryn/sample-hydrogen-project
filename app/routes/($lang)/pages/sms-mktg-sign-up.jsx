import Layouts from '~/layouts';

import { getCMSContent } from '~/utils/functions/eventFunctions';
import { GET_SMS_SIGNUP } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import SmsSignUp, { links as smsSignUpStyles } from '~/modules/smsSignUp';

export const links = () => smsSignUpStyles();

export async function loader({context}) {

    const smsSignUpContent = await getCMSContent(context, GET_SMS_SIGNUP);
  
    return {
        smsSignUpContent,
    }
  }

export default function SmsSignUpComponent() {

    const { 
        smsSignUpContent
    } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <SmsSignUp content={smsSignUpContent} />
    </Layouts.MainNavFooter>
  );
}
