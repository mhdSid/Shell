import React from 'react';
import {View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button} from 'react-native-material-ui';
import {navigate} from '../MainContainer';

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
        Please login or signup to add a new item
      </Text>
      <View style={sharedStyles.loginBtn}>
        <Button
          raised={true}
          primary
          text={'Login/Signup'}
          onPress={navigateToAuth}
        />
      </View>
    </View>
  );
};

export default NoAuth;
