import Layouts from '~/layouts';

import Clean, { links as cleanStyles } from '~/modules/clean';

export const links = () => cleanStyles();

export default function CleanComponent() {
    console.log("devdrew Clean");

  return (
    <Layouts.MainNavFooter>
       <Clean />
    </Layouts.MainNavFooter>
  );
}
