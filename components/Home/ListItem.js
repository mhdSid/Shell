import React, {Component} from 'react';
import {ActionSheetIOS, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './listItem.style';
import {invoke} from 'lodash';
import {IconToggle, ListItem} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import {getUserIdSelector} from '../Profile/Selectors';
import {handleLikeLottery} from '../../redux/Lotteries/HandleLikeLottery';
import {handleDislikeLottery} from '../../redux/Lotteries/HandleDislikeLottery';
import {connect} from 'react-redux';
import {chat as chatTexts, listItemActions} from '../../constants/Texts';
import {showLotteryResult} from '../../redux/LotteryResult/actions';
import FastImage from 'react-native-fast-image';
import {Alert} from 'react-native';
import {getLangSelector} from '../Settings/Selectors';

class ListItemCommon extends Component {
  static propTypes = {
    item: PropTypes.object,
    listLength: PropTypes.number,
    onItemPress: PropTypes.func,
    index: PropTypes.number,
    showLotteryResult: PropTypes.func,
    hideMoreActions: PropTypes.bool,
    isWinner: PropTypes.bool,
    isLotteryPoster: PropTypes.bool,
    showReceivedTag: PropTypes.bool,
    showShippedTag: PropTypes.bool,
    isReceived: PropTypes.bool,
    isShipped: PropTypes.bool,
    disableActions: PropTypes.bool,
    disableBorder: PropTypes.bool,
    rounded: PropTypes.bool,
  };
  constructor() {
    super();
  }
  UNSAFE_shouldComponentUpdate(nextProps) {
    if (
      JSON.stringify(nextProps.item).toString() !==
        JSON.stringify(this.props.item).toString() ||
      JSON.stringify(nextProps.authUserId).toString() !==
        JSON.stringify(this.props.authUserId).toString()
    ) {
      return true;
    }
    return false;
  }
  handleItemPress = () => {
    invoke(this.props, 'onItemPress', this.props.index);
  };
  handleLikeLottery = () => {
    invoke(this.props, 'handleLikeLottery', {
      userId: this.props.authUserId,
      lotteryId: this.props.item.id,
      showLotteryDetails: false,
    });
  };

  handleDislikeLottery = () => {
    invoke(this.props, 'handleDislikeLottery', {
      userId: this.props.authUserId,
      lotteryId: this.props.item.id,
      showLotteryDetails: false,
    });
  };
  handleMoreButtonPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          listItemActions[this.props.lang].cancel,
          listItemActions[this.props.lang].goToLotteryDetails,
          this.props.showLotteryResult &&
            listItemActions[this.props.lang].goToLotteryResults,
        ].filter(Boolean),
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0: {
            return;
          }
          case 1: {
            this.handleItemPress();
            return;
          }
          case 2: {
            invoke(this.props, 'displayLotteryResult', this.props.item);
            return;
          }
          default: {
            return;
          }
        }
      },
    );
  };
  handleNotReceivedPress = () => {
    Alert.alert(
      chatTexts[this.props.lang].notReceived,
      chatTexts[this.props.lang].youWonThisLottery,
      [
        {
          text: chatTexts[this.props.lang].chatWithOwner,
          onPress: () => {
            this.handleItemPress();
          },
        },
      ],
    );
  };
  handleNotShippedPress = () => {
    Alert.alert(
      chatTexts[this.props.lang].notShipped,
      chatTexts[this.props.lang].thereIsAWinner,
      [
        {
          text: chatTexts[this.props.lang].chatWithWinner,
          onPress: () => {
            this.handleItemPress();
          },
        },
      ],
    );
  };
  handleReceivedPress = () => {
    Alert.alert(
      chatTexts[this.props.lang].received,
      chatTexts[this.props.lang].youHaveReceived,
      [
        {
          text: chatTexts[this.props.lang].cancel,
          style: 'cancel',
        },
      ],
    );
  };
  handleShippedPress = () => {
    Alert.alert(
      chatTexts[this.props.lang].shipped,
      chatTexts[this.props.lang].youHaveShipped,
      [
        {
          text: chatTexts[this.props.lang].cancel,
          style: 'cancel',
        },
      ],
    );
  };
  render() {
    return (
      <View
        style={[
          !this.props.disableBorder && styles.listItemViewContainer,
          this.props.index === this.props.listLength - 1 &&
            styles.listItemViewContainerMargin,
        ]}>
        {this.props.showUploadProgress ? loadingPopup : null}
        <ListItem
          divider
          style={{
            container: {
              ...(this.props.rounded && styles.listItemContainerRounded),
            },
          }}
          leftElement={
            this.props.item.images && this.props.item.images[0] ? (
              <FastImage
                style={styles.listItemImage}
                source={{
                  uri: this.props.item.images[0],
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.web,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null
          }
          centerElement={{
            primaryText: this.props.item.name,
            secondaryText: this.props.item.category,
            tertiaryText: `${this.props.item.currency} ${
              this.props.item.price
            }`,
          }}
          rightElement={
            !this.props.disableActions && (
              <>
                {this.props.authUserId &&
                this.props.item.userId !== this.props.authUserId ? (
                  <>
                    {Array.isArray(this.props.item.likedBy) &&
                    this.props.item.likedBy.length &&
                    this.props.item.likedBy.includes(this.props.authUserId) ? (
                      <IconToggle
                        name="favorite"
                        color="#e34977"
                        onPress={this.handleDislikeLottery}
                      />
                    ) : null}
                    {!Array.isArray(this.props.item.likedBy) ||
                    !this.props.item.likedBy.length ||
                    !this.props.item.likedBy.includes(this.props.authUserId) ? (
                      <IconToggle
                        name="favorite-border"
                        onPress={this.handleLikeLottery}
                      />
                    ) : null}
                  </>
                ) : null}
                {!this.props.hideMoreActions ? (
                  <IconToggle
                    name="more-vert"
                    onPress={this.handleMoreButtonPress}
                  />
                ) : null}
                {this.props.isWinner && this.props.showReceivedTag ? (
                  <IconToggle
                    name="call-received"
                    color={this.props.isReceived ? 'green' : 'red'}
                    onPress={
                      !this.props.isReceived
                        ? this.handleNotReceivedPress
                        : this.handleReceivedPress
                    }
                  />
                ) : null}
                {this.props.isLotteryPoster && this.props.showShippedTag ? (
                  <IconToggle
                    name="call-received"
                    color={this.props.isShipped ? 'green' : 'red'}
                    onPress={
                      !this.props.isShipped
                        ? this.handleNotShippedPress
                        : this.handleShippedPress
                    }
                    style={{container: styles.listItemNotReceivedIconContainer}}
                  />
                ) : null}
              </>
            )
          }
          onRightElementPress={this.handleRightElementPress}
          onPress={this.handleItemPress}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUserId: getUserIdSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLikeLottery: payload => dispatch(handleLikeLottery(payload)),
    displayLotteryResult: payload => dispatch(showLotteryResult(payload)),
    handleDislikeLottery: payload => dispatch(handleDislikeLottery(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemCommon);
