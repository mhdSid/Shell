import React, {PureComponent} from 'react';
import {View, Text, Image} from 'react-native';
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
      <Text style={textStyles} numberOfLines={2}>
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
                cache: FastImage.cacheControl.web,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : null}
          {!imageOnly && <View style={radiusMaskStyles} />}
        </View>
        {!imageOnly && (
          <View style={textContainerStyles}>
            {uppercaseTitle}
            <Text style={subtitleStyles} numberOfLines={1}>
              {category}
            </Text>
            <Text style={subtitleStyles} numberOfLines={1}>
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
  const renderCarouselItem = ({item}) => (
    <CarouselItem onItemPress={onItemPress} item={item} imageOnly={imageOnly} />
  );
  return (
    <Carousel
      shouldOptimizeUpdates={true}
      data={items}
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
