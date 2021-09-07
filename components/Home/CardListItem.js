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
  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/BB56E967-2989-4D24-9DDD-F1D38AAEEE2A.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/A1B64088-75F0-4A59-9B90-036D1402D963.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/C3DA4D3A-6671-4D68-8219-418CAC60B592.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/2379C3A0-B672-433E-927F-BBB698B40CB6.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/735AFC18-B8B9-4306-AD8A-06B5A67EC992.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/E5299125-0924-4909-B3B3-3F777F1BCB4D.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/4C682A20-D096-41FA-B1C9-0B889B9A905D.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/4D093DE1-30C9-4D46-B056-FAE29B2B0F08.jpg',
  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/0BA9F9FA-61E5-4A09-B334-670F690911C4.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/9921E7FA-7A04-46AF-A881-659718FA59D3.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/971A7756-DAD6-4816-A6B7-B3F36F111C5A.jpg',
  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/D91A9480-1142-4757-B4F6-A810EFD886AE.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/7415462C-C8F6-4F11-B237-006E64122455.jpg',
  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/96F211A2-C034-42A4-94B8-2C3EAE037320.jpg',
  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/0CEE9CE4-5918-42AF-A235-CA0C76BED4E6.jpg',
  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/235CD88A-A4AB-4FA4-95C3-75F55F4A87A1.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/69169920-A936-4A58-BA69-FFF422CBE9C1.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/54B61F94-D60E-428E-B097-3FD8C3F0A570.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/C0FA3EB9-BDF2-4267-885D-5CEAE6AD666D.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/7E96206D-F338-4957-ADEF-CC8DD2CF60F7.jpg',

  'file:///var/mobile/Containers/Data/Application/14D9DA6E-E770-430D-8012-14CD5F02C0D1/Library/Caches/A06665B6-E1E1-4CF6-8B6C-3B4EAA22FE88.jpg',
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
          uri: item.images[0],
          // randomLocalImagesForTesting[
          //   Math.floor(Math.random() * randomLocalImagesForTesting.length)
          // ], //,
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
