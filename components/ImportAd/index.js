import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Picker,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Icon, Toolbar} from 'react-native-material-ui';
import {TextField} from 'react-native-material-textfield';
import sharedStyles from '../../assets/styles/sharedStyles';
import ImagePicker from 'react-native-image-picker';
import {prefectures, cities, currencies} from '../../Constants/Countries';
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
  const userCity = user && user.city;
  const userPrefecture = user && user.prefecture;
  const [adCategory, setAdCategory] = useState('');
  const [adStatus, setAdStatus] = useState('');
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [prefecture, setPrefecture] = useState(userPrefecture || '');
  const [city, setCity] = useState(userCity || '');
  const [adDataChanged, setADataChanged] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [adNameChanged, setAdNameChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [priceChanged, setPriceChanged] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  const [prefectureChanged, setPrefectureChanged] = useState(false);
  const [adCategoryChanged, setAdCategoryChanged] = useState(false);
  const [adStatusChanged, setAdStatusChanged] = useState(false);

  const [errors, setErrors] = useState({
    adName: false,
    description: false,
    price: false,
    images: false,
  });
  const userCurrency = userCountry && currencies[userCountry];
  const adNameRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();
  const adImages = [0, 1, 2, 3, 4];
  const handleChange = {
    adName: () => {
      return value => {
        if (value && value.length >= 5 && value.length <= 30) {
          setAdNameChanged(true);
          setErrors({
            ...errors,
            adName: false,
          });
        } else {
          setErrors({
            ...errors,
            adName: true,
          });
          setAdNameChanged(false);
        }
      };
    },
    description: () => {
      return value => {
        if (value && value.length >= 20 && value.length <= 100) {
          setDescriptionChanged(true);
          setErrors({
            ...errors,
            description: false,
          });
        } else {
          setErrors({
            ...errors,
            description: true,
          });
          setDescriptionChanged(false);
        }
      };
    },
    price: () => {
      return value => {
        if (
          value &&
          value.length >= 4 &&
          value.length <= 9 &&
          value % 100 === 0
        ) {
          setPriceChanged(true);
          setErrors({
            ...errors,
            price: false,
          });
        } else {
          setErrors({
            ...errors,
            price: true,
          });
          setPriceChanged(false);
        }
      };
    },
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
    setCityChanged(false);
    setPrefectureChanged(false);
    setAdStatusChanged(false);
    setAdCategoryChanged(false);
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
      city &&
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
        city,
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
    setAdCategoryChanged(true);
    setAdCategory(value);
  };
  const updateAdStatus = value => {
    setAdStatusChanged(true);
    setAdStatus(value);
  };
  const updatePrefecture = value => {
    setPrefectureChanged(true);
    setPrefecture(value);
  };
  const updateCity = value => {
    setCityChanged(true);
    setCity(value);
  };
  const handleChoosePhoto = index => {
    return () => {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        response => {
          if (response.didCancel && imageFiles.length === 0) {
            setErrors({
              ...errors,
              images: true,
            });
            return;
          }
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
          if (imageFiles.length > 0) {
            setErrors({
              ...errors,
              images: false,
            });
          }
        },
      );
    };
  };
  const handleBlur = fieldName => {
    return () => {
      const {current: nameField} = adNameRef;
      const {current: descriptionField} = descriptionRef;
      const {current: priceField} = priceRef;
      const values = {
        adName: nameField && nameField.value(),
        description: descriptionField && descriptionField.value(),
        price: priceField && priceField.value(),
      };
      console.log(values);
      handleChange[fieldName]()(values[fieldName]);
    };
  };
  useEffect(() => {
    setADataChanged(
      imagesChanged &&
        adNameChanged &&
        descriptionChanged &&
        priceChanged &&
        cityChanged &&
        prefectureChanged &&
        adStatusChanged &&
        adCategoryChanged,
    );
  }, [
    imagesChanged,
    adNameChanged,
    descriptionChanged,
    priceChanged,
    cityChanged,
    prefectureChanged,
    adStatusChanged,
    adCategoryChanged,
  ]);

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
            centerElement={importAd.createLottery}
            leftElement={<Icon color="white" name="cloud-upload" />}
            rightElement={
              <Button
                onPress={handleUploadAd}
                disabled={!adDataChanged}
                raised
                text={importAd.create}
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
                  onBlur={handleBlur('adName')}
                  onChangeText={handleChange.adName()}
                  tintColor={'#b69cf6'}
                  maxLength={30}
                  minLength={5}
                  error={errors.adName}
                  ref={adNameRef}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>{importAd.description}</Text>
                <TextField
                  label={importAd.description}
                  onChangeText={handleChange.description()}
                  maxLength={100}
                  minLength={20}
                  tintColor={'#b69cf6'}
                  error={errors.description}
                  onBlur={handleBlur('description')}
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
                      maxLength={9}
                      minLength={4}
                      tintColor={'#b69cf6'}
                      onBlur={handleBlur('price')}
                      error={errors.price}
                      onChangeText={handleChange.price()}
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
                      style={[
                        sharedStyles.imageBtn,
                        index === 0 && errors.images
                          ? sharedStyles.imageBtnError
                          : '',
                      ]}>
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
                  selectedValue={prefecture || userPrefecture}
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
              <Text style={sharedStyles.label}>{importAd.city}</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={city || userCity}
                  onValueChange={updateCity}>
                  {cities[prefecture].map((_city, index) => (
                    <Picker.Item key={index} label={_city} value={_city} />
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
                  text={importAd.createLottery}
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
