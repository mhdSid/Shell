import React from 'react';
import {View, Text} from 'react-native';
import styles from './noAuth.style';
import {Button} from 'react-native-material-ui';
import {navigate} from '../MainContainer';
import {noAuth, loginSignup} from '../../constants/Texts';
import PropTypes from 'prop-types';

const NoAuth = React.memo(props => {
  const {lang} = props;
  const navigateToAuth = () => {
    navigate('profile')();
  };

  return (
    <View style={styles.noAuthViewContainer}>
      <Text style={styles.label}>{noAuth[lang].loginSignup}</Text>
      <View style={styles.noAuthButtonViewContainer}>
        <Button
          raised={true}
          primary
          text={loginSignup[lang].loginSignup}
          onPress={navigateToAuth}
        />
      </View>
    </View>
  );
});

NoAuth.propTypes = {
  lang: PropTypes.string,
};

export default NoAuth;
