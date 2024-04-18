export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  UPDATE: 'UPDATE',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const FETCHER = {
  STATE: {
    IDLE: 'idle',
    SUBMIT: 'submitting',
    LOADING: 'loading',
  },
  TYPE: {
    ACTION_SUBMISSION: 'actionSubmission',
    ACTION_RELOAD: 'actionReload',
    DONE: 'done',
  },
};

// Form Action Types
export const FORM_ACTIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

// Accounts
export const SIGN_IN_EMAIL = 'signInEmail';
export const SIGN_IN_PASSWORD = 'signInPassword';
export const FORGOT_EMAIL = 'forgotEmail';
export const SUBMIT_BUTTON_TEXT = 'Submit';
export const CANCEL_BUTTON_TEXT = 'Cancel';
export const FORGOT_PASSWORD = 'Forgot your password?';
export const REGISTER_LINK_TEXT = 'Create Account';

export const MESSAGE_ERROR = {
  EMAIL: {
    BAD_DOMAIN: 'Oops - please make sure your email  is formatted correctly.',
    BLANK: 'Please enter an email',
    CONTAINS_HTML_TAGS: 'Please enter a valid email address',
    CONTAINS_URL: 'Please enter a valid email address',
    CUSTOMER_DISABLED:
      'Your account is disabled. Please sign up with a different email address or contact us for help',
    INVALID: 'Please enter a valid email address.',
    INVALID_MULTIPASS_REQUEST: 'Error',
    NOT_FOUND:
      'Looks like you haven’t registered your email yet - create a new account here.',
    TAKEN:
      'An account already exists with the email address.  Sign in to your existing account or sign up with a different email.',
    TOKEN_INVALID: 'Error',
    TOO_LONG:
      'The email address you entered is too long. Please enter a valid email address.',
    TOO_SHORT: 'Please enter a valid email address.',
    UNIDENTIFIED_CUSTOMER:
      'The email address you entered don\'t match any TULA account. Please try again.',
  },
  PASSWORD: {
    ALREADY_ENABLED:
      'Looks like you already have an account with us. Sign in or reset your password here.',
    BLANK: 'Please enter an password',
    CONTAINS_HTML_TAGS: 'Please enter a valid password',
    CONTAINS_URL: 'Please enter a valid password',
    INVALID: 'Your password is incorrect.',
    INVALID_MULTIPASS_REQUEST: 'Error',
    PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE:
      'Passwords must not contain spaces/spacing. Please remove if included.',
    TOKEN_INVALID: 'Error',
    TOO_LONG:
      'The password you entered is too long. Please enter a valid password.',
    TOO_SHORT:
      'For safety purposes, passwords must be a minimum of 5 characters. Please re-enter.',
    UNIDENTIFIED_CUSTOMER:
      'The password you entered don\'t match any TULA account. Please try again.',
  },
};

export const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District Of Columbia',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

// SUBSCRIPTIONS

export const CANCEL_REASONS = [
  'I stopped using this product',
  'I no longer have any use for this product and I will not need it in the near future',
  'I wanted to switch to a different product',
  'I had trouble managing my subscription',
  'I don\'t like this product',
  'This product is too expensive',
  'I have too many of this product',
  'Other (please specify)',
];
