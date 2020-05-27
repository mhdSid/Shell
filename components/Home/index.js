import React, {useState, useEffect} from 'react';
import {Toolbar, ListItem} from 'react-native-material-ui';
import {View, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Loading} from '../Loading';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import {
  AdMobBanner,
  // AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
} from 'react-native-admob';
import {CarouselComponent} from '../Carousel';
import CardListItem from './CardListItem';
import {home} from '../../Constants/Texts';
import {handleFetchAds} from '../../redux/Ads/FetchAds';
import {showAdDetails} from '../../redux/AdDetails/actions';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {
  getAdsSelector,
  getIsListSelector,
  getIsCardSelector,
  getIsCarouselSelector,
} from './Selectors';
import UploadAdProgress from '../UploadAdProgress';
import {emitSocketEvents} from '../../services/Socket.js';

const HomeComponent = props => {
  const {ads, isList, isCarousel, isCard} = props;
  const [loading, setLoading] = useState(false);

  const callback = () => {
    setLoading(false);
  };
  const fetchAds = () => {
    setLoading(true);
    invoke(props, 'fetchAds', {
      onError: callback,
      onSuccess: callback,
    });
  };
  const changeViewStyle = () => {
    if (isCard) {
      invoke(props, 'setHomeViewStyle', {
        isHomeCardStyle: false,
        isHomeCarouselStyle: false,
        isHomeListStyle: true,
      });
    }
    if (isList) {
      invoke(props, 'setHomeViewStyle', {
        isHomeCardStyle: false,
        isHomeCarouselStyle: true,
        isHomeListStyle: false,
      });
    }
    if (isCarousel) {
      invoke(props, 'setHomeViewStyle', {
        isHomeCardStyle: true,
        isHomeCarouselStyle: false,
        isHomeListStyle: false,
      });
    }
  };
  const handleShowAdsDetailsFlatList = item => {
    invoke(props, 'showAdDetails', item);
  };
  const handleShowAdDetails = item => {
    return () => {
      invoke(props, 'showAdDetails', item);
    };
  };
  const renderCardListItem = ({item}) => (
    <CardListItem item={item} onItemPress={handleShowAdsDetailsFlatList} />
  );
  const renderListItem = ({item, index}) => (
    <View style={index === ads.length - 1 && sharedStyles.homeListItemMargin}>
      <ListItem
        divider
        leftElement={
          item.images && item.images[0] ? (
            <CachedImage
              style={sharedStyles.homeListItemImage}
              source={{
                uri: item.images[0],
              }}
            />
          ) : null
        }
        centerElement={{
          primaryText: item.name,
          secondaryText: item.category,
          tertiaryText: `${item.currency} ${item.price}`,
        }}
        onPress={handleShowAdDetails(item)}
      />
    </View>
  );
  const getItem = (data, index) => data[index];
  const getItemCount = () => ads.length;
  const getItemKey = item => item.id;

  useEffect(() => {
    emitSocketEvents();
    fetchAds();
  }, []);

  return (
    <View style={sharedStyles.fullheightView} shouldRasterizeIOS={true}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        centerElement={home.appName}
        rightElement={
          isCard ? 'view-list' : isList ? 'view-carousel' : 'view-comfy'
        }
        onRightElementPress={changeViewStyle}
      />
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-5703846930890914/6428703368"
        style={sharedStyles.adMobBanner}
      />
      <UploadAdProgress />
      {loading && <View style={sharedStyles.homeLoading}>{Loading}</View>}
      {isCarousel && ads && ads.length > 0 && (
        <CarouselComponent
          items={ads}
          onItemPress={handleShowAdsDetailsFlatList}
        />
      )}
      {isCard && ads && ads.length > 0 && (
        <VirtualizedList
          initialNumToRender={2}
          windowSize={2}
          removeClippedSubviews={true}
          refreshing={loading}
          onRefresh={fetchAds}
          showsVerticalScrollIndicator={false}
          data={ads}
          getItem={getItem}
          getItemCount={getItemCount}
          contentContainerStyle={sharedStyles.homeAdsContainer}
          keyExtractor={getItemKey}
          renderItem={renderCardListItem}
        />
      )}
      {isList && ads && ads.length > 0 && (
        <VirtualizedList
          removeClippedSubviews={true}
          windowSize={2}
          initialNumToRender={2}
          refreshing={loading}
          onRefresh={fetchAds}
          showsVerticalScrollIndicator={false}
          data={ads}
          getItem={getItem}
          getItemCount={getItemCount}
          keyExtractor={getItemKey}
          renderItem={renderListItem}
        />
      )}
    </View>
  );
};

HomeComponent.propTypes = {
  ads: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    ads: getAdsSelector(state),
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
    isCarousel: getIsCarouselSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAds: payload => dispatch(handleFetchAds(payload)),
    showAdDetails: payload => dispatch(showAdDetails(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
