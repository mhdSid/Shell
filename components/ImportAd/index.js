import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Picker,
  ScrollView,
  Text,
  // Alert,
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
import FastImage from 'react-native-fast-image';
import {importAd} from '../../Constants/Texts';
import invoke from 'lodash/invoke';
import {handleImportAd} from '../../redux/Ads/ImportAd';
import {getLoggedInSelector, getUserSelector} from './Selectors';
import UploadAdProgress from '../UploadAdProgress';

const ImportAd = props => {
  const {loggedIn, user} = props;
  const userCountry = user && user.country;
  const [adCategory, setAdCategory] = useState(importAd.sports);
  const [adStatus, setAdStatus] = useState(importAd.noNoticableScratches);
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
    setImageFiles([]);
    setADataChanged(false);
    setImagesChanged(false);
    setAdNameChanged(false);
    setDescriptionChanged(false);
    setPriceChanged(false);
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
      invoke(props, 'handleImportAd', {
        name,
        description,
        image: filteredImages[0],
        prefecture,
        category: adCategory,
        status: adStatus,
        price,
        userId: user.id,
        country: user.country,
        currency: userCurrency,
        onError: () => {},
        onSuccess: () => {},
        imageFiles: filteredImages,
      });
      setDefault(nameField, descriptionField, priceField);
    }
  };
  const updateAdCategory = value => {
    // Alert.alert('updateAdCategory: ' + value);
    setAdCategory(value);
  };
  const updateAdStatus = value => {
    // Alert.alert('updateAdStatus: ' + value);
    setAdStatus(value);
  };
  const updatePrefecture = value => {
    // Alert.alert('updatePrefecture: ' + value);
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
    setADataChanged(
      imagesChanged && adNameChanged && descriptionChanged && priceChanged,
    );
  }, [imagesChanged, adNameChanged, descriptionChanged, priceChanged]);

  if (isUndefined(loggedIn) && isUndefined(user)) {
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
            centerElement={importAd.postAnAd}
            leftElement={<Icon color="white" name="add-box" />}
            rightElement={
              <Button
                onPress={handleUploadAd}
                disabled={!adDataChanged}
                raised
                text={importAd.post}
                icon="done-all"
              />
            }
          />
          <UploadAdProgress relative={true} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={sharedStyles.importAdContainer}>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>{importAd.productName}</Text>
                <TextField
                  label={importAd.adName}
                  onChangeText={handleAdNameChangeText}
                  tintColor={'#b69cf6'}
                  ref={adNameRef}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>{importAd.description}</Text>
                <TextField
                  label={importAd.description}
                  onChangeText={handleDescriptionChangeText}
                  tintColor={'#b69cf6'}
                  ref={descriptionRef}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>{importAd.price}</Text>
                <View style={sharedStyles.priceContainer}>
                  <Text style={sharedStyles.currenyLabel}>{userCurrency}</Text>
                  <View style={sharedStyles.adPriceTextfieldContainer}>
                    <TextField
                      label={importAd.price}
                      keyboardType="phone-pad"
                      tintColor={'#b69cf6'}
                      onChangeText={handlePriceChangeText}
                      ref={priceRef}
                    />
                  </View>
                </View>
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>{importAd.images}</Text>
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
                        <FastImage
                          style={sharedStyles.adImage}
                          source={{
                            uri: images[index],
                            priority: FastImage.priority.low,
                            cache: FastImage.cacheControl.immutable,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      )}
                    </TouchableBounce>
                  ))}
                </View>
              </View>
              <Text style={sharedStyles.label}>{importAd.prefecture}</Text>
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
              <Text style={sharedStyles.label}>{importAd.category}</Text>
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
              <Text style={sharedStyles.label}>{importAd.status}</Text>
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
                  text={importAd.post}
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

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleImportAd: payload => dispatch(handleImportAd(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportAd);
