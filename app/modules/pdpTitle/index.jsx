import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const PDPTitle = ({ title = { name: '', alt: '' }, exclusiveProductTextColor }) => {

  return <div className={'pdpTitle_container'}>
    <p className={'pdpSub_title'} style={{ color: exclusiveProductTextColor ? exclusiveProductTextColor : '' }}>{title.alt}</p>
    <h2 className={'pdpTitle'}>{title.name}</h2>
  </div>;
};

export default PDPTitle;