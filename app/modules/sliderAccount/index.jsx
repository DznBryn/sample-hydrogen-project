import {useEffect, useState, useRef} from 'react';
import {
  getLoyaltyCustomerData,
  triggerAnalyticsLoyaltyEvents,
} from '~/utils/functions/eventFunctions';
import getApiKeys from '~/utils/functions/getApiKeys';
import SliderPanel, {
  switchSliderPanelVisibility,
  openedStateID,
  links as sliderPanelStyles,
} from '../sliderPanel';
import LoadingSkeleton, {
  links as loadingSkeletonStyles,
} from '../loadingSkeleton';
import {Link, useFetcher} from '@remix-run/react';

import styles from './styles.css';
import {API_METHODS, FETCHER} from '~/utils/constants';
import {RegisterForm, links as registerFormStyles} from '../accounts/register';
import {useStore} from '~/hooks/useStore';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...loadingSkeletonStyles(),
    ...sliderPanelStyles(),
    ...registerFormStyles(),
  ];
};

const curSliderPanelID = 'SliderAccount';

const SliderAccount = () => {
  useEffect(() => {
    const shouldOpen =
      sessionStorage.getItem(openedStateID) === curSliderPanelID;

    if (shouldOpen) {
      switchSliderPanelVisibility(curSliderPanelID);
      sessionStorage.setItem(openedStateID, '0');
    }
  }, []);

  return (
    <SliderPanel id={curSliderPanelID}>
      <div id="sliderAccWraper">
        <MainContent />
      </div>
    </SliderPanel>
  );
};

const MainContent = () => {
  const login = useFetcher();
  const loginButtonRef = useRef(null);
  const recoverPassword = useFetcher();
  const recoverPasswordButtonRef = useRef(null);
  const registerFetcher = useFetcher();
  const signoutFetcher = useFetcher();
  const customerData = useStore((store) => store?.account?.data ?? null);
  const {setCustomerData} = useStore((store) => store?.account ?? null);
  const [mainContent, setMainContent] = useState('loading');
  const [points, setPoints] = useState(null);

  const {id: customerId = '', firstName, email} = customerData;

  const forgotEmail = useRef(null);
  const errorElement = useRef(null);
  const highLightedInput = useRef({input: null, info: null, inputParent: null});

  const signInEmail = useRef(null);
  const signInPassword = useRef(null);

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) init();
    getCustomerData();
  }, []);

  useEffect(() => {
    setMainContent(customerId !== '' ? 'welcomeBack' : 'signIn');
    getCustomerData();
  }, [customerId]);

  useEffect(() => {
    if (loginButtonRef.current) {
      if (login.state === 'submitting') {
        loginButtonRef.current.disabled = true;
        loginButtonRef.current.classList.add('disabledButton');
      } else {
        loginButtonRef.current.disabled = false;
        loginButtonRef.current.classList.remove('disabledButton');
      }
      if (login.state === FETCHER.STATE.LOADING) {
        setCustomerData(login.data?.customer);
      }
      if (login.data?.status === 401) {
        removeErrorMessage();
        errorElement.current = document.createElement('span');
        errorElement.current.classList.add('errorMessage');
        errorElement.current.innerHTML = login.data?.messages?.[0]?.message;
        return signInPassword.current.parentElement.after(errorElement.current);
      }
      if (login.data?.status === 400 || login.data?.status === 500) {
        removeErrorMessage();
        errorElement.current = document.createElement('span');
        errorElement.current.classList.add('errorMessage');
        errorElement.current.innerHTML = login.data?.message;
        return signInPassword.current.parentElement.after(errorElement.current);
      }

      changeMainContent(customerId !== '' ? 'welcomeBack' : 'signIn');
    }
  }, [login.state]);

  useEffect(() => {
    if (recoverPasswordButtonRef.current) {
      if (recoverPassword.state === 'submitting') {
        recoverPasswordButtonRef.current.disabled = true;
        recoverPasswordButtonRef.current.classList.add('disabledButton');
      } else {
        recoverPasswordButtonRef.current.disabled = false;
        recoverPasswordButtonRef.current.classList.remove('disabledButton');
      }

      if (recoverPassword.data?.status === 200) {
        changeMainContent('checkInbox');
      }
      if (
        recoverPassword.data?.status === 400 ||
        recoverPassword.data?.status === 500
      ) {
        showInputError(forgotEmail.current, recoverPassword.data.message);
      }
    }
    return;
  }, [recoverPassword.state]);

  useEffect(() => {
    if (
      registerFetcher.type === FETCHER.TYPE.DONE &&
      registerFetcher.data?.accessToken
    ) {
      triggerAnalyticsLoyaltyEvents('RegisterAccount', {
        userAcceptsMarketing: true,
      });
      changeMainContent('createAccountSuccess');
    }
  }, [registerFetcher.state]);

  useEffect(() => {
    if (signoutFetcher.state === FETCHER.STATE.LOADING) {
      setCustomerData();
    }
  }, [signoutFetcher.state]);

  function init() {
    initialized.current = true;
    setMainContent(customerId !== '' ? 'welcomeBack' : 'signIn');
  }

  async function getCustomerData() {
    const env = 'US_PROD';
    const data = {email, customerId, env, useCache: false};

    if (email || customerId) {
      getLoyaltyCustomerData(data)
        .then((res) => {
          setPoints(res.pointsBalance);
        })
        .catch((err) => err);
    }
  }

  function changeMainContent(pageId) {
    setMainContent(pageId);
    removeErrorMessage();
  }

  function tooglePasswordType(elementRef) {
    const curValue = elementRef.current.getAttribute('type');
    const label = elementRef.current.parentElement.querySelector('span');

    elementRef.current.setAttribute(
      'type',
      curValue === 'text' ? 'password' : 'text',
    );
    label.innerHTML = label.innerHTML === 'hide' ? 'show' : 'hide';
  }

  function showInputError(inputRef, message) {
    removeErrorMessage();

    // highlightInput(inputRef);

    errorElement.current = document.createElement('span');
    errorElement.current.classList.add('errorMessage');
    errorElement.current.innerHTML = message;

    inputRef.after(errorElement.current);
  }

  function removeErrorMessage() {
    if (errorElement.current) errorElement.current.remove();
    reserHighlightedInput();
  }

  function reserHighlightedInput() {
    const {input, info, inputParent} = highLightedInput.current;

    if (highLightedInput.current) {
      if (input) input.classList.remove('errorHighlight');
      if (info) info.classList.remove('errorHighlight');
      if (inputParent) inputParent.classList.remove('errorHighlight');
    }
  }

  const SwellPointBalance = () => {
    return (
      <div className={'pointsDisplay'}>
        {points !== null && points !== undefined ? (
          points.toLocaleString()
        ) : (
          <LoadingSkeleton
            width="13px"
            height="10px"
            style={{borderRadius: '6px'}}
          />
        )}
      </div>
    );
  };

  const Links = () => {
    const links = [
      {
        label: 'return & exchanges',
        to: getApiKeys().RETURNS_HREF,
        showIt: true,
      },
      {label: 'faqs & help', to: 'https://help.tula.com/', showIt: true},
      {
        label: 'submit a receipt',
        to: '/pages/upload-receipt',
        new: true,
        showIt: getApiKeys().FEATURE_FLAGS.LOYALTY,
        onClick: () => {
          triggerAnalyticsLoyaltyEvents('SubmitReceiptBtnClick', {
            source: 'accountSlider',
          });
          switchSliderPanelVisibility('SliderAccount');
        },
      },
      {
        label: 'redeem rewards',
        to: customerId !== '' ? '/account?c=rewards' : '/rewards',
        new: true,
        showIt: getApiKeys().FEATURE_FLAGS.LOYALTY,
        onClick: () => switchSliderPanelVisibility('SliderAccount'),
      },
      {
        label: 'contact us',
        to: '/pages/contact-us',
        showIt: true,
        onClick: () => switchSliderPanelVisibility('SliderAccount'),
      },
    ];

    return (
      <div id={'links'}>
        {links.map(
          (data) =>
            data.showIt && (
              <Link
                to={data.to}
                onClick={data.onClick || null}
                key={data.label}
              >
                {data.label}
                {data.new && <span>new</span>}
                {icons['arrow']}
              </Link>
            ),
        )}
      </div>
    );
  };

  const AccLinks = () => {
    const links = [
      {
        label: 'orders',
        icon: icons['cart'],
        to: '/account?c=orders',
        content: 'View current & previous orders placed',
        showIt: true,
      },
      {
        label: 'auto delivery',
        icon: icons['flux'],
        to: '/account?c=ad',
        content: 'View & manage delivery subscriptions',
        showIt: true,
      },
      {
        label: 'account details',
        icon: icons['person'],
        to: '/account?c=address',
        content: 'View and edit your account details',
        showIt: true,
      },
      {
        label: 'shop now',
        icon: icons['arrow'],
        to: '/collections/all',
        content: 'Healthy, balanced skin begins with TULA',
        showIt: !getApiKeys().FEATURE_FLAGS.LOYALTY,
      },
    ];

    return (
      <div className={'welcomeButtonsWrap'}>
        {links.map(
          (data) =>
            data.showIt && (
              <Link
                to={data.to}
                className={'welcomeButton'}
                onClick={() => switchSliderPanelVisibility('SliderAccount')}
                key={data.label}
              >
                <div className={'title'}>
                  {data.label}
                  {data.icon}
                </div>

                <div className={'pointsCopy'}>{data.content}</div>
              </Link>
            ),
        )}

        {getApiKeys().FEATURE_FLAGS.LOYALTY && (
          <Link
            to={'/account?c=rewards'}
            className={'welcomeButton rewards'}
            onClick={() => switchSliderPanelVisibility('SliderAccount')}
          >
            <div className={'title'}>
              TULA 24-7 Rewards
              <span>NEW!</span>
            </div>

            <div className={'pointsCopy'}>
              {icons['round_star']} <SwellPointBalance /> pts available!
            </div>
          </Link>
        )}
      </div>
    );
  };

  const RewardsBannersSection = () => {
    const container = useRef(null);

    return (
      <div className={'rewardsBannerContainer'} ref={container}>
        <Link
          to={'/rewards'}
          onClick={() => {
            triggerAnalyticsLoyaltyEvents('LearnMoreBtnClick', {
              source: 'accountSlider',
            });
            switchSliderPanelVisibility('SliderAccount');
          }}
        >
          <span>{icons['round_star']} introducing</span>
          <div>TULA 24-7 Rewards</div>
          <div>
            Loyalty that glows <br />
            <span>
              <b>Sign up now</b> {icons['arrow']}
            </span>
          </div>
        </Link>
        <Link
          to={'/rewards'}
          className={'hideOnDesktop'}
          onClick={() =>
            triggerAnalyticsLoyaltyEvents('LearnMoreBtnClick', {
              source: 'accountSlider',
            })
          }
        >
          <div>Earn points wherever you shop TULA</div>
          <div>
            <p>$1 at TULA.com = {icons['round_star']} 10 pts </p>
            <p>$1 at our retailers = {icons['round_star']} 5 pts</p>
          </div>
        </Link>
        <Link
          to={'/rewards'}
          className={'hideOnDesktop'}
          onClick={() =>
            triggerAnalyticsLoyaltyEvents('LearnMoreBtnClick', {
              source: 'accountSlider',
            })
          }
        >
          <div>Redeem for rewards!</div>
          <div>
            Redeem your points for full-size <b>products</b>, <b>discounts</b>,
            and members-only <b>perks</b>.
          </div>
        </Link>
      </div>
    );
  };

  /**/

  const contents = {
    signIn: (
      <>
        <div className={'sliderAccount_header'}>welcome!</div>

        <login.Form action="/" method={API_METHODS.POST} className={'form'}>
          <input
            className={'input'}
            key={'siginEmail'}
            id="signInEmail"
            name="signInEmail"
            ref={signInEmail}
            type="email"
            placeholder="Email"
          />{' '}
          {/**/}
          <div className={'input'}>
            <input
              className={'passwordInput'}
              id="signInPassword"
              name="signInPassword"
              ref={signInPassword}
              type="password"
              placeholder="Password"
              autoComplete="on"
            />{' '}
            {/**/}
            <span onClick={tooglePasswordType.bind(this, signInPassword)}>
              show
            </span>
          </div>
          {login.data?.data &&
            login.data?.data?.length > 0 &&
            login.data?.data?.map(
              (error, index) =>
                !error.field && (
                  <p className={'errorText'} key={index}>
                    The email address and password you entered don&apos;t match
                    any TULA account. Please try again.
                  </p>
                ),
            )}
          <button type="submit" ref={loginButtonRef} className={'button'}>
            sign in
          </button>
          <div
            className={'subText'}
            onClick={() => changeMainContent('forgotPassword')}
          >
            Forgot Your Password?
          </div>
        </login.Form>

        {getApiKeys().FEATURE_FLAGS.LOYALTY ? (
          <div id={'createNewAccRewards'}>
            <p>
              <span
                onClick={() => {
                  changeMainContent('createAccount');
                  triggerAnalyticsLoyaltyEvents('SignupBtnClick', {
                    source: 'accountSlider',
                  });
                }}
              >
                create an account
              </span>{' '}
              to manage your orders & auto-deliveries and earn rewards!{' '}
              {icons['arrow']}
            </p>
            <RewardsBannersSection />
          </div>
        ) : (
          <div id={'createNewAcc'}>
            <p>
              create an account to easily manage your orders and auto-deliveries
            </p>
            <div
              id={'createNewAccButton'}
              onClick={() => {
                changeMainContent('createAccount');
              }}
            >
              create an account
            </div>
          </div>
        )}

        <Links />
      </>
    ),

    welcomeBack: (
      <>
        <div className={'sliderAccount_header'}>
          <span>
            <span>welcome back,</span> {firstName || '{USERNAME}'}!
          </span>
        </div>

        <AccLinks />

        <Links />

        <signoutFetcher.Form action="/account" method={API_METHODS.POST}>
          <input type="hidden" name="formAction" value={'LOGOUT'} />
          <button type="submit" className={'welcomeBottomButton'}>
            sign out
          </button>
        </signoutFetcher.Form>
      </>
    ),

    forgotPassword: (
      <>
        <div className={'sliderAccount_header'}>
          forgot password
          <p>
            Enter your email and we will send you a password reset link to your
            inbox.
          </p>
        </div>

        <recoverPassword.Form
          action="/"
          method={API_METHODS.POST}
          className={'form'}
        >
          <input
            className={'input'}
            id="forgotEmail"
            name="forgotEmail"
            ref={forgotEmail}
            type="email"
            placeholder="Email"
          />
          <button
            type="submit"
            ref={recoverPasswordButtonRef}
            className={'button'}
          >
            send
          </button>
          <div
            className={'subText'}
            onClick={() => changeMainContent('signIn')}
          >
            Go back to login
          </div>
        </recoverPassword.Form>

        <Links />
      </>
    ),

    checkInbox: (
      <>
        <div id={'checkInbox'}>
          <p>Check your inbox!</p>
          we&apos;ve just sent you an email - follow the reset instructions to
          change your password.
          <div
            className={'button'}
            onClick={() => {
              switchSliderPanelVisibility('SliderAccount');
              changeMainContent(customerId !== '' ? 'welcomeBack' : 'signIn');
            }}
          >
            close
          </div>
        </div>
      </>
    ),

    createAccount: (
      <>
        <div className={'sliderAccount_header'}>
          welcome!
          <p>create your TULA account</p>
        </div>
        <div className={'form'}>
          <RegisterForm fetcher={registerFetcher} />
        </div>

        <Links />
      </>
    ),

    createAccountSuccess: (
      <>
        <div id={'createAccountSuccess'}>
          {icons['check']}
          <p>
            thank you for creating <br />a TULA account!
          </p>
          <Link
            className={'button'}
            to={'/collections/all'}
            onClick={() => {
              switchSliderPanelVisibility('SliderAccount');
              changeMainContent('signIn');
            }}
          >
            shop now
          </Link>
          <Link
            className={'viewMyAccountLink'}
            to={'/account?c=rewards'}
            onClick={() =>
              document.querySelector('body').classList.remove('bodyWrap')
            }
          >
            view my account
          </Link>

          <div id={'createAccountBannersContainer'}>
            {getApiKeys().FEATURE_FLAGS.LOYALTY && (
              <Link
                className={'rewardsBanner'}
                to={'/rewards'}
                onClick={() => {
                  switchSliderPanelVisibility('SliderAccount');
                }}
              >
                <span>new</span>
                <div>TULA 24-7 Rewards</div>
                <div>Earn points, rewards and exclusive access.</div>
                {icons['round_arrow']}
              </Link>
            )}
            <Link
              className={'skinquizBanner'}
              to={'/pages/skincare-finder'}
              onClick={() => {
                switchSliderPanelVisibility('SliderAccount');
              }}
            >
              <span>skin quiz</span>
              <div>
                Get your personal <br />
                skincare routine
              </div>
              {icons['round_arrow']}
            </Link>
          </div>
        </div>
      </>
    ),

    loading: (
      <>
        <div className={'loaderContainer'}>
          <span className={'spinLoader'}></span>
        </div>
      </>
    ),
  };

  return (
    <>
      <div
        id={'closeButton'}
        onClick={() => {
          switchSliderPanelVisibility('SliderAccount');
          changeMainContent(customerId !== '' ? 'welcomeBack' : 'signIn');
        }}
      >
        <span>close</span>
      </div>

      {contents[mainContent]}
    </>
  );
};

const icons = {
  arrow: (
    <svg
      width={12}
      height={8}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3.59895C11.9949 3.47027 11.9392 3.32119 11.8477 3.22768L8.84767 0.167451C8.64406 -0.00764085 8.2544 -0.0800674 8.02736 0.122448C7.80324 0.322154 7.81057 0.709597 8.03322 0.910006L10.1426 3.059H0.562498C0.251961 3.059 0 3.30091 0 3.59904C0 3.89718 0.251961 4.13908 0.562498 4.13908H10.1426L8.03322 6.28808C7.84133 6.47301 7.80544 6.87383 8.02736 7.07564C8.24855 7.27745 8.65284 7.21276 8.84767 7.03064L11.8477 3.97041C11.9502 3.86564 12 3.74259 12 3.59913V3.59895Z"
        fill="#4C4E56"
      />
    </svg>
  ),
  cart: (
    <svg
      width={18}
      height={17}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0254 11.709H5.39453L5.97852 10.5195L15.6816 10.502C16.0098 10.502 16.291 10.2676 16.3496 9.94336L17.6934 2.42188C17.7285 2.22461 17.6758 2.02148 17.5469 1.86719C17.4832 1.79125 17.4037 1.73008 17.314 1.68792C17.2243 1.64577 17.1265 1.62363 17.0273 1.62305L4.68359 1.58203L4.57813 1.08594C4.51172 0.769531 4.22656 0.539062 3.90234 0.539062H0.884766C0.701911 0.539063 0.526546 0.611701 0.397249 0.740999C0.267951 0.870296 0.195313 1.04566 0.195312 1.22852C0.195313 1.41137 0.267951 1.58674 0.397249 1.71603C0.526546 1.84533 0.701911 1.91797 0.884766 1.91797H3.34375L3.80469 4.10938L4.93945 9.60352L3.47852 11.9883C3.40265 12.0907 3.35695 12.2123 3.3466 12.3393C3.33624 12.4663 3.36164 12.5937 3.41992 12.707C3.53711 12.9395 3.77344 13.0859 4.03516 13.0859H5.26172C5.00023 13.4332 4.85899 13.8563 4.85938 14.291C4.85938 15.3965 5.75781 16.2949 6.86328 16.2949C7.96875 16.2949 8.86719 15.3965 8.86719 14.291C8.86719 13.8555 8.72266 13.4316 8.46484 13.0859H11.6113C11.3498 13.4332 11.2086 13.8563 11.209 14.291C11.209 15.3965 12.1074 16.2949 13.2129 16.2949C14.3184 16.2949 15.2168 15.3965 15.2168 14.291C15.2168 13.8555 15.0723 13.4316 14.8145 13.0859H17.0273C17.4062 13.0859 17.7168 12.7773 17.7168 12.3965C17.7157 12.2138 17.6423 12.039 17.5128 11.9102C17.3833 11.7814 17.2081 11.7091 17.0254 11.709V11.709ZM4.9707 2.94141L16.2168 2.97852L15.1152 9.14649L6.28125 9.16211L4.9707 2.94141ZM6.86328 14.9082C6.52344 14.9082 6.24609 14.6309 6.24609 14.291C6.24609 13.9512 6.52344 13.6738 6.86328 13.6738C7.20312 13.6738 7.48047 13.9512 7.48047 14.291C7.48047 14.4547 7.41544 14.6117 7.2997 14.7274C7.18395 14.8432 7.02697 14.9082 6.86328 14.9082V14.9082ZM13.2129 14.9082C12.873 14.9082 12.5957 14.6309 12.5957 14.291C12.5957 13.9512 12.873 13.6738 13.2129 13.6738C13.5527 13.6738 13.8301 13.9512 13.8301 14.291C13.8301 14.4547 13.7651 14.6117 13.6493 14.7274C13.5336 14.8432 13.3766 14.9082 13.2129 14.9082V14.9082Z"
        fill="#4C4E56"
      />
    </svg>
  ),
  flux: (
    <svg
      width={17}
      height={15}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6496 6.22469C15.6367 6.22653 15.624 6.22904 15.6108 6.23029C15.5818 6.23317 15.5527 6.23472 15.5236 6.23472H11.9854C11.7509 6.23472 11.5259 6.14152 11.36 5.97564C11.1941 5.80976 11.1009 5.58478 11.1009 5.35018C11.1009 5.11559 11.1941 4.89061 11.36 4.72473C11.5259 4.55884 11.7509 4.46565 11.9854 4.46565H13.3882L12.3962 3.4738C11.3448 2.42477 9.92024 1.83563 8.43501 1.83563C6.94977 1.83563 5.52519 2.42477 4.47378 3.4738C4.30744 3.63745 4.08318 3.72874 3.84983 3.72779C3.61649 3.72684 3.39298 3.63373 3.22798 3.46873C3.06298 3.30373 2.96986 3.08021 2.96891 2.84687C2.96796 2.61353 3.05925 2.38926 3.22291 2.22292C4.60633 0.842644 6.48077 0.0674744 8.43501 0.0674744C10.3892 0.0674744 12.2637 0.842644 13.6471 2.22292L14.639 3.2147V1.81199C14.639 1.57739 14.7322 1.35241 14.8981 1.18653C15.064 1.02065 15.289 0.927455 15.5236 0.927455C15.7582 0.927455 15.9831 1.02065 16.149 1.18653C16.3149 1.35241 16.4081 1.57739 16.4081 1.81199V5.34982C16.4081 5.37908 16.4066 5.40842 16.4037 5.43761C16.4025 5.44992 16.4001 5.46193 16.3984 5.47402C16.3961 5.49046 16.3942 5.50689 16.3909 5.52326C16.3881 5.53741 16.3842 5.55105 16.3808 5.56498C16.3772 5.57906 16.3741 5.59321 16.3699 5.60721C16.3657 5.62092 16.3606 5.63412 16.3558 5.64753C16.3508 5.66132 16.3463 5.67525 16.3407 5.68881C16.3355 5.70134 16.3294 5.71336 16.3237 5.72552C16.3171 5.73953 16.3108 5.7536 16.3035 5.76731C16.2973 5.77881 16.2902 5.78972 16.2836 5.80093C16.2755 5.81456 16.2678 5.82827 16.2589 5.84154C16.2508 5.8537 16.2417 5.86513 16.2331 5.87678C16.2246 5.8882 16.2166 5.89992 16.2075 5.91098C16.1909 5.9311 16.1734 5.95026 16.1551 5.96884C16.153 5.97105 16.1512 5.97348 16.149 5.97562C16.1468 5.97783 16.1444 5.97968 16.1422 5.98181C16.1236 6.00002 16.1046 6.01756 16.0844 6.03407C16.0734 6.04314 16.0617 6.05103 16.0503 6.05958C16.0385 6.06828 16.0272 6.07742 16.0149 6.08552C16.0019 6.09437 15.9882 6.10196 15.9748 6.10992C15.9634 6.1167 15.9523 6.12385 15.9406 6.13012C15.9271 6.13734 15.9133 6.14346 15.8995 6.14995C15.8871 6.15584 15.8749 6.16196 15.8622 6.16727C15.8489 6.1728 15.8353 6.17722 15.8218 6.18201C15.808 6.18695 15.7945 6.19226 15.7804 6.19653C15.767 6.20059 15.7533 6.20354 15.7398 6.207C15.7254 6.21061 15.7112 6.21467 15.6964 6.21754C15.6809 6.22064 15.6652 6.22248 15.6496 6.22469V6.22469ZM12.3962 11.3963C11.3448 12.4453 9.92024 13.0344 8.43501 13.0344C6.94977 13.0344 5.52519 12.4453 4.47378 11.3963L3.48193 10.4044H4.88457C5.11916 10.4044 5.34415 10.3112 5.51003 10.1453C5.67591 9.97944 5.7691 9.75446 5.7691 9.51986C5.7691 9.28527 5.67591 9.06029 5.51003 8.89441C5.34415 8.72852 5.11916 8.63533 4.88457 8.63533H1.34645C1.34202 8.63533 1.33775 8.63592 1.33332 8.63607C1.30871 8.63637 1.28409 8.63732 1.25961 8.63976C1.24502 8.64116 1.23087 8.64381 1.21664 8.64595C1.20234 8.64801 1.18804 8.64963 1.17389 8.65243C1.15841 8.65553 1.1433 8.65981 1.12819 8.66364C1.11536 8.66688 1.10254 8.66961 1.08986 8.67344C1.07526 8.67786 1.06111 8.68332 1.04681 8.68848C1.03384 8.6932 1.02079 8.6974 1.00804 8.7027C0.994918 8.70816 0.982313 8.7145 0.969561 8.72054C0.956146 8.72688 0.942583 8.73285 0.929463 8.73985C0.917521 8.74627 0.906244 8.75356 0.894597 8.76049C0.881329 8.76838 0.868061 8.77583 0.855162 8.78445C0.842778 8.79271 0.831132 8.80199 0.819265 8.81084C0.807987 8.81924 0.796562 8.82705 0.785653 8.83597C0.765529 8.85249 0.746291 8.8701 0.727716 8.88831C0.725504 8.89045 0.723146 8.89222 0.721008 8.89443C0.71887 8.89664 0.717028 8.899 0.714816 8.90121C0.696683 8.91978 0.679067 8.93895 0.662482 8.95907C0.653415 8.97013 0.645528 8.98185 0.636978 8.99327C0.62828 9.00499 0.619213 9.01634 0.611105 9.02851C0.602186 9.04177 0.594446 9.05549 0.586412 9.06912C0.579778 9.08033 0.572702 9.09124 0.56651 9.10273C0.559139 9.11644 0.552947 9.1306 0.546313 9.14468C0.540637 9.15676 0.534519 9.16871 0.52936 9.18116C0.523757 9.1948 0.519114 9.2088 0.514175 9.22266C0.509458 9.236 0.504298 9.2492 0.50017 9.26283C0.495895 9.27684 0.492799 9.29099 0.489261 9.30507C0.485796 9.319 0.48189 9.33264 0.479089 9.34679C0.475845 9.36316 0.473929 9.37959 0.47157 9.39603C0.469875 9.40819 0.467516 9.42013 0.466337 9.43244C0.463388 9.46163 0.461914 9.49097 0.461914 9.52023V13.058C0.461914 13.2926 0.555106 13.5176 0.720987 13.6834C0.886869 13.8493 1.11185 13.9425 1.34645 13.9425C1.58104 13.9425 1.80602 13.8493 1.9719 13.6834C2.13779 13.5176 2.23098 13.2926 2.23098 13.058V11.6553L3.22283 12.6472C4.60628 14.0275 6.48075 14.8027 8.43501 14.8027C10.3893 14.8027 12.2637 14.0275 13.6472 12.6472C13.8108 12.4809 13.9021 12.2566 13.9012 12.0233C13.9002 11.7899 13.8071 11.5664 13.6421 11.4014C13.4771 11.2364 13.2536 11.1433 13.0203 11.1423C12.7869 11.1414 12.5626 11.2327 12.3963 11.3963L12.3962 11.3963Z"
        fill="#4C4E56"
      />
    </svg>
  ),
  person: (
    <svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9663 9.40712C12.1683 8.6833 12.9917 7.4681 13.2182 6.08345C13.4453 4.69889 13.0521 3.2844 12.1437 2.21527C11.2353 1.14614 9.90311 0.529877 8.49993 0.529877C7.09675 0.529877 5.76463 1.14613 4.85615 2.21527C3.94767 3.28442 3.5546 4.6988 3.7817 6.08345C4.00814 7.46802 4.83158 8.68326 6.03352 9.40712C4.59117 9.85735 3.30162 10.6961 2.3061 11.8323C1.31 12.9686 0.647272 14.3572 0.390198 15.8459C0.347033 16.1314 0.539613 16.3997 0.824497 16.4488C1.10938 16.4987 1.38098 16.3114 1.43677 16.0278C1.83056 13.7959 3.2556 11.8814 5.28098 10.8641C7.30636 9.84673 9.69299 9.84673 11.7184 10.8641C13.7438 11.8814 15.1689 13.7959 15.5626 16.0278C15.6064 16.2828 15.8275 16.4688 16.0859 16.4688C16.1164 16.4688 16.147 16.4661 16.1775 16.4608C16.3163 16.4369 16.4405 16.3585 16.5215 16.243C16.6025 16.1281 16.635 15.9847 16.6105 15.8459C16.3535 14.3571 15.6901 12.9685 14.6946 11.8324C13.6985 10.6962 12.4082 9.85679 10.9658 9.40714L10.9663 9.40712ZM4.78123 5.3125C4.78123 4.32637 5.17303 3.38011 5.87028 2.68277C6.56754 1.98543 7.51384 1.59372 8.50002 1.59372C9.48619 1.59372 10.4324 1.98552 11.1297 2.68277C11.8271 3.38003 12.2188 4.32633 12.2188 5.3125C12.2188 6.29867 11.827 7.24489 11.1297 7.94223C10.4325 8.63957 9.48619 9.03129 8.50002 9.03129C7.51384 9.03129 6.56763 8.63949 5.87028 7.94223C5.17294 7.24498 4.78123 6.29867 4.78123 5.3125Z"
        fill="#4C4E56"
      />
    </svg>
  ),
  conection: (
    <img
      src={
        'https://cdn.shopify.com/s/files/1/1736/9637/files/conection_icon.svg?v=1653069030'
      }
    />
  ),
  check: (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0003 0.916992C10.3566 0.916992 0.916992 10.3566 0.916992 22.0003C0.916992 33.6441 10.3566 43.0837 22.0003 43.0837C33.6441 43.0837 43.0837 33.6441 43.0837 22.0003C43.0837 10.3566 33.6441 0.916992 22.0003 0.916992ZM31.139 18.4353C31.3073 18.243 31.4354 18.0189 31.5158 17.7763C31.5962 17.5337 31.6273 17.2775 31.6072 17.0227C31.5871 16.7679 31.5163 16.5197 31.3988 16.2927C31.2814 16.0657 31.1198 15.8645 30.9235 15.7009C30.7271 15.5373 30.5001 15.4146 30.2556 15.34C30.0111 15.2655 29.7542 15.2406 29.5 15.2667C29.2458 15.2929 28.9994 15.3697 28.7753 15.4925C28.5511 15.6154 28.3538 15.7818 28.195 15.982L19.9533 25.8701L15.6887 21.6036C15.3273 21.2544 14.8431 21.0613 14.3406 21.0656C13.838 21.07 13.3573 21.2716 13.0019 21.6269C12.6466 21.9823 12.445 22.463 12.4406 22.9656C12.4362 23.4681 12.6294 23.9523 12.9786 24.3137L18.7286 30.0637C18.9169 30.252 19.1424 30.3989 19.3906 30.4951C19.6389 30.5914 19.9044 30.6348 20.1704 30.6227C20.4364 30.6107 20.6969 30.5433 20.9354 30.4249C21.1739 30.3066 21.3852 30.1398 21.5557 29.9353L31.139 18.4353Z"
        fill="#47C6D9"
      />
    </svg>
  ),
  round_arrow: (
    <svg
      width={27}
      height={26}
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4999 25.501C16.9257 25.501 20.2108 24.1838 22.6328 21.8389C25.0559 19.4951 26.417 16.3159 26.417 13.0006C26.417 9.68528 25.0559 6.50618 22.6328 4.16228C20.2109 1.81736 16.9257 0.500182 13.4999 0.500182C10.0741 0.500182 6.78903 1.81736 4.367 4.16228C1.94391 6.50603 0.582826 9.68528 0.582826 13.0006C0.582825 16.3159 1.94391 19.495 4.367 21.8389C6.78887 24.1838 10.0741 25.501 13.4999 25.501ZM8.33283 11.7514L15.5537 11.7502L13.8874 10.1377C13.449 9.64202 13.4781 8.90255 13.9552 8.44085C14.4323 7.97912 15.1964 7.95101 15.7086 8.37522L19.5836 12.1252C20.085 12.6127 20.085 13.4002 19.5836 13.8877L15.7086 17.6377C15.4749 17.9026 15.1371 18.0608 14.7774 18.0737C14.4178 18.0877 14.069 17.9553 13.8147 17.7092C13.5592 17.4631 13.4224 17.1245 13.4369 16.7764C13.4502 16.4283 13.6137 16.1026 13.8874 15.8752L15.5536 14.251L8.33278 14.251C7.61953 14.251 7.04191 13.6908 7.04191 13.0006C7.04191 12.3104 7.61953 11.7502 8.33278 11.7502L8.33283 11.7514Z"
        fill="white"
      />
    </svg>
  ),
  round_star: (
    <svg
      width={12}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5Z"
        fill="#47C6D9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 12.025C9.55137 12.025 12.025 9.55137 12.025 6.5C12.025 3.44863 9.55137 0.975 6.5 0.975C3.44863 0.975 0.975 3.44863 0.975 6.5C0.975 9.55137 3.44863 12.025 6.5 12.025ZM6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13Z"
        fill="#B3E5ED"
      />
      <path
        d="M6.49978 2.88916L7.35225 5.6478H10.1109L7.8791 7.35274L8.73157 10.1114L6.49978 8.40645L4.26799 10.1114L5.12046 7.35274L2.88867 5.6478H5.64732L6.49978 2.88916Z"
        fill="white"
      />
    </svg>
  ),
};

export default SliderAccount;
