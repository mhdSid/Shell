import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Picker,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Icon, Toolbar} from 'react-native-material-ui';
import {TextField} from 'react-native-material-textfield';
import sharedStyles from '../../assets/styles/sharedStyles';
import ImagePicker from 'react-native-image-picker';
import {
  prefectures,
  prefecturesList,
  currencies,
} from '../../Constants/Countries';
import {adStatuses, adCategories, mimeTypes} from '../../Constants/Ads';
import isUndefined from 'lodash/isUndefined';
import NoAuth from '../NoAuth';
import {LoadingComponent} from '../Loading';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import {
  rootUpdateAd,
  rootUploadAd,
  rootHandleShowAdsDetails,
  rootUpdateCurrentAdToStore,
  rootAddAdToStore,
} from '../Pinger';

const ImportAd = props => {
  const {loggedIn: _loggedIn, user: authUser} = props;
  const userCountry = authUser && authUser.country;
  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [user, setUser] = useState(authUser);
  const [adCategory, setAdCategory] = useState('Sports');
  const [adStatus, setAdStatus] = useState('No Noticable Scratches or Dirt');
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [prefecture, setPrefecture] = useState(
    userCountry && prefecturesList[userCountry],
  );
  const [adDataChanged, setADataChanged] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [adNameChanged, setAdNameChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [priceChanged, setPriceChanged] = useState(false);
  const userCurrency = userCountry && currencies[userCountry];
  const adNameRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();
  const adImages = [0, 1, 2, 3, 4];

  const handleAdNameChangeText = value => {
    if (value && value.length > 5) {
      setAdNameChanged(true);
    } else {
      setAdNameChanged(false);
    }
  };
  const handleDescriptionChangeText = value => {
    if (value && value.length > 20) {
      setDescriptionChanged(true);
    } else {
      setDescriptionChanged(false);
    }
  };
  const handlePriceChangeText = value => {
    if (value && value.length > 1) {
      setPriceChanged(true);
    } else {
      setPriceChanged(false);
    }
  };
  const setDefault = (nameField, descriptionField, priceField) => {
    nameField.setValue('');
    descriptionField.setValue('');
    priceField.setValue('');
    setImages([]);
    setADataChanged(false);
    setImagesChanged(false);
    setAdNameChanged(false);
    setDescriptionChanged(false);
    setPriceChanged(false);
  };
  const handleError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    if (message) {
      Alert.alert(message);
    }
    return;
  };
  const onUpdateAdSuccess = newAd => {
    return data => {
      const {error, updatedAd} = data;
      if (error) {
        return handleError(error);
      }
      const newUpdatedAd = {
        ...newAd,
        images: [...(newAd.images || []), ...(updatedAd.images || [])],
      };
      rootUpdateCurrentAdToStore(newUpdatedAd);
      rootHandleShowAdsDetails(newUpdatedAd);
    };
  };
  const importAdSuccess = data => {
    const {error, newAd} = data;
    if (error || !newAd) {
      return handleError(error);
    }
    rootAddAdToStore(newAd);
    rootHandleShowAdsDetails(newAd);
    const newImages = imageFiles.filter(Boolean);
    rootUpdateAd(
      {
        id: newAd.id,
        image: newImages.slice(1, newImages.length),
      },
      onUpdateAdSuccess(newAd),
      handleError,
    );
  };
  const handleUploadAd = () => {
    const {current: nameField} = adNameRef;
    const {current: descriptionField} = descriptionRef;
    const {current: priceField} = priceRef;
    const name = nameField.value();
    const description = descriptionField.value();
    const price = priceField.value();
    if (
      name &&
      description &&
      price &&
      prefecture &&
      adStatus &&
      adCategory &&
      imageFiles &&
      userCurrency &&
      adDataChanged
    ) {
      const filteredImages = imageFiles.filter(Boolean);
      setDefault(nameField, descriptionField, priceField);
      rootUploadAd(
        {
          name,
          description,
          image: filteredImages[0],
          prefecture,
          category: adCategory,
          status: adStatus,
          price,
          userId: authUser.id,
          country: authUser.country,
          currency: userCurrency,
        },
        importAdSuccess,
        handleError,
      );
    }
  };
  const updateAdCategory = value => {
    Alert.alert('updateAdCategory: ' + value);
    setAdCategory(value);
  };
  const updateAdStatus = value => {
    Alert.alert('updateAdStatus: ' + value);
    setAdStatus(value);
  };
  const updatePrefecture = value => {
    Alert.alert('updatePrefecture: ' + value);
    setPrefecture(value);
  };
  const handleChoosePhoto = index => {
    return () => {
      const options = {
        noData: true,
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          const imagePath = response.uri;
          images[index] = imagePath;
          setImages([...images]);
          const imageName = imagePath.slice(
            imagePath.lastIndexOf('/') + 1,
            imagePath.length,
          );
          const typeRegex = imageName.match(/\.jpg|png|jpeg/);
          imageFiles[index] = {
            uri: response.uri,
            type: mimeTypes[typeRegex[0]],
            name: imageName,
          };
          setImagesChanged(true);
          setImageFiles([...imageFiles]);
        }
      });
    };
  };

  useEffect(() => {
    setLoggedIn(_loggedIn);
    setUser(authUser);
  }, [_loggedIn, authUser]);

  useEffect(() => {
    setADataChanged(
      imagesChanged && adNameChanged && descriptionChanged && priceChanged,
    );
  }, [imagesChanged, adNameChanged, descriptionChanged, priceChanged]);

  if (isUndefined(_loggedIn) && isUndefined(user)) {
    return <LoadingComponent />;
  }

  if (!loggedIn && !user) {
    return <NoAuth />;
  }

  if (loggedIn === true && user) {
    return (
      <View style={sharedStyles.fullheightView}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={25}>
          <Toolbar
            style={{
              container: sharedStyles.toolbarContainerPadding,
            }}
            centerElement="Post an Ad"
            leftElement={<Icon color="white" name="add-box" />}
            rightElement={
              <Button
                onPress={handleUploadAd}
                disabled={!adDataChanged}
                raised
                text="Post"
                icon="done-all"
              />
            }
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                sharedStyles.loginContainer,
                sharedStyles.importAdContainer,
              ]}>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Product Name</Text>
                <TextField
                  label="Ad Name"
                  onChangeText={handleAdNameChangeText}
                  tintColor={'#b69cf6'}
                  ref={adNameRef}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Description</Text>
                <TextField
                  label="Description"
                  onChangeText={handleDescriptionChangeText}
                  tintColor={'#b69cf6'}
                  ref={descriptionRef}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Price</Text>
                <View style={sharedStyles.priceContainer}>
                  <Text style={sharedStyles.currenyLabel}>{userCurrency}</Text>
                  <View style={sharedStyles.adPriceTextfieldContainer}>
                    <TextField
                      label="Price"
                      keyboardType="phone-pad"
                      tintColor={'#b69cf6'}
                      onChangeText={handlePriceChangeText}
                      ref={priceRef}
                    />
                  </View>
                </View>
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Images</Text>
                <View style={sharedStyles.imageBtnContainer}>
                  {adImages.map(index => (
                    <TouchableBounce
                      key={index}
                      onPress={handleChoosePhoto(index)}
                      style={sharedStyles.imageBtn}>
                      {!images[index] && (
                        <Icon name="image" size={35} color="white" />
                      )}
                      {images[index] && (
                        <CachedImage
                          style={sharedStyles.adImage}
                          source={{uri: images[index]}}
                        />
                      )}
                    </TouchableBounce>
                  ))}
                </View>
              </View>
              <Text style={sharedStyles.label}>Prefecture</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={prefecture}
                  onValueChange={updatePrefecture}>
                  {prefectures[userCountry].map((_prefecture, index) => (
                    <Picker.Item
                      key={index}
                      label={_prefecture}
                      value={_prefecture}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={sharedStyles.label}>Category</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={adCategory}
                  onValueChange={updateAdCategory}>
                  {adCategories.map((_category, index) => (
                    <Picker.Item
                      key={index}
                      label={_category}
                      value={_category}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={sharedStyles.label}>Status</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={adStatus}
                  onValueChange={updateAdStatus}>
                  {adStatuses.map((_status, index) => (
                    <Picker.Item key={index} label={_status} value={_status} />
                  ))}
                </Picker>
              </View>
              <View style={sharedStyles.loginBtn}>
                <Button
                  disabled={!adDataChanged}
                  raised={true}
                  primary
                  text={'Post'}
                  onPress={handleUploadAd}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
};

ImportAd.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
};

const mapStateToProps = ({authReducer}) => {
  return {
    loggedIn: authReducer.loggedIn,
    user: authReducer.user,
  };
};

const mapDispatchToProps = () => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ImportAd);
