import React, {PureComponent, useState, useEffect} from 'react';
import {Toolbar, ListItem} from 'react-native-material-ui';
import {View, Text, FlatList, Alert, ScrollView} from 'react-native';
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
import {getAds} from '../../services/ads';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Loading} from '../Loading';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import {addAd} from '../../redux/Ads/actions';
import About from '../About';

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
    const {images, name} = item;
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
              cache="force-cache"
              source={{
                uri: images[0],
                cache: 'force-cache',
                // headers: {
                //   Pragma: 'only-if-cached',
                //   'Cache-Control': 'only-if-cached',
                // },
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
            numberOfLines={2}>
            {`${item.currency} ${item.price}`}
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
        // enableSnap={true}
        shouldOptimizeUpdates={true}
        // useScrollView={true}
        // ref={c => (slider1Ref = c)}
        data={items}
        renderItem={renderCarouselItem(onItemPress)}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={false}
        firstItem={0}
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
  const {ads: _ads} = props;
  console.log('HomeComponent', _ads);

  const [ads, setAds] = useState(_ads);
  const [isList, setIsList] = useState(false);
  const [isCarousel, setIsCarousel] = useState(false);
  const [isCard, setIsCard] = useState(true);
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedAd, setSelectedAd] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [fetchId, setFetchId] = useState(0);

  let unMounted = false;

  const handleError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    // invoke(props, 'logout', {loggedIn: false, user: false});
    // setLoggedIn(false);
    // setLoading(false);
    // setVerificationId(undefined);
    // setUser(null);

    if (message) {
      Alert.alert(message);
    }
    return;
  };

  const onGetAdsSuccess = data => {
    if (!unMounted) {
      // console.log(
      //   'onGetAdsSuccessonGetAdsSuccessonGetAdsSuccessonGetAdsSuccessonGetAdsSuccess: ',
      //   data,
      // );
      const {error, ads: serverAds} = data;

      if (error) {
        return handleError(error);
      }
      // setAds(serverAds);
      invoke(props, 'addAd', serverAds);
      setLoading(false);
    }
  };

  const fetchAds = () => {
    getAds().then(onGetAdsSuccess, handleError);
  };

  useEffect(() => {
    if (Array.isArray(ads) && ads.length > 0) {
      setLoading(false);
    }
  }, [ads]);

  useEffect(() => {
    setLoading(true);
    fetchAds();
    return () => {
      unMounted = true;
    };
  }, [fetchId]);

  useEffect(() => {
    if (Array.isArray(_ads) && _ads.length > 0) {
      setLoading(true);
      setAds(_ads);
    }
    return () => {
      unMounted = true;
    };
  }, [_ads]);

  // const {slider1ActiveSlide} = this.state;
  // let slider1Ref;

  const changeViewStyle = () => {
    if (isCard) {
      setIsList(true);
      setIsCard(false);
      setIsCarousel(false);
    }
    if (isList) {
      setIsList(false);
      setIsCard(false);
      setIsCarousel(true);
    }
    if (isCarousel) {
      setIsList(false);
      setIsCard(true);
      setIsCarousel(false);
    }
  };

  const onAdsDetailsClose = () => {
    setShowAdDetails(false);
  };

  const onAboutClose = () => {
    setShowAbout(false);
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

  const handleLeftElementPress = () => {
    setShowAbout(true);
  };

  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        leftElement="help"
        centerElement="Shell"
        onLeftElementPress={handleLeftElementPress}
        rightElement={
          isCard ? 'view-list' : isList ? 'view-carousel' : 'view-comfy'
        }
        onRightElementPress={changeViewStyle}
      />
      {loading && Loading}
      {isCard && (
        <FlatList
          refreshing={loading}
          onRefresh={fetchAds}
          showsVerticalScrollIndicator={false}
          data={ads}
          contentContainerStyle={sharedStyles.homeAdsContainer}
          numColumns={3}
          // style={sharedStyles.homeAdsContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableBounce
              style={sharedStyles.homeCardItem}
              onPress={handleShowAdsDetailsFlatList(item)}>
              <CachedImage
                style={sharedStyles.homeCardItemImage}
                source={{uri: item.images[0]}}
              />
              <View style={sharedStyles.homeCardItemTextContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={sharedStyles.homeCardItemText}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={sharedStyles.homeCardItemText}>
                  {item.category}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={
                    sharedStyles.homeCardItemText
                  }>{`${item.currency} ${item.price}`}</Text>
              </View>
            </TouchableBounce>
          )}
        />
      )}
      {isCarousel && (
        <CarouselComponent items={ads} onItemPress={handleShowAdsDetails} />
      )}
      {isList && (
        <FlatList
          refreshing={loading}
          onRefresh={fetchAds}
          showsVerticalScrollIndicator={false}
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ListItem
              divider
              leftElement={
                item.images && item.images[0] ? (
                  <CachedImage
                    style={{width: 50, height: 50}}
                    cache="force-cache"
                    source={{
                      uri: item.images[0],
                      cache: 'force-cache',
                      // headers: {
                      //   Pragma: 'only-if-cached',
                      //   'Cache-Control': 'only-if-cached',
                      // },
                    }}
                  />
                ) : null
              }
              centerElement={{
                primaryText: item.name,
                secondaryText: `${item.currency} ${item.price}`,
              }}
              onPress={handleShowAdsDetailsFlatList(item)}
            />
          )}
        />
      )}

      {showAdDetails && (
        <AdDetails onClose={onAdsDetailsClose} item={selectedAd} />
      )}
      {showAbout && <About onClose={onAboutClose} />}
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
    addAd: payload => dispatch(addAd(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
