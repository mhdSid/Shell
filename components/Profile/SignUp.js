import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
} from 'react-native';
import {Button, Checkbox, Toolbar} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import {profile} from '../../constants/Texts';
import sharedStyles from '../../assets/styles/sharedStyles';
import {prefectures, cities} from '../../constants/Countries';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import {connect} from 'react-redux';
import {handleSignUp} from '../../redux/Auth/SignUp';
import {
  getEmailSelector,
  getVerificationCodeSelector,
  getPasswordHashSelector,
} from './Selectors';
import {Dropdown} from 'react-native-material-dropdown';
import TermsAndPrivacyPolicyModal from '../Settings/TermsAndPrivacyPolicyModal';
import {getLangSelector} from '../Settings/Selectors';

const SignUp = props => {
  const {email, passwordHash, verificationCode, lang} = props;
  const [loading, setLoading] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  const [prefectureChanged, setPrefectureChanged] = useState(false);
  const [prefecture, setPrefecture] = useState(null);
  const [city, setCity] = useState(null);
  const [cityDropdownData, setCityDropdownData] = useState([]);
  const [agreedOnPrivacyPolicy, setAgreedOnPrivacyPolicy] = useState(false);
  const [privacyPolicyChanged, setPrivacyPolicyChanged] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const prefecturesDropdownData = prefectures.Japan.map(item => ({
    ...item,
    value: item.kanji,
  }));
  const prefectureOnChangeText = (value, index) => {
    setPrefectureChanged(true);
    setCityDropdownData(
      cities[prefecturesDropdownData[index].name].map(item => ({
        value: item,
      })),
    );
    setPrefecture(prefecturesDropdownData[index].kanji);
  };
  const cityOnChangeText = value => {
    setCityChanged(true);
    setCity(value);
  };
  const onCheckPrivacyPolicy = value => {
    setAgreedOnPrivacyPolicy(value);
    setPrivacyPolicyChanged(value);
  };
  const setDefaultsDataChanged = () => {
    setUserDataChanged(false);
    setCityChanged(false);
    setPrefectureChanged(false);
  };
  const callback = () => {
    setDefaultsDataChanged();
    setLoading(false);
  };
  const handleSignupPress = () => {
    if (email && passwordHash && verificationCode && prefecture && city) {
      const newUser = {
        email,
        passwordHash,
        verificationCode,
        country: 'Japan',
        prefecture,
        city,
      };
      setLoading(true);
      invoke(props, 'signUp', {
        newUser,
        onSuccess: callback,
        onError: callback,
      });
    }
  };
  const handlePrivacyModalClose = () => {
    setShowPrivacyModal(false);
  };
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  useEffect(() => {
    setUserDataChanged(
      prefectureChanged && cityChanged && privacyPolicyChanged,
    );
  }, [prefectureChanged, cityChanged, privacyPolicyChanged]);

  useEffect(() => {
    setShowPrivacyModal(agreedOnPrivacyPolicy);
  }, [agreedOnPrivacyPolicy]);

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            keyboardVerticalOffset={25}>
            <Toolbar
              style={{
                container: [
                  sharedStyles.toolbarContainer,
                  sharedStyles.toolbarContainerPadding,
                ],
              }}
              leftElement="arrow-back"
              centerElement={profile[lang].shellSignUp}
              onLeftElementPress={handleCloseModal}
            />
            {loading && loadingPopup}
            {showPrivacyModal && (
              <TermsAndPrivacyPolicyModal
                lang={lang}
                onClose={handlePrivacyModalClose}
              />
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={[
                  sharedStyles.loginContainer,
                  sharedStyles.signUpContainer,
                ]}>
                <Text style={sharedStyles.label}>
                  {profile[lang].prefecture}
                </Text>
                <View style={sharedStyles.dropdownView}>
                  <Dropdown
                    label={profile[lang].enterPrefecture}
                    data={prefecturesDropdownData}
                    onChangeText={prefectureOnChangeText}
                    selectedItemColor={'rgba(0, 0, 0, .87)'}
                    baseColor={'rgba(0,0,0,0.25)'}
                  />
                </View>
                <Text style={sharedStyles.label}>{profile[lang].city}</Text>
                <View style={sharedStyles.dropdownView}>
                  <Dropdown
                    label={profile[lang].enterCity}
                    selectedItemColor={'rgba(0, 0, 0, .87)'}
                    baseColor={'rgba(0,0,0,0.25)'}
                    data={cityDropdownData}
                    onChangeText={cityOnChangeText}
                  />
                </View>
                <Checkbox
                  label={profile[lang].agreePriacyPolicy}
                  checked={agreedOnPrivacyPolicy}
                  value={true}
                  onCheck={onCheckPrivacyPolicy}
                />
                <View
                  style={[sharedStyles.loginBtn, sharedStyles.loginBtnMargin]}>
                  <Button
                    disabled={loading || !userDataChanged}
                    raised={true}
                    primary
                    text={profile[lang].signUp}
                    style={{
                      container: sharedStyles.mainButtonContainer,
                    }}
                    onPress={handleSignupPress}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

SignUp.propTypes = {
  email: PropTypes.string,
  passwordHash: PropTypes.string,
  verificationCode: PropTypes.string,
  login: PropTypes.func,
  logout: PropTypes.func,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    email: getEmailSelector(state),
    passwordHash: getPasswordHashSelector(state),
    verificationCode: getVerificationCodeSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    signUp: payload => dispatch(handleSignUp(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
