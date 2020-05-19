import React, {useState, useEffect, createRef} from 'react';
import {View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {profile, loginSingup} from '../../Constants/Texts';
import {TextField} from 'react-native-material-textfield';
import {Button} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {emailsRegex} from '../../Constants/Regexes';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import {handleLogin} from '../../redux/Auth/Login';

const Login = props => {
  const [loading, setLoading] = useState(false);
  const [emailPassChanged, setEmailPassChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const userEmailRegex = new RegExp(emailsRegex);
  const emailRef = createRef();
  const passwordRef = createRef();

  const setDefaultsDataChanged = () => {
    setEmailChanged(false);
    setPasswordChanged(false);
  };
  const callback = () => {
    setLoading(false);
    setDefaultsDataChanged();
  };
  const handleSubmit = () => {
    const {current: emailField} = emailRef;
    const {current: passField} = passwordRef;
    const email = emailField.value();
    const password = passField.value();
    if (email && password) {
      setLoading(true);
      const lowerCaseEmail = email.toLowerCase();
      invoke(props, 'handleLogin', {
        email: lowerCaseEmail,
        password,
        onSuccess: callback,
        onError: callback,
      });
    }
  };
  const handleEmailChangeText = value => {
    if (value && value.match(userEmailRegex)) {
      setEmailChanged(true);
    } else {
      setEmailChanged(false);
    }
  };
  const handlePasswordChangeText = value => {
    if (value && value.length > 5) {
      setPasswordChanged(true);
    } else {
      setPasswordChanged(false);
    }
  };

  useEffect(() => {
    setEmailPassChanged(emailChanged && passwordChanged);
  }, [emailChanged, passwordChanged]);

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
  login: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = ({}) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    handleLogin: payload => dispatch(handleLogin(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Login);
