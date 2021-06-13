import React, {useState, createRef, useEffect} from 'react';
import {
  View,
  Picker,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, RadioButton} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import {TextField} from 'react-native-material-textfield';
import {profile} from '../../Constants/Texts';
import sharedStyles from '../../assets/styles/sharedStyles';
import {countries, prefectures} from '../../Constants/Countries';
import {months, days, years} from '../../Constants/Dates';
import PropTypes from 'prop-types';
import {phoneNumbersRegexs} from '../../Constants/Regexes';
import {prefecturesList, countryCodeList} from '../../Constants/Countries';
import {monthsNumbers} from '../../Constants/Dates';
import invoke from 'lodash/invoke';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import {connect} from 'react-redux';
import {handleSignUp} from '../../redux/Auth/SignUp';
import {
  getEmailSelector,
  getPasswordSelector,
  getVerificationIdSelector,
  getUserSelector,
  getCountrySelector,
} from './Selectors';
import {handlePing} from '../../redux/Ping/Ping';

const SignUp = props => {
  const {
    email,
    password,
    verificationId,
    user,
    country: serverCountryCode,
  } = props;
  const [loading, setLoading] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [dobChanged, setDobChanged] = useState(false);
  const [firstNameChanged, setFirsNameChanged] = useState(false);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  const [mobileChanged, setMobileChanged] = useState(false);
  const [postalCodeChanged, setPostalCodeChanged] = useState(false);
  const [fullAddressChanged, setFullAddressChanged] = useState(false);
  const [cityWardChanged, setCityWardChanged] = useState(false);
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
  const mobileRegex = new RegExp(phoneNumbersRegexs[country]);

  const mobileRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const postalCodeRef = createRef();
  const cityWardRef = createRef();
  const fullAddressRef = createRef();

  const updateCountry = value => {
    setCountry(value);
    setPrefecture(prefecturesList[value]);
  };
  const updatePrefecture = value => {
    setPrefecture(value);
  };

  const updateGender = value => {
    return () => {
      setGender(value);
    };
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
  };
  const callback = () => {
    setDefaultsDataChanged();
    invoke(props, 'ping');
    setLoading(false);
  };
  const handleSignupPress = () => {
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
      email &&
      password &&
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
        email,
        password,
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
      invoke(props, 'signUp', {
        newUser,
        onSuccess: callback,
        onError: callback,
      });
    }
  };

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

  return (
    <View style={sharedStyles.fullheightView}>
      {loading && loadingPopup}
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={25}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={sharedStyles.loginContainer}>
            <View style={sharedStyles.nameContainer}>
              <Text style={sharedStyles.label}>{profile.firstName}</Text>
              <TextField
                label={profile.firstName}
                tintColor={'#b69cf6'}
                onChangeText={handleFirstNameChangeText}
                ref={firstNameRef}
                disabled={loading}
              />
            </View>
            <View style={sharedStyles.nameContainer}>
              <Text style={sharedStyles.label}>{profile.lastName}</Text>
              <TextField
                label={profile.lastName}
                onChangeText={handleLastNameChangeText}
                tintColor={'#b69cf6'}
                ref={lastNameRef}
                disabled={loading}
              />
            </View>
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>{profile.phoneNumber}</Text>
              <TextField
                label={profile.mobile}
                keyboardType="phone-pad"
                tintColor={'#b69cf6'}
                onChangeText={handleMobileChangeText}
                ref={mobileRef}
                disabled={loading}
              />
            </View>
            <View style={sharedStyles.genderContainer}>
              <Text style={sharedStyles.label}>{profile.gender}</Text>
              <View style={sharedStyles.genderView}>
                <RadioButton
                  label={profile.male}
                  checked={gender === profile.male}
                  value={profile.male}
                  onSelect={updateGender(profile.male)}
                />
                <RadioButton
                  label={profile.female}
                  checked={gender === profile.female}
                  value={profile.female}
                  onSelect={updateGender(profile.female)}
                />
              </View>
            </View>
            <View style={sharedStyles.dobContainer}>
              <Text style={[sharedStyles.dobLabel, sharedStyles.label]}>
                {profile.dateOfBirth}
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
            <Text style={sharedStyles.label}>{profile.country}</Text>
            <View style={sharedStyles.pickerView}>
              <Picker
                mode="dropdown"
                selectedValue={country}
                onValueChange={updateCountry}>
                {countries.map((_country, index) => (
                  <Picker.Item key={index} label={_country} value={_country} />
                ))}
              </Picker>
            </View>
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>{profile.postalCode}</Text>
              <TextField
                label={profile.postalCode}
                keyboardType="phone-pad"
                tintColor={'#b69cf6'}
                onChangeText={handlePostalCodeChangeText}
                ref={postalCodeRef}
                disabled={loading}
              />
            </View>
            <Text style={sharedStyles.label}>{profile.prefecture}</Text>
            <View style={sharedStyles.pickerView}>
              <Picker
                mode="dropdown"
                selectedValue={prefecture}
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
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>{profile.cityWard}</Text>
              <TextField
                label={profile.cityWard}
                tintColor={'#b69cf6'}
                onChangeText={handleCityWardChangeText}
                ref={cityWardRef}
                disabled={loading}
              />
            </View>
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>{profile.fullAddress}</Text>
              <TextField
                label={profile.fullAddress}
                tintColor={'#b69cf6'}
                onChangeText={handleFullAddressChangeText}
                ref={fullAddressRef}
                disabled={loading}
              />
            </View>
            <Text style={[sharedStyles.label, sharedStyles.signUpLabel]}>
              {profile.fillInformationCorrectly}
            </Text>
            <View style={sharedStyles.loginBtn}>
              <Button
                disabled={loading || !userDataChanged}
                raised={true}
                primary
                text={profile.signUp}
                onPress={handleSignupPress}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

SignUp.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  verificationId: PropTypes.string,
  user: PropTypes.object,
  country: PropTypes.string,
  login: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    email: getEmailSelector(state),
    password: getPasswordSelector(state),
    verificationId: getVerificationIdSelector(state),
    user: getUserSelector(state),
    country: getCountrySelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    signUp: payload => dispatch(handleSignUp(payload)),
    ping: payload => dispatch(handlePing(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
