import React, {useState, useEffect, PureComponent} from 'react';
import {Toolbar, ListItem} from 'react-native-material-ui';
import {View, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Loading} from '../Loading';
import FastImage from 'react-native-fast-image';
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

class HomeComponent extends PureComponent {
  state = {
    loading: false,
  };
  callback = () => {
    this.setState({loading: false});
  };
  fetchAds = () => {
    this.setState({loading: true}, () => {
      invoke(this.props, 'fetchAds', {
        onError: this.callback,
        onSuccess: this.callback,
      });
    });
  };
  changeViewStyle = () => {
    if (this.isCard) {
      invoke(this.props, 'setHomeViewStyle', {
        isHomeCardStyle: false,
        isHomeCarouselStyle: false,
        isHomeListStyle: true,
      });
    }
    if (this.isList) {
      invoke(this.props, 'setHomeViewStyle', {
        isHomeCardStyle: false,
        isHomeCarouselStyle: true,
        isHomeListStyle: false,
      });
    }
    if (this.isCarousel) {
      invoke(this.props, 'setHomeViewStyle', {
        isHomeCardStyle: true,
        isHomeCarouselStyle: false,
        isHomeListStyle: false,
      });
    }
  };
  handleShowAdsDetailsFlatList = item => {
    invoke(this.props, 'showAdDetails', item);
  };
  handleShowAdDetails = item => {
    return () => {
      invoke(this.props, 'showAdDetails', item);
    };
  };
  componentWillMount() {
    emitSocketEvents();
    this.fetchAds();
  }
  componentWillReceiveProps(nextProps) {
    const {ads, isList, isCarousel, isCard} = nextProps;
    this.ads = ads;
    this.isList = isList;
    this.isCarousel = isCarousel;
    this.isCard = isCard;
  }

  renderCardListItem = ({item}) => (
    <CardListItem item={item} onItemPress={this.handleShowAdsDetailsFlatList} />
  );

  renderListItem = ({item, index}) => (
    <View
      style={index === this.ads.length - 1 && sharedStyles.homeListItemMargin}>
      <ListItem
        divider
        leftElement={
          item.images && item.images[0] ? (
            <FastImage
              style={sharedStyles.homeListItemImage}
              source={{
                uri: item.images[0],
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : null
        }
        centerElement={{
          primaryText: item.name,
          secondaryText: item.category,
          tertiaryText: `${item.currency} ${item.price}`,
        }}
        onPress={this.handleShowAdDetails(item)}
      />
    </View>
  );
  getItem = (data, index) => data[index];
  getItemCount = () => this.ads.length;
  getItemKey = item => item.id;

  render() {
    const {loading} = this.state;
    return (
      <View style={sharedStyles.fullheightView} shouldRasterizeIOS={true}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          centerElement={home.appName}
          rightElement={
            this.isCard
              ? 'view-list'
              : this.isList
              ? 'view-carousel'
              : 'view-comfy'
          }
          onRightElementPress={this.changeViewStyle}
        />
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-5703846930890914/6428703368"
          style={sharedStyles.adMobBanner}
        />
        <UploadAdProgress />
        {loading && <View style={sharedStyles.homeLoading}>{Loading}</View>}
        {this.isCarousel && this.ads && this.ads.length > 0 && (
          <CarouselComponent
            items={this.ads}
            onItemPress={this.handleShowAdsDetailsFlatList}
          />
        )}
        {this.isCard && this.ads && this.ads.length > 0 && (
          <VirtualizedList
            initialNumToRender={2}
            windowSize={2}
            removeClippedSubviews={true}
            refreshing={loading}
            onRefresh={this.fetchAds}
            showsVerticalScrollIndicator={false}
            data={this.ads}
            getItem={this.getItem}
            getItemCount={this.getItemCount}
            contentContainerStyle={sharedStyles.homeAdsContainer}
            keyExtractor={this.getItemKey}
            renderItem={this.renderCardListItem}
          />
        )}
        {this.isList && this.ads && this.ads.length > 0 && (
          <VirtualizedList
            removeClippedSubviews={true}
            windowSize={2}
            initialNumToRender={2}
            refreshing={loading}
            onRefresh={this.fetchAds}
            showsVerticalScrollIndicator={false}
            data={this.ads}
            getItem={this.getItem}
            getItemCount={this.getItemCount}
            keyExtractor={this.getItemKey}
            renderItem={this.renderListItem}
          />
        )}
      </View>
    );
  }
}

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
