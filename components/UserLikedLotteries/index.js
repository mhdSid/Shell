import React, {useEffect, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {profile} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {getUserLikedLotteriesSelector} from '../UserJoinedLotteries/Selectors';
import {getUserIdSelector, getUserSelector} from '../Profile/Selectors';
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
import {handleLikeLottery} from '../../redux/Lotteries/HandleLikeLottery';
import {handleDislikeLottery} from '../../redux/Lotteries/HandleDislikeLottery';
import {setHomeViewStyle} from '../../redux/Settings/actions';

let LotteryDetails = null;

const UserLikedLotteries = props => {
  const {
    user,
    userLikedLotteries,
    lotteryDetails,
    isCard,
    isList,
    authUserId,
  } = props;
  const [loading, setLoading] = useState(true);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState(null);
  const [filteredLotteries, setFilteredLotteries] = useState(null);
  const [lotteryCardList, setLotteryCardList] = useState([]);

  const callback = () => {
    setLoading(false);
  };
  const fetchUserLikedLotteries = () => {
    setLoading(true);
    invoke(props, 'fetchUserLikedLotteries', {
      onSuccess: callback,
      onError: callback,
      userId: user.id,
    });
  };

  useEffect(() => {
    fetchUserLikedLotteries();
  }, [lotteryDetails, loggedIn, user]);

  useEffect(() => {
    if (isCard) {
      let lotteryRowCardList = null;
      if (
        Array.isArray(filteredLotteries || userLikedLotteries) &&
        (filteredLotteries || userLikedLotteries).length
      ) {
        lotteryRowCardList = chunk(
          filteredLotteries || userLikedLotteries,
          3,
        ).map(list => ({
          data: list,
          key: `_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
        }));
      }
      setLotteryCardList(lotteryRowCardList);
    }
  }, [filteredLotteries, isCard, userLikedLotteries]);

  const getRowItemKey = item => `${item.key}`;
  const getRowItemCount = () => (lotteryCardList || []).length;

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
  const getItemCount = () =>
    (filteredLotteries || userLikedLotteries || []).length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={handleItemPress}
      listLength={(filteredLotteries || userLikedLotteries).length}
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
  const likeLottery = lotteryId => {
    invoke(props, 'likeLottery', {
      userId: authUserId,
      lotteryId,
      showLotteryDetails: false,
    });
  };
  const dislikeLottery = lotteryId => {
    invoke(props, 'dislikeLottery', {
      userId: authUserId,
      lotteryId,
      showLotteryDetails: false,
    });
  };
  const handleCardItemPress = item => {
    invoke(props, 'showLotteryDetails', item);
  };
  const renderCardListItemRow = ({item}) => (
    <CardListItemRow
      authUserId={authUserId}
      handleLikeLottery={likeLottery}
      handleDislikeLottery={dislikeLottery}
      data={item}
      onItemPress={handleCardItemPress}
    />
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
            centerElement={profile.myLikedLotteries}
            onLeftElementPress={handleCloseModal}
            rightElement={isCard ? 'view-list' : 'view-comfy'}
            onRightElementPress={changeViewStyle}
          />
          <View style={sharedStyles.lotteriesContainer}>
            <Filter onFilterChange={handleFilterChange} />
            {isCard ? (
              <VirtualizedList
                initialNumToRender={10}
                windowSize={10}
                removeClippedSubviews={true}
                refreshing={loading}
                onRefresh={fetchUserLikedLotteries}
                ListEmptyComponent={
                  <Text style={sharedStyles.uploadProgressModalText}>
                    {lotteriesTexts.emptyLotteries}
                  </Text>
                }
                progressViewOffset={-100}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={lotteryCardList || []}
                getItem={getItem}
                getItemCount={getRowItemCount}
                contentContainerStyle={sharedStyles.homeLotteriesContainer}
                keyExtractor={getRowItemKey}
                renderItem={renderCardListItemRow}
              />
            ) : null}
            {isList ? (
              <VirtualizedList
                ListEmptyComponent={
                  <Text style={sharedStyles.uploadProgressModalText}>
                    {lotteriesTexts.emptyLotteries}
                  </Text>
                }
                initialNumToRender={10}
                windowSize={1}
                removeClippedSubviews={true}
                refreshing={loading}
                onRefresh={fetchUserLikedLotteries}
                showsVerticalScrollIndicator={false}
                data={filteredLotteries || userLikedLotteries || []}
                getItem={getItem}
                getItemCount={getItemCount}
                keyExtractor={getKeyExtractor}
                renderItem={renderItem}
              />
            ) : null}
          </View>
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
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    lotteryDetails: getLotteryDetailsSelector(state),
    userLikedLotteries: getUserLikedLotteriesSelector(state),
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
    authUserId: getUserIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserLikedLotteries: payload =>
      dispatch(handleFetchUserLikedLotteries(payload)),
    handleShowLotteryDetails: payload =>
      dispatch(handleShowLotteryDetails(payload)),
    likeLottery: payload => dispatch(handleLikeLottery(payload)),
    dislikeLottery: payload => dispatch(handleDislikeLottery(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLikedLotteries);
