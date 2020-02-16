import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Picker,
  ScrollView,
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-material-ui';
import {TextField} from 'react-native-material-textfield';
import sharedStyles from '../../assets/styles/sharedStyles';
import ImagePicker from 'react-native-image-picker';
import {
  perfectures,
  perfecturesList,
  currencies,
} from '../../Constants/Countries';
import {adStatuses, adCategories, mimeTypes} from '../../Constants/Ads';
import isUndefined from 'lodash/isUndefined';
import NoAuth from '../NoAuth';
import {LoadingComponent, loadingPopup} from '../Loading';
// import ImgToBase64 from 'react-native-image-base64';
import {importAd} from '../../services/ads';
import {addAd} from '../../redux/Ads/actions';
import invoke from 'lodash/invoke';
import AdDetails from '../AdDetails';

// import Buffer from 'buffer';

const adImages = [0, 1, 2, 3, 4];
// const adTypes = {};

const ImportAd = props => {
  // console.log('IMPORT AD PROPS: ', props);

  const {loggedIn: _loggedIn, user: authUser} = props;
  const userCountry = authUser && authUser.country;

  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [user, setUser] = useState(authUser);
  const [adCategory, setAdCategory] = useState('Sports');
  // const [adType, setAdType] = useState(undefined);
  const [adStatus, setAdStatus] = useState('No Noticable Scratches or Dirt');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [perfecture, setPerfecture] = useState(
    userCountry && perfecturesList[userCountry],
  );
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [selectedAd, setSelectedAd] = useState(undefined);

  const [adDataChanged, setADataChanged] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [adNameChanged, setAdNameChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [priceChanged, setPriceChanged] = useState(false);

  const userCurrency = userCountry && currencies[userCountry];

  const adNameRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();

  useEffect(() => {
    setLoggedIn(_loggedIn);
    setUser(authUser);
    setADataChanged(
      imagesChanged && adNameChanged && descriptionChanged && priceChanged,
    );
  }, [
    _loggedIn,
    authUser,
    imagesChanged,
    adNameChanged,
    descriptionChanged,
    priceChanged,
  ]);

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

  const onAdsDetailsClose = () => {
    setShowAdDetails(false);
  };

  const handleShowAdsDetails = item => {
    setSelectedAd(item);
    setShowAdDetails(true);
  };

  const setDefault = () => {
    setLoading(false);

    const {current: nameField} = adNameRef;
    const {current: descriptionField} = descriptionRef;
    const {current: priceField} = priceRef;

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
    // invoke(props, 'logout', {loggedIn: false, user: false});
    // setLoggedIn(false);
    setDefault();

    // setVerificationId(undefined);
    // setUser(null);

    if (message) {
      Alert.alert(message);
    }
    return;
  };

  const importAdSuccess = data => {
    console.log('importAdimportAdimportAd response: ', data);
    const {error, newAd} = data;

    if (error || !newAd) {
      return handleError(error);
    }

    setDefault();

    invoke(props, 'addAd', newAd);
    handleShowAdsDetails(newAd);
    console.log('SUUUUUCESSSSSSSSS handleConfirm', newAd);
  };

  const handleConfirm = () => {
    // Alert.alert('Confirm');
    // setLoading(false);

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
      perfecture &&
      adStatus &&
      adCategory &&
      imageFiles &&
      userCurrency &&
      adDataChanged
    ) {
      setLoading(true);
      importAd({
        name,
        description,
        image: imageFiles.filter(Boolean),
        perfecture,
        category: adCategory,
        status: adStatus,
        price,
        userId: authUser.id,
        country: authUser.country,
        currency: userCurrency,
      }).then(importAdSuccess, handleError);
    }
  };

  const updateAdCategory = value => {
    Alert.alert('updateAdCategory: ' + value);
    setAdCategory(value);
  };

  // const updateAdType = value => {
  //   Alert.alert('updateAdType: ' + value);
  //   setAdType(value);
  // };

  const updateAdStatus = value => {
    Alert.alert('updateAdStatus: ' + value);
    setAdStatus(value);
  };

  const updatePerfecture = value => {
    Alert.alert('updatePerfecture: ' + value);
    setPerfecture(value);
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

  if (isUndefined(_loggedIn) && isUndefined(user)) {
    return <LoadingComponent />;
  }

  if (!loggedIn && !user) {
    return <NoAuth />;
  }

  if (loggedIn === true && user) {
    return (
      <>
        {loading && loadingPopup}
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={25}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={sharedStyles.loginContainer}>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Product Name</Text>
                <TextField
                  label="Ad Name"
                  // keyboardType="phone-pad"
                  // formatText={formatText}
                  // onSubmitEditing={onSubmit}
                  onChangeText={handleAdNameChangeText}
                  tintColor={'#b69cf6'}
                  // baseColor="#7f0000"
                  ref={adNameRef}
                  disabled={loading}
                />
              </View>

              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>Description</Text>
                <TextField
                  label="Description"
                  // keyboardType="phone-pad"
                  // formatText={formatText}
                  // onSubmitEditing={onSubmit}
                  onChangeText={handleDescriptionChangeText}
                  tintColor={'#b69cf6'}
                  // baseColor="#7f0000"
                  ref={descriptionRef}
                  disabled={loading}
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
                      // formatText={formatText}
                      // onSubmitEditing={onSubmit}
                      tintColor={'#b69cf6'}
                      onChangeText={handlePriceChangeText}
                      // baseColor="#7f0000"
                      ref={priceRef}
                      disabled={loading}
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
                        <Image
                          style={sharedStyles.adImage}
                          source={{uri: images[index]}}
                        />
                      )}
                    </TouchableBounce>
                  ))}
                </View>
              </View>

              <Text style={sharedStyles.label}>Perfecture</Text>
              <View style={sharedStyles.pickerView}>
                <Picker
                  mode="dropdown"
                  selectedValue={perfecture}
                  // style={sharedStyles.dobViewItem}
                  onValueChange={updatePerfecture}>
                  {perfectures[userCountry].map((_perfecture, index) => (
                    <Picker.Item
                      key={index}
                      label={_perfecture}
                      value={_perfecture}
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

              {/* {adType && (
            <>
              <Text style={sharedStyles.label}>Perfecture</Text>
              <Picker
                mode="dropdown"
                selectedValue={adType}
                onValueChange={updateAdType}>
                {adTypes[adCategory].map((_perfecture, index) => (
                  <Picker.Item
                    key={index}
                    label={_perfecture}
                    value={_perfecture}
                  />
                ))}
              </Picker>
            </>
          )} */}

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
                  disabled={loading || !adDataChanged}
                  raised={true}
                  primary
                  text={'Confirm'}
                  onPress={handleConfirm}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {showAdDetails && (
          <AdDetails onClose={onAdsDetailsClose} item={selectedAd} />
        )}
      </>
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

const mapDispatchToProps = dispatch => {
  return {
    addAd: payload => dispatch(addAd(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ImportAd);
