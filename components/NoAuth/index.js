import React from 'react';
import {View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button} from 'react-native-material-ui';
import {navigate} from '../MainContainer';
import {noAuth, loginSignup} from '../../constants/Texts';
import PropTypes from 'prop-types';

const NoAuth = props => {
  const {lang} = props;
  const navigateToAuth = () => {
    navigate('profile')();
  };

  return (
    <View
      style={[
        sharedStyles.importAdContainerNoAuth,
        sharedStyles.importAdNoAuthContainer,
      ]}>
      <Text style={[sharedStyles.label, sharedStyles.verificationLabel]}>
        {noAuth[lang].loginSignup}
      </Text>
      <View style={sharedStyles.loginBtn}>
        <Button
          raised={true}
          primary
          text={loginSignup[lang].loginSignup}
          onPress={navigateToAuth}
        />
      </View>
    </View>
  );
};

NoAuth.propTypes = {
  lang: PropTypes.string,
};

export default NoAuth;
