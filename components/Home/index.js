import React, {PureComponent} from 'react';
import {Toolbar, ListItem} from 'react-native-material-ui';
import {View, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Loading} from '../Loading';
import FastImage from 'react-native-fast-image';
import CardListItem from './CardListItem';
import {home} from '../../Constants/Texts';
import {handleFetchAds} from '../../redux/Ads/FetchAds';
import {showAdDetails} from '../../redux/AdDetails/actions';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {
  getAdsSelector,
  getIsListSelector,
  getIsCardSelector,
} from './Selectors';
import UploadAdProgress from '../UploadAdProgress';
import {emitSocketEvents} from '../../services/Socket';
import UploadAdProgressModal from '../UploadAdProgress/uploadAdProgressModal';
import {getProgressItemsSelector} from '../UploadAdProgress/Selectors';
class HomeComponent extends PureComponent {
  state = {
    loading: false,
    showAdProgressModal: false,
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
  changeViewStyle = ({action}) => {
    if (action === 'cloud-upload') {
      this.setState({
        showAdProgressModal: true,
      });
      return;
    }
    const {isCard, isList} = this.props;
    if (isCard) {
      invoke(this.props, 'setHomeViewStyle', {
        isHomeCardStyle: false,
        isHomeListStyle: true,
      });
    }
    if (isList) {
      invoke(this.props, 'setHomeViewStyle', {
        isHomeCardStyle: true,
        isHomeListStyle: false,
      });
    }
  };
  handleShowAdsDetailsFlatList = item => {
    invoke(this.props, 'showAdDetails', item);
  };
  handleShowAdDetails = item => {
    return data => {
      invoke(this.props, 'showAdDetails', item || data);
    };
  };
  componentWillMount() {
    emitSocketEvents();
    this.fetchAds();
  }
  handleCloseUploadAdProgressModal = () => {
    this.setState({
      showAdProgressModal: false,
    });
  };

  renderCardListItem = ({item}) => (
    <CardListItem item={item} onItemPress={this.handleShowAdsDetailsFlatList} />
  );

  renderListItem = ({item, index}) => (
    <View
      style={
        index === this.props.ads.length - 1 && sharedStyles.homeListItemMargin
      }>
      <ListItem
        divider
        leftElement={
          item.images && item.images[0] ? (
            <FastImage
              style={sharedStyles.homeListItemImage}
              source={{
                uri: item.images[0],
                priority: FastImage.priority.low,
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
  getItemCount = () => this.props.ads.length;
  getItemKey = item => `${item.id}`;
  layoutProvider = () => {
    return 100;
  };
  render() {
    const {loading, showAdProgressModal} = this.state;
    const {ads, isList, isCard, progressItems} = this.props;

    return (
      <View style={sharedStyles.fullheightView} shouldRasterizeIOS={true}>
        {showAdProgressModal && (
          <UploadAdProgressModal
            onClose={this.handleCloseUploadAdProgressModal}
          />
        )}
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          centerElement={home.appName}
          rightElement={[
            progressItems && progressItems.length && 'cloud-upload',
            this.isCard ? 'view-list' : 'view-comfy',
          ].filter(Boolean)}
          onRightElementPress={this.changeViewStyle}
        />
        {/* <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-5703846930890914/6105801245"
          style={sharedStyles.adMobBanner}
        /> */}
        <UploadAdProgress />
        {loading && <View style={sharedStyles.homeLoading}>{Loading}</View>}
        {isCard && ads && ads.length > 0 && (
          <VirtualizedList
            initialNumToRender={2}
            windowSize={2}
            removeClippedSubviews={true}
            refreshing={loading}
            onRefresh={this.fetchAds}
            showsVerticalScrollIndicator={false}
            data={ads}
            getItem={this.getItem}
            getItemCount={this.getItemCount}
            contentContainerStyle={sharedStyles.homeAdsContainer}
            keyExtractor={this.getItemKey}
            renderItem={this.renderCardListItem}
          />
        )}
        {isList && ads && ads.length > 0 && (
          <VirtualizedList
            removeClippedSubviews={true}
            windowSize={2}
            initialNumToRender={2}
            refreshing={loading}
            onRefresh={this.fetchAds}
            showsVerticalScrollIndicator={false}
            data={ads}
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
  isList: PropTypes.bool,
  isCard: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    ads: getAdsSelector(state),
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
    progressItems: getProgressItemsSelector(state),
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
