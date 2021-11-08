import React, {useEffect, useMemo, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {profile} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {getUserLikedLotteriesSelector} from '../UserJoinedLotteries/Selectors';
import {getUserSelector} from '../Profile/Selectors';
import {Text} from 'react-native';
import {handleFetchUserLikedLotteries} from '../../redux/Lotteries/FetchUserLikedLotteries';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import {showLotteryDetails as handleShowLotteryDetails} from '../../redux/LotteryDetails/actions';
import {lottteries as lotteriesTexts} from '../../Constants/Texts';
import Filter from '../Filter';
import ListItemCommon from '../Home/ListItem';
import CardListItemRow from '../Home/CardListItemRow';
import {chunk} from 'lodash';
import {getIsCardSelector, getIsListSelector} from '../Home/Selectors';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {getLotteryResultSelector} from '../LotteryResult/Selectors';
import LotteryResultModal from '../LotteryResult';
import {loadingPopup} from '../Loading';
import cancellableFetch from 'react-native-cancelable-fetch';
import { getLangSelector } from '../Settings/Selectors';

let LotteryDetails = null;

const UserLikedLotteries = props => {
  const {
    user,
    userLikedLotteries,
    lotteryDetails,
    isCard,
    isList,
    lotteryResult,
    lang,
  } = props;
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
      isCard &&
      Array.isArray(filteredLotteries || userLikedLotteries) &&
      (filteredLotteries || userLikedLotteries).length
    ) {
      return chunk(filteredLotteries || userLikedLotteries, 3).map(list => ({
        data: list,
        key: `_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      }));
    }
    return [];
  }, [isCard, filteredLotteries, userLikedLotteries]);

  const getRowItemKey = item => `${item.key}`;
  const getRowItemCount = () => lotteryCardList.length;

  const handleCloseModal = () => {
    invoke(props, 'handleShowLotteryDetails', undefined);
    invoke(props, 'onClose');
  };
  const updateLotteryDetails = item => {
    setSelectedLottery(item);
  };
  const handleItemPress = index => {
    if (!LotteryDetails) {
      LotteryDetails = require('../LotteryDetails').default;
    }
    setShowLotteryDetails(true);
    setSelectedLottery((filteredLotteries || userLikedLotteries)[index]);
  };
  const onLotteryDetailsClose = () => {
    setShowLotteryDetails(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => (filteredLotteries || userLikedLotteries).length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={handleItemPress}
      listLength={(filteredLotteries || userLikedLotteries).length}
      showLotteryResult={true}
    />
  );
  const lotteryDetailsModal = showLotteryDetails && (
    <LotteryDetails
      updateLotteryDetails={updateLotteryDetails}
      onClose={onLotteryDetailsClose}
      item={selectedLottery}
    />
  );
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
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={profile[lang].myLikedLotteries}
            onLeftElementPress={handleCloseModal}
            rightElement={isCard ? 'view-list' : 'view-comfy'}
            onRightElementPress={changeViewStyle}
          />
          {lotteryResult && <LotteryResultModal />}
          {(!userLikedLotteries ||
            (userLikedLotteries && userLikedLotteries.length === 0)) &&
          loading
            ? loadingPopup
            : null}
          {userLikedLotteries && userLikedLotteries.length ? (
            <Filter lang={lang} onFilterChange={handleFilterChange} />
          ) : null}
          <VirtualizedList
            initialNumToRender={10}
            windowSize={2}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={0.0}
            removeClippedSubviews={true}
            refreshing={loading}
            onRefresh={fetchUserLikedLotteries}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={
              isCard ? lotteryCardList : filteredLotteries || userLikedLotteries
            }
            getItem={getItem}
            getItemCount={isCard ? getRowItemCount : getItemCount}
            contentContainerStyle={
              isCard && sharedStyles.homeLotteriesContainer
            }
            keyExtractor={isCard ? getRowItemKey : getKeyExtractor}
            renderItem={isCard ? renderCardListItemRow : renderItem}
            ListEmptyComponent={
              !loading ? (
                <View style={sharedStyles.emptySearchResultsView}>
                  <Text style={sharedStyles.emptySearchResultsText}>
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
};

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
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
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
