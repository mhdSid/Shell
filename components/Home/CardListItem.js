import React, {Component} from 'react';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Text} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {IconToggle} from 'react-native-material-ui';
import {connect} from 'react-redux';
import {handleLikeLottery} from '../../redux/Lotteries/HandleLikeLottery';
import {handleDislikeLottery} from '../../redux/Lotteries/HandleDislikeLottery';
import {getUserIdSelector} from '../Profile/Selectors';
import {showLotteryResult} from '../../redux/LotteryResult/actions';
import FastImage from 'react-native-fast-image';
class CardListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    authUserId: PropTypes.string,
    onItemPress: PropTypes.func,
    smallImage: PropTypes.bool,
    horizontal: PropTypes.bool,
    handleDislikeLottery: PropTypes.func,
    handleLikeLottery: PropTypes.func,
  };

  constructor() {
    super();
    this.ellipsizeMode = 'tail';
    this.numOfLines = 1;
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
    invoke(this.props, 'onItemPress', this.props.item);
  };

  getItemFullPrice = () => {
    const {item} = this.props;
    return `${item.currency} ${item.price}`;
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

  handleShowLotteryResults = () => {
    invoke(this.props, 'handleShowLotteryResult', this.props.item);
  };

  cardMoreActions = () => {
    const {authUserId} = this.props;

    return authUserId ? (
      <View style={sharedStyles.homeCardMoreActionsContainer}>
        <IconToggle
          name="more-vert"
          color="white"
          size={20}
          onPress={this.handleShowLotteryResults}
        />
      </View>
    ) : null;
  };

  cardIcon = () => {
    const {item, authUserId} = this.props;

    return !authUserId ? null : item.userId !== authUserId ? (
      <View style={sharedStyles.homeCardItemIcon}>
        {Array.isArray(item.likedBy) &&
        item.likedBy.length &&
        item.likedBy.includes(authUserId) ? (
          <IconToggle
            name="favorite"
            size={17}
            color="#e34977"
            style={{
              container: sharedStyles.homeCardItemIconHeart,
            }}
            onPress={this.handleDislikeLottery}
          />
        ) : null}
        {!Array.isArray(item.likedBy) ||
        !item.likedBy.length ||
        !item.likedBy.includes(authUserId) ? (
          <IconToggle
            name="favorite-border"
            color="white"
            size={17}
            style={{
              container: sharedStyles.homeCardItemIconHeart,
            }}
            onPress={this.handleLikeLottery}
          />
        ) : null}
      </View>
    ) : null;
  };

  render() {
    const {item, smallImage, horizontal} = this.props;
    const viewStyle = horizontal
      ? sharedStyles.homeCardItemHorizontal
      : sharedStyles.homeCardItem;
    const imageStyle = smallImage
      ? sharedStyles.homeCardItemImageSmall
      : sharedStyles.homeCardItemImage;
    const image = item.images[0] ? (
      <FastImage
        style={imageStyle}
        source={{
          uri: item.images[0],
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    ) : null;
    const emptyImage = !item.images[0] ? (
      <View style={sharedStyles.homeCardItemImage} />
    ) : null;

    return (
      <TouchableBounce style={viewStyle} onPress={this.handleItemPress}>
        <View>
          {image}
          {emptyImage}
          {this.cardIcon()}
          {this.cardMoreActions()}
          <View style={sharedStyles.homeCardItemTextContainer}>
            <Text
              numberOfLines={this.numOfLines}
              ellipsizeMode={this.ellipsizeMode}
              style={sharedStyles.homeCardItemText}>
              {item.name}
            </Text>
            <Text
              numberOfLines={this.numOfLines}
              ellipsizeMode={this.ellipsizeMode}
              style={sharedStyles.homeCardItemText}>
              {item.category}
            </Text>
            <Text
              numberOfLines={this.numOfLines}
              ellipsizeMode={this.ellipsizeMode}
              style={sharedStyles.homeCardItemText}>
              {this.getItemFullPrice()}
            </Text>
          </View>
        </View>
      </TouchableBounce>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUserId: getUserIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLikeLottery: payload => dispatch(handleLikeLottery(payload)),
    handleDislikeLottery: payload => dispatch(handleDislikeLottery(payload)),
    handleShowLotteryResult: payload => dispatch(showLotteryResult(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardListItem);
