import classnames from 'classnames';
import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const Button = ({ children, classes, type = 'default', ...props }) => {
  return (
    <button
      {...props}
      className={`${type === 'outline'
        ? classnames('default_btn', 'default_btn_outline')
        : classnames('default_btn')
      } ${classes}`}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
