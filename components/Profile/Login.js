import React, {useState, useEffect, createRef} from 'react';
import {View, ScrollView, Modal, SafeAreaView} from 'react-native';
import styles from './login.style';
import {profile, loginSignup, validationMessages} from '../../constants/Texts';
import {TextField} from 'react-native-material-textfield';
import {Button, Toolbar} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {emailsRegex} from '../../constants/Regexes';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import {handleLogin} from '../../redux/Auth/Login';
import {Text} from 'react-native';
import {getLangSelector} from '../Settings/Selectors';

const Login = React.memo(props => {
  const {lang} = props;
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
            email: validationMessages[lang].loginSignup.email,
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
            password: validationMessages[lang].loginSignup.password,
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
      handleChange[fieldName]()(values[fieldName]);
    };
  };

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  useEffect(() => {
    setEmailPassChanged(emailChanged && passwordChanged);
  }, [emailChanged, passwordChanged]);

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{
              container: styles.toolbarContainer,
            }}
            leftElement="arrow-back"
            centerElement={profile[lang].loginOrSignup}
            onLeftElementPress={handleCloseModal}
          />
          {loading && loadingPopup}
          <ScrollView>
            <View style={styles.scrollViewContainer}>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.label}>{profile[lang].email}</Text>
                <TextField
                  placeholder={profile[lang].enterEmail}
                  placeholderTextColor={'rgba(0,0,0,0.3)'}
                  ref={emailRef}
                  tintColor={'#b69cf6'}
                  autoCapitalize={false}
                  autoCorrect={false}
                  disabled={loading}
                  maxLength={50}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  minLength={1}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  onChangeText={handleChange.email()}
                />
              </View>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.label}>{profile[lang].password}</Text>
                <TextField
                  placeholder={profile[lang].enterPassword}
                  placeholderTextColor={'rgba(0,0,0,0.3)'}
                  ref={passwordRef}
                  secureTextEntry={true}
                  disabled={loading}
                  autoCorrect={false}
                  autoCapitalize={false}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  tintColor={'#b69cf6'}
                  maxLength={50}
                  minLength={8}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  onChangeText={handleChange.password()}
                />
              </View>
              <View style={styles.loginButtonViewContainer}>
                <Button
                  disabled={loading || !emailPassChanged}
                  raised={true}
                  primary
                  text={loginSignup[lang].loginSignup}
                  style={{
                    container: styles.loginButtonContainer,
                  }}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
});

Login.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  lang: PropTypes.string,
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    lang: getLangSelector(state),
  };
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
