import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};


const PDPConditions = ({ suitableFor }) => {
  return suitableFor && (
    <p className={'conditions_container'}>
      <b>suitable for: </b>
      {suitableFor.split(' ').map((value) => <span key={value} className={'condition_values'}>{value} </span>)}
    </p>
  ) || '';
};

export default PDPConditions;