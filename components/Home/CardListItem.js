import React, {Component} from 'react';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import styles from './cardListItem.style';
import {View, Text} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {Icon, IconToggle} from 'react-native-material-ui';
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

  shouldComponentUpdate(nextProps) {
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

  renderMoreIcon = () => {
    const {authUserId} = this.props;

    return authUserId ? (
      <View style={styles.cardMoreActionsViewContainer}>
        <IconToggle
          name="more-vert"
          color="white"
          size={20}
          onPress={this.handleShowLotteryResults}
        />
      </View>
    ) : null;
  };

  renderLikeIcon = () => {
    const {item, authUserId} = this.props;

    return !authUserId ? null : `${item.userId}` !== `${authUserId}` ? (
      <View style={styles.cardIconViewContainer}>
        {Array.isArray(item.likedBy) &&
        item.likedBy.length &&
        item.likedBy.find(val => `${val}` === `${authUserId}`) ? (
          <IconToggle
            name="favorite"
            size={17}
            color="#e34977"
            style={{
              container: styles.cardItemLikeIconContainer,
            }}
            onPress={this.handleDislikeLottery}
          />
        ) : null}
        {!Array.isArray(item.likedBy) ||
        !item.likedBy.length ||
        !item.likedBy.find(val => `${val}` === `${authUserId}`) ? (
          <IconToggle
            name="favorite-border"
            color="white"
            size={17}
            style={{
              container: styles.cardItemLikeIconContainer,
            }}
            onPress={this.handleLikeLottery}
          />
        ) : null}
      </View>
    ) : null;
  };

  dummyImage = () =>
    `https://dummyimage.com/300/${(((1 << 24) * Math.random()) | 0).toString(
      16,
    )}/fff.jpg`;

  renderImage = () => {
    const {item, smallImage} = this.props;
    return item.images[0] ? (
      <FastImage
        style={smallImage ? styles.cardItemImageSmall : styles.cardItemImage}
        source={{
          uri: item.images[0], // testImages[Math.floor(Math.random()*testImages.length)], //item.images[0],
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    ) : (
      <View style={styles.cardItemImage} />
    );
  };

  render() {
    const {item, horizontal} = this.props;
    return (
      <TouchableBounce
        style={
          horizontal
            ? styles.cardItemHorizontalViewContainer
            : styles.cardItemViewContainer
        }
        onPress={this.handleItemPress}>
        <View>
          {this.renderImage()}
          {this.renderLikeIcon()}
          {this.renderMoreIcon()}
          <View style={styles.cardItemInfoViewContainer}>
            <Text
              numberOfLines={this.numOfLines}
              ellipsizeMode={this.ellipsizeMode}
              style={styles.cardItemText}>
              {item.name}
            </Text>
            <View style={styles.sectionBlockContainer}>
              <Icon name="people-outline" size={20} color="black" />
              <Text
                numberOfLines={this.numOfLines}
                ellipsizeMode={this.ellipsizeMode}
                style={[styles.cardItemText, styles.cardItemTextMarginLeft]}>
                {item.lotteryUsersLength}
              </Text>
            </View>
            <Text
              numberOfLines={this.numOfLines}
              ellipsizeMode={this.ellipsizeMode}
              style={styles.cardItemText}>
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
