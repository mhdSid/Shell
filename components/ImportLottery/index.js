import React, {useState, useEffect, createRef, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  Easing,
  Dimensions,
  Image,
} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Icon, Toolbar} from 'react-native-material-ui';
import {TextField} from 'react-native-material-textfield';
import styles from './importLottery.style';
import ImagePicker from 'react-native-image-picker';
import {prefectures, cities, currencies} from '../../constants/Countries';
import {
  lotteryItemConditions,
  lotteryItemCategories,
} from '../../constants/Lotteries';
import isUndefined from 'lodash/isUndefined';
import NoAuth from '../NoAuth';
import {LoadingComponent} from '../Loading';
import {
  importLottery as importLotteryTexts,
  profile,
  noAuth as noAuthTexts,
  validationMessages,
} from '../../constants/Texts';
import invoke from 'lodash/invoke';
import {handleImportLottery} from '../../redux/ImportLottery/ImportLottery';
import {getLoggedInSelector, getUserSelector} from './Selectors';
import {Dropdown} from 'react-native-material-dropdown';
import {navigate} from '../MainContainer';
import {successConfirmationModal as successConfirmationModalTexts} from '../../constants/Texts';
import ImageResizer from 'react-native-image-resizer';
import FastImage from 'react-native-fast-image';
import {getLangSelector} from '../Settings/Selectors';

let SuccessConfirmationModal = null;
let UploadLotteryProgressModal = null;

const ImportLottery = React.memo(props => {
  const {loggedIn, user, lang} = props;
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
  const [shippingInformationChanged, setShippingInformationChanged] = useState(
    false,
  );
  const [lotteryRulesChanged, setLotteryRulesChanged] = useState(false);
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
    shippingInformation: false,
    lotteryRules: false,
  });
  const userCurrency = userCountry && currencies[userCountry];
  const adNameRef = createRef();
  const descriptionRef = createRef();
  const shippingInformationRef = createRef();
  const lotteryRulesRef = createRef();
  const priceRef = createRef();
  const adImages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handleChange = {
    shippingInformation: () => {
      return value => {
        
      };
    },
    lotteryRules: () => {
      return value => {
        
      };
    },
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
            adName: validationMessages[lang].importLottery.adName,
          });
          setLotteryNameChanged(false);
        }
      };
    },
    description: () => {
      return value => {
        if (value && value.length >= 20 && value.length <= 500) {
          setDescriptionChanged(true);
          setErrors({
            ...errors,
            description: false,
          });
        } else {
          setErrors({
            ...errors,
            description: validationMessages[lang].importLottery.description,
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
            price: validationMessages[lang].importLottery.price,
          });
          setPriceChanged(false);
        }
      };
    },
  };
  const setDefault = (
    nameField,
    descriptionField,
    priceField,
    shippingInformationField,
    lotteryRulesField,
  ) => {
    nameField.setValue('');
    descriptionField.setValue('');
    shippingInformationField.setValue('');
    lotteryRulesField.setValue('');
    priceField.setValue('');
    setImages([]);
    setImageFiles([]);
    setLotteryDataChanged(false);
    setImagesChanged(false);
    setLotteryNameChanged(false);
    setDescriptionChanged(false);
    setLotteryRulesChanged(false);
    setShippingInformationChanged(false);
    setPriceChanged(false);
    setItemCategoryChanged(false);
    setItemConditionChanged(false);
  };
  // const animatedImages = [
  //   {
  //     translateX: useRef(new Animated.Value(0)).current,
  //     translateY: useRef(new Animated.Value(0)).current,
  //   },
  //   {
  //     translateX: useRef(new Animated.Value(0)).current,
  //     translateY: useRef(new Animated.Value(0)).current,
  //   },
  //   {
  //     translateX: useRef(new Animated.Value(0)).current,
  //     translateY: useRef(new Animated.Value(0)).current,
  //   },
  //   {
  //     translateX: useRef(new Animated.Value(0)).current,
  //     translateY: useRef(new Animated.Value(0)).current,
  //   },
  //   {
  //     translateX: useRef(new Animated.Value(0)).current,
  //     translateY: useRef(new Animated.Value(0)).current,
  //   },
  // ];
  // const startAnimation = () => {
  //   const windowWidth = Dimensions.get('window').width;
  //   const windowHeight = Dimensions.get('window').height;
  //   const animationDelayGap = 100;
  //   let animationDelay = 0;

  //   animatedImages.forEach(animatedImage => {
  //     animationDelay += animationDelayGap;

  //     Animated.parallel([
  //       Animated.timing(animatedImage.translateY, {
  //         toValue: -windowHeight + 225,
  //         duration: 1000,
  //         delay: animationDelay,
  //         easing: Easing.elastic(1),
  //       }),
  //       Animated.timing(animatedImage.translateX, {
  //         toValue: -windowWidth / 2 + 45,
  //         duration: 1000,
  //         delay: animationDelay,
  //       }),
  //     ]).start();
  //   });
  // };
  const handleUploadLottery = () => {
    // startAnimation();
    const {current: nameField} = adNameRef;
    const {current: descriptionField} = descriptionRef;
    const {current: shippingInformationField} = shippingInformationRef;
    const {current: lotteryRulesField} = lotteryRulesRef;
    const {current: priceField} = priceRef;
    const name = nameField.value();
    const description = descriptionField.value();
    const lotteryRules = lotteryRulesField.value();
    const shippingInformation = shippingInformationField.value();
    const price = priceField.value();
    if (
      name &&
      description &&
      price &&
      prefecture &&
      city &&
      itemCondition &&
      shippingInformation &&
      lotteryRules &&
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
        shippingInformation,
        lotteryRules,
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
      setDefault(
        nameField,
        descriptionField,
        priceField,
        shippingInformationField,
        lotteryRulesField,
      );
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
              350,
              350,
              'JPEG',
              40,
              0,
              null,
              true,
              {
                mode: 'cover',
                onlyScaleDown: true,
              },
            ).then(data => {
              console.log(data)
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
      const {current: shippingInformationField} = shippingInformationRef;
      const {current: lotteryRulesField} = lotteryRulesRef;
      const {current: priceField} = priceRef;
      const values = {
        adName: nameField && nameField.value(),
        description: descriptionField && descriptionField.value(),
        shippingInformation:
          shippingInformationField && shippingInformationField.value(),
        lotteryRules: lotteryRulesField && lotteryRulesField.value(),
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
        successConfirmationModalTexts[lang].importLottery.actions
          .createAnotherLottery.text,
      icon:
        successConfirmationModalTexts[lang].importLottery.actions
          .createAnotherLottery.icon,
      onPress: handleSuccessConfirmationModalCreateAnotherLottery,
    },
    {
      text:
        successConfirmationModalTexts[lang].importLottery.actions
          .continueBrowsing.text,
      icon:
        successConfirmationModalTexts[lang].importLottery.actions
          .continueBrowsing.icon,
      onPress: handleSuccessConfirmationModalClose,
    },
  ];

  useEffect(() => {
    setLotteryDataChanged(
      imagesChanged &&
        lotteryNameChanged &&
        descriptionChanged &&
        shippingInformationChanged &&
        lotteryRulesChanged &&
        priceChanged &&
        itemCategoryChanged &&
        itemConditionChanged,
    );
  }, [
    imagesChanged,
    lotteryNameChanged,
    shippingInformationChanged,
    lotteryRulesChanged,
    descriptionChanged,
    priceChanged,
    itemCategoryChanged,
    itemConditionChanged,
  ]);

  if (isUndefined(loggedIn) && isUndefined(user)) {
    return <LoadingComponent />;
  }

  if (!loggedIn && !user) {
    return <NoAuth text={noAuthTexts[lang].imporLottery} lang={lang} />;
  }

  if (loggedIn === true && user) {
    return (
      <View style={styles.importLotteryViewContainer}>
        {showSuccessConfirmationModal ? (
          <SuccessConfirmationModal
            title={successConfirmationModalTexts[lang].importLottery.title}
            subtitle={
              successConfirmationModalTexts[lang].importLottery.subtitle
            }
            onClose={handleSuccessConfirmationModalCreateAnotherLottery}
            actions={successModalActions}
            lang={lang}
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
              container: styles.toolbarContainer,
            }}
            centerElement={importLotteryTexts[lang].createLottery}
            rightElement={'cloud-upload'}
            onRightElementPress={handleShowUploadLotteryProgressModal}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollViewContainer}>
            <View style={styles.sectionBlockContainer}>
              <Text style={styles.label}>
                {importLotteryTexts[lang].productName}
              </Text>
              <TextField
                placeholder={importLotteryTexts[lang].enterName}
                autoCapitalize={false}
                autoCorrect={false}
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
            <View style={styles.sectionBlockContainer}>
              <Text style={styles.label}>
                {importLotteryTexts[lang].description}
              </Text>
              <TextField
                placeholder={importLotteryTexts[lang].enterDescription}
                autoCapitalize={false}
                autoCorrect={false}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                onChangeText={handleChange.description()}
                maxLength={500}
                multiline={true}
                numberOfLines={5}
                minLength={20}
                tintColor={'#b69cf6'}
                error={errors.description}
                onBlur={handleBlur('description')}
                ref={descriptionRef}
              />
            </View>
            <Text style={styles.label}>
              {importLotteryTexts[lang].category}
            </Text>
            <View style={styles.dropdownView}>
              <Dropdown
                label={importLotteryTexts[lang].enterCategory}
                baseColor={'rgba(0,0,0,0.3)'}
                selectedItemColor={'rgba(0, 0, 0, .87)'}
                data={lotteryItemCategories[lang]}
                onChangeText={updateItemCategory}
                value={itemCategory}
              />
            </View>
            <Text style={styles.label}>
              {importLotteryTexts[lang].condition}
            </Text>
            <View style={styles.dropdownView}>
              <Dropdown
                baseColor={'rgba(0,0,0,0.3)'}
                label={importLotteryTexts[lang].enterCondition}
                selectedItemColor={'rgba(0, 0, 0, .87)'}
                data={lotteryItemConditions[lang]}
                onChangeText={updateItemCondition}
                value={itemCondition}
              />
            </View>
            <View style={styles.sectionBlockContainer}>
              <Text style={styles.label}>{importLotteryTexts[lang].price}</Text>
              <View style={styles.sectionBlockPriceViewContainer}>
                <Text style={styles.currencyLabel}>{userCurrency}</Text>
                <View style={styles.priceTextFieldViewContainer}>
                  <TextField
                    placeholder={importLotteryTexts[lang].enterPrice}
                    autoCapitalize={false}
                    autoCorrect={false}
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
            <View style={styles.sectionBlockContainer}>
              <Text style={styles.label}>
                {importLotteryTexts[lang].shippingInformation}
              </Text>
              <TextField
                placeholder={importLotteryTexts[lang].enterShippingInformation}
                autoCapitalize={false}
                autoCorrect={false}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                onChangeText={handleChange.shippingInformation()}
                maxLength={500}
                multiline={true}
                numberOfLines={5}
                minLength={20}
                tintColor={'#b69cf6'}
                error={errors.shippingInformation}
                onBlur={handleBlur('shippingInformation')}
                ref={shippingInformationRef}
              />
            </View>
            <View style={styles.sectionBlockContainer}>
              <Text style={styles.label}>
                {importLotteryTexts[lang].lotteryRules}
              </Text>
              <TextField
                placeholder={importLotteryTexts[lang].enterLotteryRules}
                autoCapitalize={false}
                autoCorrect={false}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                onChangeText={handleChange.lotteryRules()}
                maxLength={500}
                multiline={true}
                numberOfLines={5}
                minLength={20}
                tintColor={'#b69cf6'}
                error={errors.lotteryRules}
                onBlur={handleBlur('lotteryRules')}
                ref={lotteryRulesRef}
              />
            </View>
            <View style={styles.sectionBlockContainer}>
              <Text style={styles.label}>
                {importLotteryTexts[lang].images}
              </Text>
              <View style={styles.importImageButtonsViewContainer}>
                {adImages.map(index => (
                  <TouchableBounce
                    key={index}
                    onPress={handleChoosePhoto(index)}
                    style={[
                      styles.importImageButton,
                      (index === 4 || index === 9) &&
                        styles.importImageButtonLast,
                      index === 0 && errors.images
                        ? styles.importImageButtonError
                        : '',
                    ]}>
                    {!images[index] && (
                      <Icon name="image" size={35} color="white" />
                    )}
                    {images[index] && (
                      <FastImage
                        style={styles.importedImage}
                        source={{
                          uri: images[index],
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.web,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    )}
                  </TouchableBounce>
                ))}
              </View>
            </View>
            <Text style={styles.label}>{profile[lang].prefecture}</Text>
            <View style={styles.dropdownView}>
              <Dropdown
                baseColor={'rgba(0,0,0,0.3)'}
                label={profile[lang].enterPrefecture}
                data={prefecturesDropdownData}
                onChangeText={prefectureOnChangeText}
                selectedItemColor={'rgba(0, 0, 0, .87)'}
                value={prefecture}
              />
            </View>
            <Text style={styles.label}>{profile[lang].city}</Text>
            <View style={styles.dropdownView}>
              <Dropdown
                baseColor={'rgba(0,0,0,0.3)'}
                label={profile[lang].enterCity}
                selectedItemColor={'rgba(0, 0, 0, .87)'}
                data={cityDropdownData}
                onChangeText={cityOnChangeText}
                value={city}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomToolBarViewContainer}>
          <Button
            disabled={!lotteryDataChanged}
            raised={true}
            primary
            icon="done-all"
            style={{container: styles.importButtonContainer}}
            text={importLotteryTexts[lang].createLottery}
            onPress={handleUploadLottery}
          />
        </View>
        {/* {animatedImages.map(animatedImage => (
            <Animated.View
              style={[
                styles.animatedImage,
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
});

ImportLottery.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
    lang: getLangSelector(state),
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
