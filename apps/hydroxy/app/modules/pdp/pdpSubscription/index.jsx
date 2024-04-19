import {useRef, useState} from 'react';
import Badges, {links as badgesStyles} from '../../badges';
import ModalGeneric, {links as modalGenericStyles} from '../../modalGeneric';
import PortableTextCustom from '../../portableTextCustom';
import {useStore} from '~/hooks/useStore';
import classnames from 'classnames';

import styles from './styles.css';
import useFeatureFlags from '~/hooks/useFeatureFlags';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...modalGenericStyles(),
    ...badgesStyles(),
  ];
};

const DEFAULT_SELLING_PLAN_NAME = '3 months';

const PDPSubscription = ({classes, sellingPlans, autoDeliveryInfo}) => {
  const {store, setStore} = useStore();
  const {SHOW_LOYALTY} = useFeatureFlags();
  const defaultSellingPlanId = getDefaultSellingPlan();
  const recommendedSellingPlanId =
    sellingPlans.RecommendedSellingPlan || defaultSellingPlanId;

  const sellingOption = useRef(0);
  const sellingPlanOptionValue = useRef(
    hasSellingPlan() ? recommendedSellingPlanId : defaultSellingPlanId,
  );
  const sellingPlanId = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSellingPlanName = (sellingPlan) => {
    const recommendedLabel = `${sellingPlan.name} (recommended)`;

    if (hasSellingPlan()) {
      if (sellingPlan.sellingPlanID === recommendedSellingPlanId) {
        return recommendedLabel;
      }
    } else {
      if (sellingPlan.sellingPlanID === defaultSellingPlanId) {
        return recommendedLabel;
      }
    }

    return sellingPlan.name;
  };

  function getDefaultSellingPlan() {
    return (
      sellingPlans.SellingPlans.find(
        (data) => data.name.toLowerCase() === DEFAULT_SELLING_PLAN_NAME,
      )?.sellingPlanID || 10092590 // 3 Month ID
    );
  }

  function hasSellingPlan() {
    return sellingPlans.SellingPlans.some(
      (x) => x.sellingPlanID === recommendedSellingPlanId,
    );
  }

  const handleSellingOption = (option, id) => {
    if (option === 1) {
      setStore({
        ...store,
        productPage: {
          ...store?.productPage,
          addToCart: {
            ...store?.productPage?.addToCart,
            ['selling_plan_id']: id,
            discount: sellingPlans.AutoDeliveryDiscount,
          },
        },
      });
    } else {
      setStore({
        ...store,
        productPage: {
          ...store?.productPage,
          addToCart: {
            ...store?.productPage?.addToCart,
            ['selling_plan_id']: 0,
            discount: 0,
          },
        },
      });
    }

    return (sellingOption.current = option);
  };

  const handleSellingPlanOption = (id) => {
    sellingPlanOptionValue.current = id;
    if (sellingOption.current === 1) {
      return setStore({
        ...store,
        productPage: {
          ...store?.productPage,
          addToCart: {
            ...store?.productPage?.addToCart,
            ['selling_plan_id']: id,
          },
        },
      });
    }
  };

  const handleModal = () => setIsModalOpen(!isModalOpen);

  return (
    (sellingPlans && (
      <form className={classnames('form__subscription', classes)}>
        <div className={'form__group'}>
          <div className={'form__header'}>
            <label
              htmlFor={'one-time'}
              className={sellingOption.current === 0 ? 'checked' : null}
              onClick={() => handleSellingOption(0)}
            >
              One time purchase{' '}
              <input
                type="radio"
                id="one-time"
                name="selling-option"
                value={0}
                checked={sellingOption.current === 0}
                readOnly
              />
              <span className={'checkmark'}></span>
            </label>
          </div>
        </div>
        <div className={'form__group'}>
          <div className={'form__header'}>
            {sellingPlans.AutoDeliveryMessage?.limitedTimeBadge &&
            sellingPlans.AutoDeliveryMessage.limitedTimeBadge ? (
              <label
                htmlFor={'auto'}
                onClick={() =>
                  handleSellingOption(1, sellingPlanId.current.value)
                }
              >
                <span className={'offerContainer'}>
                  <b>
                    <Badges
                      message="limited time"
                      type="limited"
                      color="primary"
                    />
                  </b>
                  &nbsp;
                  <b>{sellingPlans.AutoDeliveryMessage?.message[0]}</b>&nbsp;
                  {sellingPlans.AutoDeliveryMessage?.message[1] && (
                    <small>{`(${sellingPlans.AutoDeliveryMessage?.message[1]})`}</small>
                  )}
                </span>
                <input
                  type="radio"
                  id="auto"
                  name="selling-option"
                  value={1}
                  checked={sellingOption.current === 1}
                  readOnly
                />
                <span className={'checkmark'}></span>
              </label>
            ) : (
              <label
                htmlFor={'auto'}
                className={sellingOption.current === 1 ? 'checked' : null}
                onClick={() =>
                  handleSellingOption(1, sellingPlanId.current.value)
                }
              >
                <b>Auto-delivery:</b> {sellingPlans.AutoDeliveryDiscount}% off &
                free shipping{' '}
                <input
                  type="radio"
                  id="auto"
                  name="selling-option"
                  value={1}
                  checked={sellingOption.current === 1}
                  readOnly
                />
                <span className={'checkmark'}></span>
              </label>
            )}
            {Boolean(autoDeliveryInfo.disableInfomessage) && (
              <>
                <span className={'iconQuestionContainer'} onClick={handleModal}>
                  <IconQuestion />
                </span>
                <ModalGeneric isOpen={isModalOpen} handleClose={handleModal}>
                  <PortableTextCustom value={autoDeliveryInfo.messageRaw} />
                </ModalGeneric>
              </>
            )}
            {SHOW_LOYALTY && (
              <div className={'loyaltyCopy'}>
                <span>+ 300 bonus points!</span> <RoundStarIcon />
              </div>
            )}
          </div>
          <div className={'form__content_container'}>
            <span>
              Ship every: &nbsp;
              <select
                ref={sellingPlanId}
                value={sellingPlanOptionValue.current}
                onChange={() =>
                  handleSellingPlanOption(sellingPlanId.current.value)
                }
                onClick={() =>
                  handleSellingOption(1, sellingPlanId.current.value)
                }
              >
                {sellingPlans.SellingPlans.map((plan) => (
                  <option key={plan.sellingPlanID} value={plan.sellingPlanID}>
                    {getSellingPlanName(plan)}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>
      </form>
    )) ||
    null
  );
};

const RoundStarIcon = () => (
  <svg
    width={12}
    height={16}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7Z"
      fill="#47C6D9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 12.95C10.2861 12.95 12.95 10.2861 12.95 7C12.95 3.71391 10.2861 1.05 7 1.05C3.71391 1.05 1.05 3.71391 1.05 7C1.05 10.2861 3.71391 12.95 7 12.95ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
      fill="#B3E5ED"
    />
    <path
      d="M7.00022 3.11133L7.91826 6.08217H10.8891L8.48564 7.91826L9.40368 10.8891L7.00022 9.05302L4.59675 10.8891L5.51479 7.91826L3.11133 6.08217H6.08217L7.00022 3.11133Z"
      fill="white"
    />
  </svg>
);

const IconQuestion = ({color = '#48C6D9'}) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 0C5.14332 0 3.3628 0.73773 2.0503 2.0503C0.7378 3.36287 0 5.14346 0 7C0 8.85654 0.73773 10.6372 2.0503 11.9497C3.36287 13.2622 5.14346 14 7 14C8.85654 14 10.6372 13.2623 11.9497 11.9497C13.2622 10.6371 14 8.85654 14 7C14 5.14346 13.2623 3.3628 11.9497 2.0503C10.6371 0.7378 8.85654 0 7 0V0ZM7 10.6957L6.93164 10.7099H6.79164C6.74953 10.7017 6.70742 10.6946 6.66695 10.6831C6.28414 10.5831 6.03805 10.2112 6.09602 9.81962C6.15399 9.42806 6.49688 9.14314 6.89227 9.1579C7.28766 9.17266 7.60868 9.48274 7.63657 9.87758C7.665 10.2719 7.39211 10.6246 7.00274 10.6957L7 10.6957ZM9.24 5.61246C9.16016 5.87003 9.02125 6.10574 8.83422 6.29989C8.61986 6.51426 8.38579 6.70676 8.13422 6.8752C7.99422 6.972 7.86954 7.07263 7.73829 7.17325H7.73774C7.61852 7.27169 7.52938 7.4013 7.47907 7.54732C7.45117 7.62278 7.41891 7.69825 7.38938 7.77427C7.31555 7.9799 7.12086 8.11825 6.90211 8.1199C6.78125 8.13303 6.65875 8.11389 6.54774 8.06412C6.37711 7.98045 6.25844 7.81912 6.23001 7.63155C6.18517 7.37123 6.24587 7.10436 6.3979 6.88944C6.5193 6.71225 6.66751 6.5553 6.83758 6.42459C7.02079 6.27475 7.21001 6.13202 7.39758 5.98217C7.55344 5.86295 7.6836 5.71419 7.78094 5.54412C7.93626 5.2488 7.89743 4.88951 7.68305 4.63412C7.57204 4.51271 7.42492 4.43123 7.26305 4.40169C7.04813 4.35138 6.82392 4.35521 6.61063 4.41263C6.38969 4.47333 6.2054 4.62645 6.10531 4.83263C6.03968 4.95568 5.98226 5.082 5.92047 5.2067C5.87562 5.30076 5.81437 5.38662 5.73999 5.4599C5.60984 5.5742 5.43813 5.62943 5.26531 5.61247C5.16031 5.60974 5.05749 5.58185 4.96563 5.53153C4.79336 5.44185 4.68508 5.26356 4.68563 5.06942C4.67852 4.7599 4.7775 4.45801 4.96563 4.21247C5.18383 3.91825 5.47258 3.68419 5.80563 3.53215C6.05719 3.41293 6.32626 3.33529 6.60242 3.30247L6.75938 3.28716H7.03938L7.19031 3.30137V3.30083C7.56492 3.32489 7.93133 3.4195 8.26984 3.58083C8.57226 3.72028 8.83038 3.94067 9.01468 4.21794C9.15522 4.43669 9.24218 4.68497 9.26788 4.9431C9.30562 5.16567 9.29632 5.39373 9.23999 5.61247L9.24 5.61246Z"
      fill={color}
    />
  </svg>
);

export default PDPSubscription;
