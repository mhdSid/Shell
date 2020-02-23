import React, {createRef, useState, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {
  View,
  Picker,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';
import {
  Button,
  RadioButton,
  Drawer,
  Avatar,
  Icon,
} from 'react-native-material-ui';
import {login, logout, verify, signup} from '../../services/auth';
import {
  loginAction,
  logoutAction,
  updateAction,
} from '../../redux/Auth/actions';
import sharedStyles from '../../assets/styles/sharedStyles';
import {
  countries,
  prefectures,
  prefecturesList,
  countryCodeList,
} from '../../Constants/Countries';
import {months, days, years, monthsNumbers} from '../../Constants/Dates';
import isUndefined from 'lodash/isUndefined';
import Settings from '../Settings';
import UpdateUser from '../UpdateUser';
import Notifications from '../Notifications';
import MyAds from '../MyAds';
import MyLotteries from '../MyLotteries';
import AppInfo from '../AppInfo';
import {phoneNumbersRegexs, emailsRegex} from '../../Constants/Regexes';
import {loadingPopup, Loading} from '../Loading';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import About from '../About';
import {
  // AdMobBanner,
  AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
} from 'react-native-admob';

const AuthComponent = props => {
  const {loggedIn: _loggedIn, country: serverCountryCode, user} = props;
  console.log('authComponent: ', user);

  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [_email, setEmail] = useState(undefined);
  const [_password, setPassword] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(undefined);
  const [showSignup, setShowSignup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showMyAds, setShowMyAds] = useState(false);
  const [showMyLotteries, setShowMyLotteries] = useState(false);
  const [showAppInfo, setShowAppInfo] = useState(false);

  const [emailPassChanged, setEmailPassChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [dobChanged, setDobChanged] = useState(false);
  const [firstNameChanged, setFirsNameChanged] = useState(false);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  const [mobileChanged, setMobileChanged] = useState(false);
  const [adId, setAdId] = useState(1);

  const [year, setYear] = useState('2020');
  const [month, setMonth] = useState('April');
  const [day, setDay] = useState('01');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState(
    (user && user.country) ||
      (serverCountryCode && countryCodeList[serverCountryCode]) ||
      'Japan',
  );
  const [prefecture, setPrefecture] = useState(
    (user && user.country && prefecturesList[user.country]) ||
      prefecturesList[countryCodeList[serverCountryCode]],
  );

  useEffect(() => {
    if (loggedIn && user) {
      AdMobInterstitial.setAdUnitID('ca-app-pub-5703846930890914/6721660483');
      // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
  }, [adId, loggedIn, user]);

  const onSettingsClose = () => {
    setShowSettings(false);
  };
  const onNotificationsClose = () => {
    setShowNotifications(false);
  };
  const onMyAdsClose = () => {
    setShowMyAds(false);
  };
  const onAboutClose = () => {
    setShowAbout(false);
  };
  const onMyLotteriesClose = () => {
    setShowMyLotteries(false);
  };
  const OnAppInfoClose = () => {
    setShowAppInfo(false);
  };

  const onUpdateUserClose = () => {
    setShowUpdateUser(false);
  };

  // console.log(perfecture, 'serverCountryCode: ', serverCountryCode);

  const emailRef = createRef();
  const passwordRef = createRef();
  const mobileRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();

  const text = 'Login / Signup';

  const mobileRegex = new RegExp(phoneNumbersRegexs[country]);

  const userEmailRegex = new RegExp(emailsRegex);

  useEffect(() => {
    setLoggedIn(_loggedIn);
  }, [_loggedIn]);

  useEffect(() => {
    setUserDataChanged(
      dobChanged && firstNameChanged && lastNameChanged && mobileChanged,
    );
    setEmailPassChanged(emailChanged && passwordChanged);
  }, [
    dobChanged,
    firstNameChanged,
    lastNameChanged,
    mobileChanged,
    emailChanged,
    passwordChanged,
  ]);

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
  };

  const handleError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    invoke(props, 'logout', {loggedIn: false, user: false});
    setLoggedIn(false);
    setLoading(false);
    setVerificationId(undefined);
    // setUser(null);

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
    const firstName = firstNameField.value();
    const lastName = lastNameField.value();
    const {current: mobileField} = mobileRef;
    const mobile = mobileField.value();
    if (
      _email &&
      _password &&
      mobile &&
      verificationId &&
      prefecture &&
      country &&
      firstName &&
      lastName
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
  };

  const handleLogout = () => {
    setLoading(true);
    logout().then(onLogoutSuccess, handleError);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };
  const handleShowUpdateUser = () => {
    setShowUpdateUser(true);
  };

  const handleShowNotifications = () => {
    setShowNotifications(true);
  };

  const handleShowAbout = () => {
    setShowAbout(true);
  };

  const handleShowMyAds = () => {
    setShowMyAds(true);
  };

  const handleShowMyLotteries = () => {
    setShowMyLotteries(true);
  };

  const handleShowAppInfo = () => {
    setShowAppInfo(true);
  };

  //   const formatText = text => {
  //     return text.replace(/[^+\d]/g, '');
  //   };
  // if (!didInit) {
  //   console.log('showing null because did not init yet');

  //   return null;
  // }

  if (isUndefined(_loggedIn) && isUndefined(user)) {
    return Loading;
  }

  if (showSignup === true && verificationId) {
    return (
      <View style={sharedStyles.fullheightView}>
        {loading && loadingPopup}

        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={25}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={
                // sharedStyles.signupView,
                sharedStyles.loginContainer
                // sharedStyles.keyboardPaddingBottom,
              }>
              <View style={sharedStyles.nameContainer}>
                <Text style={sharedStyles.label}>First Name</Text>
                <TextField
                  label="First Name"
                  // keyboardType="phone-pad"
                  // formatText={formatText}
                  // onSubmitEditing={onSubmit}
                  tintColor={'#b69cf6'}
                  onChangeText={handleFirstNameChangeText}
                  // baseColor="#7f0000"
                  ref={firstNameRef}
                  disabled={loading}
                />
              </View>

              <View style={sharedStyles.nameContainer}>
                <Text style={sharedStyles.label}>Last Name</Text>
                <TextField
                  label="Last Name"
                  // keyboardType="phone-pad"
                  // formatText={formatText}
                  // onSubmitEditing={onSubmit}
                  onChangeText={handleLastNameChangeText}
                  tintColor={'#b69cf6'}
                  // baseColor="#7f0000"
                  ref={lastNameRef}
                  disabled={loading}
                />
              </View>

              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Phone Number</Text>
                <TextField
                  label="Mobile"
                  keyboardType="phone-pad"
                  // formatText={formatText}
                  // onSubmitEditing={onSubmit}
                  tintColor={'#b69cf6'}
                  onChangeText={handleMobileChangeText}
                  // baseColor="#7f0000"
                  ref={mobileRef}
                  disabled={loading}
                />
              </View>

              <View style={sharedStyles.genderContainer}>
                <Text style={sharedStyles.label}>Gender</Text>
                <View style={sharedStyles.genderView}>
                  <RadioButton
                    label="Male"
                    checked={gender === 'Male'}
                    value="Male"
                    onSelect={updateGender('Male')}
                  />
                  <RadioButton
                    label="Female"
                    checked={gender === 'Female'}
                    value="Female"
                    onSelect={updateGender('Female')}
                  />
                </View>
              </View>

              <View style={sharedStyles.dobContainer}>
                <Text style={[sharedStyles.dobLabel, sharedStyles.label]}>
                  Date of birth
                </Text>
                <View style={sharedStyles.dobView}>
                  <Picker
                    mode="dropdown"
                    selectedValue={month}
                    style={sharedStyles.dobViewItem}
                    onValueChange={updateMonth}>
                    {months.map((_month, index) => (
                      <Picker.Item key={index} label={_month} value={_month} />
                    ))}
                  </Picker>
                  <Picker
                    mode="dropdown"
                    selectedValue={day}
                    style={sharedStyles.dobViewItem}
                    onValueChange={updateDay}>
                    {days.map((_day, index) => (
                      <Picker.Item key={index} label={_day} value={_day} />
                    ))}
                  </Picker>
                  <Picker
                    mode="dropdown"
                    selectedValue={year}
                    style={sharedStyles.dobViewItem}
                    onValueChange={updateYear}>
                    {years.map((_year, index) => (
                      <Picker.Item key={index} label={_year} value={_year} />
                    ))}
                  </Picker>
                </View>
              </View>

              <Text style={sharedStyles.label}>Country</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={country}
                  // style={sharedStyles.dobViewItem}
                  onValueChange={updateCountry}>
                  {countries.map((_country, index) => (
                    <Picker.Item
                      key={index}
                      label={_country}
                      value={_country}
                    />
                  ))}
                </Picker>
              </View>

              {/* {perfecture && ( */}
              <>
                <Text style={sharedStyles.label}>Prefecture</Text>
                <View style={sharedStyles.pickerView}>
                  <Picker
                    mode="dropdown"
                    selectedValue={prefecture}
                    // style={sharedStyles.dobViewItem}
                    onValueChange={updatePrefecture}>
                    {prefectures[country].map((_prefecture, index) => (
                      <Picker.Item
                        key={index}
                        label={_prefecture}
                        value={_prefecture}
                      />
                    ))}
                  </Picker>
                </View>
              </>
              {/* )} */}

              <View style={sharedStyles.loginBtn}>
                <Button
                  disabled={loading || !userDataChanged}
                  raised={true}
                  primary
                  text={'Sign up'}
                  onPress={handleSignup}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  if (verificationId) {
    return (
      <View style={sharedStyles.fullheightView}>
        {loading && loadingPopup}

        <View style={sharedStyles.loginContainer}>
          <View style={sharedStyles.loginBtn}>
            <Button
              raised={true}
              primary
              text={'Verify'}
              onPress={handleVerifyUser}
              disabled={loading}
            />
          </View>

          <Text style={sharedStyles.verificationLabel}>
            Please check your inbox in order to verify your email
          </Text>
        </View>
      </View>
    );
  }

  if (loggedIn && user) {
    return (
      <View style={sharedStyles.fullheightView}>
        {loading && loadingPopup}

        <View
          style={
            sharedStyles.loggedInContainer
            // showSettings && sharedStyles.backdrop,
          }>
          <Drawer>
            <Drawer.Header
              image={
                <CachedImage
                  cache="force-cache"
                  blurRadius={15}
                  source={{uri: user.image}}
                  style={sharedStyles.profileBlurredImage}>
                  <View style={sharedStyles.profileBlur} />
                </CachedImage>
              }
              style={{
                contentContainer: sharedStyles.profileHeaderContentContainer,
              }}>
              <Drawer.Header.Account
                style={{
                  container: sharedStyles.profileHeaderContainer,
                  // accountContainer: {
                  //   // backgroundColor: '#b69cf6',
                  // },
                  avatarsContainer: sharedStyles.profileAvatarContainer,
                }}
                avatar={
                  <Avatar
                    image={
                      user.image ? (
                        <CachedImage
                          style={sharedStyles.profileImage}
                          cache="force-cache"
                          source={{uri: user.image}}
                        />
                      ) : (
                        <Icon name="image" />
                      )
                    }
                    // text="A"
                  />
                }
                // accounts={[
                //   {avatar: <Avatar text="B" />},
                //   {avatar: <Avatar text="C" />},
                // ]}
                footer={{
                  dense: true,
                  centerElement: {
                    primaryText: (
                      <Text style={sharedStyles.profileUserText}>
                        {`${user.firstName} ${user.lastName}`}
                      </Text>
                    ),
                    secondaryText: (
                      <Text
                        style={
                          sharedStyles.profileUserText
                        }>{`${user.gameStatus} • ${user.gamePoints} Points - ${user.prefecture}, ${user.country}`}</Text>
                    ),
                  },
                  rightElement: (
                    <Button
                      onPress={handleShowUpdateUser}
                      icon="edit"
                      text=""
                      primary
                    />
                    // <Icon
                    //   style={{marginRight: 10}}
                    //   color="#d9d9d9"
                    //   name="edit"
                    // />
                  ),
                  // onRightElementPress: ,
                }}
              />
            </Drawer.Header>
            <Drawer.Section
              divider
              items={[
                {
                  icon: 'help',
                  value: 'How To Use The App',
                  onPress: handleShowAbout,
                },
                {
                  icon: 'bookmark-border',
                  value: 'Notifications',
                  onPress: handleShowNotifications,
                },
                // {icon: 'today', value: 'Calendar', active: true},
                {icon: 'people', value: 'My Ads', onPress: handleShowMyAds},
                {
                  icon: 'grade',
                  value: 'My Lotteries',
                  onPress: handleShowMyLotteries,
                },
                // {icon: 'history', value: 'History'},
              ]}
            />
            <Drawer.Section
              title="Personal"
              items={[
                {
                  icon: 'settings',
                  value: 'Settings',
                  onPress: handleShowSettings,
                },
                {icon: 'exit-to-app', value: 'Logout', onPress: handleLogout},
                {icon: 'info', value: 'Info', onPress: handleShowAppInfo},
              ]}
            />
          </Drawer>
          {showSettings && <Settings onClose={onSettingsClose} />}
          {showNotifications && (
            <Notifications onClose={onNotificationsClose} />
          )}
          {showMyAds && <MyAds onClose={onMyAdsClose} />}
          {showAbout && <About onClose={onAboutClose} />}
          {showMyLotteries && <MyLotteries onClose={onMyLotteriesClose} />}
          {showAppInfo && <AppInfo onClose={OnAppInfoClose} />}

          {showUpdateUser && (
            <UpdateUser
              onClose={onUpdateUserClose}
              user={user}
              updateUserAction={props.updateUserAction}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={sharedStyles.fullheightView}>
      {loading && loadingPopup}

      <View style={sharedStyles.loginContainer}>
        <TextField
          label="Email"
          //  keyboardType="phone-pad"
          // formatText={formatText}
          // onSubmitEditing={onSubmit}
          onChangeText={handleEmailChangeText}
          ref={emailRef}
          tintColor={'#b69cf6'}
          disabled={loading}
        />

        <TextField
          label="Password"
          onChangeText={handlePasswordChangeText}
          // keyboardType="phone-pad"
          // formatText={formatText}
          // onSubmitEditing={onSubmit}
          ref={passwordRef}
          secureTextEntry={true}
          disabled={loading}
          tintColor={'#b69cf6'}
        />
        <View style={sharedStyles.loginBtn}>
          <Button
            disabled={loading || !emailPassChanged}
            raised={true}
            primary
            text={text}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

AuthComponent.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  country: PropTypes.oneOfType([PropTypes.string]),
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
