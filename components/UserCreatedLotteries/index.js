import React, {useEffect, useMemo, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, VirtualizedList} from 'react-native';
import styles from './userCreatedLotteries.style';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {profile} from '../../constants/Texts';
import {connect} from 'react-redux';
import {getUserCreatedLotteriesSelector} from '../UserJoinedLotteries/Selectors';
import {getUserSelector} from '../Profile/Selectors';
import {handleFetchUserCreatedLotteries} from '../../redux/Lotteries/FetchUserCreatedLotteries';
import {Text} from 'react-native';
import {lottteries as lotteriesTexts} from '../../constants/Texts';
import Filter from '../Filter';
import CardListItemRow from '../Home/CardListItemRow';
import {chunk} from 'lodash';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {showLotteryResult} from '../../redux/LotteryResult/actions';
import {getLotteryResultSelector} from '../LotteryResult/Selectors';
import LotteryResultModal from '../LotteryResult';
import {loadingPopup} from '../Loading';
import cancellableFetch from 'react-native-cancelable-fetch';
import {getLangSelector} from '../Settings/Selectors';
import {setUserCreatedLotteriesPageToken} from '../../redux/Lotteries/actions';

let LotteryDetails = null;
let cachedLotteryList = null;

const UserCreatedLotteries = React.memo(props => {
  const {user, userCreatedLotteries, lotteryResult, lang} = props;
  const [loading, setLoading] = useState(true);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState();
  const [filteredLotteries, setFilteredLotteries] = useState(null);
  const [cancelHttpTag] = useState(14);

  const lotteryCardList = useMemo(() => {
    if (
      Array.isArray(filteredLotteries || userCreatedLotteries) &&
      (filteredLotteries || userCreatedLotteries).length
    ) {
      cachedLotteryList = chunk(
        filteredLotteries || userCreatedLotteries,
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
  }, [filteredLotteries, userCreatedLotteries]);

  const getRowItemKey = item => `${item.key}`;
  const getRowItemCount = () => lotteryCardList.length;

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const callback = () => {
    setLoading(false);
  };
  const updateLotteryDetails = item => {
    setSelectedLottery(item);
  };
  const fetchMyLotteries = () => {
    setLoading(true);
    invoke(props, 'fetchUserCreatedLotteries', {
      onSuccess: callback,
      onError: callback,
      userId: user.id,
      cancelTag: cancelHttpTag,
    });
  };
  const onLotteryDetailsClose = () => {
    setShowLotteryDetails(false);
  };
  const getItem = (data, index) => data[index];
  const lotteryDetailsModal = showLotteryDetails && (
    <LotteryDetails
      updateLotteryDetails={updateLotteryDetails}
      onClose={onLotteryDetailsClose}
      item={selectedLottery}
    />
  );
  const lotteryResultModal = lotteryResult && <LotteryResultModal />;
  const handleFilterChange = filterValue => {
    if (
      !filterValue ||
      !userCreatedLotteries ||
      userCreatedLotteries.length === 0
    ) {
      setFilteredLotteries(null);
      return;
    }
    if (
      filterValue &&
      Array.isArray(userCreatedLotteries) &&
      userCreatedLotteries.length
    ) {
      const filteredData = userCreatedLotteries.filter(
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
    if (!LotteryDetails) {
      LotteryDetails = require('../LotteryDetails').default;
    }
    setShowLotteryDetails(true);
    setSelectedLottery(item);
  };
  const renderCardListItemRow = ({item}) => (
    <CardListItemRow data={item} onItemPress={handleCardItemPress} />
  );
  const handleOnEndReached = () => {
    if (filteredLotteries && filteredLotteries.length) {
      return;
    }
    fetchMyLotteries();
  };
  const handleRefresh = () => {
    invoke(props, 'handleSetUserCreatedLotteriesPageToken', null);
    fetchMyLotteries();
  };
  useEffect(() => {
    return () => {
      cancellableFetch.abort(cancelHttpTag);
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      onShow={fetchMyLotteries}
      onRequestClose={handleCloseModal}>
      {lotteryDetailsModal}
      {lotteryResultModal}
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={profile[lang].myCreatedLotteries}
            onLeftElementPress={handleCloseModal}
          />
          {userCreatedLotteries && userCreatedLotteries.length ? (
            <Filter lang={lang} onFilterChange={handleFilterChange} />
          ) : null}
          {(!userCreatedLotteries ||
            (userCreatedLotteries && userCreatedLotteries.length === 0)) &&
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
            onRefresh={
              (!filteredLotteries || !filteredLotteries.length) && handleRefresh
            }
            onEndReachedThreshold={0.4}
            onEndReached={
              (!filteredLotteries || !filteredLotteries.length) &&
              handleOnEndReached
            }
            horizontal={false}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={
              !loading ? (
                <View style={styles.emptyListViewContainer}>
                  <Text style={styles.emptyListViewContainerText}>
                    {lotteriesTexts[lang].emptyLotteries}
                  </Text>
                </View>
              ) : null
            }
            data={lotteryCardList}
            getItem={getItem}
            getItemCount={getRowItemCount}
            contentContainerStyle={
              styles.virtualizedListCardItemContentContainer
            }
            keyExtractor={getRowItemKey}
            renderItem={renderCardListItemRow}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
});

UserCreatedLotteries.propTypes = {
  user: PropTypes.object,
  userCreatedLotteries: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  onClose: PropTypes.func,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    userCreatedLotteries: getUserCreatedLotteriesSelector(state),
    lotteryResult: getLotteryResultSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCreatedLotteries: payload =>
      dispatch(handleFetchUserCreatedLotteries(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
    showLotteryResult: payload => dispatch(showLotteryResult(payload)),
    handleSetUserCreatedLotteriesPageToken: payload => dispatch(setUserCreatedLotteriesPageToken(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCreatedLotteries);
