import {Image, Modal, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {loadingPopup} from '../Loading';
import {Button, Toolbar} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import {profile as profileTexts} from '../../constants/Texts';
import {getEmailSelector, getPasswordHashSelector} from './Selectors';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import {handleVerifyUser} from '../../redux/Auth/VerifyUser';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {invoke} from 'lodash';
import {handleResendVerificationCode} from '../../redux/Auth/ResendVerificationCode';
import {getLangSelector} from '../Settings/Selectors';

const VerifyUserCode = props => {
  const {email, passwordHash, lang} = props;
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({verificationCode, cellCount: 6});
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    verificationCode,
    setVerificationCode,
  });
  const callback = () => {
    setLoading(false);
  };
  const errorCallback = () => {
    setVerificationCode('');
    setLoading(false);
  };
  const handleVerifyUserPress = code => {
    if (email && passwordHash && code.length === 6) {
      setLoading(true);
      invoke(props, 'handleVerifyUser', {
        onSuccess: callback,
        onError: errorCallback,
        email,
        passwordHash,
        verificationCode: code,
      });
    }
  };
  const handleResendPress = () => {
    if (email && passwordHash) {
      setLoading(true);
      invoke(props, 'handleResendVerificationCode', {
        onSuccess: callback,
        onError: errorCallback,
        email,
        passwordHash,
      });
    }
  };
  const handleChangeText = code => {
    setVerificationCode(code);
    if (code && code.length === 6) {
      handleVerifyUserPress(code);
    }
  };

  const renderCell = ({index, symbol, isFocused}) => {
    return (
      <Text
        key={index}
        style={sharedStyles.verificationCodeCell}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </Text>
    );
  };
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{
              container: [
                sharedStyles.toolbarContainer,
                sharedStyles.toolbarContainerPadding,
              ],
            }}
            leftElement="arrow-back"
            centerElement={profileTexts[lang].verifyAccount}
            onLeftElementPress={handleCloseModal}
          />
          {loading && loadingPopup}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                sharedStyles.loginContainer,
                sharedStyles.verificaitonContainer,
              ]}>
              <Image
                style={sharedStyles.verificationIcon}
                source={{
                  uri:
                    'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
                }}
              />
              <Text style={sharedStyles.verificationTitleSubTitle}>
                {profileTexts[lang].verificationSubTitle}
              </Text>
              <CodeField
                ref={ref}
                {...codeFieldProps}
                value={verificationCode}
                onChangeText={handleChangeText}
                cellCount={6}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
              <View style={sharedStyles.loginBtn}>
                <Button
                  raised={true}
                  style={{
                    container: sharedStyles.mainButtonContainer,
                    text: sharedStyles.resendCodeButtonText,
                  }}
                  text={profileTexts[lang].resend}
                  onPress={handleResendPress}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

VerifyUserCode.propTypes = {
  email: PropTypes.string,
  passwordHash: PropTypes.string,
  logout: PropTypes.func,
  login: PropTypes.func,
  lang: PropTypes.string,
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    email: getEmailSelector(state),
    passwordHash: getPasswordHashSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: payload => dispatch(logoutAction(payload)),
    login: payload => dispatch(loginAction(payload)),
    handleVerifyUser: payload => dispatch(handleVerifyUser(payload)),
    handleResendVerificationCode: payload =>
      dispatch(handleResendVerificationCode(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyUserCode);
