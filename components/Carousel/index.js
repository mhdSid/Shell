import React, {PureComponent, useState} from 'react';
import {View, Text} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import Carousel from 'react-native-snap-carousel';
import {
  sliderStyles,
  sliderWidth,
  itemWidth,
} from '../../assets/styles/sliderEntry';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
class CarouselItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onItemPress: PropTypes.func,
    imageOnly: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.numLines1 = 1;
    this.numLines2 = 2;
  }

  handleItemPress = () => {
    const {item} = this.props;
    invoke(this.props, 'onItemPress', item);
  };

  render() {
    const {item, imageOnly} = this.props;
    const {images, name, currency, price, category} = item;
    const textStyles = [sliderStyles.title, sliderStyles.titleEven];
    const subtitleStyles = [sliderStyles.subtitle, sliderStyles.subtitleEven];
    const containerStyles = [
      imageOnly
        ? sliderStyles.slideInnerContainerImageOnly
        : sliderStyles.slideInnerContainer,
    ];
    const imageContainerStyles = [
      sliderStyles.imageContainer,
      sliderStyles.imageContainerEven,
    ];
    const textContainerStyles = [
      sliderStyles.textContainer,
      sliderStyles.textContainerEven,
    ];
    const radiusMaskStyles = [
      sliderStyles.radiusMask,
      sliderStyles.radiusMaskEven,
    ];
    const uppercaseTitle = name ? (
      <Text style={textStyles} numberOfLines={this.numLines2}>
        {name.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableBounce
        activeOpacity={1}
        style={containerStyles}
        onPress={this.handleItemPress}>
        <View style={sliderStyles.shadow} />
        <View style={imageContainerStyles}>
          {(imageOnly && item) || (images && images[0]) ? (
            <FastImage
              style={sliderStyles.image}
              source={{
                uri: imageOnly ? item : images[0],
                priority: FastImage.priority.low,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : null}
          {!imageOnly && <View style={radiusMaskStyles} />}
        </View>
        {!imageOnly && (
          <View style={textContainerStyles}>
            {uppercaseTitle}
            <Text style={subtitleStyles} numberOfLines={this.numLines1}>
              {category}
            </Text>
            <Text style={subtitleStyles} numberOfLines={this.numLines1}>
              {`${currency} ${price}`}
            </Text>
          </View>
        )}
      </TouchableBounce>
    );
  }
}

const CarouselComponent = props => {
  const {items, onItemPress, imageOnly} = props;
  const sliceValue = items.length > 5 ? 5 : items.length > 2 ? 2 : items.length;
  const [sliceIndex, setSliceIndex] = useState(sliceValue);
  const slicedAds = items.slice(0, sliceIndex);
  const renderCarouselItem = ({item}) => (
    <CarouselItem onItemPress={onItemPress} item={item} imageOnly={imageOnly} />
  );
  const onEndReached = index => {
    if (index < items.length - 1 && index === sliceIndex - 2) {
      setSliceIndex(sliceIndex + sliceValue);
    }
  };
  const onSnapToItem = imageOnly ? null : onEndReached;
  const data = imageOnly ? items : slicedAds;

  return (
    <Carousel
      shouldOptimizeUpdates={true}
      onSnapToItem={onSnapToItem}
      data={data}
      renderItem={renderCarouselItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      hasParallaxImages={false}
      firstItem={0}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      containerCustomStyle={sliderStyles.slider}
      contentContainerCustomStyle={sliderStyles.sliderContentContainer}
    />
  );
};

CarouselComponent.propTypes = {
  item: PropTypes.object,
  onItemPress: PropTypes.func,
  imageOnly: PropTypes.bool,
};

export {CarouselItem, CarouselComponent};
