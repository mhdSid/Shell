import React, {useState, createRef} from 'react';
import invoke from 'lodash/invoke';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './changePassword.style';
import {Toolbar, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {TextField} from 'react-native-material-textfield';
import {loadingPopup} from '../Loading';
import {settings, updateUserr, validationMessages} from '../../constants/Texts';
import {handlerUpdateUserData} from '../../redux/Auth/UpdateUser';
import {connect} from 'react-redux';
import {getUserSelector} from '../UpdateUser/Selectors';
import sha256 from 'crypto-js/sha256';
import {password as hashkey} from '../../services/Encrypt';
import {getLangSelector} from './Selectors';

const ChangePassword = React.memo(props => {
  const {user, lang} = props;
  const currentPasswordRef = createRef();
  const newPasswordRef = createRef();
  const [currentPasswordChanged, setCurrentPasswordChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPasswordChanged, setNewPasswordChanged] = useState(false);
  const [currentPasswordValue, setCurrentPasswordValue] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState(null);
  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
  });
  const getCurrentPasswordHash = value => {
    return sha256(value + hashkey).toString();
  };
  const getNewPasswordHash = value => {
    return sha256(value + hashkey).toString();
  };
  const handleCurrentPasswordChangeText = value => {
    setCurrentPasswordValue(value);
    if (
      value &&
      value.length >= 6 &&
      value.length <= 50 &&
      getCurrentPasswordHash(value) === user.passwordHash
    ) {
      setCurrentPasswordChanged(true);
      setErrors({
        ...errors,
        currentPassword: false,
      });
    } else {
      setCurrentPasswordChanged(false);
      setErrors({
        ...errors,
        currentPassword: validationMessages[lang].changePassword.currentPassword,
      });
    }
  };
  const handleNewPasswordChangedText = value => {
    setNewPasswordValue(value);
    if (
      value &&
      value.length >= 6 &&
      value.length <= 50 &&
      currentPasswordValue !== value &&
      getCurrentPasswordHash(currentPasswordValue) === user.passwordHash &&
      getNewPasswordHash(value) !== user.passwordHash
    ) {
      setNewPasswordChanged(true);
      setErrors({
        ...errors,
        newPassword: false,
      });
    } else {
      setNewPasswordChanged(false);
      setErrors({
        ...errors,
        newPassword: validationMessages[lang].changePassword.newPassword,
      });
    }
  };
  const setDefaultsDataChanged = () => {
    setLoading(false);
    setCurrentPasswordChanged(false);
    setNewPasswordChanged(false);
  };
  const onSuccessCallback = () => {
    setDefaultsDataChanged();
    handleCloseModal();
  };
  const handleUpdateUser = () => {
    if (currentPasswordChanged && newPasswordChanged) {
      setLoading(true);
      invoke(props, 'handleUpdateUserData', {
        onError: setDefaultsDataChanged,
        onSuccess: onSuccessCallback,
        updatedUserData: {
          passwordHash: getNewPasswordHash(newPasswordValue),
          id: user.id,
          email: user.email,
        },
      });
    }
  };
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={settings[lang].changePassword}
            onLeftElementPress={handleCloseModal}
          />
          {loading && loadingPopup}
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            keyboardVerticalOffset={25}>
            <ScrollView>
              <View style={styles.scrollViewContainer}>
                <View style={styles.sectionBlockContainer}>
                  <Text style={styles.label}>
                    {updateUserr[lang].currentPassword}
                  </Text>
                  <TextField
                    placeholder={updateUserr[lang].currentPassword}
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    secureTextEntry={true}
                    autoCapitalize={false}
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={handleUpdateUser}
                    tintColor={'#b69cf6'}
                    onChangeText={handleCurrentPasswordChangeText}
                    ref={currentPasswordRef}
                    disabled={loading}
                    error={errors.currentPassword}
                  />
                </View>
                <View style={styles.sectionBlockContainer}>
                  <Text style={styles.label}>
                    {updateUserr[lang].newPassword}
                  </Text>
                  <TextField
                    placeholder={updateUserr[lang].newPassword}
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    secureTextEntry={true}
                    autoCapitalize={false}
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={handleUpdateUser}
                    tintColor={'#b69cf6'}
                    onChangeText={handleNewPasswordChangedText}
                    ref={newPasswordRef}
                    disabled={loading}
                    error={errors.newPassword}
                  />
                </View>
                <View style={styles.changePasswordButtonViewContainer}>
                  <Button
                    disabled={
                      loading || !(currentPasswordChanged && newPasswordChanged)
                    }
                    style={{
                      container: styles.mainButtonContainer,
                    }}
                    raised={true}
                    primary
                    text={updateUserr[lang].save}
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

ChangePassword.propTypes = {
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
    handleUpdateUserData: payload => dispatch(handlerUpdateUserData(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
