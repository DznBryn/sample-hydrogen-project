import Layouts from '~/layouts';

import { getCMSContent } from '~/utils/functions/eventFunctions';
import { GET_AUTO_DELIVERY } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import AutoDelivery, { links as autoDeliveryStyles } from '~/modules/autoDelivery';

export const links = () => autoDeliveryStyles();

export async function loader({context}) {

    const autoDeliveryContent = await getCMSContent(context, GET_AUTO_DELIVERY);
  
    return {
        autoDeliveryContent,
    };
  }

export default function AutoDeliveryComponent() {

    const { 
        autoDeliveryContent
    } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <AutoDelivery content={autoDeliveryContent} />
    </Layouts.MainNavFooter>
  );
}
