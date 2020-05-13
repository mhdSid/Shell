import React, {createRef, useState, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login, logout, verify, signup} from '../../services/Auth';
import {
  loginAction,
  logoutAction,
  updateAction,
} from '../../redux/Auth/actions';
import {prefecturesList, countryCodeList} from '../../Constants/Countries';
import {monthsNumbers} from '../../Constants/Dates';
import isUndefined from 'lodash/isUndefined';
import {phoneNumbersRegexs, emailsRegex} from '../../Constants/Regexes';
import {Loading} from '../Loading';
import {
  // AdMobBanner,
  AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
} from 'react-native-admob';
import {profile, errors} from '../../Constants/Texts';
import Login from './Login';
import UserProfile from './UserProfile';
import VerifyUser from './VerifyUser';
import SignUp from './SignUp';

const AuthComponent = props => {
  const {
    loggedIn: _loggedIn,
    country: serverCountryCode,
    user,
    updateUserAction,
  } = props;
  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [_email, setEmail] = useState(undefined);
  const [_password, setPassword] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(undefined);
  const [showSignup, setShowSignup] = useState(false);
  const [emailPassChanged, setEmailPassChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [dobChanged, setDobChanged] = useState(false);
  const [firstNameChanged, setFirsNameChanged] = useState(false);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  const [mobileChanged, setMobileChanged] = useState(false);
  const [postalCodeChanged, setPostalCodeChanged] = useState(false);
  const [fullAddressChanged, setFullAddressChanged] = useState(false);
  const [cityWardChanged, setCityWardChanged] = useState(false);
  const [adId] = useState(1);
  const [year, setYear] = useState(profile.initialYear);
  const [month, setMonth] = useState(profile.initialMonth);
  const [day, setDay] = useState(profile.initialDay);
  const [gender, setGender] = useState(profile.male);
  const [country, setCountry] = useState(
    (user && user.country) ||
      (serverCountryCode && countryCodeList[serverCountryCode]) ||
      profile.japan,
  );
  const [prefecture, setPrefecture] = useState(
    (user && user.country && prefecturesList[user.country]) ||
      prefecturesList[countryCodeList[serverCountryCode]],
  );
  const emailRef = createRef();
  const passwordRef = createRef();
  const mobileRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const postalCodeRef = createRef();
  const cityWardRef = createRef();
  const fullAddressRef = createRef();
  const mobileRegex = new RegExp(phoneNumbersRegexs[country]);
  const userEmailRegex = new RegExp(emailsRegex);

  const updateCountry = value => {
    setCountry(value);
    setPrefecture(prefecturesList[value]);
  };
  const updatePrefecture = value => {
    setPrefecture(value);
  };
  const updateYear = value => {
    setYear(value);
    setDobChanged(true);
  };
  const updateMonth = value => {
    setMonth(value);
    setDobChanged(true);
  };
  const updateDay = value => {
    setDay(value);
    setDobChanged(true);
  };
  const updateGender = value => {
    return () => {
      setGender(value);
    };
  };
  const handleEmailChangeText = value => {
    if (value && value.match(userEmailRegex)) {
      setEmailChanged(true);
    } else {
      setEmailChanged(false);
    }
  };
  const handlePasswordChangeText = value => {
    if (value && value.length > 5) {
      setPasswordChanged(true);
    } else {
      setPasswordChanged(false);
    }
  };
  const handleMobileChangeText = value => {
    if (value && value.match(mobileRegex)) {
      setMobileChanged(true);
    } else {
      setMobileChanged(false);
    }
  };
  const handlePostalCodeChangeText = value => {
    if (value && value.length > 1) {
      setPostalCodeChanged(true);
    } else {
      setPostalCodeChanged(false);
    }
  };
  const handleFullAddressChangeText = value => {
    if (value && value.length > 3) {
      setFullAddressChanged(true);
    } else {
      setFullAddressChanged(false);
    }
  };
  const handleCityWardChangeText = value => {
    if (value && value.length > 2) {
      setCityWardChanged(true);
    } else {
      setCityWardChanged(false);
    }
  };
  const handleFirstNameChangeText = value => {
    if (value && value.length > 1) {
      setFirsNameChanged(true);
    } else {
      setFirsNameChanged(false);
    }
  };
  const handleLastNameChangeText = value => {
    if (value && value.length > 1) {
      setLastNameChanged(true);
    } else {
      setLastNameChanged(false);
    }
  };
  const setDefaultsDataChanged = () => {
    setUserDataChanged(false);
    setDobChanged(false);
    setFirsNameChanged(false);
    setLastNameChanged(false);
    setMobileChanged(false);
    setPostalCodeChanged(false);
    setFullAddressChanged(false);
    setCityWardChanged(false);
    setEmailChanged(false);
    setPasswordChanged(false);
  };
  const handleError = error => {
    const message = (error && error.message) || errors.error;
    invoke(props, 'logout', {loggedIn: false, user: false});
    setLoggedIn(false);
    setLoading(false);
    setVerificationId(undefined);
    if (showSignup === true && verificationId) {
      setDefaultsDataChanged();
    }
    if (message) {
      Alert.alert(message);
    }
    return;
  };
  /*
   * First submit Handler
   */
  const onSubmitSuccess = (email, password) => {
    return data => {
      const {error, user: authUser} = data;
      if (error) {
        return handleError(error);
      }
      const {
        verificationId: _verificationId,
        emailVerified,
        signedUp,
        email: __email,
        password: __password,
      } = authUser;
      // should should confirmation button and go to sign up screen afterwards
      if (emailVerified === false && _verificationId) {
        setEmail(email);
        setPassword(password);
        setLoading(false);
        // show confirmation button and request to /authenticate/email/verify with email and password again and verification id
        setVerificationId(_verificationId);
      }
      // user exists in the database and can login normally
      else if (emailVerified === true && _verificationId) {
        if (signedUp === false) {
          setVerificationId(_verificationId);
          setShowSignup(true);
          setEmail(__email);
          setPassword(__password);
          setLoading(false);
          return;
        }
        setLoggedIn(true);
        invoke(props, 'login', {
          loggedIn: true,
          user: authUser,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
  };
  const handleSubmit = () => {
    const {current: emailField} = emailRef;
    const {current: passField} = passwordRef;
    const email = emailField.value();
    const password = passField.value();
    if (email && password) {
      const lowerCaseEmail = email.toLowerCase();
      setLoading(true);
      login({email: lowerCaseEmail, password}).then(
        onSubmitSuccess(lowerCaseEmail, password),
        handleError,
      );
    }
  };
  /*
   * Verify user Handler
   */
  // show confirmation button and request to /authenticate/email/verify with email and password again and verification id
  const onVerifyUserSuccess = data => {
    const {error, user: authUser} = data;
    if (error) {
      return handleError(error);
    }
    const {verificationId: _verificationId, emailVerified} = authUser;
    if (emailVerified === true && _verificationId) {
      setLoading(false);
      setShowSignup(true);
    }
  };
  const handleVerifyUser = () => {
    if (_email && _password && verificationId) {
      setLoading(true);
      verify({email: _email, password: _password, verificationId}).then(
        onVerifyUserSuccess,
        handleError,
      );
    }
  };
  /*
   * signup Handler
   */
  const onSignupSuccess = data => {
    const {error, user: authUser} = data;
    if (error) {
      return handleError(error);
    }
    const {verificationId: _verificationId, emailVerified, signedUp} = authUser;
    if (
      emailVerified === true &&
      _verificationId &&
      _verificationId === verificationId &&
      authUser.email === _email &&
      signedUp === true
    ) {
      setShowSignup(false);
      setVerificationId(undefined);
      setLoggedIn(true);
      setDefaultsDataChanged();
      invoke(props, 'login', {
        loggedIn: true,
        user: authUser,
      });
      setLoading(false);
    }
  };
  const handleSignup = () => {
    const {current: firstNameField} = firstNameRef;
    const {current: lastNameField} = lastNameRef;
    const {current: mobileField} = mobileRef;
    const {current: postalCodeField} = postalCodeRef;
    const {current: fullAddressField} = fullAddressRef;
    const {current: cityWardField} = cityWardRef;
    const firstName = firstNameField.value();
    const lastName = lastNameField.value();
    const mobile = mobileField.value();
    const postalCode = postalCodeField.value();
    const fullAddress = fullAddressField.value();
    const cityWard = cityWardField.value();
    if (
      _email &&
      _password &&
      mobile &&
      verificationId &&
      prefecture &&
      country &&
      postalCode &&
      firstName &&
      lastName &&
      fullAddress &&
      cityWard
    ) {
      const newUser = {
        email: _email,
        password: _password,
        verificationId,
        dob: new Date(`${year}/${monthsNumbers[month]}/${day}`),
        gender,
        mobile,
        country,
        prefecture,
        firstName,
        lastName,
        postalCode,
        fullAddress,
        cityWard,
      };
      setLoading(true);
      signup(newUser).then(onSignupSuccess, handleError);
    }
  };
  /*
   * Logout Handler
   */
  const onLogoutSuccess = () => {
    invoke(props, 'logout', {loggedIn: false, user: false});
    setLoggedIn(false);
    setLoading(false);
    setDefaultsDataChanged();
  };
  const handleLogout = () => {
    setLoading(true);
    logout().then(onLogoutSuccess, handleError);
  };

  useEffect(() => {
    if (loggedIn && user) {
      AdMobInterstitial.setAdUnitID('ca-app-pub-5703846930890914/6721660483');
      // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
  }, [adId]);

  useEffect(() => {
    setLoggedIn(_loggedIn);
  }, [_loggedIn]);

  useEffect(() => {
    setEmailPassChanged(emailChanged && passwordChanged);
  }, [emailChanged, passwordChanged]);

  useEffect(() => {
    setUserDataChanged(
      dobChanged &&
        firstNameChanged &&
        lastNameChanged &&
        mobileChanged &&
        postalCodeChanged &&
        fullAddressChanged &&
        cityWardChanged,
    );
  }, [
    dobChanged,
    firstNameChanged,
    lastNameChanged,
    mobileChanged,
    postalCodeChanged,
    fullAddressChanged,
    cityWardChanged,
  ]);

  if (isUndefined(_loggedIn) && isUndefined(user)) {
    return Loading;
  }

  if (showSignup === true && verificationId) {
    return (
      <SignUp
        loading={loading}
        handleFirstNameChangeText={handleFirstNameChangeText}
        firstNameRef={firstNameRef}
        handleLastNameChangeText={handleLastNameChangeText}
        lastNameRef={lastNameRef}
        handleMobileChangeText={handleMobileChangeText}
        mobileRef={mobileRef}
        gender={gender}
        updateGender={updateGender}
        month={month}
        updateMonth={updateMonth}
        handleSignup={handleSignup}
        userDataChanged={userDataChanged}
        fullAddressRef={fullAddressRef}
        day={day}
        handleFullAddressChangeText={handleFullAddressChangeText}
        cityWardRef={cityWardRef}
        handleCityWardChangeText={handleCityWardChangeText}
        updateDay={updateDay}
        year={year}
        updateYear={updateYear}
        country={country}
        updateCountry={updateCountry}
        handlePostalCodeChangeText={handlePostalCodeChangeText}
        postalCodeRef={postalCodeRef}
        prefecture={prefecture}
        updatePrefecture={updatePrefecture}
      />
    );
  }

  if (verificationId) {
    return <VerifyUser loading={loading} handleVerifyUser={handleVerifyUser} />;
  }

  if (loggedIn && user) {
    return (
      <UserProfile
        loading={loading}
        user={user}
        handleLogout={handleLogout}
        updateUserAction={updateUserAction}
      />
    );
  }

  return (
    <Login
      loading={loading}
      handleEmailChangeText={handleEmailChangeText}
      emailRef={emailRef}
      handlePasswordChangeText={handlePasswordChangeText}
      passwordRef={passwordRef}
      emailPassChanged={emailPassChanged}
      handleSubmit={handleSubmit}
    />
  );
};

AuthComponent.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  country: PropTypes.oneOfType([PropTypes.string]),
  logout: PropTypes.func,
  login: PropTypes.func,
  updateUserAction: PropTypes.func,
};

const mapStateToProps = ({authReducer}) => {
  return {
    loggedIn: authReducer.loggedIn,
    user: authReducer.user,
    country: authReducer.country,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    updateUserAction: payload => dispatch(updateAction(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
