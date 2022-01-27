import React, {useState, useEffect, createRef} from 'react';
import {View, ScrollView, Text, SafeAreaView, Modal} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Icon, Toolbar} from 'react-native-material-ui';
import {TextField} from 'react-native-material-textfield';
import styles from './editLottery.style';
import ImagePicker from 'react-native-image-picker';
import {prefectures, cities, currencies} from '../../constants/Countries';
import {
  lotteryItemConditions,
  lotteryItemCategories,
} from '../../constants/Lotteries';
import {
  importLottery as importLotteryTexts,
  profile,
  validationMessages,
} from '../../constants/Texts';
import invoke from 'lodash/invoke';
import {Dropdown} from 'react-native-material-dropdown';
import {handleUpdateLottery} from '../../redux/EditLottery/EditLottery';
import ImageResizer from 'react-native-image-resizer';
import {isNumber} from 'lodash';
import FastImage from 'react-native-fast-image';
import {getLangSelector} from '../Settings/Selectors';

const EditLottery = React.memo(props => {
  const {item: lotteryDetails, lang} = props;
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
  const userPrefecture = prefectures.Japan.find(
    item =>
      item.kanji === lotteryDetailsPrefecture ||
      item.name === lotteryDetailsPrefecture,
  ).name;
  const [itemCategory, setItemCategory] = useState(lotteryDetailsCategory);
  const [itemCondition, setItemCondition] = useState(lotteryDetailsCondition);
  const [images, setImages] = useState(
    [...lotteryDetailsImages].concat(
      new Array(10 - lotteryDetailsImages.length)
        .fill(1)
        .map((item, index) => index),
    ),
  );
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
            adName: validationMessages[lang].importLottery.adName,
          });
          setLotteryNameChanged(false);
        }
      };
    },
    description: () => {
      return value => {
        if (value && value.length >= 20 && value.length <= 500) {
          setDescriptionChanged(value !== lotteryDetailsDescription);
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
          setPriceChanged(value !== lotteryDetailsPrice);
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
        imageFiles: filteredImages,
      });
      handleCloseModal();
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
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <View>
            <Toolbar
              style={{
                container: styles.toolbarContainer,
              }}
              centerElement={importLotteryTexts[lang].updateLottery}
              leftElement="arrow-back"
              onLeftElementPress={handleCloseModal}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrollViewContainer}>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.label}>
                  {importLotteryTexts[lang].productName}
                </Text>
                <TextField
                  autoCapitalize={false}
                  autoCorrect={false}
                  placeholder={importLotteryTexts[lang].enterName}
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
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.label}>
                  {importLotteryTexts[lang].description}
                </Text>
                <TextField
                  autoCapitalize={false}
                  autoCorrect={false}
                  placeholder={importLotteryTexts[lang].enterDescription}
                  placeholderTextColor={'rgba(0,0,0,0.3)'}
                  onChangeText={handleChange.description()}
                  maxLength={500}
                  multiline={true}
                  numberOfLines={5}
                  minLength={20}
                  tintColor={'#b69cf6'}
                  defaultValue={lotteryDetailsDescription}
                  error={errors.description}
                  onBlur={handleBlur('description')}
                  ref={descriptionRef}
                />
              </View>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.label}>
                  {importLotteryTexts[lang].price}
                </Text>
                <View style={styles.sectionBlockPriceViewContainer}>
                  <Text style={styles.currencyLabel}>{currencies.JP}</Text>
                  <View style={styles.priceTextFieldViewContainer}>
                    <TextField
                      autoCapitalize={false}
                      autoCorrect={false}
                      placeholder={importLotteryTexts[lang].enterPrice}
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
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.label}>
                  {importLotteryTexts[lang].images}
                </Text>
                <View style={styles.importImageButtonsViewContainer}>
                  {images.map((value, index) => (
                    <TouchableBounce
                      key={value}
                      onPress={handleChoosePhoto(index)}
                      style={[
                        styles.importImageButton,
                        (index === 4 || index === 9) &&
                          styles.importImageButtonListItem,
                      ]}>
                      {isNumber(value) ? (
                        <Icon name="image" size={35} color="white" />
                      ) : null}
                      {!isNumber(value) && value ? (
                        <FastImage
                          style={styles.importedImage}
                          source={{
                            uri: value,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.web,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      ) : null}
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
            </View>
          </ScrollView>
          <View style={styles.editLotteryBottomToolBarViewContainer}>
            <Button
              disabled={!lotteryDataChanged}
              raised={true}
              primary
              icon="done-all"
              style={{container: styles.editLotteryButtonContainer}}
              text={importLotteryTexts[lang].updateLottery}
              onPress={updateLottery}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
});

EditLottery.propTypes = {
  item: PropTypes.object,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    lang: getLangSelector(state),
  };
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
