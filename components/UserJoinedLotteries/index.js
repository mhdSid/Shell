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
import {getIsCardSelector, getIsListSelector} from '../Home/Selectors';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {chunk} from 'lodash';
import ListItemCommon from '../Home/ListItem';
import CardListItemRow from '../Home/CardListItemRow';
import {getLotteryResultSelector} from '../LotteryResult/Selectors';
import LotteryResultModal from '../LotteryResult';
import cancellableFetch from 'react-native-cancelable-fetch';
import {getLangSelector} from '../Settings/Selectors';

const Lotteries = props => {
  const {
    loggedIn,
    userJoinedLotteries,
    user,
    lotteryDetails,
    isList,
    isCard,
    lotteryResult,
    lang,
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
    if (loggedIn && user) {
      fetchLotteries();
    }
    return () => {
      cancellableFetch.abort(cancelHttpTag);
    };
  }, [lotteryDetails, loggedIn, user]);

  const lotteryCardList = useMemo(() => {
    if (
      isCard &&
      Array.isArray(filteredLotteries || userJoinedLotteries) &&
      (filteredLotteries || userJoinedLotteries).length
    ) {
      return chunk(filteredLotteries || userJoinedLotteries, 3).map(list => ({
        data: list,
        key: `_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      }));
    }
    return [];
  }, [isCard, filteredLotteries, userJoinedLotteries]);

  const getItem = (data, index) => data[index];
  const getItemCount = () => (filteredLotteries || userJoinedLotteries).length;
  const getItemKey = item => item.id;
  const getRowItemKey = item => `${item.key}`;
  const getRowItemCount = () => lotteryCardList.length;
  const onItemPress = index => {
    invoke(props, 'showLotteryDetails', {
      ...(filteredLotteries || userJoinedLotteries)[index]
    });
  };
  const renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={onItemPress}
      listLength={(filteredLotteries || userJoinedLotteries).length}
      showLotteryResult={true}
    />
  );
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
  const changeViewStyle = () => {
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
        rightElement={isCard ? 'view-list' : 'view-comfy'}
        onRightElementPress={changeViewStyle}
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
        windowSize={2}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={0.0}
        removeClippedSubviews={true}
        refreshing={loading}
        onRefresh={fetchLotteries}
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
        contentContainerStyle={
          isCard && styles.virtualizedListCardItemContentContainer
        }
        showsVerticalScrollIndicator={false}
        data={
          isCard ? lotteryCardList : filteredLotteries || userJoinedLotteries
        }
        getItem={getItem}
        getItemCount={isCard ? getRowItemCount : getItemCount}
        keyExtractor={isCard ? getRowItemKey : getItemKey}
        renderItem={isCard ? renderCardListItemRow : renderListItem}
      />
    </View>
  );
};

Lotteries.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.any,
  userJoinedLotteries: PropTypes.any,
  showLotteryResult: PropTypes.func,
  lotteryDetails: PropTypes.object,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
    userJoinedLotteries: getUserJoinedLotteriesSelector(state),
    lotteryDetails: getLotteryDetailsSelector(state),
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
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
