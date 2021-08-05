import React from 'react';
import invoke from 'lodash/invoke';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-material-ui';

const LotteryDetailsUserListItem = props => {
  const {user, withNotificationNum} = props;

  const handlePress = () => {
    invoke(props, 'onPress', user);
  };

  if (user) {
    return (
      <TouchableBounce
        style={sharedStyles.lotteryDetailsUsersListItemContainer}
        onPress={handlePress}>
        {withNotificationNum && user.userJoinedLotteryCount > 1 && (
          <View style={sharedStyles.userJoinedLotteryCountContainer}>
            <Text
              numberOfLines={1}
              style={sharedStyles.userJoinedLotteryCountText}>
              {user.userJoinedLotteryCount}
            </Text>
          </View>
        )}
        {user.image ? (
          <FastImage
            style={sharedStyles.lotteryDetailsUsersListItemImage}
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
      </TouchableBounce>
    );
  }
  return (
    <View style={sharedStyles.lotteryDetailsUsersListItemContainer}>
      <Icon name="face" size={40} />
    </View>
  );
};

LotteryDetailsUserListItem.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
  withNotificationNum: PropTypes.bool,
};

export default LotteryDetailsUserListItem;
