import React, {createRef, useState, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {
  View,
  Picker,
  ScrollView,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';
import {Button, RadioButton, Drawer, Avatar} from 'react-native-material-ui';
import {login, logout, verify, signup} from '../../services/auth';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import sharedStyles from '../../assets/styles/sharedStyles';
import {
  countries,
  perfectures,
  perfecturesList,
  countryCodeList,
} from '../../Constants/Countries';
import {months, days, years} from '../../Constants/Dates';
import isUndefined from 'lodash/isUndefined';

const AuthComponent = props => {
  const {loggedIn: _loggedIn, country: serverCountryCode, user} = props;

  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [_email, setEmail] = useState(undefined);
  const [_password, setPassword] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(undefined);
  const [showSignup, setShowSignup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [year, setYear] = useState('2020');
  const [month, setMonth] = useState('April');
  const [day, setDay] = useState('31');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState(
    (user && user.country) || countryCodeList[serverCountryCode],
  );
  const [perfecture, setPerfecture] = useState(
    perfecturesList[countryCodeList[serverCountryCode]],
  );

  useEffect(() => {
    setLoggedIn(_loggedIn);
  }, [_loggedIn]);

  console.log(perfecture, 'serverCountryCode: ', serverCountryCode);

  const emailRef = createRef();
  const passwordRef = createRef();
  const mobileRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();

  const text = 'Login / Signup';

  const updateCountry = value => {
    setCountry(value);
    setPerfecture(perfecturesList[value]);
  };

  const updatePerfecture = value => {
    setPerfecture(value);
  };

  const updateYear = value => {
    setYear(value);
  };

  const updateMonth = value => {
    setMonth(value);
  };

  const updateDay = value => {
    setDay(value);
  };

  const updateGender = value => {
    return () => {
      setGender(value);
    };
  };

  const handleError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    invoke(props, 'logout', {loggedIn: false, user: false});
    setLoggedIn(false);
    setLoading(false);
    setVerificationId(undefined);
    // setUser(null);

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
      setLoading(true);
      login({email, password}).then(
        onSubmitSuccess(email, password),
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
      perfecture &&
      country &&
      firstName &&
      lastName
    ) {
      const newUser = {
        email: _email,
        password: _password,
        verificationId,
        dob: new Date(`${year}/${month}/${day}`),
        gender,
        mobile,
        country,
        perfecture,
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

  //   const formatText = text => {
  //     return text.replace(/[^+\d]/g, '');
  //   };
  // if (!didInit) {
  //   console.log('showing null because did not init yet');

  //   return null;
  // }

  if (isUndefined(_loggedIn) && isUndefined(user)) {
    return (
      <View style={sharedStyles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  if (showSignup === true && verificationId) {
    return (
      <ScrollView>
        <View style={[sharedStyles.signupView, sharedStyles.loginContainer]}>
          <View style={sharedStyles.nameContainer}>
            <Text style={sharedStyles.label}>First Name</Text>
            <TextField
              label="First Name"
              // keyboardType="phone-pad"
              // formatText={formatText}
              // onSubmitEditing={onSubmit}
              tintColor={'#b69cf6'}
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
                onCheck={updateGender('Male')}
              />
              <RadioButton
                label="Female"
                checked={gender === 'Female'}
                value="Female"
                onCheck={updateGender('Female')}
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
                <Picker.Item key={index} label={_country} value={_country} />
              ))}
            </Picker>
          </View>

          {perfecture && (
            <>
              <Text style={sharedStyles.label}>Perfecture</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={perfecture}
                  // style={sharedStyles.dobViewItem}
                  onValueChange={updatePerfecture}>
                  {perfectures[country].map((_perfecture, index) => (
                    <Picker.Item
                      key={index}
                      label={_perfecture}
                      value={_perfecture}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}

          <View style={sharedStyles.loginBtn}>
            <Button
              disabled={loading}
              raised={true}
              primary
              text={'Sign up'}
              onPress={handleSignup}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  if (verificationId) {
    return (
      <View style={sharedStyles.loginContainer}>
        <View style={sharedStyles.loginBtn}>
          <Button
            raised={true}
            primary
            text={'Verify'}
            onPress={handleVerifyUser}
            disabled={loading}
          />
          <Text style={sharedStyles.verificationLabel}>
            Please check your inbox in order to verify your email
          </Text>
        </View>
      </View>
    );
  }

  if (loggedIn && user) {
    return (
      <View
        style={
          sharedStyles.loggedInContainer
          // showSettings && sharedStyles.backdrop,
        }>
        <Drawer>
          <Drawer.Header
            style={{
              contentContainer: {
                backgroundColor: '#b69cf6',
              },
            }}>
            <Drawer.Header.Account
              style={{
                accountContainer: {
                  backgroundColor: '#b69cf6',
                },
              }}
              avatar={<Avatar text="A" />}
              // accounts={[
              //   {avatar: <Avatar text="B" />},
              //   {avatar: <Avatar text="C" />},
              // ]}
              footer={{
                dense: true,
                centerElement: {
                  primaryText: `${user.firstName} ${user.lastName} - ${user.perfecture}, ${user.country}`,
                  secondaryText: user.email,
                },
                // rightElement: 'arrow-drop-down',
              }}
            />
          </Drawer.Header>
          <Drawer.Section
            divider
            items={[
              {icon: 'bookmark-border', value: 'Notifications'},
              // {icon: 'today', value: 'Calendar', active: true},
              {icon: 'people', value: 'My Ads'},
              {icon: 'grade', value: 'My Lotteries'},
              {icon: 'history', value: 'History'},
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
              {icon: 'info', value: 'Info'},
            ]}
          />
        </Drawer>
        {/* 
        <View style={sharedStyles.loginBtn}>
          <Button
            raised={true}
            primary
            text={'Logout'}
            onPress={handleLogout}
            disabled={loading}
          />
        </View> */}
        {/* {showSettings && (
          <View
            style={{
              position: 'absolute',
              top: '50%',
              // left: '50%',
              alignSelf: 'center',
              transform: [{translateY: '-50%'}],
            }}>
            <Dialog>
              <Dialog.Title>
                <Text>Hello world</Text>
              </Dialog.Title>
              <Dialog.Content>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <DialogDefaultActions
                  actions={['cancel', 'ok']}
                  
                  options={{ok: {disabled: true}}}
                  onActionPress={() => {}}
                />
              </Dialog.Actions>
            </Dialog>
          </View>
        )} */}
      </View>
    );
  }

  return (
    <View style={sharedStyles.loginContainer}>
      <TextField
        label="Email"
        //  keyboardType="phone-pad"
        // formatText={formatText}
        // onSubmitEditing={onSubmit}
        ref={emailRef}
        tintColor={'#b69cf6'}
        disabled={loading}
      />

      <TextField
        label="Password"
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
          disabled={loading}
          raised={true}
          primary
          text={text}
          onPress={handleSubmit}
        />
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
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
