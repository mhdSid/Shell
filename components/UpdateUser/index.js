import React, {useState, createRef, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Picker,
  KeyboardAvoidingView,
} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {TextField} from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import {mimeTypes} from '../../Constants/Ads';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {prefectures, cities} from '../../Constants/Countries';
import {loadingPopup} from '../Loading';
import FastImage from 'react-native-fast-image';
import {updateUserr} from '../../Constants/Texts';
import {handlerUpdateUserData} from '../../redux/Auth/UpdateUser';
import {connect} from 'react-redux';
import {getUserSelector} from './Selectors';

const UpdateUser = props => {
  const {user} = props;
  // const [country, setCountry] = useState(
  //   (user && user.country) || updateUserr.japan,
  // );
  const [prefecture, setPrefecture] = useState(user.prefecture || '');
  const [city, setCity] = useState(user.city || '');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imageFile, setImageFile] = useState(undefined);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [mobileChanged, setMobileChanged] = useState(false);
  const [firstNameChanged, setFirstNameChanged] = useState(false);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  // const [countryChanged, setCountryChanged] = useState(false);
  const [prefectureChanged, setPrefectureChanged] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  // const [postalCodeChanged, setPostalCodeChanged] = useState(false);
  const [fullAddressChanged, setFullAddressChanged] = useState(false);
  const mobileRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  // const postalCodeRef = createRef();
  const fullAddressRef = createRef();

  // const updateCountry = value => {
  //   setCountry(value);
  //   if (value && value !== user.country) {
  //     setCountryChanged(true);
  //   } else {
  //     setCountryChanged(false);
  //   }
  // };
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
  // const handlePostalCodeChangeText = value => {
  //   if (value && value.length > 1 && value !== user.postalCode) {
  //     setPostalCodeChanged(true);
  //   } else {
  //     setPostalCodeChanged(false);
  //   }
  // };
  const handleFullAddressChangeText = value => {
    if (value && value.length > 5 && value !== user.fullAddress) {
      setFullAddressChanged(true);
    } else {
      setFullAddressChanged(false);
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
  const updateCity = value => {
    setCity(value);
    if (value && value !== user.city) {
      setCityChanged(true);
    } else {
      setCityChanged(false);
    }
  };
  const setDefaultsDataChanged = () => {
    setLoading(false);
    setUserDataChanged(false);
    setImageChanged(false);
    setMobileChanged(false);
    setFirstNameChanged(false);
    setLastNameChanged(false);
    // setCountryChanged(false);
    setPrefectureChanged(false);
    setCityChanged(false);
    // setPostalCodeChanged(false);
    setFullAddressChanged(false);
  };
  const onSuccessCallback = () => {
    setDefaultsDataChanged();
    handleCloseModal();
  };
  const handleUpdateUser = () => {
    const {current: mobileField} = mobileRef;
    const {current: firstNameField} = firstNameRef;
    const {current: lastNameField} = lastNameRef;
    // const {current: postalCodeField} = postalCodeRef;
    const {current: fullAddressField} = fullAddressRef;

    const mobile = mobileField.value();
    const firstName = firstNameField.value();
    const lastName = lastNameField.value();
    const fullAddress = fullAddressField.value();
    // const postalCode = postalCodeField.value();
    if (userDataChanged) {
      setLoading(true);
      const updatedUserData = {
        ...(mobileChanged && {mobile}),
        ...(firstNameChanged && {firstName}),
        ...(lastNameChanged && {lastName}),
        ...(prefectureChanged && {prefecture}),
        ...(cityChanged && {city}),
        ...(imageChanged && {image: imageFile}),
        ...(fullAddressChanged && {fullAddress}),
        // ...(postalCodeChanged && {postalCode}),
        id: user.id,
        email: user.email,
      };
      invoke(props, 'handleUpdateUserData', {
        onError: setDefaultsDataChanged,
        onSuccess: onSuccessCallback,
        updatedUserData,
      });
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
    invoke(props, 'onClose');
  };

  useEffect(() => {
    setUserDataChanged(
      imageChanged ||
        mobileChanged ||
        firstNameChanged ||
        lastNameChanged ||
        prefectureChanged ||
        cityChanged ||
        // postalCodeChanged ||
        fullAddressChanged,
    );
  }, [
    imageChanged,
    mobileChanged,
    firstNameChanged,
    lastNameChanged,
    cityChanged,
    prefectureChanged,
    // postalCodeChanged,
    fullAddressChanged,
  ]);

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainerPaddingRight}}
          leftElement="arrow-back"
          onLeftElementPress={handleCloseModal}
          centerElement={updateUserr.updateProfile}
          rightElement={
            <Button
              color="white"
              onPress={handleUpdateUser}
              disabled={loading || !userDataChanged}
              raised
              text={updateUserr.update}
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
                    {!image && !user.image ? (
                      <Icon name="image" size={35} color="white" />
                    ) : null}
                    {image || user.image ? (
                      <FastImage
                        style={[sharedStyles.adImage, sharedStyles.userImage]}
                        source={{
                          uri: image || user.image,
                          priority: FastImage.priority.low,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    ) : null}
                  </TouchableBounce>
                </View>
              </View>
              <View style={sharedStyles.nameContainer}>
                <Text style={sharedStyles.label}>{updateUserr.firstName}</Text>
                <TextField
                  label={updateUserr.firstName}
                  value={user.firstName}
                  tintColor={'#b69cf6'}
                  onChangeText={handleFirstNameChangeText}
                  ref={firstNameRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.nameContainer}>
                <Text style={sharedStyles.label}>{updateUserr.lastName}</Text>
                <TextField
                  label={updateUserr.lastName}
                  value={user.lastName}
                  tintColor={'#b69cf6'}
                  onChangeText={handleLastNameChangeText}
                  ref={lastNameRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>
                  {updateUserr.phoneNumber}
                </Text>
                <TextField
                  label={updateUserr.mobile}
                  keyboardType="phone-pad"
                  value={user.mobile}
                  tintColor={'#b69cf6'}
                  onChangeText={handleMobileChangeText}
                  ref={mobileRef}
                  disabled={loading}
                />
              </View>
              <Text style={sharedStyles.label}>{updateUserr.prefecture}</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={prefecture}
                  onValueChange={updatePrefecture}>
                  {prefectures[user.country].map((_prefecture, index) => (
                    <Picker.Item
                      key={index}
                      label={_prefecture.kanji}
                      value={_prefecture.name}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={sharedStyles.label}>{updateUserr.city}</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dialog"
                  selectedValue={city}
                  onValueChange={updateCity}>
                  {cities[prefecture].map((_city, index) => (
                    <Picker.Item key={index} label={_city} value={_city} />
                  ))}
                </Picker>
              </View>
              {/* <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>{updateUserr.postalCode}</Text>
                <TextField
                  label={updateUserr.postalCode}
                  keyboardType="phone-pad"
                  value={user.postalCode}
                  tintColor={'#b69cf6'}
                  onChangeText={handlePostalCodeChangeText}
                  ref={postalCodeRef}
                  disabled={loading}
                />
              </View> */}
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>
                  {updateUserr.fullAddress}
                </Text>
                <TextField
                  label={updateUserr.fullAddress}
                  value={user.fullAddress}
                  tintColor={'#b69cf6'}
                  onChangeText={handleFullAddressChangeText}
                  ref={fullAddressRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.updateUserSbmtBtn}>
                <Button
                  disabled={loading || !userDataChanged}
                  raised={true}
                  primary
                  text={updateUserr.update}
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

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdateUserData: payload => dispatch(handlerUpdateUserData(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);
