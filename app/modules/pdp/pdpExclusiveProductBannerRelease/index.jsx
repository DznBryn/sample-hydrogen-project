import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const PDPExclusiveProductBannerRelease = ({ content }) => {
  const { message, slug, messageColor, background } = content;

  return (
    <a className={'ExclusiveBannerContainer'} href={slug} style={{ background: background }}>
      <h1 style={{ color: messageColor }}>{message}</h1>
      <Arrow color={messageColor} />
    </a>
  );
};

export default PDPExclusiveProductBannerRelease;

const Arrow = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    fill="none"
  >
    <path
      d="M8.083 11.81a1.05 1.05 0 0 1-.24-.723c.007-.283.094-.524.261-.723l2.354-2.819H1.167c-.236 0-.434-.096-.594-.287s-.24-.428-.239-.71.08-.52.24-.711a.74.74 0 0 1 .593-.286h9.292L8.083 2.705c-.167-.2-.25-.437-.25-.711a1.07 1.07 0 0 1 .25-.71c.167-.2.365-.299.594-.299s.427.1.593.299l3.812 4.565c.083.1.143.208.178.324s.052.241.052.374-.018.258-.053.374a.92.92 0 0 1-.177.324l-3.833 4.59c-.153.183-.344.274-.573.274s-.427-.1-.594-.299z"
      fill={color}
    />
  </svg>
);

