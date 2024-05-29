import {useEffect, useRef, useState} from 'react';
import {useFetcher, useRevalidator} from '@remix-run/react';

import {useSuccessBanner} from '~/hooks/useStore';

import Modal, {links as modalStyles} from '~/modules/accounts/modal';

import {API_METHODS, FETCHER, FORM_ACTIONS, US_STATES} from '~/utils/constants';

import styles from './styles.css';

export function links() {
  return [{rel: 'stylesheet', href: styles}, ...modalStyles()];
}
export default function Addresses({data}) {
  const {addresses, defaultAddress} = data;

  const removeAddressFetcher = useFetcher({key: 'remove-address'});
  const addAddressFetcher = useFetcher({key: 'add-address'});

  const [showAddAddressForm, setShowAddAddressForm] = useState({
    headerMessage: 'Add New Address',
    submitBtnMessage: 'Add address',
    formAction: FORM_ACTIONS.CREATE,
  });

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: '',
    message: '',
    submitBtnMessage: 'Submit',
    cancelBtnMessage: 'Cancel',
    submitAction: () => {},
  });

  function parseAddressId(addressId) {
    return addressId?.split('?')[0];
  }

  const sortedAddress = [
    {...defaultAddress, isDefault: true},
    ...addresses.filter(
      (add) => parseAddressId(add?.id) !== parseAddressId(defaultAddress?.id),
    ),
  ];

  return (
    <>
      <AddressModal modalData={modalData} setModalData={setModalData} />
      {showAddAddressForm.id ? (
        <div id="addressTab" className={'mainContainer'}>
          <Form
            data={{
              headerMessage: showAddAddressForm?.headerMessage,
              submitBtnMessage: showAddAddressForm?.submitBtnMessage,
              closeForm: () => setShowAddAddressForm({id: null}),
              setModalData,
              addAddressFetcher,
              ...showAddAddressForm,
            }}
          />
        </div>
      ) : (
        <div id="addressTab" className={'mainContainer'}>
          <div className="dataContainer">
            <div className="accountDetailsContainer">
              <div className={'headerContainer'}>
                <h3 className={'headerTitle'}>Account Details</h3>
              </div>
              <h3 className={'accountName'}>
                {(defaultAddress !== null && defaultAddress?.firstName !== ''
                  ? defaultAddress.firstName
                  : data?.firstName) +
                  ' ' +
                  (defaultAddress !== null && defaultAddress?.lastName !== ''
                    ? defaultAddress.lastName
                    : data?.lastName)}
              </h3>
              <span className={'accountDetails'}>{data?.phone}</span>
              <span className={'accountDetails'}>{data?.email}</span>
              <span className={'accountDetails'}>
                {new Date(data?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className={'addressContainer'}>
              <div className={'headerContainer'}>
                <h3 className={'headerTitle'}>Shipping Addresses</h3>
                <button
                  className={'editButton'}
                  onClick={() =>
                    setShowAddAddressForm({
                      id: ' ',
                      headerMessage: 'Add New Address',
                      submitBtnMessage: 'Add address',
                      formAction: FORM_ACTIONS.CREATE,
                    })
                  }
                >
                  + Add New Address
                </button>
              </div>
              {addresses.length ? (
                <div className={'addressListContainer'}>
                  {sortedAddress.map((address) => (
                    <div key={`address-${address.id}`}>
                      <AddressBox
                        data={{
                          removeAddressFetcher,
                          setModalData,
                          editAddress: () =>
                            setShowAddAddressForm({
                              headerMessage: 'Edit Address',
                              submitBtnMessage: 'Update address',
                              formAction: FORM_ACTIONS.UPDATE,
                              ...address,
                            }),
                          ...address,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className={'noAddressesMessage'}>
                  <strong>No addesses saved yet</strong>
                  <br />
                  <span>
                    Shipping addresses used at checkout will be saved here or
                    you can &nbsp;
                  </span>
                  <span
                    className={'editButton'}
                    onClick={() =>
                      setShowAddAddressForm({
                        id: ' ',
                        headerMessage: 'Add New Address',
                        submitBtnMessage: 'Add address',
                        formAction: FORM_ACTIONS.CREATE,
                      })
                    }
                  >
                    add a new address now.
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const AddressBox = ({data = null}) => {
  return (
    <>
      <div
        className={'addressBoxContainer'}
        style={{
          background: data?.isDefault && '#47c6d90d',
          paddingTop: !data?.isDefault && 33,
        }}
      >
        {data?.isDefault && (
          <div className={'defaultAddressBadge'}>default address</div>
        )}

        <div className={'addressDetails'}>
          <p
            className={'addressDetailName'}
          >{`${data?.firstName} ${data?.lastName}`}</p>
          <p className={'addressDetailAddress'}>
            {data?.address1}.&nbsp;
            {data?.city},&nbsp;
            {data?.zip},&nbsp;
            <br className={'countryBreakRow'} />
            {data?.country}
          </p>
        </div>

        <div className={'addressBtnContainer'}>
          <button
            className={'addressBtn'}
            type="button"
            onClick={data?.editAddress}
          >
            Edit Address
          </button>
          <p className="verticalSeparator">{'\u2502'}</p>
          <RemoveAddress
            addressId={data.id}
            setModalData={data.setModalData}
            fetcher={data.removeAddressFetcher}
          />
        </div>
      </div>
    </>
  );
};

function RemoveAddress({addressId, setModalData, fetcher}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const revalidator = useRevalidator();
  const {closeBanner, showBanner} = useSuccessBanner();

  const addressSuccefullyRemovedMessage = 'Address successfully removed.';

  const buttonMessage =
    (fetcher.state === FETCHER.STATE.SUBMIT ||
      fetcher.state === FETCHER.STATE.LOADING) &&
    isDeleting
      ? '...Removing Address'
      : 'Remove Address';

  function scrollToTop() {
    window?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function onSubmit() {
    fetcher.submit(
      {addressId},
      {
        method: API_METHODS.DELETE,
        action: '/account',
      },
    );
    setIsDeleting(true);
  }

  function openModal() {
    const removeTitle = 'Remove address';
    const removeMessage = 'Are you sure want to remove this shipping address?';
    const submitBtnMessage = 'Yes, remove';
    const cancelBtnMessage = 'Cancel';

    function handleSubmit() {
      setModalData((prevState) => ({
        ...prevState,
        isOpen: false,
      }));
      onSubmit();
    }

    setModalData((prevState) => ({
      ...prevState,
      title: removeTitle,
      message: removeMessage,
      submitBtnMessage,
      submitAction: handleSubmit,
      cancelBtnMessage,
      isOpen: true,
    }));

    scrollToTop();
  }

  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.DONE && revalidator.state === 'idle') {
      revalidator.revalidate();
      closeBanner();
      scrollToTop();
      fetcher.type = 'init';
      showBanner({_message: addressSuccefullyRemovedMessage});
      setIsDeleting(false);
    }
  }, [fetcher.type]);

  return (
    <fetcher.Form>
      <input type="hidden" name="addressId" value={addressId} required />
      <button
        className={'addressBtn'}
        type="button"
        onClick={(e) => {
          e.preventDefault(), openModal();
        }}
      >
        {buttonMessage}
      </button>
    </fetcher.Form>
  );
}

function Form({data}) {
  const fetcher = data.addAddressFetcher;
  const revalidator = useRevalidator();

  const [form, setForm] = useState({
    firstName: data?.firstName ?? '',
    lastName: data?.lastName ?? '',
    streetAddress: data?.address1 ?? '',
    number: data?.address2 ?? '',
    city: data?.city ?? '',
    company: data?.company ?? '',
    isDefault: data?.isDefault ?? false,
    country: data?.country ?? 'United States',
    phone:
      data?.phone && data.phone !== 'undefined'
        ? String(data.phone.slice(0, 16))
        : null,
    province: data?.province ?? '',
    zip: data?.zip ? String(data.zip.slice(0, 5)) : '',
  });

  const [formErrors, setErrors] = useState([]);
  const phoneRef = useRef(null);

  const {closeBanner, showBanner} = useSuccessBanner();

  const addressSuccefullyAddedMessage = 'Address successfully added.';
  const addressSuccefullyUpdatedMessage = 'Address successfully updated.';

  function scrollToTop() {
    window?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function showNewBanner(message) {
    closeBanner();
    showBanner({_message: message});
  }

  useEffect(() => {
    if (fetcher.data?.errors) {
      setErrors(fetcher.data.errors);
    }
    if (
      fetcher.type === FETCHER.TYPE.DONE &&
      fetcher.data?.addresses &&
      revalidator.state === 'idle'
    ) {
      data.closeForm();
      scrollToTop();
      revalidator.revalidate();
    }
  }, [fetcher]);

  useEffect(() => {
    if (fetcher?.data?.errors) {
      return;
    }
    if (fetcher.type === FETCHER.TYPE.DONE) {
      if (data?.formAction === FORM_ACTIONS.UPDATE) {
        showNewBanner(addressSuccefullyUpdatedMessage);
      } else {
        showNewBanner(addressSuccefullyAddedMessage);
      }
      fetcher.type = 'init';
    }
    scrollToTop();
  }, [fetcher.type]);

  function format(ref) {
    function doFormat(x, pattern, mask) {
      var strippedValue = x.replace(/[^0-9]/g, '');
      var chars = strippedValue.split('');
      var count = 0;
      var formatted = '';
      for (var i = 0; i < pattern.length; i++) {
        const c = pattern[i];
        if (chars[count]) {
          if (/\*/.test(c)) {
            formatted += chars[count];
            count++;
          } else {
            formatted += c;
          }
        } else if (mask) {
          if (mask.split('')[i]) formatted += mask.split('')[i];
        }
      }
      return formatted;
    }
    const val = doFormat(
      ref.current.value,
      ref.current.getAttribute('data-format'),
    );
    ref.current.value = doFormat(
      ref.current.value,
      ref.current.getAttribute('data-format'),
      ref.current.getAttribute('data-mask'),
    );
    if (ref.current.createTextRange) {
      var range = ref.current.createTextRange();
      range.move('character', val.length);
      range.select();
    } else if (ref.current.selectionStart) {
      ref.current.focus();
      ref.current.setSelectionRange(val.length, val.length);
    }
  }

  const handleOnChange = (e) => {
    e?.preventDefault();
    var regex = /[^0-9]/gi;
    const {name, value} = e.target || e.current;
    if (name === 'zip') {
      if (value === '' && !formErrors.includes(name)) {
        setErrors([...formErrors, name]);
      }
      if (value !== '' && formErrors.includes(name)) {
        const errors = formErrors.filter((error) => error !== name);
        setErrors(errors);
      }
      return setForm((prevFormData) => ({
        ...prevFormData,
        [name]: value.replace(regex, ''),
      }));
    } else {
      if (value === '' && !formErrors.includes(name)) {
        setErrors([...formErrors, name]);
      }
      if (value !== '' && formErrors.includes(name)) {
        const errors = formErrors.filter((error) => error !== name);
        setErrors(errors);
      }
      return setForm((prevFormData) => ({...prevFormData, [name]: value}));
    }
  };

  function onSubmit(event) {
    fetcher.submit(event.currentTarget.form, {
      method: API_METHODS.POST,
      action: '/account',
      encType: 'application/x-www-form-urlencoded',
    });
  }

  function openModal() {
    const {setModalData} = data;

    const updateTitle = 'Are you sure?';
    const updateMessage = 'If you cancel, the edits you have made will be lost';
    const submitBtnMessage = 'Yes, I want to cancel';
    // eslint-disable-next-line quotes
    const cancelBtnMessage = "No, I don't want to cancel";

    function handleCancel() {
      data?.closeForm();
      setModalData((prevState) => ({
        ...prevState,
        isOpen: false,
      }));
    }

    setModalData((prevState) => ({
      ...prevState,
      title: updateTitle,
      message: updateMessage,
      submitBtnMessage,
      submitAction: handleCancel,
      cancelBtnMessage,
      isOpen: true,
    }));

    scrollToTop();
  }

  return (
    <fetcher.Form className={'formContainer'}>
      {data?.headerMessage && (
        <h2 className={'formTitle'}>{data.headerMessage}</h2>
      )}
      <input type="hidden" name="formAction" value={data?.formAction} />
      {data?.formAction === FORM_ACTIONS.UPDATE && (
        <input type="hidden" name="addressId" value={data?.id} />
      )}
      <p className={'formInfoText'}>* indicates a required field</p>
      <div className={'formGroup'}>
        <span className={'inputCell'}>
          <label className={'inputLabel'}>First Name*</label>
          <input
            name="firstName"
            className={`formInput ${
              formErrors.includes('firstName') && 'formInputError'
            }`}
            placeholder="First Name"
            value={form?.firstName ?? data?.firstName}
            onChange={handleOnChange}
          />
          {formErrors.includes('firstName') && (
            <p className={'errorMessage'}>*Required</p>
          )}
        </span>
        <span className={'inputCell'}>
          <label className={'inputLabel'}>Last Name*</label>
          <input
            name="lastName"
            className={`formInput ${
              formErrors.includes('lastName') && 'formInputError'
            }`}
            placeholder="Last Name"
            value={form?.lastName ?? data?.lastName}
            onChange={handleOnChange}
          />
          {formErrors.includes('lastName') && (
            <p className={'errorMessage'}>*Required</p>
          )}
        </span>
      </div>
      <div className={'formGroup'}>
        <span className={'inputCell'}>
          <label className={'inputLabel'}>Company</label>
          <input
            name="company"
            placeholder="Company name (optional)"
            className={'formInput'}
            value={form?.company}
            onChange={handleOnChange}
          />
        </span>
      </div>
      <div className={'formGroup'}>
        <span className={'inputCell'}>
          <label className={'inputLabel'}>Street Address*</label>
          <input
            name="streetAddress"
            placeholder="Street Address"
            className={`formInput ${
              formErrors.includes('streetAddress') && 'formInputError'
            }`}
            value={form?.streetAddress}
            onChange={handleOnChange}
          />
          {formErrors.includes('streetAddress') && (
            <p className={'errorMessage'}>*Required</p>
          )}
        </span>
      </div>
      <div className={'aptCityGroup'}>
        <span className={'inputCell aptCell'}>
          <label className={'inputLabel'}>Apt, Suite</label>
          <input
            type="tel"
            name="number"
            className={'formInput'}
            placeholder="No."
            value={form?.number}
            onChange={handleOnChange}
          />
        </span>
        <span className={'inputCell'}>
          <label className={'inputLabel'}>City*</label>
          <input
            name="city"
            className={`formInput ${
              formErrors.includes('city') && 'formInputError'
            }`}
            placeholder="City"
            value={form?.city}
            onChange={handleOnChange}
          />
          {formErrors.includes('city') && (
            <p className={'errorMessage'}>*Required</p>
          )}
        </span>
      </div>
      <div className={'formGroup'}>
        <span className={'inputCell'}>
          <label className={'inputLabel'}>State*</label>
          <div
            className={`formInput ${
              formErrors.includes('province') && 'formInputError'
            }`}
            name="countryContainer"
          >
            <AddressIcon
              style={{position: 'absolute', top: '25%', left: 16}}
              formErrors={formErrors}
            />
            <select
              name="province"
              value={form?.province}
              className={'countrySelect'}
              onChange={handleOnChange}
            >
              <option value="" disabled selected hidden>
                -- Select --
              </option>
              {US_STATES.map((state, idx) => (
                <option key={idx}>
                  {state.split(' ').slice(0, 3).join(' ')}
                </option>
              ))}
            </select>
          </div>
          {formErrors.includes('province') && (
            <p className={'errorMessage'}>*Required</p>
          )}
        </span>

        <span className={'inputCell'}>
          <label className={'inputLabel'}>Zip Code*</label>
          <input
            type="tel"
            name="zip"
            className={`formInput ${
              formErrors.includes('zip') && 'formInputError'
            }`}
            placeholder="Zip Code"
            value={form?.zip}
            onChange={handleOnChange}
            minLength="5"
            maxLength="5"
          />
          {formErrors.includes('zip') && (
            <p className={'errorMessage'}>*Required</p>
          )}
        </span>
      </div>
      <div className={'formGroup'}>
        <span className={'inputCell'}>
          <label className={'inputLabel'}>Country*</label>
          <input
            name="country"
            className={`formInput ${
              formErrors.includes('country') && 'formInputError'
            }`}
            value={'United States'}
            onChange={handleOnChange}
            readOnly
          />
          {formErrors.includes('country') && (
            <p className={'errorMessage'}>*Required</p>
          )}
        </span>

        <span className={'inputCell'}>
          <label className={'inputLabel'}>Phone</label>
          <input
            name="phone"
            type="tel"
            placeholder="( ___ ) ___ - ____"
            className={'formInput'}
            aria-label="( ___ ) ___ - ____"
            ref={phoneRef}
            value={form?.phone}
            data-format="(***) *** - ****"
            data-mask="( ___ ) ___ - ____"
            onKeyUp={() => format(phoneRef)}
            onChange={() => handleOnChange(phoneRef)}
          />
        </span>
      </div>
      <div className={'defaultCheckboxContainer'}>
        <label className={'defaultCheckbox'}>
          <input
            type="checkbox"
            name="isDefault"
            readOnly
            checked={form?.isDefault}
            value={form?.isDefault}
            onClick={() => setForm({...form, isDefault: !form?.isDefault})}
          />
          <span className={'checkmark'}></span>
        </label>
        <p>Set as default address</p>
      </div>
      <div className={'formBtnContainer'}>
        <Button
          type="button"
          onClick={onSubmit}
          styleType="solid"
          disabled={
            formErrors.length > 0 ||
            fetcher.state === FETCHER.STATE.SUBMIT ||
            fetcher.state === FETCHER.STATE.LOADING
          }
          message={
            fetcher.state === FETCHER.STATE.SUBMIT
              ? 'Submitting'
              : fetcher.state === FETCHER.STATE.LOADING
              ? 'Loading'
              : data.submitBtnMessage
          }
          className={'addAddress'}
        />
        <Button
          type="button"
          message="Cancel"
          className={'addAddress'}
          onClick={openModal}
        />
      </div>
    </fetcher.Form>
  );
}

const Button = ({message, styleType, ...rest}) => {
  return (
    <button {...rest} className={`defaultButton ${styleType}`}>
      {message}
    </button>
  );
};

const AddressIcon = ({formErrors = [], ...rest}) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={19}
    fill="none"
  >
    <path
      d="M7.5.688c4.039 0 7.313 3.274 7.313 7.313 0 3.09-2.171 6.458-6.457 10.139-.238.205-.542.317-.856.317a1.31 1.31 0 0 1-.856-.318l-.284-.246C2.263 14.306.188 11.021.188 8 .188 3.961 3.461.688 7.5.688zm0 4.5c-.746 0-1.461.296-1.989.824S4.688 7.254 4.688 8s.296 1.461.824 1.989a2.81 2.81 0 0 0 3.977 0 2.81 2.81 0 0 0 0-3.977c-.527-.527-1.243-.824-1.989-.824z"
      fill={formErrors.includes('country') ? '#FF5483' : '#4c4e56'}
      fillOpacity={0.5}
    />
  </svg>
);

const AddressModal = ({modalData, setModalData}) => {
  function handleClose() {
    setModalData((prevState) => ({...prevState, isOpen: !prevState.isOpen}));
  }

  return (
    <Modal.ModalBody isOpen={modalData.isOpen} handleClose={handleClose}>
      <Modal.ModalContainer title={modalData.title} message={modalData.message}>
        <Modal.ModalBtnContainer>
          <Modal.ModalButton
            message={modalData.submitBtnMessage}
            action={modalData.submitAction}
          />
          <Modal.ModalButton
            message={modalData.cancelBtnMessage}
            styleType="solid"
            action={handleClose}
          />
        </Modal.ModalBtnContainer>
      </Modal.ModalContainer>
    </Modal.ModalBody>
  );
};
