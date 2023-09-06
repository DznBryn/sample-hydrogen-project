import styles from './styles.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
  ];
}
export default function LoadingSkeleton({ width, height, style = {} }) {
  return (
    <div
      className={'skeleton loading'}
      style={{ ...style, width: width, height: height }}
    >
    </div>
  );
}
