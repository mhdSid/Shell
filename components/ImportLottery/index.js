import React, {useState, useEffect, createRef, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Icon, Toolbar} from 'react-native-material-ui';
import {TextField} from 'react-native-material-textfield';
import sharedStyles from '../../assets/styles/sharedStyles';
import ImagePicker from 'react-native-image-picker';
import {prefectures, cities, currencies} from '../../Constants/Countries';
import {
  lotteryItemConditions,
  lotteryItemCategories,
} from '../../Constants/Lotteries';
import isUndefined from 'lodash/isUndefined';
import NoAuth from '../NoAuth';
import {LoadingComponent} from '../Loading';
import {
  importLottery as importLotteryTexts,
  profile,
  validationMessages,
} from '../../Constants/Texts';
import invoke from 'lodash/invoke';
import {handleImportLottery} from '../../redux/ImportLottery/ImportLottery';
import {getLoggedInSelector, getUserSelector} from './Selectors';
import {Dropdown} from 'react-native-material-dropdown';
import {navigate} from '../MainContainer';
import {successConfirmationModal as successConfirmationModalTexts} from '../../Constants/Texts';
import FastImage from 'react-native-fast-image';
import ImageResizer from 'react-native-image-resizer';

let SuccessConfirmationModal = null;
let UploadLotteryProgressModal = null;

const ImportLottery = props => {
  const {loggedIn, user} = props;
  let userPrefecture;
  if (user) {
    userPrefecture = prefectures.Japan.find(
      item => item.kanji === user.prefecture,
    ).name;
  }
  const userCountry = user && user.country;
  const [showLotteryProgressModal, setShowLotteryProgressModal] = useState(
    false,
  );
  const [
    showSuccessConfirmationModal,
    setShowSuccessConfirmationModal,
  ] = useState(false);
  const [itemCategory, setItemCategory] = useState('');
  const [itemCondition, setItemCondition] = useState('');
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [prefecture, setPrefecture] = useState(user && user.prefecture);
  const [city, setCity] = useState(user && user.city);
  const [lotteryDataChanged, setLotteryDataChanged] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [lotteryNameChanged, setLotteryNameChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [priceChanged, setPriceChanged] = useState(false);
  const [itemCategoryChanged, setItemCategoryChanged] = useState(false);
  const [itemConditionChanged, setItemConditionChanged] = useState(false);
  const [cityDropdownData, setCityDropdownData] = useState(
    userPrefecture ? cities[userPrefecture].map(item => ({value: item})) : [],
  );
  const prefecturesDropdownData = prefectures.Japan.map(item => ({
    ...item,
    value: item.kanji,
  }));
  const prefectureOnChangeText = (value, index) => {
    setCityDropdownData(
      cities[prefecturesDropdownData[index].name].map(item => ({
        value: item,
      })),
    );
    setPrefecture(prefecturesDropdownData[index].kanji);
  };
  const cityOnChangeText = value => {
    setCity(value);
  };

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
          setLotteryNameChanged(true);
          setErrors({
            ...errors,
            adName: false,
          });
        } else {
          setErrors({
            ...errors,
            adName: validationMessages.importLottery.adName,
          });
          setLotteryNameChanged(false);
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
            description: validationMessages.importLottery.description,
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
            price: validationMessages.importLottery.price,
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
    setLotteryDataChanged(false);
    setImagesChanged(false);
    setLotteryNameChanged(false);
    setDescriptionChanged(false);
    setPriceChanged(false);
    setItemCategoryChanged(false);
    setItemConditionChanged(false);
  };
  const animatedImages = [
    {
      translateX: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(0)).current,
    },
    {
      translateX: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(0)).current,
    },
    {
      translateX: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(0)).current,
    },
    {
      translateX: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(0)).current,
    },
    {
      translateX: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(0)).current,
    },
  ];
  const startAnimation = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const animationDelayGap = 100;
    let animationDelay = 0;

    animatedImages.forEach(animatedImage => {
      animationDelay += animationDelayGap;

      Animated.parallel([
        Animated.timing(animatedImage.translateY, {
          toValue: -windowHeight + 225,
          duration: 1000,
          delay: animationDelay,
          easing: Easing.elastic(1),
        }),
        Animated.timing(animatedImage.translateX, {
          toValue: -windowWidth / 2 + 45,
          duration: 1000,
          delay: animationDelay,
        }),
      ]).start();
    });
  };
  const handleUploadLottery = () => {
    // startAnimation();
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
      itemCondition &&
      itemCategory &&
      imageFiles &&
      userCurrency &&
      lotteryDataChanged
    ) {
      const filteredImages = imageFiles.filter(Boolean);
      invoke(props, 'importLottery', {
        name,
        description,
        image: filteredImages[0],
        prefecture,
        city,
        category: itemCategory,
        condition: itemCondition,
        price,
        userId: user.id,
        country: user.country,
        currency: userCurrency,
        onError: () => {},
        onSuccess: () => {},
        imageFiles: filteredImages,
      });
      setDefault(nameField, descriptionField, priceField);
      if (!SuccessConfirmationModal) {
        SuccessConfirmationModal = require('../SuccessConfirmationModal')
          .default;
      }
      setShowSuccessConfirmationModal(true);
    }
  };
  const updateItemCategory = value => {
    setItemCategoryChanged(true);
    setItemCategory(value);
  };
  const updateItemCondition = value => {
    setItemConditionChanged(true);
    setItemCondition(value);
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
            ImageResizer.createResizedImage(
              response.uri,
              400,
              400,
              'JPEG',
              50,
              0,
              null,
              true,
              {
                mode: 'cover',
                onlyScaleDown: true,
              },
            ).then(data => {
              const imagesArray = [...images];
              const imagesFilesArray = [...imageFiles];
              imagesArray[index] = data.uri;
              imagesFilesArray[index] = {
                uri: data.uri,
                type: 'jpeg',
                name: data.name,
              };
              setImagesChanged(true);
              setImages([...imagesArray]);
              setImageFiles([...imagesFilesArray]);
            });
          }
          if (imageFiles.length) {
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
      handleChange[fieldName]()(values[fieldName]);
    };
  };
  const handleCloseUploadLotteryProgressModal = () => {
    setShowLotteryProgressModal(false);
  };
  const handleShowUploadLotteryProgressModal = () => {
    if (!UploadLotteryProgressModal) {
      UploadLotteryProgressModal = require('../UploadLotteryProgress/UploadLotteryProgressModal')
        .default;
    }
    setShowLotteryProgressModal(true);
  };
  const handleSuccessConfirmationModalClose = () => {
    setShowSuccessConfirmationModal(false);
    navigate('home')();
  };
  const handleSuccessConfirmationModalCreateAnotherLottery = () => {
    setShowSuccessConfirmationModal(false);
  };
  const successModalActions = [
    {
      text:
        successConfirmationModalTexts.importLottery.actions.createAnotherLottery
          .text,
      icon:
        successConfirmationModalTexts.importLottery.actions.createAnotherLottery
          .icon,
      onPress: handleSuccessConfirmationModalCreateAnotherLottery,
    },
    {
      text:
        successConfirmationModalTexts.importLottery.actions.continueBrowsing
          .text,
      icon:
        successConfirmationModalTexts.importLottery.actions.continueBrowsing
          .icon,
      onPress: handleSuccessConfirmationModalClose,
    },
  ];

  useEffect(() => {
    setLotteryDataChanged(
      imagesChanged &&
        lotteryNameChanged &&
        descriptionChanged &&
        priceChanged &&
        itemCategoryChanged &&
        itemConditionChanged,
    );
  }, [
    imagesChanged,
    lotteryNameChanged,
    descriptionChanged,
    priceChanged,
    itemCategoryChanged,
    itemConditionChanged,
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
        {showSuccessConfirmationModal ? (
          <SuccessConfirmationModal
            title={successConfirmationModalTexts.importLottery.title}
            subtitle={successConfirmationModalTexts.importLottery.subtitle}
            onClose={handleSuccessConfirmationModalCreateAnotherLottery}
            actions={successModalActions}
          />
        ) : null}
        {showLotteryProgressModal ? (
          <UploadLotteryProgressModal
            onClose={handleCloseUploadLotteryProgressModal}
          />
        ) : null}
        <View>
          <Toolbar
            style={{
              container: sharedStyles.toolbarContainerPadding,
            }}
            centerElement={importLotteryTexts.createLottery}
            leftElement={'cloud-upload'}
            onLeftElementPress={handleShowUploadLotteryProgressModal}
            rightElement={
              <Button
                onPress={handleUploadLottery}
                disabled={!lotteryDataChanged}
                raised
                text={importLotteryTexts.create}
                style={{
                  container: sharedStyles.mainButtonContainer,
                  text: {color: '#b69cf6'},
                }}
                icon="done-all"
              />
            }
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={sharedStyles.importAdContainer}>
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>
                {importLotteryTexts.productName}
              </Text>
              <TextField
                placeholder={importLotteryTexts.enterName}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                onBlur={handleBlur('adName')}
                onChangeText={handleChange.adName()}
                tintColor={'#b69cf6'}
                maxLength={30}
                returnKeyType="done"
                minLength={5}
                error={errors.adName}
                ref={adNameRef}
              />
            </View>
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>
                {importLotteryTexts.description}
              </Text>
              <TextField
                placeholder={importLotteryTexts.enterDescription}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                onChangeText={handleChange.description()}
                maxLength={100}
                returnKeyType="done"
                minLength={20}
                tintColor={'#b69cf6'}
                error={errors.description}
                onBlur={handleBlur('description')}
                ref={descriptionRef}
              />
            </View>
            <View style={sharedStyles.mobileContainer}>
              <Text style={sharedStyles.label}>{importLotteryTexts.price}</Text>
              <View style={sharedStyles.priceContainer}>
                <Text style={sharedStyles.currencyLabel}>{userCurrency}</Text>
                <View style={sharedStyles.adPriceTextfieldContainer}>
                  <TextField
                    placeholder={importLotteryTexts.enterPrice}
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    keyboardType="phone-pad"
                    maxLength={9}
                    returnKeyType="done"
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
              <Text style={sharedStyles.label}>
                {importLotteryTexts.images}
              </Text>
              <View style={sharedStyles.imageBtnContainer}>
                {adImages.map(index => (
                  <TouchableBounce
                    key={index}
                    onPress={handleChoosePhoto(index)}
                    style={[
                      sharedStyles.imageBtn,
                      index === 4 && sharedStyles.imageBtnLast,
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
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    )}
                  </TouchableBounce>
                ))}
              </View>
            </View>
            <Text style={sharedStyles.label}>{profile.prefecture}</Text>
            <View style={sharedStyles.dropdownView}>
              <Dropdown
                baseColor={'rgba(0,0,0,0.3)'}
                label={profile.enterPrefecture}
                data={prefecturesDropdownData}
                onChangeText={prefectureOnChangeText}
                selectedItemColor={'rgba(0, 0, 0, .87)'}
                value={prefecture}
              />
            </View>
            <Text style={sharedStyles.label}>{profile.city}</Text>
            <View style={sharedStyles.dropdownView}>
              <Dropdown
                baseColor={'rgba(0,0,0,0.3)'}
                label={profile.enterCity}
                selectedItemColor={'rgba(0, 0, 0, .87)'}
                data={cityDropdownData}
                onChangeText={cityOnChangeText}
                value={city}
              />
            </View>

            <Text style={sharedStyles.label}>
              {importLotteryTexts.category}
            </Text>
            <View style={sharedStyles.dropdownView}>
              <Dropdown
                label={importLotteryTexts.enterCategory}
                baseColor={'rgba(0,0,0,0.3)'}
                selectedItemColor={'rgba(0, 0, 0, .87)'}
                data={lotteryItemCategories}
                onChangeText={updateItemCategory}
                value={itemCategory}
              />
            </View>
            <Text style={sharedStyles.label}>
              {importLotteryTexts.condition}
            </Text>
            <View style={sharedStyles.dropdownView}>
              <Dropdown
                baseColor={'rgba(0,0,0,0.3)'}
                label={importLotteryTexts.enterCondition}
                selectedItemColor={'rgba(0, 0, 0, .87)'}
                data={lotteryItemConditions}
                onChangeText={updateItemCondition}
                value={itemCondition}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            sharedStyles.lotteryDetailsBottomToolbar,
            {backgroundColor: 'white'},
          ]}>
          <Button
            disabled={!lotteryDataChanged}
            raised={true}
            primary
            icon="done-all"
            style={{container: sharedStyles.mainButtonContainer}}
            text={importLotteryTexts.createLottery}
            onPress={handleUploadLottery}
          />
        </View>
        {/* {animatedImages.map(animatedImage => (
            <Animated.View
              style={[
                sharedStyles.animatedImage,
                {
                  transform: [
                    {
                      translateY: animatedImage.translateY,
                    },
                    {
                      translateX: animatedImage.translateX,
                    },
                  ],
                },
              ]}
            />
          ))} */}
      </View>
    );
  }
};

ImportLottery.propTypes = {
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
    importLottery: payload => dispatch(handleImportLottery(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportLottery);
