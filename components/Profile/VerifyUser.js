import React from 'react';
import sharedStyles from '../../assets/styles/sharedStyles';
import {loadingPopup} from '../Loading';
import {Button} from 'react-native-material-ui';
import {Text, View} from 'react-native';
import {profile} from '../../Constants/Texts';
import PropTypes from 'prop-types';

const VerifyUser = props => {
  const {loading, handleVerifyUser} = props;

  return (
    <View style={sharedStyles.fullheightView}>
      {loading && loadingPopup}
      <View style={sharedStyles.loginContainer}>
        <View style={sharedStyles.loginBtn}>
          <Button
            raised={true}
            primary
            text={profile.verify}
            onPress={handleVerifyUser}
            disabled={loading}
          />
        </View>
        <Text style={sharedStyles.verificationLabel}>
          {profile.checkYourInbox}
        </Text>
      </View>
    </View>
  );
};

VerifyUser.propTypes = {
  loading: PropTypes.bool,
  handleVerifyUser: PropTypes.func,
};

export default VerifyUser;
