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
import {
  prefectures,
  cities,
  prefecturesList,
  countryCodeList,
} from '../../Constants/Countries';
import {months, days, years} from '../../Constants/Dates';
import PropTypes from 'prop-types';
import {phoneNumbersRegexs} from '../../Constants/Regexes';
import {monthsNumbers} from '../../Constants/Dates';
import invoke from 'lodash/invoke';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import {connect} from 'react-redux';
import {handleSignUp} from '../../redux/Auth/SignUp';
import {
  getEmailSelector,
  getVerificationIdSelector,
  getUserSelector,
  getPasswordHashSelector,
  // getCountrySelector,
} from './Selectors';
import {handlePing} from '../../redux/Ping/Ping';

const SignUp = props => {
  const {email, passwordHash, verificationId} = props;
  console.log('SignUp: ', props);
  const [loading, setLoading] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);
  // const [dobChanged, setDobChanged] = useState(false);
  const [firstNameChanged, setFirsNameChanged] = useState(false);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  const [mobileChanged, setMobileChanged] = useState(false);
  // const [postalCodeChanged, setPostalCodeChanged] = useState(false);
  const [fullAddressChanged, setFullAddressChanged] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  const [prefectureChanged, setPrefectureChanged] = useState(false);
  // const [year, setYear] = useState(profile.initialYear);
  // const [month, setMonth] = useState(profile.initialMonth);
  // const [day, setDay] = useState(profile.initialDay);
  // const [gender, setGender] = useState(profile.male);
  const [prefecture, setPrefecture] = useState('');
  const [city, setCity] = useState('');
  const mobileRegex = new RegExp(phoneNumbersRegexs.Japan);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    // postalCode: false,
    fullAddress: false,
  });

  const mobileRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  // const postalCodeRef = createRef();
  const fullAddressRef = createRef();

  const updatePrefecture = value => {
    setPrefectureChanged(true);
    setPrefecture(value);
  };
  const updateCity = value => {
    setCityChanged(true);
    setCity(value);
  };
  // const updateGender = value => {
  //   return () => {
  //     setGender(value);
  //   };
  // };
  // const updateYear = value => {
  //   setYear(value);
  //   setDobChanged(true);
  // };
  // const updateMonth = value => {
  //   setMonth(value);
  //   setDobChanged(true);
  // };
  // const updateDay = value => {
  //   setDay(value);
  //   setDobChanged(true);
  // };
  const handleChange = {
    firstName: () => {
      return value => {
        if (value && value.length >= 1 && value.length <= 20) {
          setFirsNameChanged(true);
          setErrors({
            ...errors,
            firstName: false,
          });
        } else {
          setFirsNameChanged(false);
          setErrors({
            ...errors,
            firstName: true,
          });
        }
      };
    },
    lastName: () => {
      return value => {
        if (value && value.length >= 1 && value.length <= 20) {
          setLastNameChanged(true);
          setErrors({
            ...errors,
            lastName: false,
          });
        } else {
          setLastNameChanged(false);
          setErrors({
            ...errors,
            lastName: true,
          });
        }
      };
    },
    phoneNumber: () => {
      return value => {
        if (
          value &&
          value.match(mobileRegex) &&
          value.length >= 1 &&
          value.length <= 15
        ) {
          setMobileChanged(true);
          setErrors({
            ...errors,
            phoneNumber: false,
          });
        } else {
          setMobileChanged(false);
          setErrors({
            ...errors,
            phoneNumber: true,
          });
        }
      };
    },
    // postalCode: () => {
    //   return value => {
    //     if (value && value.length >= 1 && value.length <= 10) {
    //       setPostalCodeChanged(true);
    //       setErrors({
    //         ...errors,
    //         postalCode: false,
    //       });
    //     } else {
    //       setPostalCodeChanged(false);
    //       setErrors({
    //         ...errors,
    //         postalCode: true,
    //       });
    //     }
    //   };
    // },
    fullAddress: () => {
      return value => {
        if (value && value.length >= 1 && value.length <= 100) {
          setFullAddressChanged(true);
          setErrors({
            ...errors,
            fullAddress: false,
          });
        } else {
          setFullAddressChanged(false);
          setErrors({
            ...errors,
            fullAddress: true,
          });
        }
      };
    },
  };
  const handleBlur = fieldName => {
    return () => {
      const {current: firstNameField} = firstNameRef;
      const {current: lastNameField} = lastNameRef;
      const {current: mobileField} = mobileRef;
      // const {current: postalCodeField} = postalCodeRef;
      const {current: fullAddressField} = fullAddressRef;

      const values = {
        firstName: firstNameField && firstNameField.value(),
        lastName: lastNameField && lastNameField.value(),
        phoneNumber: mobileField && mobileField.value(),
        // postalCode: postalCodeField && postalCodeField.value(),
        fullAddress: fullAddressField && fullAddressField.value(),
      };
      handleChange[fieldName]()(values[fieldName]);
    };
  };
  const setDefaultsDataChanged = () => {
    setUserDataChanged(false);
    // setDobChanged(false);
    setFirsNameChanged(false);
    setLastNameChanged(false);
    setMobileChanged(false);
    // setPostalCodeChanged(false);
    setFullAddressChanged(false);
    setCityChanged(false);
    setPrefectureChanged(false);
  };
  const callback = () => {
    setDefaultsDataChanged();
    // invoke(props, 'ping');
    setLoading(false);
  };
  const handleSignupPress = () => {
    const {current: firstNameField} = firstNameRef;
    const {current: lastNameField} = lastNameRef;
    const {current: mobileField} = mobileRef;
    // const {current: postalCodeField} = postalCodeRef;
    const {current: fullAddressField} = fullAddressRef;
    const firstName = firstNameField.value();
    const lastName = lastNameField.value();
    const mobile = mobileField.value();
    // const postalCode = postalCodeField.value();
    const fullAddress = fullAddressField.value();
    if (
      email &&
      passwordHash &&
      mobile &&
      verificationId &&
      prefecture &&
      city &&
      // postalCode &&
      firstName &&
      lastName &&
      fullAddress
    ) {
      const newUser = {
        email,
        passwordHash,
        verificationId,
        // dob: new Date(`${year}/${monthsNumbers[month]}/${day}`),
        // gender,
        mobile,
        country: 'Japan',
        prefecture,
        city,
        firstName,
        lastName,
        // postalCode,
        fullAddress,
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
      // dobChanged &&
      firstNameChanged &&
        lastNameChanged &&
        mobileChanged &&
        // postalCodeChanged &&
        prefectureChanged &&
        cityChanged &&
        fullAddressChanged,
    );
  }, [
    // dobChanged,
    firstNameChanged,
    lastNameChanged,
    mobileChanged,
    // postalCodeChanged,
    prefectureChanged,
    cityChanged,
    fullAddressChanged,
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
                maxLength={20}
                minLength={1}
                onBlur={handleBlur('firstName')}
                error={errors.firstName}
                onChangeText={handleChange.firstName()}
                ref={firstNameRef}
                disabled={loading}
              />
            </View>
            <View style={sharedStyles.nameContainer}>
              <Text style={sharedStyles.label}>{profile.lastName}</Text>
              <TextField
                label={profile.lastName}
                maxLength={20}
                minLength={1}
                onBlur={handleBlur('lastName')}
                error={errors.lastName}
                onChangeText={handleChange.lastName()}
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
                maxLength={15}
                minLength={1}
                onBlur={handleBlur('phoneNumber')}
                error={errors.phoneNumber}
                onChangeText={handleChange.phoneNumber()}
                ref={mobileRef}
                disabled={loading}
              />
            </View>
            {/* <View style={sharedStyles.genderContainer}>
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
            </View> */}
            {/* <View style={sharedStyles.dobContainer}>
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
            </View> */}
            <Text style={sharedStyles.label}>{profile.prefecture}</Text>
            <View style={sharedStyles.pickerView}>
              <Picker
                mode="dropdown"
                selectedValue={prefecture}
                onValueChange={updatePrefecture}>
                {prefectures.Japan.map((_prefecture, index) => (
                  <Picker.Item
                    key={index}
                    label={_prefecture.kanji}
                    value={_prefecture.name}
                  />
                ))}
              </Picker>
            </View>
            <Text style={sharedStyles.label}>{profile.city}</Text>
            <View style={sharedStyles.pickerView}>
              <Picker
                mode="dropdown"
                selectedValue={city}
                onValueChange={updateCity}>
                {cities[prefecture].map((_city, index) => (
                  <Picker.Item key={index} label={_city} value={_city} />
                ))}
              </Picker>
            </View>
            {/* <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>{profile.postalCode}</Text>
              <TextField
                label={profile.postalCode}
                keyboardType="phone-pad"
                tintColor={'#b69cf6'}
                maxLength={10}
                minLength={1}
                onBlur={handleBlur('postalCode')}
                error={errors.postalCode}
                onChangeText={handleChange.postalCode()}
                ref={postalCodeRef}
                disabled={loading}
              />
            </View> */}
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>{profile.fullAddress}</Text>
              <TextField
                label={profile.fullAddress}
                tintColor={'#b69cf6'}
                ref={fullAddressRef}
                disabled={loading}
                maxLength={100}
                minLength={1}
                onBlur={handleBlur('fullAddress')}
                error={errors.fullAddress}
                onChangeText={handleChange.fullAddress()}
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
  passwordHash: PropTypes.string,
  verificationId: PropTypes.string,
  login: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    email: getEmailSelector(state),
    passwordHash: getPasswordHashSelector(state),
    verificationId: getVerificationIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    signUp: payload => dispatch(handleSignUp(payload)),
    // ping: payload => dispatch(handlePing(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
