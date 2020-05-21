import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getLoggedIn = state => state.authReducer.loggedIn;
const getEmail = state => state.authReducer.email;
const getPassword = state => state.authReducer.password;
const getVerificationId = state => state.authReducer.verificationId;
const getCountry = state => state.authReducer.country;
const getShowSignUp = state => state.authReducer.showSignup;

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

const getLoggedInSelector = createSelector(
  [getLoggedIn],
  loggedIn => loggedIn,
);

const getEmailSelector = createSelector(
  [getEmail],
  email => email,
);

const getPasswordSelector = createSelector(
  [getPassword],
  password => password,
);

const getVerificationIdSelector = createSelector(
  [getVerificationId],
  verificationId => verificationId,
);

const getCountrySelector = createSelector(
  [getCountry],
  country => country,
);

const getShowSignUpSelector = createSelector(
  [getShowSignUp],
  showSignup => showSignup,
);

export {
  getUserSelector,
  getLoggedInSelector,
  getEmailSelector,
  getPasswordSelector,
  getVerificationIdSelector,
  getCountrySelector,
  getShowSignUpSelector,
};
