import React, {PureComponent, useState} from 'react';
import {Toolbar, ListItem} from 'react-native-material-ui';
import {View, Text, Image, FlatList} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import Carousel from 'react-native-snap-carousel';
import {
  sliderStyles,
  sliderWidth,
  itemWidth,
} from '../../assets/styles/sliderEntry';
import {connect} from 'react-redux';
import AdDetails from '../AdDetails';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';

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
        onPress={this.handleItemPress}>
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

const renderCarouselItem = onItemPress => {
  return ({item}) => {
    return <CarouselItem onItemPress={onItemPress} item={item} />;
  };
};

const CarouselComponent = props => {
  const {items, onItemPress} = props;
  return (
    <View style={sliderStyles.exampleContainer}>
      <Carousel
        // ref={c => (slider1Ref = c)}
        data={items}
        renderItem={renderCarouselItem(onItemPress)}
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
};

CarouselComponent.propTypes = {
  item: PropTypes.object,
  onItemPress: PropTypes.func,
};

const HomeComponent = props => {
  const {ads} = props;

  const [isList, setIsList] = useState(false);
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [selectedAd, setSelectedAd] = useState(undefined);

  // const {slider1ActiveSlide} = this.state;
  // let slider1Ref;

  const changeViewStyle = label => {
    console.log(label);
    setIsList(!isList);
  };

  const onAdsDetailsClose = () => {
    setShowAdDetails(false);
  };

  const handleShowAdsDetails = item => {
    setShowAdDetails(true);
    setSelectedAd(item);
  };

  const handleShowAdsDetailsFlatList = item => {
    return () => {
      handleShowAdsDetails(item);
    };
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
      {!isList && (
        <CarouselComponent items={ads} onItemPress={handleShowAdsDetails} />
      )}
      {isList && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ads}
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
              onPress={handleShowAdsDetailsFlatList(item)}
            />
          )}
        />
      )}

      {showAdDetails && (
        <AdDetails onClose={onAdsDetailsClose} item={selectedAd} />
      )}
      {/* </View> */}
      {/* </ScrollView> */}
    </View>
  );
};

HomeComponent.propTypes = {
  ads: PropTypes.array,
};

const mapStateToProps = ({adsReducer}) => {
  return {
    ads: adsReducer.ads,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // navigate: payload => dispatch(navigate(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
