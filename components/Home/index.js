import React, {useEffect, useMemo, useState} from 'react';
import {Button, Toolbar} from 'react-native-material-ui';
import {Animated, Text, View, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import styles from './home.style';
import {handleFetchLotteries} from '../../redux/Home/FetchLotteries';
import {showLotteryDetails} from '../../redux/LotteryDetails/actions';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {
  getLotteriesSelector,
  getIsCarouselSelector,
  getSearchEventFiredSelector,
  getEmptySearchResultsSelector,
} from './Selectors';
import {chunk} from 'lodash';
import {getLoggedInSelector, getUserIdSelector} from '../Profile/Selectors';
import {home, lottteries as lotteriesTexts} from '../../constants/Texts';
// import {AdMobBanner} from 'react-native-admob';
import SearchBox from './SearchBox';
import UploadLotteryProgressModal from '../UploadLotteryProgress/UploadLotteryProgressModal';
import CardListItemRow from './CardListItemRow';
import {handleSearch} from '../../redux/Search/Search';
import {
  setSearchEventFired,
  setSearchFilters,
} from '../../redux/Search/actions';
import {loadingPopup} from '../Loading';
import cancellableFetch from 'react-native-cancelable-fetch';
import {resetHomeLotteries, setPageToken} from '../../redux/Home/actions';
import {getLangSelector} from '../Settings/Selectors';

let cachedLotteryList = null;

const HomeComponent = React.memo(props => {
  const {lotteries, authUserId, searchEventFired, lang, captureEvent} = props;
  const [loading, setLoading] = useState(true);
  const [showLotteryProgressModal, setShowLotteryProgressModal] = useState(
    false,
  );
  const [searchBoxAnimatedOpacity] = useState(new Animated.Value(0));
  const [searchable, setSearchable] = useState(false);
  const [cancelHttpTag] = useState(15);

  const lotteryCardList = useMemo(() => {
    if (Array.isArray(lotteries) && lotteries.length) {
      cachedLotteryList = chunk(lotteries, 3).map((list, index) => ({
        data: list,
        key:
          (cachedLotteryList &&
            cachedLotteryList[index] &&
            cachedLotteryList[index].key) ||
          `_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
      }));
      return cachedLotteryList;
    }
    return [];
  }, [lotteries]);

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
  };

  const handleOnSearch = () => {
    changeViewStyle({action: 'search'});
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

  const getItem = (data, index) => data[index];

  const getItemCount = () => lotteryCardList.length || 0;

  const getItemKey = item => `${item.key}`;

  const handleOnEndReached = () => {
    if (!searchEventFired) {
      fetchLotteries();
    }
  };

  const handleRefresh = () => {
    fetchLotteries();
  };

  useEffect(() => {
    return () => {
      if (searchEventFired) {
        invoke(props, 'handleResetHomeLotteries', []);
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
  }, [captureEvent]);

  useEffect(() => {
    fetchLotteries();
    return () => {
      cancellableFetch.abort(cancelHttpTag);
    };
  }, []);

  return (
    <View style={styles.homeViewContainer}>
      {showLotteryProgressModal && (
        <UploadLotteryProgressModal
          onClose={handleCloseUploadLotteryProgressModal}
        />
      )}
      <Toolbar
        style={{container: styles.toolbarContainer}}
        centerElement={home[lang].appName}
        rightElement={['search', authUserId && 'cloud-upload'].filter(Boolean)}
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
          style={styles.adMobBanner}
        /> */}
      {searchEventFired ? (
        <Button
          raised={true}
          primary
          text={'Reset Search'}
          style={{
            container: styles.resetSearchButtonContainer,
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
        windowSize={100}
        maxToRenderPerBatch={10}
        contentInsetAdjustmentBehavior={'automatic'}
        removeClippedSubviews={true}
        refreshing={loading}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.homeListEmptyViewContainer}>
              <Text style={styles.homeListEmptyViewContainerText}>
                {lotteriesTexts[lang].emptyLotteries}
              </Text>
            </View>
          ) : null
        }
        onRefresh={!searchEventFired && handleRefresh}
        onEndReachedThreshold={0.4}
        onEndReached={!searchEventFired && handleOnEndReached}
        horizontal={false}
        showsVerticalScrollIndicator={true}
        data={lotteryCardList}
        getItem={getItem}
        getItemCount={getItemCount}
        contentContainerStyle={styles.virtualizedListCardContentContainer}
        keyExtractor={getItemKey}
        renderItem={renderCardListItemRow}
      />
    </View>
  );
});

HomeComponent.propTypes = {
  lotteries: PropTypes.array,
  isCarousel: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  searchEventFired: PropTypes.bool,
  authUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  lang: PropTypes.string,
  captureEvent: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    lotteries: getLotteriesSelector(state),
    isCarousel: getIsCarouselSelector(state),
    authUserId: getUserIdSelector(state),
    isLoggedIn: getLoggedInSelector(state),
    searchEventFired: getSearchEventFiredSelector(state),
    emptySearchResults: getEmptySearchResultsSelector(state),
    lang: getLangSelector(state),
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
    handleResetHomeLotteries: payload => dispatch(resetHomeLotteries(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
