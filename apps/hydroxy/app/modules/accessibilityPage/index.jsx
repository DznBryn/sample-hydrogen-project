import getApiKeys from '~/utils/functions/getApiKeys';
import styles from './styles.css';

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
  };
  

const AccessibilityPage = () => {
  return (
    <div className={'accessibilityPage minHeight'}>
      <iframe src={getApiKeys().AUDIOEYE_URL} title="Accessibility Statement"></iframe> 
    </div>
  );
};
export default AccessibilityPage;