import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-material-ui';
import {connect} from 'react-redux';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import invoke from 'lodash/invoke';

const LoginButton = props => {
  const {loggedIn} = props;

  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  const text = isLoggedIn ? 'Logout' : 'Login';

  useEffect(() => {
    console.log('use effect: ', loggedIn);
    setLoggedIn(loggedIn);
  }, [loggedIn]);

  const handlePress = () => {
    if (isLoggedIn) {
      invoke(props, 'logout');
    } else {
      invoke(props, 'login', {loggedIn: true});
    }
  };

  return (
    <SafeAreaView>
      <Button primary text={text} onPress={handlePress} />
    </SafeAreaView>
  );
};

LoginButton.propTypes = {
  loggedIn: PropTypes.bool,
  visible: PropTypes.bool,
};

const mapStateToProps = ({authReducer}) => {
  return {
    loggedIn: authReducer.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: () => dispatch(logoutAction()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
