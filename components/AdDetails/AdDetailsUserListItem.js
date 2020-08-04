import React from 'react';
import invoke from 'lodash/invoke';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-material-ui';

const AdDetailsUserListItem = props => {
  const {user} = props;

  const handlePress = () => {
    invoke(props, 'onPress', user);
  };

  if (user) {
    return (
      <TouchableBounce
        style={sharedStyles.adDetailsUsersListItemContainer}
        onPress={handlePress}>
        {user.image ? (
          <FastImage
            style={sharedStyles.adDetailsUsersListItemImage}
            source={{
              uri: user.image,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <Icon name="face" size={40} />
        )}
        {(user.firstName || user.lastName) && (
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={sharedStyles.adDetailsUsersListItemText}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
        )}
      </TouchableBounce>
    );
  }
  return (
    <View style={sharedStyles.adDetailsUsersListItemContainer}>
      <Icon name="face" size={40} />
    </View>
  );
};

AdDetailsUserListItem.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
};

export default AdDetailsUserListItem;
