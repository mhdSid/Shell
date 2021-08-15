import React from 'react';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Image, Text, View} from 'react-native';
import {Icon} from 'react-native-material-ui';

const LotteryDetailsUserListItem = props => {
  const {user, withNotificationNum, largeImage, winnerUserId} = props;

  if (user) {
    return (
      <TouchableBounce
        style={sharedStyles.lotteryDetailsUsersListItemContainer}>
        {withNotificationNum && user.userJoinedLotteryCount > 1 && (
          <View
            style={[
              sharedStyles.userJoinedLotteryCountContainer,
              largeImage &&
                sharedStyles.userJoinedLotteryCountContainerWithLargeImage,
            ]}>
            <Text
              numberOfLines={1}
              style={sharedStyles.userJoinedLotteryCountText}>
              {user.userJoinedLotteryCount}
            </Text>
          </View>
        )}
        {user.image ? (
          <View
            style={[
              user.id === winnerUserId &&
                sharedStyles.lotteryDetailsUsersListItemWinnerContainer,
              largeImage
                ? sharedStyles.lotteryDetailsUsersListItemLargeImageContainer
                : sharedStyles.lotteryDetailsUsersListItemImageContainer,
            ]}>
            <Image
              style={
                largeImage
                  ? sharedStyles.lotteryDetailsUsersListItemLargeImage
                  : sharedStyles.lotteryDetailsUsersListItemImage
              }
              source={{
                uri: user.image,
                cache: 'default',
              }}
              resizeMode="cover"
            />
          </View>
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
  largeImage: PropTypes.bool,
  winnerUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
};

export default LotteryDetailsUserListItem;
