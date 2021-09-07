import React, {useMemo, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {profile} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {getUserCreatedLotteriesSelector} from '../UserJoinedLotteries/Selectors';
import {getUserSelector} from '../Profile/Selectors';
import {handleFetchUserCreatedLotteries} from '../../redux/Lotteries/FetchUserCreatedLotteries';
import {Text} from 'react-native';
import {lottteries as lotteriesTexts} from '../../Constants/Texts';
import Filter from '../Filter';
import ListItemCommon from '../Home/ListItem';
import CardListItemRow from '../Home/CardListItemRow';
import {chunk} from 'lodash';
import {getIsCardSelector, getIsListSelector} from '../Home/Selectors';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import { showLotteryResult } from '../../redux/LotteryResult/actions';
import { getLotteryResultSelector } from '../LotteryResult/Selectors';
import LotteryResultModal from '../LotteryResult';

let LotteryDetails = null;

const UserCreatedLotteries = props => {
  const {user, userCreatedLotteries, isCard, isList, lotteryResult} = props;
  const [loading, setLoading] = useState(true);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState();
  const [filteredLotteries, setFilteredLotteries] = useState(null);

  const lotteryCardList = useMemo(() => {
    if (
      isCard &&
      Array.isArray(filteredLotteries || userCreatedLotteries) &&
      (filteredLotteries || userCreatedLotteries).length
    ) {
      return chunk(filteredLotteries || userCreatedLotteries, 3).map(list => ({
        data: list,
        key: `_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      }));
    }
    return [];
  }, [isCard, filteredLotteries, userCreatedLotteries]);

  const getRowItemKey = item => `${item.key}`;
  const getRowItemCount = () => (lotteryCardList || []).length;

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
    });
  };
  const handleItemPress = index => {
    if (!LotteryDetails) {
      LotteryDetails = require('../LotteryDetails').default;
    }
    setShowLotteryDetails(true);
    setSelectedLottery((filteredLotteries || userCreatedLotteries)[index]);
  };
  const onLotteryDetailsClose = () => {
    setShowLotteryDetails(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () =>
    (filteredLotteries || userCreatedLotteries || []).length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      showLotteryResult={true}
      onItemPress={handleItemPress}
      listLength={(filteredLotteries || userCreatedLotteries).length}
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
    <Modal
      animationType="slide"
      onShow={fetchMyLotteries}
      onRequestClose={handleCloseModal}>
      {lotteryDetailsModal}
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={profile.myCreatedLotteries}
            onLeftElementPress={handleCloseModal}
            rightElement={isCard ? 'view-list' : 'view-comfy'}
            onRightElementPress={changeViewStyle}
          />
          {lotteryResult && <LotteryResultModal />}
          <View style={sharedStyles.lotteriesContainer}>
            <Filter onFilterChange={handleFilterChange} />
            <VirtualizedList
              initialNumToRender={5}
              windowSize={2}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={0.0}
              removeClippedSubviews={true}
              refreshing={loading}
              onRefresh={fetchMyLotteries}
              ListEmptyComponent={
                <Text style={sharedStyles.uploadProgressModalText}>
                  {lotteriesTexts.emptyLotteries}
                </Text>
              }
              progressViewOffset={-100}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              data={
                isCard
                  ? lotteryCardList || []
                  : filteredLotteries || userCreatedLotteries || []
              }
              getItem={getItem}
              getItemCount={isCard ? getRowItemCount : getItemCount}
              contentContainerStyle={
                isCard && sharedStyles.homeLotteriesContainer
              }
              keyExtractor={isCard ? getRowItemKey : getKeyExtractor}
              renderItem={isCard ? renderCardListItemRow : renderItem}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

UserCreatedLotteries.propTypes = {
  user: PropTypes.object,
  userCreatedLotteries: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    userCreatedLotteries: getUserCreatedLotteriesSelector(state),
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
    lotteryResult: getLotteryResultSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCreatedLotteries: payload =>
      dispatch(handleFetchUserCreatedLotteries(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
    showLotteryResult: payload => dispatch(showLotteryResult(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCreatedLotteries);
