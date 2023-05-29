import React, { useState, useEffect } from 'react';
// import { PortableText } from '@portabletext/react';
import ModalGeneric from '~/modules/modalGeneric';
import { Link } from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const AnnouncementHeader = ({ announcementMessages, fontColor }) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    // announcementText = [],
    announcementUrl,
    emoji,
    shouldOpenModal,
    modalLinkText,
    // modalContent,
    shouldOpenLink,
    linkToGo,
  } = announcementMessages[index];

  // const getFirstPromoRichText = (messages) => messages[0] ? [messages[0]] : [];

  const nextMessage = () => {
    if (announcementMessages[index + 1]) setIndex(index + 1);
    else setIndex(0);
  };

  const handleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (!isModalOpen) {
      const timeout = setTimeout(nextMessage, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isModalOpen, index, announcementMessages]);

  return (
    <React.Fragment>
      <div key={index} className={'messageBox'}>
        <a className={'messageLink'} style={{ fontColor: fontColor }} href={announcementUrl}>
          {/* <PortableText value={getFirstPromoRichText(announcementText)} /> */}
          {emoji && (
            <img src={emoji.src} />
          )}
        </a>
        {shouldOpenModal && (
          <p
            className={'seeDetailsMessage'}
            onClick={handleModal}
            style={{ color: fontColor }}
          >
            {modalLinkText}
          </p>
        )}
        {shouldOpenLink && (
          <Link
            to={linkToGo}
            className={'seeDetailsMessage'}
            style={{ color: fontColor }}
          >
            {modalLinkText}
          </Link>
        )}
      </div>

      <ModalGeneric isOpen={isModalOpen} handleClose={handleModal}>
        {/* <PortableText value={modalContent} /> */}
      </ModalGeneric>
    </React.Fragment>
  );
};

export default AnnouncementHeader;