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

const HomeComponent = props => {
  const {ads} = props;
  const [isList, setIsList] = useState(false);
  const [isCarousel, setIsCarousel] = useState(false);
  const [isCard, setIsCard] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fetchId] = useState(0);

  const callback = () => {
    // setLoading(false);
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
  const handleShowAdsDetailsFlatList = item => {
    invoke(props, 'showAdDetails', item);
  };
  const handleShowAdsDetailsFlatListClosure = item => {
    return () => {
      invoke(props, 'showAdDetails', item);
    };
  };
  const renderCardListItem = ({item}) => (
    <CardListItem item={item} onItemPress={handleShowAdsDetailsFlatList} />
  );
  const renderListItem = ({item}) => (
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
      onPress={handleShowAdsDetailsFlatListClosure(item)}
    />
  );
  const getListLength = () => {
    return ads.length;
  };
  const getListItem = (data, index) => {
    return data[index];
  };

  useEffect(() => {
    if (Array.isArray(ads)) {
      setLoading(false);
    }
  }, [ads]);

  useEffect(() => {
    fetchAds();
  }, [fetchId]);

  return (
    <View style={sharedStyles.fullheightView}>
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
      {loading && <View style={sharedStyles.homeLoading}>{Loading}</View>}
      {isCard && (
        <VirtualizedList
          refreshing={loading}
          onRefresh={fetchAds}
          showsVerticalScrollIndicator={false}
          data={ads}
          getItem={getListItem}
          getItemCount={getListLength}
          contentContainerStyle={sharedStyles.homeAdsContainer}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={renderCardListItem}
        />
      )}
      {isCarousel && (
        <CarouselComponent
          items={ads}
          onItemPress={handleShowAdsDetailsFlatList}
        />
      )}
      {isList && (
        <VirtualizedList
          refreshing={loading}
          onRefresh={fetchAds}
          showsVerticalScrollIndicator={false}
          data={ads}
          getItem={getListItem}
          getItemCount={getListLength}
          keyExtractor={item => item.id}
          renderItem={renderListItem}
        />
      )}
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
    fetchAds: payload => dispatch(handleFetchAds(payload)),
    showAdDetails: payload => dispatch(showAdDetails(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
