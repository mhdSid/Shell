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
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';

class CarouselItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onItemPress: PropTypes.func,
  };

  handleItemPress = () => {
    const {item} = this.props;
    invoke(this.props, 'onItemPress', item);
  };

  render() {
    const {item} = this.props;
    const {images, name, currency, price, category} = item;
    const even = true;
    const uppercaseTitle = name ? (
      <Text
        style={[sliderStyles.title, even ? sliderStyles.titleEven : {}]}
        numberOfLines={2}>
        {name.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableBounce
        activeOpacity={1}
        style={sliderStyles.slideInnerContainer}
        onPress={this.handleItemPress}>
        <View style={sliderStyles.shadow} />
        <View
          style={[
            sliderStyles.imageContainer,
            even ? sliderStyles.imageContainerEven : {},
          ]}>
          {images && images[0] ? (
            <CachedImage
              source={{
                uri: images[0],
              }}
              style={sliderStyles.image}
            />
          ) : null}
          <View
            style={[
              sliderStyles.radiusMask,
              even ? sliderStyles.radiusMaskEven : {},
            ]}
          />
        </View>
        <View
          style={[
            sliderStyles.textContainer,
            even ? sliderStyles.textContainerEven : {},
          ]}>
          {uppercaseTitle}
          <Text
            style={[
              sliderStyles.subtitle,
              even ? sliderStyles.subtitleEven : {},
            ]}
            numberOfLines={1}>
            {category}
          </Text>
          <Text
            style={[
              sliderStyles.subtitle,
              even ? sliderStyles.subtitleEven : {},
            ]}
            numberOfLines={2}>
            {`${currency} ${price}`}
          </Text>
        </View>
      </TouchableBounce>
    );
  }
}

const renderCarouselItem = onItemPress => {
  return ({item}) => {
    return <CarouselItem onItemPress={onItemPress} item={item} />;
  };
};

const CarouselComponent = props => {
  const {items, onItemPress} = props;
  const [sliceIndex, setSliceIndex] = useState(3);

  const sliced = items.slice(0, sliceIndex);

  const [slicedAds, setSlicedAds] = useState(sliced);

  const onEndReached = () => {
    if (sliceIndex < items.length - 1) {
      let newSliceIndex = sliceIndex;
      newSliceIndex += newSliceIndex;
      const _sliced = items.slice(0, newSliceIndex);
      setSlicedAds(_sliced);
      setSliceIndex(newSliceIndex);
    }
  };

  return (
    <View style={sliderStyles.exampleContainer}>
      <Carousel
        shouldOptimizeUpdates={true}
        onEndReachedThreshold={0}
        onEndReached={onEndReached}
        data={slicedAds}
        renderItem={renderCarouselItem(onItemPress)}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={false}
        firstItem={0}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={sliderStyles.slider}
        contentContainerCustomStyle={sliderStyles.sliderContentContainer}
        loopClonesPerSide={2}
      />
    </View>
  );
};

CarouselComponent.propTypes = {
  item: PropTypes.object,
  onItemPress: PropTypes.func,
};

export {CarouselItem, renderCarouselItem, CarouselComponent};
