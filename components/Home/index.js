import React, {useState, useEffect} from 'react';
import {Toolbar, ListItem} from 'react-native-material-ui';
import {View, Alert, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {getAds} from '../../services/Ads';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Loading} from '../Loading';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import {addAd} from '../../redux/Ads/actions';
import {
  AdMobBanner,
  // AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
} from 'react-native-admob';
import {rootHandleShowAdsDetails} from '../Pinger';
import {CarouselComponent} from '../Carousel';
import CardListItem from './CardListItem';

const HomeComponent = props => {
  const {ads: _ads} = props;
  const [ads, setAds] = useState(_ads);
  const [isList, setIsList] = useState(false);
  const [isCarousel, setIsCarousel] = useState(false);
  const [isCard, setIsCard] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fetchId] = useState(0);
  let unMounted = false;

  const handleError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    if (message) {
      Alert.alert(message);
    }
    return;
  };
  const onGetAdsSuccess = data => {
    if (!unMounted) {
      const {error, ads: serverAds} = data;
      if (error) {
        return handleError(error);
      }
      invoke(props, 'addAd', serverAds);
    }
  };
  const fetchAds = () => {
    getAds().then(onGetAdsSuccess, handleError);
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
    rootHandleShowAdsDetails(item);
  };
  const handleShowAdsDetailsFlatListClosure = item => {
    return () => {
      rootHandleShowAdsDetails(item);
    };
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

  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        centerElement="Shell"
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
          getItem={(data, index) => data[index]}
          getItemCount={() => ads.length}
          contentContainerStyle={sharedStyles.homeAdsContainer}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CardListItem
              item={item}
              onItemPress={handleShowAdsDetailsFlatList}
            />
          )}
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
          getItem={(data, index) => data[index]}
          getItemCount={() => ads.length}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
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
          )}
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
    addAd: payload => dispatch(addAd(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
