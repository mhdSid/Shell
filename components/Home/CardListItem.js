import React, {Component} from 'react';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Text, Image} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {IconToggle} from 'react-native-material-ui';
import {connect} from 'react-redux';
import {handleLikeLottery} from '../../redux/Lotteries/HandleLikeLottery';
import {handleDislikeLottery} from '../../redux/Lotteries/HandleDislikeLottery';
import {getUserIdSelector} from '../Profile/Selectors';
import FastImage from 'react-native-fast-image';
import {showLotteryResult} from '../../redux/LotteryResult/actions';

const randomLocalImagesForTesting = [
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/EE8EC5C1-9722-4166-A797-D51D3462A245.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/E36A92AB-EC1E-4893-8827-B04EE0FAB3F6.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/A6341203-EA46-477D-9FCE-037F6FADD1D4.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/90DB1C71-5309-4D42-8602-FFC9951F9A22.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/09458A8E-E2F5-4FFE-9998-8CF1E4B48E14.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/ECFD0CB7-9661-4842-B640-42B8A675A824.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/6B25778C-3EA7-4F8B-8900-CB5C10D1C6DD.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/FB76D520-8B12-4412-8212-51B42966A8BD.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/10726D2F-0F35-4447-B4AA-1D6DE052DC9B.jpg',
  'file:///var/mobile/Containers/Data/Application/3E72FC00-E9BE-4E58-B9FD-07D4EF984D41/Library/Caches/99155442-0EFB-4CDB-875A-061776511CA6.jpg',
];
class CardListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    authUserId: PropTypes.string,
    onItemPress: PropTypes.func,
    smallImage: PropTypes.bool,
    horizontal: PropTypes.bool,
    handleDislikeLottery: PropTypes.func,
    handleLikeLottery: PropTypes.func,
    isFromLikedLotteriesView: PropTypes.bool,
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
      isFromLikedLotteriesView: this.props.isFromLikedLotteriesView,
    });
  };

  handleDislikeLottery = () => {
    invoke(this.props, 'handleDislikeLottery', {
      userId: this.props.authUserId,
      lotteryId: this.props.item.id,
      showLotteryDetails: false,
      isFromLikedLotteriesView: this.props.isFromLikedLotteriesView,
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
            color="white"
            size={17}
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
          uri: item.images[0], //randomLocalImagesForTesting[1], //,item.images[0],
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
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
            {/* <Text
              numberOfLines={this.numOfLines}
              ellipsizeMode={this.ellipsizeMode}
              style={sharedStyles.homeCardItemText}>
              {item.description}
            </Text> */}
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
