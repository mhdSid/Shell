import React, {useEffect, useMemo, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, VirtualizedList} from 'react-native';
import styles from './userLikedLotteries.style';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {profile} from '../../constants/Texts';
import {connect} from 'react-redux';
import {getUserLikedLotteriesSelector} from '../UserJoinedLotteries/Selectors';
import {getUserSelector} from '../Profile/Selectors';
import {Text} from 'react-native';
import {handleFetchUserLikedLotteries} from '../../redux/Lotteries/FetchUserLikedLotteries';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import {showLotteryDetails as handleShowLotteryDetails} from '../../redux/LotteryDetails/actions';
import {lottteries as lotteriesTexts} from '../../constants/Texts';
import Filter from '../Filter';
import CardListItemRow from '../Home/CardListItemRow';
import {chunk} from 'lodash';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {getLotteryResultSelector} from '../LotteryResult/Selectors';
import LotteryResultModal from '../LotteryResult';
import {loadingPopup} from '../Loading';
import cancellableFetch from 'react-native-cancelable-fetch';
import {getLangSelector} from '../Settings/Selectors';

let LotteryDetails = null;
let cachedLotteryList = null;

const UserLikedLotteries = React.memo(props => {
  const {user, userLikedLotteries, lotteryDetails, lotteryResult, lang} = props;
  const [loading, setLoading] = useState(true);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState(null);
  const [filteredLotteries, setFilteredLotteries] = useState(null);
  const [cancelHttpTag] = useState(12);

  const callback = () => {
    setLoading(false);
  };
  const fetchUserLikedLotteries = () => {
    setLoading(true);
    invoke(props, 'fetchUserLikedLotteries', {
      onSuccess: callback,
      onError: callback,
      cancelTag: cancelHttpTag,
      userId: user.id,
    });
  };

  useEffect(() => {
    fetchUserLikedLotteries();
    return () => {
      cancellableFetch.abort(cancelHttpTag);
    };
  }, [lotteryDetails, user]);

  const lotteryCardList = useMemo(() => {
    if (
      Array.isArray(filteredLotteries || userLikedLotteries) &&
      (filteredLotteries || userLikedLotteries).length
    ) {
      cachedLotteryList = chunk(filteredLotteries || userLikedLotteries, 3).map(
        (list, index) => ({
          data: list,
          key:
            (cachedLotteryList &&
              cachedLotteryList[index] &&
              cachedLotteryList[index].key) ||
            `_${Math.random()
              .toString(36)
              .substr(2, 9)}`,
        }),
      );
      return cachedLotteryList;
    }
    return [];
  }, [filteredLotteries, userLikedLotteries]);

  const getRowItemKey = item => `${item.key}`;
  const getRowItemCount = () => lotteryCardList.length;

  const handleCloseModal = () => {
    invoke(props, 'handleShowLotteryDetails', undefined);
    invoke(props, 'onClose');
  };
  const updateLotteryDetails = item => {
    setSelectedLottery(item);
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
      !userLikedLotteries ||
      userLikedLotteries.length === 0
    ) {
      setFilteredLotteries(null);
      return;
    }
    if (
      filterValue &&
      Array.isArray(userLikedLotteries) &&
      userLikedLotteries.length
    ) {
      const filteredData = userLikedLotteries.filter(
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

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      {lotteryDetailsModal}
      {lotteryResultModal}
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={profile[lang].myLikedLotteries}
            onLeftElementPress={handleCloseModal}
          />
          {userLikedLotteries && userLikedLotteries.length ? (
            <Filter lang={lang} onFilterChange={handleFilterChange} />
          ) : null}
          {(!userLikedLotteries ||
            (userLikedLotteries && userLikedLotteries.length === 0)) &&
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
              (!filteredLotteries || !filteredLotteries.length) &&
              fetchUserLikedLotteries
            }
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={lotteryCardList}
            getItem={getItem}
            getItemCount={getRowItemCount}
            contentContainerStyle={styles.virtualizedListCardContentContainer}
            keyExtractor={getRowItemKey}
            renderItem={renderCardListItemRow}
            ListEmptyComponent={
              !loading ? (
                <View style={styles.emptyListViewContainer}>
                  <Text style={styles.emptyListViewContainerText}>
                    {lotteriesTexts[lang].emptyLotteries}
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
});

UserLikedLotteries.propTypes = {
  user: PropTypes.object,
  userLikedLotteries: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  onClose: PropTypes.func,
  lotteryDetails: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
  lotteryResult: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    lotteryDetails: getLotteryDetailsSelector(state),
    userLikedLotteries: getUserLikedLotteriesSelector(state),
    lotteryResult: getLotteryResultSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserLikedLotteries: payload =>
      dispatch(handleFetchUserLikedLotteries(payload)),
    handleShowLotteryDetails: payload =>
      dispatch(handleShowLotteryDetails(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLikedLotteries);
