import React, {useState, useEffect, createRef} from 'react';
import {View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {
  profile,
  loginSingup,
  login,
  signUp,
  orLogin,
  orSignUp,
} from '../../Constants/Texts';
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
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailPassChanged, setEmailPassChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const userEmailRegex = new RegExp(emailsRegex);
  const emailRef = createRef();
  const passwordRef = createRef();
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const setDefaultsDataChanged = () => {
    // setEmailChanged(false);
    // setPasswordChanged(false);
    // setEmailPassChanged(true);
    setErrors({
      email: false,
      password: false,
    });
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

  const handleChange = {
    email: () => {
      return value => {
        if (
          value &&
          value.match(userEmailRegex) &&
          value.length >= 1 &&
          value.length <= 50
        ) {
          setEmailChanged(true);
          setErrors({
            ...errors,
            email: false,
          });
        } else {
          setEmailChanged(false);
          setErrors({
            ...errors,
            email: true,
          });
        }
      };
    },
    password: () => {
      return value => {
        if (value && value.length >= 6 && value.length <= 50) {
          setPasswordChanged(true);
          setErrors({
            ...errors,
            password: false,
          });
        } else {
          setPasswordChanged(false);
          setErrors({
            ...errors,
            password: true,
          });
        }
      };
    },
  };
  const handleBlur = fieldName => {
    return () => {
      const {current: emailField} = emailRef;
      const {current: passField} = passwordRef;

      const values = {
        email: emailField && emailField.value(),
        password: passField && passField.value(),
      };
      console.log(values);
      handleChange[fieldName]()(values[fieldName]);
    };
  };

  useEffect(() => {
    setEmailPassChanged(emailChanged && passwordChanged);
  }, [emailChanged, passwordChanged]);

  return (
    <View style={sharedStyles.fullheightView}>
      {loading && loadingPopup}
      <View
        style={[sharedStyles.loginContainer, sharedStyles.relativeConatainer]}>
        <TextField
          label={profile.email}
          ref={emailRef}
          tintColor={'#b69cf6'}
          disabled={loading}
          maxLength={50}
          minLength={1}
          onBlur={handleBlur('email')}
          error={errors.email}
          onChangeText={handleChange.email()}
        />
        <TextField
          label={profile.password}
          ref={passwordRef}
          secureTextEntry={true}
          disabled={loading}
          tintColor={'#b69cf6'}
          maxLength={50}
          minLength={8}
          onBlur={handleBlur('password')}
          error={errors.password}
          onChangeText={handleChange.password()}
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

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    handleLogin: payload => dispatch(handleLogin(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
