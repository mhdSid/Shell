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
} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {TextField} from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import {mimeTypes} from '../../Constants/Ads';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {
  perfecturesList,
  perfectures,
  countries,
} from '../../Constants/Countries';
import {update} from '../../services/auth';
import {loadingPopup} from '../Loading';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';

const UpdateUser = props => {
  const {user} = props;
  // console.log('UpdateUserUpdateUserUpdateUserUpdateUser: ', user);

  const [country, setCountry] = useState((user && user.country) || 'Japan');
  const [perfecture, setPerfecture] = useState(perfecturesList[country]);

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
  const [perfectureChanged, setPerfectureChanged] = useState(false);

  useEffect(() => {
    setUserDataChanged(
      imageChanged ||
        mobileChanged ||
        firstNameChanged ||
        lastNameChanged ||
        countryChanged ||
        perfectureChanged,
    );
  }, [
    imageChanged,
    mobileChanged,
    firstNameChanged,
    lastNameChanged,
    countryChanged,
    perfectureChanged,
  ]);

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

  const updatePerfecture = value => {
    setPerfecture(value);
    if (value && value !== user.perfecture) {
      setPerfectureChanged(true);
    } else {
      setPerfectureChanged(false);
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
    setPerfectureChanged(false);
  };

  const mobileRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();

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
    const mobile = mobileField.value();
    const firstName = firstNameField.value();
    const lastName = lastNameField.value();

    if (userDataChanged) {
      setLoading(true);

      const updatedUserData = {
        mobile,
        firstName,
        lastName,
        perfecture,
        country,
        image: imageFile,
        id: user.id,
        email: user.email,
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

      if (!perfectureChanged) {
        delete updatedUserData.perfecture;
      }

      if (!countryChanged) {
        delete updatedUserData.country;
      }

      if (!imageChanged) {
        delete updatedUserData.image;
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
                      cache="force-cache"
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
                value={user.lastName}
                // keyboardType="phone-pad"
                // formatText={formatText}
                // onSubmitEditing={onSubmit}
                tintColor={'#b69cf6'}
                onChangeText={handleLastNameChangeText}
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
                value={user.mobile}
                // formatText={formatText}
                // onSubmitEditing={onSubmit}
                tintColor={'#b69cf6'}
                onChangeText={handleMobileChangeText}
                // baseColor="#7f0000"
                ref={mobileRef}
                disabled={loading}
              />
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
                disabled={loading || !userDataChanged}
                raised={true}
                primary
                text={'Confirm'}
                onPress={handleUpdateUser}
              />
            </View>
          </View>
        </ScrollView>
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
