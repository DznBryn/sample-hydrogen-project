import React from 'react';
import styles from './styles.css';

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}
const Button = (props) => {
  if (props.color === 'white') {
    return (
      <button
        className={'tulaWhiteButton'}
        type={props.type}
        onClick={props.onclk}
      >
        {props.children}
      </button>
    );
  } else if (props.color === 'transparent') {
    return (
      <button
        className={'tulaTsptButton'}
        type={props.type}
        onClick={props.onclk}
      >
        {props.children}
      </button>
    );
  } else if (props.disabled === true) {
    return (
      <button
        className={'tulaBlueButton'}
        type={props.type}
        onClick={props.onclk}
        disabled
      >
        {props.children}
      </button>
    );
  } else {
    return (
      <button
        className={'tulaBlueButton'}
        type={props.type}
        onClick={props.onclk}
      >
        {props.children}
      </button>
    );
  }
};
export default Button;
