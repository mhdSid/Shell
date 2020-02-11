import React, {PureComponent, useState} from 'react';
import {
  Toolbar,
  ListItem,
  Snackbar,
  Drawer,
  Avatar,
  Card,
} from 'react-native-material-ui';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ENTRIES1} from '../../Constants/CarouselEntries';
import {
  sliderStyles,
  colors,
  sliderWidth,
  itemWidth,
} from '../../assets/styles/sliderEntry';

class CarouselItem extends PureComponent {
  render() {
    const {item, index} = this.props;
    const {illustration, title, subtitle} = item;
    const even = true;
    const uppercaseTitle = title ? (
      <Text
        style={[sliderStyles.title, even ? sliderStyles.titleEven : {}]}
        numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableBounce
        activeOpacity={1}
        style={sliderStyles.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${title}'`);
        }}>
        <View style={sliderStyles.shadow} />
        <View
          style={[
            sliderStyles.imageContainer,
            even ? sliderStyles.imageContainerEven : {},
          ]}>
          {<Image source={{uri: illustration}} style={sliderStyles.image} />}
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
            numberOfLines={2}>
            {subtitle}
          </Text>
        </View>
      </TouchableBounce>
    );
  }
}

const renderCarouselItem = ({item, index}) => {
  return <CarouselItem item={item} index={index} />;
};

const CarouselComponent = () => (
  <View style={sliderStyles.exampleContainer}>
    <Carousel
      // ref={c => (slider1Ref = c)}
      data={ENTRIES1}
      renderItem={renderCarouselItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      hasParallaxImages={false}
      firstItem={1}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      // inactiveSlideShift={20}
      containerCustomStyle={sliderStyles.slider}
      contentContainerCustomStyle={sliderStyles.sliderContentContainer}
      // loop={true}
      loopClonesPerSide={2}
      // autoplay={true}
      // autoplayDelay={500}
      // autoplayInterval={3000}
      // onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
    />
    {/* <Pagination
     dotsLength={ENTRIES1.length}
     activeDotIndex={0}
     containerStyle={sharedStyles.paginationContainer}
     dotColor={'rgba(255, 255, 255, 0.92)'}
     dotStyle={sharedStyles.paginationDot}
     inactiveDotColor={colors.black}
     inactiveDotOpacity={0.4}
     inactiveDotScale={0.6}
     carouselRef={slider1Ref}
     tappableDots={!!slider1Ref}
   /> */}
  </View>
);

const HomeComponent = () => {
  const [isList, setIsList] = useState(false);

  // const {slider1ActiveSlide} = this.state;
  // let slider1Ref;

  const changeViewStyle = label => {
    console.log(label);
    setIsList(!isList);
  };

  return (
    <View style={{height: '100%'}}>
      <Toolbar
        style={{
          container: {
            height: 55,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          },
        }}
        leftElement="menu"
        centerElement="WinAd"
        // onLeftElementPress={label => {
        //   alert('onLeftElementPress');
        // }}
        rightElement={isList ? 'view-carousel' : 'view-list'}
        onRightElementPress={changeViewStyle}
      />
      {/* <ScrollView> */}
      {/* <View> */}
      {!isList && <CarouselComponent />}
      {isList && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ENTRIES1}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ListItem
              divider
              leftElement={
                <Image
                  style={{width: 50, height: 50}}
                  source={{uri: item.illustration}}
                />
              }
              centerElement={{
                primaryText: item.title,
                secondaryText: item.subtitle,
              }}
              onPress={() => {}}
            />
          )}
        />
      )}

      {/* </View> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default HomeComponent;
