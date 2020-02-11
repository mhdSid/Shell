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
import {adStatuses, adCategories} from '../../Constants/Ads';
import isUndefined from 'lodash/isUndefined';
import NoAuth from '../NoAuth';
import {LoadingComponent} from '../Loading';

const adImages = [0, 1, 2, 3, 4];
const adTypes = {};

const ImportAd = props => {
  console.log('IMPORT AD PROPS: ', props);

  const {loggedIn: _loggedIn, user: authUser} = props;
  const userCountry = authUser && authUser.country;

  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [user, setUser] = useState(authUser);
  const [adCategory, setAdCategory] = useState('Sports');
  const [adType, setAdType] = useState(undefined);
  const [adStatus, setAdStatus] = useState('No Noticable Scratches or Dirt');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [perfecture, setPerfecture] = useState(
    userCountry && perfecturesList[userCountry],
  );

  const userCurrency = userCountry && currencies[userCountry];

  const adNameRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();

  useEffect(() => {
    setLoggedIn(_loggedIn);
    setUser(authUser);
  }, [_loggedIn, authUser]);

  const handleConfirm = () => {
    Alert.alert('Confirm');
    setLoading(true);
    setLoading(false);
  };

  const updateAdCategory = value => {
    Alert.alert('updateAdCategory: ' + value);
    setAdCategory(value);
  };

  const updateAdType = value => {
    Alert.alert('updateAdType: ' + value);
    setAdType(value);
  };

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
          images[index] = response.uri;
          setImages([...images]);
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
      <ScrollView>
        <View style={[sharedStyles.importAdView, sharedStyles.loginContainer]}>
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
                <Picker.Item key={index} label={_category} value={_category} />
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
    // navigate: payload => dispatch(navigate(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ImportAd);
