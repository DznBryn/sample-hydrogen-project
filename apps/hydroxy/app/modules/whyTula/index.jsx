import WhyTulaDesktop, { links as whyTulaDesktopStyles } from '../whyTulaDesktop';
import WhyTulaMobile, { links as whyTulaMobileStyles } from '../whyTulaMobile';

import styles from './styles.css';

export const links = () => {
    return [
        { rel: 'stylesheet', href: styles },
        ...whyTulaDesktopStyles(),
        ...whyTulaMobileStyles()
    ];
};

const WhyTula = ({content}) => {
    return (
        <div className="whyTulaPage minHeight">
            <WhyTulaDesktop content={content} />
            <WhyTulaMobile content={content} />
        </div>
    );
  };
  export default WhyTula;