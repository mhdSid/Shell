import React from 'react';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import styles from './lotteryDetailsUserListItem.style';
import {View} from 'react-native';
import {Icon} from 'react-native-material-ui';
import FastImage from 'react-native-fast-image';

const LotteryDetailsUserListItem = props => {
  const {user, largeImage, winnerUserId} = props;

  if (user) {
    return (
      <TouchableBounce
        style={[
          styles.userListItemViewContainer,
          largeImage ? styles.userListItemLargeViewContainer : null,
        ]}>
        {user.image ? (
          <View
            style={[
              `${user.id}` === `${winnerUserId}` &&
                styles.userListItemWinnerImageViewContainer,
              largeImage
                ? styles.userListItemLargeImageViewContainer
                : styles.userListItemImageViewContainer,
            ]}>
            <FastImage
              style={
                largeImage
                  ? styles.userListItemLargeImage
                  : styles.userListItemImage
              }
              source={{
                uri: user.image,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        ) : (
          <Icon name="face" size={40} />
        )}
      </TouchableBounce>
    );
  }
  return (
    <View style={styles.userListItemViewContainer}>
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
