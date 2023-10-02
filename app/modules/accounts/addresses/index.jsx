import { useEffect, useRef, useState } from 'react';
import { useStore } from '~/hooks/useStore';
import styles from './styles.css';
import { useFetcher } from '@remix-run/react';
import { API_METHODS, FETCHER, FORM_ACTIONS, US_STATES } from '~/utils/constants';

export function links() {
  return [
    { rel: 'stylesheet', href: styles }
  ];
}
export default function Addresses() {
  const data = useStore(store => store?.account?.data ?? null);
  const [showAddAddressForm, setShowAddAddressForm] = useState({
    headerMessage: 'Add New Address',
    submitBtnMessage: 'Add address',
    formAction: FORM_ACTIONS.CREATE,
  });

  return showAddAddressForm.id ? (
    <div id="addressTab" className={'mainContainer'}>
      <Form data={{
        headerMessage: showAddAddressForm?.headerMessage,
        submitBtnMessage: showAddAddressForm?.submitBtnMessage,
        closeForm: () => setShowAddAddressForm({ id: null }),
        ...showAddAddressForm
      }} />
    </div>
  ) : (
    <div id="addressTab" className={'mainContainer'}>
      <div className="dataContainer">
        <div className="accountDetailsContainer">
          <div className={'headerContainer'}>
            <h3 className={'headerTitle'}>Account Details</h3>
          </div>
          <h3 className={'accountName'}>{
            (data?.defaultAddress?.firstName !== '' ? data.defaultAddress.firstName : data?.firstName)
            + ' ' +
            (data?.defaultAddress?.lastName !== '' ? data.defaultAddress.lastName : data?.lastName)
          }</h3>
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
              onClick={() => setShowAddAddressForm({
                id: ' ',
                headerMessage: 'Add New Address',
                submitBtnMessage: 'Add address',
                formAction: FORM_ACTIONS.CREATE
              })}
            >
              + Add New Address
            </button>
          </div>
          {
            data?.addresses && data.addresses?.length > 0 ? (
              <div className={'addressListContainer'}>
                {
                  data.addresses.sort((a, b) => {
                    a.isDefault = data?.defaultAddress?.id === a.id;
                    b.isDefault = data?.defaultAddress?.id === b.id;
                    return b.isDefault - a.isDefault;
                  }).map(address => <div key={`address-${address.id}`}>
                    <AddressBox data={{
                      editAddress: () => setShowAddAddressForm({
                        headerMessage: 'Edit Address',
                        submitBtnMessage: 'Update address',
                        formAction: FORM_ACTIONS.UPDATE,
                        ...address
                      }),
                      ...address
                    }} />
                  </div>)
                }
              </div>
            ) : (<p className={'noAddressesMessage'}>
              <strong>No addesses saved yet</strong>
              <br />
              <span>
                Shipping addresses used at checkout will be saved here or you
                can &nbsp;
              </span>
              <span
                className={'editButton'}
                onClick={() => setShowAddAddressForm({
                  id: ' ',
                  headerMessage: 'Add New Address',
                  submitBtnMessage: 'Add address',
                  formAction: FORM_ACTIONS.CREATE,
                })}
              >
                add a new address now.
              </span>
            </p>)
          }
        </div>
      </div>
    </div>
  );
}

const AddressBox = ({ data = null }) => {
  return (
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
        <div className={'verticalSeparator'} />
        <RemoveAddress addressId={data.id} />
      </div>
    </div>
  );
};

function RemoveAddress({ addressId }) {
  const fetcher = useFetcher();
  const { removeAddress } = useStore(store => store?.account ?? null);
  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.DONE && fetcher.data?.addresses) {
      removeAddress(addressId);
    }
  }, [fetcher.type]);
  return <fetcher.Form action='/account' method={API_METHODS.DELETE} >
    <input type="hidden" name="addressId" value={addressId} required />
    <button
      className={'addressBtn'}
      type="submit"
    >
      {
        fetcher.state === FETCHER.STATE.SUBMIT || fetcher.state === FETCHER.STATE.LOADING ? '...Removing Address' : 'Remove Address'
      }
    </button>
  </fetcher.Form>;
}

function Form({ data }) {
  const fetcher = useFetcher();
  const { updateAddresses } = useStore(store => store?.account ?? null);
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

  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.DONE && fetcher.data?.addresses) {
      updateAddresses(fetcher.data);
      data.closeForm();
    }
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
      ref.current.getAttribute('data-format')
    );
    ref.current.value = doFormat(
      ref.current.value,
      ref.current.getAttribute('data-format'),
      ref.current.getAttribute('data-mask')
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
    const { name, value } = e.target || e.current;
    if (name === 'zip') {
      if (value === '' && !formErrors.includes(name)) {
        setErrors([...formErrors, name]);
      }
      if (value !== '' && formErrors.includes(name)) {
        const errors = formErrors.filter((error) => error !== name);
        setErrors(errors);
      }
      return setForm((prevFormData) => ({ ...prevFormData, [name]: value.replace(regex, '') }));
    } else {
      if (value === '' && !formErrors.includes(name)) {
        setErrors([...formErrors, name]);
      }
      if (value !== '' && formErrors.includes(name)) {
        const errors = formErrors.filter((error) => error !== name);
        setErrors(errors);
      }
      return setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };


  return <fetcher.Form className={'formContainer'} action='/account' method={API_METHODS.POST}>
    {data?.headerMessage && <h2 className={'formTitle'}>{data.headerMessage}</h2>}
    <input type="hidden" name="formAction" value={data?.formAction} />
    {
      data?.formAction === FORM_ACTIONS.UPDATE &&
      <input type="hidden" name="addressId" value={data?.id} />
    }
    <p className={'formInfoText'}>* indicates a required field</p>
    <div className={'formGroup'}>
      <span className={'inputCell'}>
        <label className={'inputLabel'}>First Name*</label>
        <input
          name="firstName"
          className={`formInput ${formErrors.includes('firstName') && 'formInputError'}`}
          placeholder="First Name"
          value={form?.firstName ?? data?.firstName}
          onChange={handleOnChange}
          required
        />
        {formErrors.includes('firstName') && (
          <p className={'errorMessage'}>*Required</p>
        )}
      </span>
      <span className={'inputCell'}>
        <label className={'inputLabel'}>Last Name*</label>
        <input
          name="lastName"
          className={`formInput ${formErrors.includes('lastName') && 'formInputError'}`}
          placeholder="Last Name"
          value={form?.lastName ?? data?.lastName}
          onChange={handleOnChange}
          required
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
          className={`formInput ${formErrors.includes('streetAddress') && 'formInputError'}`}
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
          className={`formInput ${formErrors.includes('city') && 'formInputError'}`}
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
          className={`formInput ${formErrors.includes('province') && 'formInputError'}`}
          name="countryContainer"
          required
        >
          <AddressIcon
            style={{ position: 'absolute', top: '25%', left: 16 }}
            formErrors={formErrors}
          />
          <select
            name="province"
            value={form?.province}
            className={'countrySelect'}
            onChange={handleOnChange}
            required
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
          className={`formInput ${formErrors.includes('zip') && 'formInputError'}`}
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
          className={`formInput ${formErrors.includes('country') && 'formInputError'}`}
          value={'United States'}
          onChange={handleOnChange}
          readOnly
          required
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
          name='isDefault'
          readOnly
          checked={form?.isDefault}
          value={form?.isDefault}
          onClick={() => setForm({ ...form, isDefault: !form?.isDefault })}
        />
        <span className={'checkmark'}></span>
      </label>
      <p>Set as default address</p>
    </div>
    <div className={'formBtnContainer'}>
      <Button
        type="submit"
        styleType="solid"
        disabled={formErrors.length > 0}
        message={
          fetcher.state === FETCHER.STATE.SUBMIT ? 'Submitting' :
            fetcher.state === FETCHER.STATE.LOADING ? 'Loading' :
              data.submitBtnMessage
        }
        className={'addAddress'}
      />
      <Button
        type="button"
        message="Cancel"
        className={'addAddress'}
        onClick={data?.closeForm}
      />
    </div>
  </fetcher.Form>;
}

const Button = ({ message, styleType, ...rest }) => {
  return (
    <button
      {...rest}
      className={`defaultButton ${styleType}`}
    >
      {message}
    </button>
  );
};

const AddressIcon = ({ formErrors = [], ...rest }) => (
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