import React, {PureComponent} from 'react';
import {Toolbar} from 'react-native-material-ui';
import {Animated, Text, View, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import {home} from '../../Constants/Texts';
import {handleFetchLotteries} from '../../redux/Home/FetchLotteries';
import {showLotteryDetails} from '../../redux/LotteryDetails/actions';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {
  getLotteriesSelector,
  getIsListSelector,
  getIsCardSelector,
  getIsCarouselSelector,
} from './Selectors';
// import {emitSocketEvents} from '../../services/Socket';
import {chunk} from 'lodash';
import {getLoggedInSelector, getUserIdSelector} from '../Profile/Selectors';
import {lottteries as lotteriesTexts} from '../../Constants/Texts';
import {onPingSuccess, setOnPingSuccess} from '../Pinger';
// import {AdMobBanner} from 'react-native-admob';

let SearchBox = null;
let UploadLotteryProgressModal = null;
let CardListItemRow = null;
let ListItemCommon = null;

class HomeComponent extends PureComponent {
  state = {
    loading: true,
    showLotteryProgressModal: false,
    adList: null,
    searchBoxAnimatedOpacity: new Animated.Value(0),
    searchable: false,
  };

  fetchLotteriesCallback = () => {
    this.setState({loading: false});
  };

  fetchLotteries = authUserId => {
    this.setState({loading: true}, () => {
      invoke(this.props, 'fetchLotteries', {
        onError: this.fetchLotteriesCallback,
        onSuccess: this.fetchLotteriesCallback,
        userId: authUserId || this.props.authUserId,
      });
    });
  };

  handleOnSearch = () => {
    this.changeViewStyle({action: 'search'});
    this.setState({loading: true});
  };

  onSearchSuccess = () => {
    this.setState({loading: false});
  };

  onSearchError = () => {
    this.setState({loading: false});
  };

  // constructor() {
  //   onPingSuccess = this.fetchLotteries;
  // }

  changeViewStyle = ({action}) => {
    if (action === 'search') {
      if (!SearchBox) {
        SearchBox = require('./SearchBox').default;
      }
      const {searchable} = this.state;
      if (searchable) {
        Animated.timing(this.state.searchBoxAnimatedOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }).start(() => {
          this.setState({
            searchable: !searchable,
          });
        });
      } else {
        this.setState(
          {
            searchable: !searchable,
          },
          () => {
            Animated.timing(this.state.searchBoxAnimatedOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }).start();
          },
        );
      }
      return;
    }
    if (action === 'cloud-upload') {
      if (!UploadLotteryProgressModal) {
        UploadLotteryProgressModal = require('../UploadLotteryProgress/UploadLotteryProgressModal')
          .default;
      }
      this.setState({
        showLotteryProgressModal: true,
      });
      return;
    }
    const {isCard, isList} = this.props;
    if (isCard) {
      if (!ListItemCommon) {
        ListItemCommon = require('./ListItem').default;
      }
      invoke(this.props, 'setHomeViewStyle', {
        isHomeCardStyle: false,
        isHomeListStyle: true,
      });
    }
    if (isList) {
      if (!CardListItemRow) {
        CardListItemRow = require('./CardListItemRow').default;
      }
      invoke(this.props, 'setHomeViewStyle', {
        isHomeCardStyle: true,
        isHomeListStyle: false,
      });
    }
  };

  handleCardItemPress = item => {
    invoke(this.props, 'showLotteryDetails', item);
  };

  handleListItemPress = index => {
    invoke(this.props, 'showLotteryDetails', this.props.lotteries[index]);
  };

  UNSAFE_componentWillMount() {
    const {isCard, isList} = this.props;
    if (isCard) {
      if (!CardListItemRow) {
        CardListItemRow = require('./CardListItemRow').default;
      }
    }
    if (isList) {
      if (!ListItemCommon) {
        ListItemCommon = require('./ListItem').default;
      }
    }
    if (!onPingSuccess) {
      setOnPingSuccess(this.fetchLotteries);
    } else {
      this.fetchLotteries();
    }
    // emitSocketEvents();
    // this.fetchLotteries();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.authUserId !== this.props.authUserId && onPingSuccess) {
      this.fetchLotteries(nextProps.authUserId);
    }
    const {isCard, isList} = nextProps;
    if (isCard) {
      if (!CardListItemRow) {
        CardListItemRow = require('./CardListItemRow').default;
      }
    }
    if (isList) {
      if (!ListItemCommon) {
        ListItemCommon = require('./ListItem').default;
      }
    }
    let adList = null;
    if (Array.isArray(nextProps.lotteries) && nextProps.lotteries.length) {
      adList = chunk(nextProps.lotteries, 3).map((list, index) => ({
        data: list,
        key:
          this.state.adList &&
          this.state.adList[index] &&
          this.state.adList[index].key
            ? this.state.adList[index].key
            : `_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
      }));
    }
    this.setState({
      adList,
    });
  }

  handleCloseUploadLotteryProgressModal = () => {
    this.setState({
      showLotteryProgressModal: false,
    });
  };

  renderCardListItemRow = ({item}) => (
    <CardListItemRow data={item} onItemPress={this.handleCardItemPress} />
  );

  renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={this.handleListItemPress}
      showLotteryResult={!!this.props.authUserId}
      listLength={this.props.lotteries.length}
    />
  );

  getItem = (data, index) => data[index];

  getItemCount = () => (this.state.adList || []).length;

  getListItemCount = () => (this.props.lotteries || []).length || 0;

  getItemKey = item => `${item.key}`;

  getListItemKey = item => `${item.id}`;

  render() {
    const {
      loading,
      showLotteryProgressModal,
      adList,
      searchable,
      searchBoxAnimatedOpacity,
    } = this.state;
    const {isList, isCard, lotteries, authUserId} = this.props;

    return (
      <View style={sharedStyles.fullheightView}>
        {showLotteryProgressModal && (
          <UploadLotteryProgressModal
            onClose={this.handleCloseUploadLotteryProgressModal}
          />
        )}
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          centerElement={home.appName}
          rightElement={[
            authUserId && 'search',
            authUserId && 'cloud-upload',
            isCard ? 'view-list' : 'view-comfy',
          ].filter(Boolean)}
          onRightElementPress={this.changeViewStyle}
        />
        {searchable ? (
          <SearchBox
            onSearchPress={this.handleOnSearch}
            onSearchSuccess={this.onSearchSuccess}
            onSearchError={this.onSearchError}
            style={{
              opacity: searchBoxAnimatedOpacity,
            }}
          />
        ) : null}
        {/* <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-5703846930890914/6105801245"
          style={sharedStyles.adMobBanner}
        /> */}
        <VirtualizedList
          initialNumToRender={5}
          windowSize={1}
          maxToRenderPerBatch={4}
          updateCellsBatchingPeriod={0.0}
          removeClippedSubviews={true}
          refreshing={loading}
          onRefresh={this.fetchLotteries}
          ListEmptyComponent={
            <Text style={sharedStyles.uploadProgressModalText}>
              {lotteriesTexts.emptyLotteries}
            </Text>
          }
          onEndReachedThreshold={0.5}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={isCard ? adList || [] : lotteries || []}
          getItem={this.getItem}
          getItemCount={isCard ? this.getItemCount : this.getListItemCount}
          contentContainerStyle={
            isCard
              ? sharedStyles.homeLotteriesContainer
              : sharedStyles.listViewContainer
          }
          keyExtractor={isCard ? this.getItemKey : this.getListItemKey}
          renderItem={isCard ? this.renderCardListItemRow : this.renderListItem}
        />
      </View>
    );
  }
}

HomeComponent.propTypes = {
  lotteries: PropTypes.array,
  isList: PropTypes.bool,
  isCard: PropTypes.bool,
  isCarousel: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  authUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
};

const mapStateToProps = state => {
  return {
    lotteries: getLotteriesSelector(state),
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
    isCarousel: getIsCarouselSelector(state),
    authUserId: getUserIdSelector(state),
    isLoggedIn: getLoggedInSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLotteries: payload => dispatch(handleFetchLotteries(payload)),
    showLotteryDetails: payload => dispatch(showLotteryDetails(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
