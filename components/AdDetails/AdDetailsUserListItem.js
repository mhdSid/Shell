import React from 'react';
import invoke from 'lodash/invoke';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Text} from 'react-native';
import {Icon} from 'react-native-material-ui';

const AdDetailsUserListItem = props => {
  const {user} = props;

  const handlePress = () => {
    invoke(props, 'onPress', user);
  };

  return (
    <TouchableBounce
      style={sharedStyles.adDetailsUsersListItemContainer}
      onPress={handlePress}>
      {user.image ? (
        <CachedImage
          source={{
            uri: user.image,
          }}
          style={sharedStyles.adDetailsUsersListItemImage}
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
};

AdDetailsUserListItem.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
};

export default AdDetailsUserListItem;
