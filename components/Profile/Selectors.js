import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getLoggedIn = state => state.authReducer.loggedIn;
const getEmail = state => state.authReducer.email;
const getPasswordHash = state => state.authReducer.passwordHash;
const getVerificationCode = state => state.authReducer.verificationCode;
const getCountry = state => state.authReducer.country;
const getShowSignUp = state => state.authReducer.showSignup;

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

const getUserIdSelector = createSelector(
  [getUser],
  user => (user ? user.id : null),
);

const getLoggedInSelector = createSelector(
  [getLoggedIn],
  loggedIn => loggedIn,
);

const getEmailSelector = createSelector(
  [getEmail],
  email => email,
);

const getPasswordHashSelector = createSelector(
  [getPasswordHash],
  passwordHash => passwordHash,
);

const getVerificationCodeSelector = createSelector(
  [getVerificationCode],
  verificationCode => verificationCode,
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
  getPasswordHashSelector,
  getVerificationCodeSelector,
  getCountrySelector,
  getShowSignUpSelector,
  getUserIdSelector,
};
