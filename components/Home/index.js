import React, {useEffect, useMemo, useState} from 'react';
import {Button, Toolbar} from 'react-native-material-ui';
import {Animated, Text, View, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import {home, lottteries} from '../../Constants/Texts';
import {handleFetchLotteries} from '../../redux/Home/FetchLotteries';
import {showLotteryDetails} from '../../redux/LotteryDetails/actions';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {
  getLotteriesSelector,
  getIsListSelector,
  getIsCardSelector,
  getIsCarouselSelector,
  getSearchEventFiredSelector,
  getEmptySearchResultsSelector,
} from './Selectors';
// import {emitSocketEvents} from '../../services/Socket';
import {chunk} from 'lodash';
import {getLoggedInSelector, getUserIdSelector} from '../Profile/Selectors';
import {lottteries as lotteriesTexts} from '../../Constants/Texts';
// import {AdMobBanner} from 'react-native-admob';
import SearchBox from './SearchBox';
import UploadLotteryProgressModal from '../UploadLotteryProgress/UploadLotteryProgressModal';
import CardListItemRow from './CardListItemRow';
import ListItemCommon from './ListItem';
import {handleSearch} from '../../redux/Search/Search';
import {
  setSearchEventFired,
  setSearchFilters,
} from '../../redux/Search/actions';
import {loadingPopup} from '../Loading';
import cancellableFetch from 'react-native-cancelable-fetch';
import {resetHomeLotteries, setPageToken} from '../../redux/Home/actions';

const HomeComponent = props => {
  const {isList, isCard, lotteries, authUserId, searchEventFired} = props;
  const [loading, setLoading] = useState(true);
  const [showLotteryProgressModal, setShowLotteryProgressModal] = useState(
    false,
  );
  const [searchBoxAnimatedOpacity] = useState(new Animated.Value(0));
  const [searchable, setSearchable] = useState(false);
  const [cancelHttpTag] = useState(15);

  const lotteryCardList = useMemo(() => {
    if (isCard && Array.isArray(lotteries) && lotteries.length) {
      return chunk(lotteries, 3).map(list => ({
        data: list,
        key: `_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      }));
    }
    return [];
  }, [isCard, lotteries]);

  const fetchLotteriesCallback = () => {
    setLoading(false);
  };

  const fetchLotteries = resetLotteries => {
    setLoading(true);
    invoke(props, 'fetchLotteries', {
      onError: fetchLotteriesCallback,
      onSuccess: fetchLotteriesCallback,
      cancelTag: cancelHttpTag,
      resetLotteries,
    });
  };

  const changeViewStyle = ({action}) => {
    if (action === 'search') {
      if (searchable) {
        Animated.timing(searchBoxAnimatedOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }).start(() => {
          setSearchable(!searchable);
        });
      } else {
        setSearchable(!searchable);
        Animated.timing(searchBoxAnimatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
      return;
    }
    if (action === 'cloud-upload') {
      setShowLotteryProgressModal(true);
      return;
    }
    if (isCard) {
      invoke(props, 'setHomeViewStyle', {
        isHomeCardStyle: false,
        isHomeListStyle: true,
      });
    }
    if (isList) {
      invoke(props, 'setHomeViewStyle', {
        isHomeCardStyle: true,
        isHomeListStyle: false,
      });
    }
  };

  const handleOnSearch = () => {
    changeViewStyle({action: 'search'});
    // setLoading(false);
    setLoading(true);
  };

  const onSearchSuccess = () => {
    setLoading(false);
  };

  const onSearchError = () => {
    setLoading(false);
  };

  const handleCardItemPress = item => {
    invoke(props, 'showLotteryDetails', item);
  };

  const handleListItemPress = index => {
    invoke(props, 'showLotteryDetails', lotteries[index]);
  };

  const handleCloseUploadLotteryProgressModal = () => {
    setShowLotteryProgressModal(false);
  };

  const handleResetSearchFilters = () => {
    invoke(props, 'handleSetPageToken', null);
    invoke(props, 'handleSetSearchEventFired', false);
    invoke(props, 'handleSetSearchFilters', {
      searchText: '',
      city: '',
      prefecture: '',
      category: '',
      condition: '',
      fromDate: '',
      toDate: '',
    });
    fetchLotteries(true);
  };

  const renderCardListItemRow = ({item}) => (
    <CardListItemRow data={item} onItemPress={handleCardItemPress} />
  );

  const renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={handleListItemPress}
      showLotteryResult={!!authUserId}
      listLength={lotteries.length}
    />
  );

  const getItem = (data, index) => data[index];

  const getItemCount = () => lotteryCardList.length || 0;

  const getListItemCount = () => lotteries.length || 0;

  const getItemKey = item => `${item.key}`;

  const getListItemKey = item => `${item.id}`;

  const handleOnEndReached = () => {
    if (!searchEventFired) {
      fetchLotteries();
    }
  };

  useEffect(() => {
    return () => {
      if (searchEventFired) {
        invoke(props, 'handlerResetHomeLotteries', []);
        invoke(props, 'handleSetPageToken', null);
        invoke(props, 'handleSetSearchEventFired', false);
        invoke(props, 'handleSetSearchFilters', {
          searchText: '',
          city: '',
          prefecture: '',
          category: '',
          condition: '',
          fromDate: '',
          toDate: '',
        });
      }
    };
  }, [searchEventFired]);

  useEffect(() => {
    fetchLotteries();
    return () => {
      cancellableFetch.abort(cancelHttpTag);
    };
  }, []);

  return (
    <View style={sharedStyles.fullheightView}>
      {showLotteryProgressModal && (
        <UploadLotteryProgressModal
          onClose={handleCloseUploadLotteryProgressModal}
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
        onRightElementPress={changeViewStyle}
      />
      {searchable ? (
        <SearchBox
          onSearchPress={handleOnSearch}
          onSearchSuccess={onSearchSuccess}
          onSearchError={onSearchError}
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
      {searchEventFired ? (
        <Button
          raised={true}
          primary
          text={'Reset Search'}
          style={{
            container: [
              sharedStyles.mainButtonContainer,
              sharedStyles.homeResetSearchBtn,
            ],
          }}
          icon="youtube-searched-for"
          onPress={handleResetSearchFilters}
        />
      ) : null}
      {((lotteries && lotteries.length === 0) ||
        !lotteries ||
        searchEventFired) &&
      loading
        ? loadingPopup
        : null}
      <VirtualizedList
        initialNumToRender={10}
        windowSize={2}
        contentInsetAdjustmentBehavior={'automatic'}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={0.0}
        removeClippedSubviews={true}
        refreshing={loading}
        ListEmptyComponent={
          !loading ? (
            <View style={sharedStyles.homeEmptySearchResultsView}>
              <Text style={sharedStyles.emptySearchResultsText}>
                {lotteriesTexts.emptyLotteries}
              </Text>
            </View>
          ) : null
        }
        onRefresh={!searchEventFired && fetchLotteries}
        onEndReachedThreshold={0.1}
        onEndReached={!searchEventFired && handleOnEndReached}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={isCard ? lotteryCardList : lotteries}
        getItem={getItem}
        getItemCount={isCard ? getItemCount : getListItemCount}
        contentContainerStyle={isCard && sharedStyles.homeLotteriesContainer}
        keyExtractor={isCard ? getItemKey : getListItemKey}
        renderItem={isCard ? renderCardListItemRow : renderListItem}
      />
    </View>
  );
};

HomeComponent.propTypes = {
  lotteries: PropTypes.array,
  isList: PropTypes.bool,
  isCard: PropTypes.bool,
  isCarousel: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  searchEventFired: PropTypes.bool,
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
    searchEventFired: getSearchEventFiredSelector(state),
    emptySearchResults: getEmptySearchResultsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLotteries: payload => dispatch(handleFetchLotteries(payload)),
    handleSearch: payload => dispatch(handleSearch(payload)),
    showLotteryDetails: payload => dispatch(showLotteryDetails(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
    handleSetSearchEventFired: payload =>
      dispatch(setSearchEventFired(payload)),
    handleSetSearchFilters: payload => dispatch(setSearchFilters(payload)),
    handleSetPageToken: payload => dispatch(setPageToken(payload)),
    handlerResetHomeLotteries: payload => dispatch(resetHomeLotteries(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
