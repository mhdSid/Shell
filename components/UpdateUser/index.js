import React, {useState, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './updateUser.style';
import {Toolbar, Icon, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {prefectures, cities} from '../../constants/Countries';
import {loadingPopup} from '../Loading';
import {profile, updateUserr} from '../../constants/Texts';
import {connect} from 'react-redux';
import {getUserSelector} from './Selectors';
import {Dropdown} from 'react-native-material-dropdown';
import {handleUpdateUserData} from '../../redux/Auth/UpdateUser';
import ImageResizer from 'react-native-image-resizer';
import FastImage from 'react-native-fast-image';
import {getLangSelector} from '../Settings/Selectors';

const UpdateUser = React.memo(props => {
  const {user, lang} = props;
  let userPrefecture;
  if (user) {
    userPrefecture = prefectures.Japan.find(
      item => item.kanji === user.prefecture,
    ).name;
  }
  const [prefecture, setPrefecture] = useState(user.prefecture);
  const [city, setCity] = useState(user.city);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imageFile, setImageFile] = useState(undefined);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [prefectureChanged, setPrefectureChanged] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  const [cityDropdownData, setCityDropdownData] = useState(
    userPrefecture ? cities[userPrefecture].map(item => ({value: item})) : [],
  );
  const prefecturesDropdownData = prefectures.Japan.map(item => ({
    ...item,
    value: item.kanji,
  }));
  const prefectureOnChangeText = (value, index) => {
    setPrefectureChanged(value !== userPrefecture);
    setCityDropdownData(
      cities[prefecturesDropdownData[index].name].map(item => ({
        value: item,
      })),
    );
    setPrefecture(prefecturesDropdownData[index].kanji);
  };
  const cityOnChangeText = value => {
    setCityChanged(value !== user.city);
    setCity(value);
  };
  const handleUpdateUser = () => {
    if (userDataChanged) {
      setLoading(true);
      const updatedUserData = {
        ...(prefectureChanged && {prefecture}),
        ...(cityChanged && {city}),
        ...(imageChanged && {image: imageFile}),
        id: user.id,
        email: user.email,
      };
      invoke(props, 'handleUpdateUserData', {
        onError: () => {},
        onSuccess: () => {
          setLoading(false);
          handleCloseModal();
        },
        updatedUserData,
      });
    }
  };
  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      {
        noData: true,
      },
      response => {
        if (response.uri) {
          ImageResizer.createResizedImage(
            response.uri,
            150,
            150,
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
            setImageChanged(true);
            setImage(data.uri);
            setImageFile({
              uri: data.uri,
              type: 'jpeg',
              name: data.name,
            });
          });
        }
      },
    );
  };

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  useEffect(() => {
    setUserDataChanged(imageChanged || prefectureChanged || cityChanged);
  }, [imageChanged, cityChanged, prefectureChanged]);

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            onLeftElementPress={handleCloseModal}
            centerElement={updateUserr[lang].updateProfile}
          />
          {loading && loadingPopup}
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            keyboardVerticalOffset={25}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.scrollViewContainer}>
                <View style={styles.sectionBlockContainer}>
                  <View style={styles.userImageButtonViewContainer}>
                    <TouchableBounce
                      onPress={handleChoosePhoto}
                      style={styles.userImageButtonContainer}>
                      {!image && !user.image ? (
                        <Icon name="image" size={35} color="white" />
                      ) : null}
                      {image || user.image ? (
                        <FastImage
                          style={styles.userImage}
                          source={{
                            uri: image || user.image,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.web,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      ) : null}
                    </TouchableBounce>
                    <Text style={styles.chooseProfileImageText}>
                      {updateUserr[lang].choosePhoto}
                    </Text>
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
                    label={profile[lang].enterCity}
                    baseColor={'rgba(0,0,0,0.3)'}
                    selectedItemColor={'rgba(0, 0, 0, .87)'}
                    data={cityDropdownData}
                    onChangeText={cityOnChangeText}
                    value={city}
                  />
                </View>
                <View style={styles.updateUserButtonViewContainer}>
                  <Button
                    disabled={loading || !userDataChanged}
                    raised={true}
                    primary
                    style={{container: styles.updateUserButtonContainer}}
                    text={updateUserr[lang].update}
                    onPress={handleUpdateUser}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Modal>
  );
});

UpdateUser.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
  updateUserAction: PropTypes.func,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdateUserData: payload => dispatch(handleUpdateUserData(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);
