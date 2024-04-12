import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const ModalGeneric = ({ isOpen = false, handleClose, children }) => {
  return (
    <>
      <div
        className={'backgroundOpacity'}
        style={isOpen ? { display: 'flex' } : { display: 'none' }}
      >
      </div>

      <div
        className={'modal'}
        style={isOpen ? { display: 'block' } : { display: 'none' }}
      >
        <div onClick={handleClose} className={'closeButton'}>+</div>
        {children}
      </div>
    </>
  );
};

export default ModalGeneric;