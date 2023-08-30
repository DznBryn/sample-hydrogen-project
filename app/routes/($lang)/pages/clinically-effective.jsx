import Layouts from '~/layouts';

import ClinicallyEffective, { links as clinicallyEffectiveStyles } from '~/modules/clinicallyEffective';

export const links = () => clinicallyEffectiveStyles();

export default function clinicallyEffectiveComponent() {
    console.log("devdrew clinicallyEffective jsx")
  return (
    <Layouts.MainNavFooter>
       <ClinicallyEffective />
    </Layouts.MainNavFooter>
  );
}
