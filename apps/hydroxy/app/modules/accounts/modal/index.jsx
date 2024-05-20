import classNames from 'classnames/bind';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const ModalBody = ({isOpen = false, handleClose, children}) => (
  <>
    <div
      className="modalBackdrop"
      style={isOpen ? {display: 'flex'} : {display: 'none'}}
      onClick={handleClose}
    />

    <div
      className="modalBackground"
      style={isOpen ? {display: 'flex'} : {display: 'none'}}
    >
      <div onClick={handleClose} className="modalCloseButton">
        +
      </div>
      {children}
    </div>
  </>
);

const ModalContainer = ({message, title, children}) => (
  <div className="modalContent">
    <strong>{title}</strong>
    {message && <p>{message}</p>}

    {children}
  </div>
);

const ModalBtnContainer = ({children}) => (
  <div className="modalBtnContainer">{children}</div>
);

const ModalButton = ({message, styleType, action, ...rest}) => {
  let cx = classNames.bind(styles);

  return (
    <button
      {...rest}
      className={cx('defaultButton', styleType)}
      onClick={action}
    >
      {message}
    </button>
  );
};

const Modal = {
  ModalBody,
  ModalContainer,
  ModalBtnContainer,
  ModalButton,
};

export default Modal;
