import React, {useState, useEffect, createRef} from 'react';
import {View, ScrollView, Text, SafeAreaView, Modal, Image} from 'react-native';
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
import {
  importLottery as importLotteryTexts,
  profile,
  validationMessages,
} from '../../Constants/Texts';
import invoke from 'lodash/invoke';
import {Dropdown} from 'react-native-material-dropdown';
import {handleUpdateLottery} from '../../redux/EditLottery/EditLottery';
import {loadingPopup} from '../Loading';
import ImageResizer from 'react-native-image-resizer';
import {isNumber} from 'lodash';

const EditLottery = props => {
  const {item: lotteryDetails} = props;
  const {
    name: lotteryDetailsName,
    description: lotteryDetailsDescription,
    price: lotteryDetailsPrice,
    images: lotteryDetailsImages,
    prefecture: lotteryDetailsPrefecture,
    city: lotteryDetailsCity,
    category: lotteryDetailsCategory,
    condition: lotteryDetailsCondition,
    userId,
    id: lotteryDetailsId,
  } = lotteryDetails;
  console.log(' ');
  const userPrefecture = prefectures.Japan.find(
    item =>
      item.kanji === lotteryDetailsPrefecture ||
      item.name === lotteryDetailsPrefecture,
  ).name;
  const [loading, setLoading] = useState(false);
  const [itemCategory, setItemCategory] = useState(lotteryDetailsCategory);
  const [itemCondition, setItemCondition] = useState(lotteryDetailsCondition);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [prefecture, setPrefecture] = useState(lotteryDetailsPrefecture);
  const [city, setCity] = useState(lotteryDetailsCity);
  const [lotteryDataChanged, setLotteryDataChanged] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  const [prefectureChanged, setPrefectureChanged] = useState(false);
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
    setPrefectureChanged(value !== lotteryDetailsPrefecture);
    setCityDropdownData(
      cities[prefecturesDropdownData[index].name].map(item => ({
        value: item,
      })),
    );
    setPrefecture(prefecturesDropdownData[index].kanji);
  };
  const cityOnChangeText = value => {
    setCityChanged(value !== lotteryDetailsCity);
    setCity(value);
  };

  const [errors, setErrors] = useState({
    adName: false,
    description: false,
    price: false,
  });
  const adNameRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();
  const viewImages = [...lotteryDetailsImages].concat(
    new Array(10 - lotteryDetailsImages.length)
      .fill(1)
      .map((item, index) => index),
  );
  console.log(viewImages);
  const handleChange = {
    adName: () => {
      return value => {
        if (value && value.length >= 5 && value.length <= 30) {
          setLotteryNameChanged(value !== lotteryDetailsName);
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
          setDescriptionChanged(value !== lotteryDetailsDescription);
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
          setPriceChanged(value !== lotteryDetailsPrice);
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
  // const setDefault = (nameField, descriptionField, priceField) => {
  //   nameField.setValue('');
  //   descriptionField.setValue('');
  //   priceField.setValue('');
  //   setImages([]);
  //   setImageFiles([]);
  //   setLotteryDataChanged(false);
  //   setImagesChanged(false);
  //   setLotteryNameChanged(false);
  //   setDescriptionChanged(false);
  //   setPriceChanged(false);
  //   setItemCategoryChanged(false);
  //   setItemConditionChanged(false);
  //   setCityChanged(false);
  //   setPrefectureChanged(false);
  // };

  const updateLottery = () => {
    const {current: nameField} = adNameRef;
    const {current: descriptionField} = descriptionRef;
    const {current: priceField} = priceRef;
    const name = nameField.value();
    const description = descriptionField.value();
    const price = priceField.value();
    const filteredImages = imageFiles.filter(Boolean);
    if (
      name ||
      description ||
      price ||
      prefecture ||
      city ||
      itemCondition ||
      itemCategory ||
      (filteredImages && filteredImages.length) ||
      lotteryDataChanged
    ) {
      setLoading(true);
      invoke(props, 'updateLottery', {
        name,
        description,
        prefecture,
        city,
        category: itemCategory,
        condition: itemCondition,
        price,
        userId,
        id: lotteryDetailsId,
        textDataChanged:
          lotteryNameChanged ||
          descriptionChanged ||
          priceChanged ||
          priceChanged ||
          prefectureChanged ||
          cityChanged ||
          itemConditionChanged ||
          itemCategoryChanged,
        onError: () => {},
        onSuccess: () => {
          setLoading(false);
          handleCloseModal();
        },
        imageFiles: filteredImages,
      });
      // setDefault(nameField, descriptionField, priceField);
    }
  };
  const updateItemCategory = value => {
    setItemCategoryChanged(value !== lotteryDetailsCategory);
    setItemCategory(value);
  };
  const updateItemCondition = value => {
    setItemConditionChanged(value !== lotteryDetailsCondition);
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
              40,
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
  useEffect(() => {
    setLotteryDataChanged(
      imagesChanged ||
        lotteryNameChanged ||
        descriptionChanged ||
        priceChanged ||
        itemCategoryChanged ||
        cityChanged ||
        prefectureChanged ||
        itemConditionChanged,
    );
  }, [
    imagesChanged,
    lotteryNameChanged,
    descriptionChanged,
    priceChanged,
    itemCategoryChanged,
    itemConditionChanged,
    cityChanged,
    prefectureChanged,
  ]);

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <View>
            <Toolbar
              style={{
                container: sharedStyles.toolbarContainerPadding,
              }}
              centerElement={importLotteryTexts.updateLottery}
              leftElement="arrow-back"
              onLeftElementPress={handleCloseModal}
              // rightElement={
              //   <Button
              //     onPress={updateLottery}
              //     disabled={!lotteryDataChanged}
              //     raised
              //     text={importLotteryTexts.update}
              //     style={{
              //       container: sharedStyles.mainButtonContainer,
              //       text: {color: '#b69cf6'},
              //     }}
              //     icon="done-all"
              //   />
              // }
            />
          </View>
          {loading && loadingPopup}
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
                  defaultValue={lotteryDetailsName}
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
                  defaultValue={lotteryDetailsDescription}
                  error={errors.description}
                  onBlur={handleBlur('description')}
                  ref={descriptionRef}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>
                  {importLotteryTexts.price}
                </Text>
                <View style={sharedStyles.priceContainer}>
                  <Text style={sharedStyles.currencyLabel}>
                    {currencies.JP}
                  </Text>
                  <View style={sharedStyles.adPriceTextfieldContainer}>
                    <TextField
                      placeholder={importLotteryTexts.enterPrice}
                      placeholderTextColor={'rgba(0,0,0,0.3)'}
                      keyboardType="phone-pad"
                      defaultValue={lotteryDetailsPrice}
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
                  {viewImages.map((value, index) => (
                    <TouchableBounce
                      key={value || index}
                      onPress={handleChoosePhoto(index)}
                      style={[
                        sharedStyles.imageBtn,
                        (index === 4 || index === 9) &&
                          sharedStyles.imageBtnLast,
                      ]}>
                      {isNumber(value) || !value ? (
                        <Icon name="image" size={35} color="white" />
                      ) : null}
                      {!isNumber(value) && value ? (
                        <Image
                          style={sharedStyles.adImage}
                          source={{
                            uri: value,
                            // priority: FastImage.priority.high,
                            cache: 'force-cache',
                          }}
                          resizeMode={'cover'}
                        />
                      ) : null}
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
              text={importLotteryTexts.updateLottery}
              onPress={updateLottery}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

EditLottery.propTypes = {
  item: PropTypes.object,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateLottery: payload => dispatch(handleUpdateLottery(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLottery);
