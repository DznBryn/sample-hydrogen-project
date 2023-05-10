import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const LoadingSkeleton = ({width, height, style = {}}) => {
  return (
    <div 
      className='skeleton loading'
      style={{...style, width: width, height: height}}
    >
    </div>
  );
};

export default LoadingSkeleton;