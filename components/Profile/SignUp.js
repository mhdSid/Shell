import React from 'react';
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

const SignUp = props => {
  const {
    loading,
    userDataChanged,
    gender,
    month,
    day,
    year,
    country,
    prefecture,
    firstNameRef,
    lastNameRef,
    mobileRef,
    fullAddressRef,
    cityWardRef,
    postalCodeRef,
    handleLastNameChangeText,
    handleFirstNameChangeText,
    handleMobileChangeText,
    handleFullAddressChangeText,
    handleCityWardChangeText,
    handlePostalCodeChangeText,
    updateGender,
    updateCountry,
    updateDay,
    updateMonth,
    handleSignup,
    updatePrefecture,
    updateYear,
  } = props;

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
                onPress={handleSignup}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

SignUp.propTypes = {
  loading: PropTypes.bool,
  userDataChanged: PropTypes.bool,
  gender: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.string,
  year: PropTypes.string,
  country: PropTypes.string,
  prefecture: PropTypes.string,
  firstNameRef: PropTypes.any,
  lastNameRef: PropTypes.any,
  mobileRef: PropTypes.any,
  fullAddressRef: PropTypes.any,
  cityWardRef: PropTypes.any,
  postalCodeRef: PropTypes.any,
  handleLastNameChangeText: PropTypes.func,
  handleFirstNameChangeText: PropTypes.func,
  handleMobileChangeText: PropTypes.func,
  handleFullAddressChangeText: PropTypes.func,
  handleCityWardChangeText: PropTypes.func,
  handlePostalCodeChangeText: PropTypes.func,
  updateGender: PropTypes.func,
  updateCountry: PropTypes.func,
  updateDay: PropTypes.func,
  updateMonth: PropTypes.func,
  handleSignup: PropTypes.func,
  updatePrefecture: PropTypes.func,
  updateYear: PropTypes.func,
};

export default SignUp;
