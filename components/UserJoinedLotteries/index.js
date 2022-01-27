import React, {useEffect, useMemo, useState} from 'react';
import {View, VirtualizedList, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './userJoinedLotteries.style';
import NoAuth from '../NoAuth';
import isUndefined from 'lodash/isUndefined';
import {Loading, loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {Toolbar} from 'react-native-material-ui';
import {
  lottteries as lotteriesTexts,
  noAuth as noAuthTexts,
} from '../../constants/Texts';
import {
  getLoggedInSelector,
  getUserSelector,
  getUserJoinedLotteriesSelector,
} from './Selectors';
import invoke from 'lodash/invoke';
import {handleFetchUserJoinedLotteries} from '../../redux/Lotteries/FetchUserJoinedLotteries';
import {showLotteryDetails} from '../../redux/LotteryDetails/actions';
import {showLotteryResult} from '../../redux/LotteryResult/actions';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import Filter from '../Filter';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {chunk} from 'lodash';
import CardListItemRow from '../Home/CardListItemRow';
import {getLotteryResultSelector} from '../LotteryResult/Selectors';
import LotteryResultModal from '../LotteryResult';
import cancellableFetch from 'react-native-cancelable-fetch';
import {getLangSelector} from '../Settings/Selectors';

let cachedLotteryList = null;

const Lotteries = React.memo(props => {
  const {
    loggedIn,
    userJoinedLotteries,
    user,
    lotteryDetails,
    lotteryResult,
    lang,
    captureEvent,
  } = props;
  const [loading, setLoading] = useState(true);
  const [filteredLotteries, setFilteredLotteries] = useState(null);
  const [cancelHttpTag] = useState(13);

  const callback = () => {
    setLoading(false);
  };
  const fetchLotteries = () => {
    setLoading(true);
    invoke(props, 'fetchUserJoinedLotteries', {
      userId: user.id,
      onSuccess: callback,
      onError: callback,
      cancelTag: cancelHttpTag,
    });
  };

  useEffect(() => {
    if (isUndefined(loggedIn) && isUndefined(user)) {
      fetchLotteries();
    }
  }, [captureEvent]);

  useEffect(() => {
    if (loggedIn && user) {
      fetchLotteries();
    }
    return () => {
      cancellableFetch.abort(cancelHttpTag);
    };
  }, [lotteryDetails, loggedIn, user]);

  const lotteryCardList = useMemo(() => {
    if (
      Array.isArray(filteredLotteries || userJoinedLotteries) &&
      (filteredLotteries || userJoinedLotteries).length
    ) {
      cachedLotteryList = chunk(
        filteredLotteries || userJoinedLotteries,
        3,
      ).map((list, index) => ({
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
  }, [filteredLotteries, userJoinedLotteries]);

  const getItem = (data, index) => data[index];
  const getRowItemKey = item => `${item.key}`;
  const getRowItemCount = () => lotteryCardList.length;
  const handleFilterChange = filterValue => {
    if (
      !filterValue ||
      !userJoinedLotteries ||
      userJoinedLotteries.length === 0
    ) {
      setFilteredLotteries(null);
      return;
    }
    if (
      filterValue &&
      Array.isArray(userJoinedLotteries) &&
      userJoinedLotteries.length
    ) {
      const filteredData = userJoinedLotteries.filter(
        item =>
          item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.description.toLowerCase().includes(filterValue.toLowerCase()),
      );
      setFilteredLotteries(
        filteredData && filteredData.length
          ? filteredData
          : filteredLotteries && filteredLotteries.length
          ? filteredLotteries
          : null,
      );
    }
  };
  const handleCardItemPress = item => {
    invoke(props, 'showLotteryDetails', item);
  };
  const renderCardListItemRow = ({item}) => (
    <CardListItemRow data={item} onItemPress={handleCardItemPress} />
  );
  const lotteryResultModal = lotteryResult && <LotteryResultModal />;

  if (isUndefined(loggedIn) && isUndefined(user)) {
    return Loading;
  }

  if (!loggedIn && !user) {
    return <NoAuth text={noAuthTexts[lang].userJoinedLotteries} lang={lang} />;
  }

  return (
    <View style={styles.userJoinedLotteriesViewContainer}>
      {lotteryResultModal}
      <Toolbar
        style={{container: styles.toolbarContainer}}
        centerElement={lotteriesTexts[lang].lotteries}
      />
      {userJoinedLotteries && userJoinedLotteries.length ? (
        <Filter lang={lang} onFilterChange={handleFilterChange} />
      ) : null}
      {(!userJoinedLotteries ||
        (userJoinedLotteries && userJoinedLotteries.length === 0)) &&
      loading
        ? loadingPopup
        : null}
      <VirtualizedList
        initialNumToRender={10}
        windowSize={100}
        maxToRenderPerBatch={10}
        contentInsetAdjustmentBehavior={'automatic'}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.4}
        refreshing={loading}
        onRefresh={
          (!filteredLotteries || !filteredLotteries.length) && fetchLotteries
        }
        horizontal={false}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyListViewContainer}>
              <Text style={styles.emptyListViewContainerText}>
                {lotteriesTexts[lang].emptyLotteries}
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.virtualizedListCardItemContentContainer}
        showsVerticalScrollIndicator={true}
        data={lotteryCardList}
        getItem={getItem}
        getItemCount={getRowItemCount}
        keyExtractor={getRowItemKey}
        renderItem={renderCardListItemRow}
      />
    </View>
  );
});

Lotteries.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.any,
  userJoinedLotteries: PropTypes.any,
  showLotteryResult: PropTypes.func,
  lotteryDetails: PropTypes.object,
  lang: PropTypes.string,
  captureEvent: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
    userJoinedLotteries: getUserJoinedLotteriesSelector(state),
    lotteryDetails: getLotteryDetailsSelector(state),
    lotteryResult: getLotteryResultSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserJoinedLotteries: payload =>
      dispatch(handleFetchUserJoinedLotteries(payload)),
    showLotteryDetails: payload => dispatch(showLotteryDetails(payload)),
    showLotteryResult: payload => dispatch(showLotteryResult(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lotteries);
