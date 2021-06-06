import React, {Component} from 'react';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Text} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import FastImage from 'react-native-fast-image';
// import UploadAdProgress from '../UploadAdProgress';
export default class CardListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onItemPress: PropTypes.func,
    smallImage: PropTypes.bool,
    horizontal: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.ellipsizeMode = 'tail';
    this.numOfLines = 1;
  }

  handleItemPress = () => {
    const {item} = this.props;
    invoke(this.props, 'onItemPress', item);
  };

  getItemFullPrice = () => {
    const {item} = this.props;
    return `${item.currency} ${item.price}`;
  };

  shouldComponentUpdate() {
    return false;
  }

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
          priority: FastImage.priority.low,
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
        {/* {<UploadAdProgress id={item.uniqId} />} */}
        <View>
          {image}
          {emptyImage}
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
              {item.description}
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
