import React from 'react';
import {View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {profile, loginSingup} from '../../Constants/Texts';
import {TextField} from 'react-native-material-textfield';
import {Button} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import PropTypes from 'prop-types';

const Login = props => {
  const {
    loading,
    emailPassChanged,
    passwordRef,
    emailRef,
    handleEmailChangeText,
    handlePasswordChangeText,
    handleSubmit,
  } = props;

  return (
    <View style={sharedStyles.fullheightView}>
      {loading && loadingPopup}
      <View style={sharedStyles.loginContainer}>
        <TextField
          label={profile.email}
          onChangeText={handleEmailChangeText}
          ref={emailRef}
          tintColor={'#b69cf6'}
          disabled={loading}
        />
        <TextField
          label={profile.password}
          onChangeText={handlePasswordChangeText}
          ref={passwordRef}
          secureTextEntry={true}
          disabled={loading}
          tintColor={'#b69cf6'}
        />
        <View style={sharedStyles.loginBtn}>
          <Button
            disabled={loading || !emailPassChanged}
            raised={true}
            primary
            text={loginSingup}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

Login.propTypes = {
  loading: PropTypes.bool,
  emailPassChanged: PropTypes.bool,
  passwordRef: PropTypes.any,
  emailRef: PropTypes.any,
  handleEmailChangeText: PropTypes.func,
  handlePasswordChangeText: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default Login;
