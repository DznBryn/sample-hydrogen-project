import Layouts from '~/layouts';
import Homepage, { links as homePageStyles } from '~/modules/homepage';

export const links = () => homePageStyles();

export default function Index() {

  return (
    <Layouts.MainNavFooter>
      <Homepage/>
    </Layouts.MainNavFooter>
  );
}