import {useEffect, useState} from 'react';
import PortableTextCustom from '../portableTextCustom';
import {appendScript} from '~/utils/functions/eventFunctions';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const SMSSignUp = ({content}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);

    const phoneNumber = document.getElementById('phonenumberfield').value;

    if (typeof window === 'object') {
      window
        .createPostscriptSubscriber(phoneNumber)
        .catch((error) =>
          console.log(
            'Not able to create postscript customer with the phone',
            phoneNumber,
            'Error',
            error,
          ),
        );
    }
  };

  useEffect(() => {
    if (window.document) {
      if (
        document.querySelector(
          'script[src=\'https://sdk.postscript.io/sdk.bundle.js?shopId=273330\']',
        )
      ) {
        let addPSScript = setInterval(() => {
          document
            .querySelector(
              'script[src=\'https://sdk.postscript.io/sdk.bundle.js?shopId=273330\']',
            )
            .remove();
          clearInterval(addPSScript);
        }, 200);
      }
      appendScript(
        'https://sdk.postscript.io/sdk.bundle.js?shopId=272499',
      )?.then(() => {});
    }
  }, []);

  useEffect(() => {
    if (typeof _ltk === 'undefined') {
      appendScript(
        'https://cdn.listrakbi.com/scripts/script.js?m=4aBATcUCndfp&v=1',
      )?.then(() => {
        return true;
      });
    }
  }, []);

  return (
    <div id="sms-signup" className={'container'}>
      <div id="sms-page" className={'content'}>
        <div
          className={'section'}
          style={{
            backgroundImage: `url(${
              content?.[0]?.backgroundImage.asset.url + '?auto=format'
            })`,
          }}
        >
          <p className={'backgroundText'}>{content?.[0]?.imageText}</p>
        </div>
        <div className={'section'}>
          <p className={'title'}>{content?.[0]?.headline}</p>
          <p className={'description'}>
            <PortableTextCustom value={content?.[0]?.subCopyRaw} />
          </p>
          <form className={'form'} onSubmit={handleSubmit}>
            <input
              id="phonenumberfield"
              type="tel"
              className={'input'}
              placeholder="XXX-XXX-XXXX"
              pattern="^(\()?\d{3}(\))?(-)?( )?\d{3}(-)?( )?\d{4}$"
              maxLength={15}
              required
            />
            <button id="btnSubmit" type="submit" className={'button'}>
              {content?.[0]?.ctaLabel}
            </button>
          </form>
          <div className={'note'}>
            <PortableTextCustom value={content?.[0]?.disclaimerRaw} />
          </div>
        </div>
      </div>

      <div
        className={'modalOverlay'}
        style={isModalOpen ? {display: 'block'} : {}}
      ></div>
      <div className={'modal'} style={isModalOpen ? {display: 'flex'} : {}}>
        <div className={'closeButton'} onClick={() => setIsModalOpen(false)}>
          +
        </div>
        <div className={'modalContent'}>
          <p className={'modalTitle'}>Thanks for Signing Up!</p>
          <p className={'modalDescription'}>
            You will receive a confirmation message shortly on your phone
          </p>
        </div>

        <div className={'horizontalLine'}></div>
        <button className={'modalButton'} onClick={() => setIsModalOpen(false)}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default SMSSignUp;
