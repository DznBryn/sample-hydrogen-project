import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const ProductBoxLoading = () => {
  return (
    <div className={'lines'}>
      <div className={'thumb pulse'}></div>
      <div className={'line pulse'}></div>
      <div className={'line pulse'}></div>
      <div className={'line pulse'}></div>
      <div className={'line pulse'}></div>
    </div>
  );
};
export default ProductBoxLoading;
