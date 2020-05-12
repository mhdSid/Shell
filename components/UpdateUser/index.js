import React, {useState, createRef, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Picker,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {TextField} from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import {mimeTypes} from '../../Constants/Ads';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {
  prefecturesList,
  prefectures,
  countries,
} from '../../Constants/Countries';
import {update} from '../../services/Auth';
import {loadingPopup} from '../Loading';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';

const UpdateUser = props => {
  const {user} = props;
  const [country, setCountry] = useState((user && user.country) || 'Japan');
  const [prefecture, setPrefecture] = useState(prefecturesList[country]);
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imageFile, setImageFile] = useState(undefined);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [mobileChanged, setMobileChanged] = useState(false);
  const [firstNameChanged, setFirstNameChanged] = useState(false);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  const [countryChanged, setCountryChanged] = useState(false);
  const [prefectureChanged, setPrefectureChanged] = useState(false);
  const [postalCodeChanged, setPostalCodeChanged] = useState(false);
  const [cityWardChanged, setCityWardChanged] = useState(false);
  const [fullAddressChanged, setFullAddressChanged] = useState(false);
  const mobileRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const postalCodeRef = createRef();
  const fullAddressRef = createRef();
  const cityWardRef = createRef();

  const updateCountry = value => {
    setCountry(value);
    if (value && value !== user.country) {
      setCountryChanged(true);
    } else {
      setCountryChanged(false);
    }
  };
  const handleMobileChangeText = value => {
    if (value && value.length > 3 && value !== user.mobile) {
      setMobileChanged(true);
    } else {
      setMobileChanged(false);
    }
  };
  const handleFirstNameChangeText = value => {
    if (value && value.length > 1 && value !== user.firstName) {
      setFirstNameChanged(true);
    } else {
      setFirstNameChanged(false);
    }
  };
  const handleLastNameChangeText = value => {
    if (value && value.length > 1 && value !== user.lastName) {
      setLastNameChanged(true);
    } else {
      setLastNameChanged(false);
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
    if (value && value.length > 5) {
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
  const updatePrefecture = value => {
    setPrefecture(value);
    if (value && value !== user.prefecture) {
      setPrefectureChanged(true);
    } else {
      setPrefectureChanged(false);
    }
  };
  const setDefaultsDataChanged = () => {
    setLoading(false);
    setUserDataChanged(false);
    setImageChanged(false);
    setMobileChanged(false);
    setFirstNameChanged(false);
    setLastNameChanged(false);
    setCountryChanged(false);
    setPrefectureChanged(false);
    setPostalCodeChanged(false);
    setFullAddressChanged(false);
    setCityWardChanged(false);
  };
  const onUpdateUserError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    setDefaultsDataChanged();
    if (message) {
      Alert.alert(message);
    }
    return;
  };
  const onUpdateUserSuccess = data => {
    const {error, user: updatedUser} = data;
    if (error) {
      return onUpdateUserError(error);
    }
    setDefaultsDataChanged();
    invoke(props, 'updateUserAction', updatedUser);
    setModalVisible(false);
  };
  const handleUpdateUser = () => {
    const {current: mobileField} = mobileRef;
    const {current: firstNameField} = firstNameRef;
    const {current: lastNameField} = lastNameRef;
    const {current: postalCodeField} = postalCodeRef;
    const {current: cityWardField} = cityWardRef;
    const {current: fullAddressField} = fullAddressRef;
    const mobile = mobileField.value();
    const firstName = firstNameField.value();
    const lastName = lastNameField.value();
    const fullAddress = fullAddressField.value();
    const postalCode = postalCodeField.value();
    const cityWard = cityWardField.value();
    if (userDataChanged) {
      setLoading(true);
      const updatedUserData = {
        mobile,
        firstName,
        lastName,
        prefecture,
        country,
        image: imageFile,
        id: user.id,
        email: user.email,
        fullAddress,
        cityWard,
        postalCode,
      };
      if (!mobileChanged) {
        delete updatedUserData.mobile;
      }
      if (!firstNameChanged) {
        delete updatedUserData.firstName;
      }
      if (!lastNameChanged) {
        delete updatedUserData.lastName;
      }
      if (!prefectureChanged) {
        delete updatedUserData.prefecture;
      }
      if (!countryChanged) {
        delete updatedUserData.country;
      }
      if (!imageChanged) {
        delete updatedUserData.image;
      }
      if (!postalCodeChanged) {
        delete updatedUserData.postalCode;
      }
      if (!fullAddressChanged) {
        delete updatedUserData.fullAddress;
      }
      if (!cityWardChanged) {
        delete updatedUserData.cityWard;
      }
      update(updatedUserData).then(onUpdateUserSuccess, onUpdateUserError);
    }
  };
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        const imagePath = response.uri;
        setImage(imagePath);
        const imageName = imagePath.slice(
          imagePath.lastIndexOf('/') + 1,
          imagePath.length,
        );
        const typeRegex = imageName.match(/\.jpg|png|jpeg/);
        setImageFile({
          uri: response.uri,
          type: mimeTypes[typeRegex[0]],
          name: imageName,
        });
        setImageChanged(true);
      }
    });
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const onModalDismiss = () => {
    invoke(props, 'onClose');
  };

  useEffect(() => {
    setUserDataChanged(
      imageChanged ||
        mobileChanged ||
        firstNameChanged ||
        lastNameChanged ||
        countryChanged ||
        prefectureChanged ||
        postalCodeChanged ||
        cityWardChanged ||
        fullAddressChanged,
    );
  }, [
    imageChanged,
    mobileChanged,
    firstNameChanged,
    lastNameChanged,
    countryChanged,
    prefectureChanged,
    postalCodeChanged,
    fullAddressChanged,
    cityWardChanged,
  ]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onDismiss={onModalDismiss}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainerPaddingRight}}
          leftElement="arrow-back"
          onLeftElementPress={handleCloseModal}
          rightElement={
            <Button
              color="white"
              onPress={handleUpdateUser}
              disabled={loading || !userDataChanged}
              raised
              text="Save"
              icon="done-all"
            />
          }
        />
        {loading && loadingPopup}
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={25}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                sharedStyles.loginContainer,
                sharedStyles.updateUserContainer,
              ]}>
              <View style={sharedStyles.mobileContainer}>
                <View
                  style={[
                    sharedStyles.imageBtnContainer,
                    sharedStyles.userImageBtnContainer,
                  ]}>
                  <TouchableBounce
                    onPress={handleChoosePhoto}
                    style={[
                      sharedStyles.imageBtn,
                      sharedStyles.updateUserImgBtn,
                    ]}>
                    {!image && !user.image && (
                      <Icon name="image" size={35} color="white" />
                    )}
                    {(image || user.image) && (
                      <CachedImage
                        style={[sharedStyles.adImage, sharedStyles.userImage]}
                        source={{uri: image || user.image}}
                      />
                    )}
                  </TouchableBounce>
                </View>
              </View>
              <View style={sharedStyles.nameContainer}>
                <Text style={sharedStyles.label}>First Name</Text>
                <TextField
                  label="First Name"
                  value={user.firstName}
                  tintColor={'#b69cf6'}
                  onChangeText={handleFirstNameChangeText}
                  ref={firstNameRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.nameContainer}>
                <Text style={sharedStyles.label}>Last Name</Text>
                <TextField
                  label="Last Name"
                  value={user.lastName}
                  tintColor={'#b69cf6'}
                  onChangeText={handleLastNameChangeText}
                  ref={lastNameRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Phone Number</Text>
                <TextField
                  label="Mobile"
                  keyboardType="phone-pad"
                  value={user.mobile}
                  tintColor={'#b69cf6'}
                  onChangeText={handleMobileChangeText}
                  ref={mobileRef}
                  disabled={loading}
                />
              </View>
              <Text style={sharedStyles.label}>Country</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={country}
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
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Postal Code</Text>
                <TextField
                  label="Postal Code"
                  keyboardType="phone-pad"
                  value={user.postalCode}
                  tintColor={'#b69cf6'}
                  onChangeText={handlePostalCodeChangeText}
                  ref={postalCodeRef}
                  disabled={loading}
                />
              </View>
              {prefecture && (
                <>
                  <Text style={sharedStyles.label}>Prefecture</Text>
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
                </>
              )}
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>City Ward</Text>
                <TextField
                  label="City Ward"
                  value={user.cityWard}
                  tintColor={'#b69cf6'}
                  onChangeText={handleCityWardChangeText}
                  ref={cityWardRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Full Address</Text>
                <TextField
                  label="Full Address"
                  value={user.fullAddress}
                  tintColor={'#b69cf6'}
                  onChangeText={handleFullAddressChangeText}
                  ref={fullAddressRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.loginBtn}>
                <Button
                  disabled={loading || !userDataChanged}
                  raised={true}
                  primary
                  text={'Confirm'}
                  onPress={handleUpdateUser}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
  updateUserAction: PropTypes.func,
};

export default UpdateUser;
