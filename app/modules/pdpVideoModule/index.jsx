import { useEffect, useRef } from 'react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const PDPVideoModule = ({ shouldVideoShow = true, handleShowVideo = null, videoURL = '' }) => {
  const videoID = useRef(null);

  useEffect(() => {
    if (videoURL !== '' && videoID.current === null) {
      videoID.current = videoURL.split('/')[videoURL.split('/').length - 1];
    }
  }, []);

  return (videoID.current) && (
    <div className={(shouldVideoShow ? 'video_container open_module' : 'video_container')}>
      <div className={'pdpvideo_container'}>
        <div className={'close_wrapper'} >
          <div className={'close_icon__container'} onClick={handleShowVideo}>
            <svg role="img" width="21" height="21"><title>Close Video Pop Up</title><path d="M2.612.134l7.739 7.739L18.09.134l2.24 2.24-7.738 7.739 7.738 7.739-2.24 2.24-7.739-7.739-7.739 7.739-2.24-2.24 7.739-7.739L.372 2.375l2.24-2.24z" /></svg>
          </div>
        </div>
        <div className={'pdp_video'}>
          <iframe src={'https://player.vimeo.com/video/' + videoID.current + '?h=015aec3995&autoplay=' + (shouldVideoShow ? '1' : '0') + '&loop=1&title=0&byline=0&portrait=0'} allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
      </div>
    </div>
  );
};

export default PDPVideoModule;