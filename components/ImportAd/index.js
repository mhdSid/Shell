import React, {useState, useEffect, createRef} from 'react';
import {View, Picker, ScrollView, Text, Image, Alert} from 'react-native';
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
import {LoadingComponent} from '../Loading';
// import ImgToBase64 from 'react-native-image-base64';
import {importAd} from '../../services/ads';
import {addAd} from '../../redux/Ads/actions';
import invoke from 'lodash/invoke';
import AdDetails from '../AdDetails';

// import Buffer from 'buffer';

const adImages = [0, 1, 2, 3, 4];
// const adTypes = {};

const ImportAd = props => {
  console.log('IMPORT AD PROPS: ', props);

  const {loggedIn: _loggedIn, user: authUser} = props;
  const userCountry = authUser && authUser.country;

  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [user, setUser] = useState(authUser);
  const [adCategory, setAdCategory] = useState('Sports');
  // const [adType, setAdType] = useState(undefined);
  const [adStatus, setAdStatus] = useState('No Noticable Scratches or Dirt');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [perfecture, setPerfecture] = useState(
    userCountry && perfecturesList[userCountry],
  );
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [selectedAd, setSelectedAd] = useState(undefined);

  const userCurrency = userCountry && currencies[userCountry];

  const adNameRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();

  useEffect(() => {
    setLoggedIn(_loggedIn);
    setUser(authUser);
  }, [_loggedIn, authUser]);

  const onAdsDetailsClose = () => {
    setShowAdDetails(false);
  };

  const handleShowAdsDetails = item => {
    setSelectedAd(item);
    setShowAdDetails(true);
  };

  const handleError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    // invoke(props, 'logout', {loggedIn: false, user: false});
    // setLoggedIn(false);
    setLoading(false);
    // setVerificationId(undefined);
    // setUser(null);

    if (message) {
      Alert.alert(message);
    }
    return;
  };

  const importAdSuccess = (nameField, descriptionField, priceField) => {
    return data => {
      console.log('importAdimportAdimportAd response: ', data);
      const {error, newAd} = data;

      if (error || !newAd) {
        return handleError(error);
      }

      nameField.setValue('');
      descriptionField.setValue('');
      priceField.setValue('');

      invoke(props, 'addAd', newAd);
      handleShowAdsDetails(newAd);

      console.log('SUUUUUCESSSSSSSSS handleConfirm', newAd);

      setLoading(false);
    };
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
      base64Images &&
      userCurrency
    ) {
      setLoading(true);
      // console.log({
      //   name,
      //   description,
      //   images: base64Images.filter(Boolean),
      //   perfecture,
      //   category: adCategory,
      //   status: adStatus,
      //   price,
      //   userId: authUser.id,
      //   country: authUser.country,
      //   currency: userCurrency,
      // });
      importAd({
        name,
        description,
        image: base64Images.filter(Boolean),
        perfecture,
        category: adCategory,
        status: adStatus,
        price,
        userId: authUser.id,
        country: authUser.country,
        currency: userCurrency,
      }).then(
        importAdSuccess(nameField, descriptionField, priceField),
        handleError,
      );
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

          // ImgToBase64.getBase64String(imagePath)
          //   .then(base64String => {
          //     console.log(
          //       'base64Stringbase64Stringbase64String: ',
          //       // base64String,
          //     );
          // // const buffer = new Buffer.Buffer(base64String, 'base64');
          // const buffer = new Buffer.Buffer.from(base64String, 'ascii');
          // const buff = new Buffer.Buffer.from('fhqwhgads', 'utf8');
          // console.log(buff.type);
          const imageName = imagePath.slice(
            imagePath.lastIndexOf('/') + 1,
            imagePath.length,
          );

          const typeRegex = imageName.match(/\.jpg|png|jpeg/);

          base64Images[index] = {
            uri: response.uri,
            // base64: base64String,
            type: mimeTypes[typeRegex[0]],
            name: imageName,
            // encoding: '7bit',
          };

          console.log([...base64Images]);

          setBase64Images([...base64Images]);
          // console.log(base64Images);
          // let bufferString = '<Buffer ';
          // buff.data.map((item, _index) => {
          //   bufferString += ` ${item}`;
          //   if (index === buff.data.length - 1) {
          //     bufferString += '>';
          //   }
          // });
          // console.log(bufferString);

          // console.log(buffer);
          // })
          // .catch(err => {
          //   console.log('errrror base 64 image: base64String error: ', err);
          // });
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
      <View>
        <ScrollView>
          <View
            style={[sharedStyles.importAdView, sharedStyles.loginContainer]}>
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>Product Name</Text>
              <TextField
                label="Ad Name"
                // keyboardType="phone-pad"
                // formatText={formatText}
                // onSubmitEditing={onSubmit}
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
                tintColor={'#b69cf6'}
                // baseColor="#7f0000"
                ref={descriptionRef}
                disabled={loading}
              />
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
                    // baseColor="#7f0000"
                    ref={priceRef}
                    disabled={loading}
                  />
                </View>
              </View>
            </View>

            <View style={sharedStyles.loginBtn}>
              <Button
                disabled={loading}
                raised={true}
                primary
                text={'Confirm'}
                onPress={handleConfirm}
              />
            </View>
          </View>
        </ScrollView>
        {showAdDetails && (
          <AdDetails onClose={onAdsDetailsClose} item={selectedAd} />
        )}
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

const mapDispatchToProps = dispatch => {
  return {
    addAd: payload => dispatch(addAd(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ImportAd);
