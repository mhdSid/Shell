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
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {TextField} from 'react-native-material-textfield';
import {loadingPopup} from '../Loading';
import {settings, updateUserr} from '../../Constants/Texts';
import {handlerUpdateUserData} from '../../redux/Auth/UpdateUser';
import {connect} from 'react-redux';
import {getUserSelector} from '../UpdateUser/Selectors';
import sha256 from 'crypto-js/sha256';
import {password as hashkey} from '../../services/Encrypt';

const ChangePassword = props => {
  const {user} = props;
  const currentPasswordRef = createRef();
  const newPasswordRef = createRef();
  const [currentPasswordChanged, setCurrentPasswordChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPasswordChanged, setNewPasswordChanged] = useState(false);
  const [currentPasswordValue, setCurrentPasswordValue] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState(null);

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
    } else {
      setCurrentPasswordChanged(false);
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
    } else {
      setNewPasswordChanged(false);
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
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainerPaddingRight}}
          leftElement="arrow-back"
          centerElement={settings.changePassword}
          onLeftElementPress={handleCloseModal}
          rightElement={
            <Button
              color="white"
              onPress={handleUpdateUser}
              disabled={
                loading || !(currentPasswordChanged && newPasswordChanged)
              }
              raised
              text={updateUserr.save}
              icon="done-all"
            />
          }
        />
        {loading && loadingPopup}
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={25}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                sharedStyles.loginContainer,
                sharedStyles.updateUserContainer,
                sharedStyles.updatePasswordContainer,
              ]}>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>
                  {updateUserr.currentPassword}
                </Text>
                <TextField
                  label={updateUserr.currentPassword}
                  secureTextEntry={true}
                  tintColor={'#b69cf6'}
                  onChangeText={handleCurrentPasswordChangeText}
                  ref={currentPasswordRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.mobileContainer}>
                <Text style={sharedStyles.label}>
                  {updateUserr.newPassword}
                </Text>
                <TextField
                  label={updateUserr.newPassword}
                  secureTextEntry={true}
                  tintColor={'#b69cf6'}
                  onChangeText={handleNewPasswordChangedText}
                  ref={newPasswordRef}
                  disabled={loading}
                />
              </View>
              <View style={sharedStyles.updateUserSbmtBtn}>
                <Button
                  disabled={
                    loading || !(currentPasswordChanged && newPasswordChanged)
                  }
                  raised={true}
                  primary
                  text={updateUserr.save}
                  onPress={handleUpdateUser}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

ChangePassword.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
  updateUserAction: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
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
