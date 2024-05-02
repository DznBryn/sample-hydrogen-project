import styles from './styles.css';

//

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

//

const PreviewModeWaterMark = () => {
  return (
    <div className="previewModeWaterMark">
      <EyeIcon />

      <span>
        Viewing in <b>preview mode</b>
      </span>
    </div>
  );
};

export default PreviewModeWaterMark;

//

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none">
    <path
      fill="#000"
      d="M4 12.5c0-4.29 2.429-7.863 7.154-10.665l.379-.22.1-.045.083-.03.055-.014.082-.014.1-.011h.11l.111.014a.99.99 0 0 1 .11.026l.108.039.075.036.03.016c4.836 2.764 7.38 6.3 7.499 10.555L20 12.5c0 4.396-2.549 8.037-7.504 10.868a1 1 0 0 1-.992 0C6.549 20.537 4 16.896 4 12.5Zm5 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"
    />
  </svg>
);
