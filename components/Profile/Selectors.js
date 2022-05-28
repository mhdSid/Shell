import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getLoggedIn = state => state.authReducer.loggedIn;
const getEmail = state => state.authReducer.email;
const getPasswordHash = state => state.authReducer.passwordHash;
const getVerificationCode = state => state.authReducer.verificationCode;
const getCountry = state => state.authReducer.country;
const getShowSignUp = state => state.authReducer.showSignup;

export const getUserSelector = createSelector(
  [getUser],
  user => user,
);

export const getUserIdSelector = createSelector(
  [getUser],
  user => (user ? user.id : null),
);

export const getLoggedInSelector = createSelector(
  [getLoggedIn],
  loggedIn => loggedIn,
);

export const getEmailSelector = createSelector(
  [getEmail],
  email => email,
);

export const getPasswordHashSelector = createSelector(
  [getPasswordHash],
  passwordHash => passwordHash,
);

export const getVerificationCodeSelector = createSelector(
  [getVerificationCode],
  verificationCode => verificationCode,
);

export const getCountrySelector = createSelector(
  [getCountry],
  country => country,
);

export const getShowSignUpSelector = createSelector(
  [getShowSignUp],
  showSignup => showSignup,
);
