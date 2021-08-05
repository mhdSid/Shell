import React, {PureComponent} from 'react';
import {Toolbar} from 'react-native-material-ui';
import {Animated, View, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Loading} from '../Loading';
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
import {emitSocketEvents} from '../../services/Socket';
import UploadAdProgressModal from '../UploadAdProgress/uploadAdProgressModal';
import {getProgressItemsSelector} from '../UploadAdProgress/Selectors';
import {chunk, uniqBy} from 'lodash';
import CardListItemRow from './CardListItemRow';
import ListItemCommon from './ListItem';
import SearchBox from './SearchBox';
class HomeComponent extends PureComponent {
  state = {
    loading: false,
    showAdProgressModal: false,
    adList: null,
    searchBoxAnimatedOpacity: new Animated.Value(0),
    searchable: false,
  };
  callback = () => {
    this.setState({loading: false});
  };

  fetchLotteries = () => {
    this.setState({loading: true}, () => {
      invoke(this.props, 'fetchLotteries', {
        onError: this.callback,
        onSuccess: this.callback,
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
  changeViewStyle = ({action}) => {
    if (action === 'search') {
      const {searchable} = this.state;
      if (searchable) {
        Animated.timing(this.state.searchBoxAnimatedOpacity, {
          toValue: 0,
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
            }).start();
          },
        );
      }
      return;
    }
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
  handleCardItemPress = item => {
    invoke(this.props, 'showLotteryDetails', item);
  };
  handleListItemPress = index => {
    invoke(this.props, 'showLotteryDetails', this.props.lotteries[index]);
  };
  componentWillMount() {
    emitSocketEvents();
    this.fetchLotteries();
  }
  componentWillReceiveProps(nextProps) {
    let adList = null;
    if (Array.isArray(nextProps.lotteries) && nextProps.lotteries.length) {
      adList = uniqBy(nextProps.lotteries, 'id');
      adList = chunk(adList, 3).map(list => ({
        data: list,
        key: `_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      }));
    }
    this.setState({
      adList,
    });
    if (nextProps.progressItems.length === 0) {
      this.setState({
        showAdProgressModal: false,
      });
    }
  }
  handleCloseUploadAdProgressModal = () => {
    this.setState({
      showAdProgressModal: false,
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
      listLength={this.props.lotteries.length}
    />
  );
  getItem = (data, index) => data[index];
  getItemCount = () => this.state.adList.length;
  getListItemCount = () => this.props.lotteries.length;
  getItemKey = (item, index) => `${item.key}`;
  getListItemKey = item => `${item.id}`;

  render() {
    const {
      loading,
      showAdProgressModal,
      adList,
      searchable,
      searchBoxAnimatedOpacity,
    } = this.state;
    const {isList, isCard, lotteries} = this.props;

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
            'search',
            'cloud-upload',
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
        {/* <UploadAdProgress /> */}
        {loading && <View style={sharedStyles.homeLoading}>{Loading}</View>}
        {isCard && adList && adList.length ? (
          <VirtualizedList
            initialNumToRender={10}
            windowSize={10}
            removeClippedSubviews={true}
            refreshing={loading}
            onRefresh={this.fetchLotteries}
            horizontal={false}
            // listKey={adListKey}
            // maxToRenderPerBatch={10}
            // updateCellsBatchingPeriod={1}
            // onEndReachedThreshold={0.5}
            // contentContainerStyle={{
            //   display: 'flex',
            //   justifyContent: 'flex-start',
            //   alignItems: 'flex-start',
            // }}
            // style={{
            //   display: 'flex',
            //   justifyContent: 'flex-start',
            //   alignItems: 'flex-start',
            // }}
            showsVerticalScrollIndicator={false}
            data={adList}
            getItem={this.getItem}
            getItemCount={this.getItemCount}
            contentContainerStyle={sharedStyles.homeLotteriesContainer}
            keyExtractor={this.getItemKey}
            renderItem={this.renderCardListItemRow}
          />
        ) : null}
        {isList && lotteries && lotteries.length > 0 ? (
          <VirtualizedList
            removeClippedSubviews={true}
            windowSize={10}
            initialNumToRender={10}
            refreshing={loading}
            onRefresh={this.fetchLotteries}
            showsVerticalScrollIndicator={false}
            data={lotteries}
            getItem={this.getItem}
            getItemCount={this.getListItemCount}
            keyExtractor={this.getListItemKey}
            renderItem={this.renderListItem}
          />
        ) : null}
      </View>
    );
  }
}

HomeComponent.propTypes = {
  lotteries: PropTypes.array,
  isList: PropTypes.bool,
  isCard: PropTypes.bool,
  isCarousel: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    lotteries: getLotteriesSelector(state),
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
    isCarousel: getIsCarouselSelector(state),
    progressItems: getProgressItemsSelector(state),
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
