import React from 'react';
import {View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button} from 'react-native-material-ui';
import {navigate} from '../MainContainer';
import {noAuth, loginSingup} from '../../Constants/Texts';

const NoAuth = () => {
  const navigateToAuth = () => {
    navigate('profile')();
  };

  return (
    <View
      style={[
        sharedStyles.importAdContainerNoAuth,
        sharedStyles.importAdNoAuthContainer,
      ]}>
      <Text style={[sharedStyles.label, sharedStyles.noAuthLabel]}>
        {noAuth.loginSingup}
      </Text>
      <View style={sharedStyles.loginBtn}>
        <Button
          raised={true}
          primary
          text={loginSingup}
          onPress={navigateToAuth}
        />
      </View>
    </View>
  );
};

export default NoAuth;
