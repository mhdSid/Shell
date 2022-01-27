import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  loginAction,
  logoutAction,
  updateAction,
} from '../../redux/Auth/actions';
import isUndefined from 'lodash/isUndefined';
import {Loading} from '../Loading';
import {
  getLoggedInSelector,
  getUserSelector,
  getCountrySelector,
  getShowSignUpSelector,
  getVerificationCodeSelector,
} from './Selectors';
import {invoke} from 'lodash';

let SignUp = null;
let VerifyCode = null;
let Login = null;

const AuthComponent = React.memo(props => {
  const {loggedIn, user, showSignup, verificationCode, onClose} = props;
  if (loggedIn && user) {
    invoke(props, 'onClose');
    return null;
  }
  if (isUndefined(loggedIn) && isUndefined(user)) {
    return Loading;
  }
  if (showSignup === true && verificationCode) {
    if (!SignUp) {
      SignUp = require('./SignUp').default;
    }
    return <SignUp onClose={onClose} />;
  }
  if (verificationCode) {
    if (!VerifyCode) {
      VerifyCode = require('./VerifyCode').default;
    }
    return <VerifyCode onClose={onClose} />;
  }
  if (!Login) {
    Login = require('./Login').default;
  }
  return <Login onClose={onClose} />;
});

AuthComponent.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  country: PropTypes.oneOfType([PropTypes.string]),
  logout: PropTypes.func,
  login: PropTypes.func,
  updateUserAction: PropTypes.func,
  verificationCode: PropTypes.string,
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
    country: getCountrySelector(state),
    showSignup: getShowSignUpSelector(state),
    verificationCode: getVerificationCodeSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    updateUserAction: payload => dispatch(updateAction(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthComponent);
