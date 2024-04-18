import PortableTextCustom from '../portableTextCustom';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const TermsCondition = ({content}) => {
  return (
    <section id="terms-conditions" className={'section terms'}>
      <div className={'container'}>
        <PortableTextCustom value={content?.[0]?.ContentRaw} />
      </div>
    </section>
  );
};

export default TermsCondition;
