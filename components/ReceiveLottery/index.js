import React, {useMemo, useState} from 'react';
import {View, VirtualizedList, Text, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {BottomNavigation, Toolbar} from 'react-native-material-ui';
import {lottteries as lotteriesTexts} from '../../Constants/Texts';
import invoke from 'lodash/invoke';
import Filter from '../Filter';
import ListItemCommon from '../Home/ListItem';
import cancellableFetch from 'react-native-cancelable-fetch';
import {receiveLottery as receiveLotteryTexts} from '../../Constants/Texts';
import {getUserIdSelector} from '../Profile/Selectors';
import {Modal} from 'react-native';
import {showReceiveLotteryModal} from '../../redux/ReceiveLottery/actions';
import ReceiveLotteryInfoModal from './ReceiveLotteryInfoModal';
import {getUserWonLotteriesSelector} from './Selectors';
import {handleFetchUserWonLotteries} from '../../redux/ReceiveLottery/FetchUserWonLotteries';

const ReceiveLotteryModal = props => {
  const {userWonLotteries: lotteries, authUserId} = props;
  const [loading, setLoading] = useState(true);
  const [filteredLotteries, setFilteredLotteries] = useState(null);
  const [cancelHttpTag] = useState(20);
  const [activeView, setActiveView] = useState('received');
  const [isShowReceiveLotteryModal, setIsShowReceiveLotteryModal] = useState(
    false,
  );
  const userWonLotteries = useMemo(() => {
    if (Array.isArray(lotteries) && lotteries.length) {
      return lotteries.filter(lottery =>
        activeView === 'received'
          ? lottery.isReceived === true
          : !lottery.isReceived,
      );
    }
  }, [lotteries, activeView]);

  const callback = () => {
    setLoading(false);
  };

  const getItem = (data, index) => data[index];
  const getItemCount = () => (filteredLotteries || userWonLotteries).length;
  const getItemKey = item => item.id;
  const onItemPress = index => {
    invoke(props, 'handleShowReceiveLotteryModal', {
      ...(filteredLotteries || userWonLotteries)[index],
    });
    setIsShowReceiveLotteryModal(true);
  };
  const renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={onItemPress}
      listLength={(filteredLotteries || userWonLotteries).length}
      hideMoreActions={true}
      showLotteryResult={true}
      showReceivedTag={true}
      showShippedTag={true}
      isReceived={item.isReceived}
      isShipped={item.isShipped}
      isWinner={`${authUserId}` === `${item.winnerUserId}`}
      isLotteryPoster={`${authUserId}` === `${item.userId}`}
    />
  );
  const handleFilterChange = filterValue => {
    if (!filterValue || !userWonLotteries || userWonLotteries.length === 0) {
      setFilteredLotteries(null);
      return;
    }
    if (
      filterValue &&
      Array.isArray(userWonLotteries) &&
      userWonLotteries.length
    ) {
      const filteredData = userWonLotteries.filter(
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
  const onShowModal = () => {
    setLoading(true);
    invoke(props, 'fetchUserWonLotteries', {
      userId: authUserId,
      onSuccess: callback,
      onError: callback,
      cancelTag: cancelHttpTag,
    });
  };
  const handleReceiveLotteryModalClose = () => {
    setIsShowReceiveLotteryModal(false);
    invoke(props, 'handleShowReceiveLotteryModal', undefined);
    // onShowModal();
  };
  const handleCloseModal = () => {
    invoke(props, 'onClose');
    cancellableFetch.abort(cancelHttpTag);
  };
  const handleSetActiveView = type => {
    return () => {
      setActiveView(type);
    };
  };

  return (
    <Modal
      animationType="slide"
      onShow={onShowModal}
      onDismiss={handleCloseModal}
      onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{
              container: [
                sharedStyles.toolbarContainer,
                sharedStyles.toolbarContainerPadding,
              ],
            }}
            leftElement="arrow-back"
            centerElement={receiveLotteryTexts.receiveLottery}
            onLeftElementPress={handleCloseModal}
          />
          {isShowReceiveLotteryModal ? (
            <ReceiveLotteryInfoModal onClose={handleReceiveLotteryModalClose} />
          ) : null}
          <BottomNavigation
            active={activeView}
            style={{
              container: sharedStyles.bottomNavigationContainer,
            }}>
            <BottomNavigation.Action
              style={{
                container: sharedStyles.receiveLotteryTabNavigationContainer,
                icon: {
                  display: 'none',
                },
                label: {
                  color: activeView === 'received' ? 'white' : '#dacdfa',
                  fontWeight: '700',
                  fontSize: 16,
                },
              }}
              label={receiveLotteryTexts.receivedLotteries}
              key="received"
              active={activeView === 'received'}
              onPress={handleSetActiveView('received')}
            />
            <BottomNavigation.Action
              style={{
                container: sharedStyles.receiveLotteryTabNavigationContainer,
                icon: {
                  display: 'none',
                },
                label: {
                  color: activeView === 'notReceived' ? 'white' : '#dacdfa',
                  fontWeight: '700',
                  fontSize: 16,
                },
              }}
              key="notReceived"
              label={receiveLotteryTexts.notReceivedLotteries}
              active={activeView === 'notReceived'}
              onPress={handleSetActiveView('notReceived')}
            />
          </BottomNavigation>
          {loading && loadingPopup}
          <View style={sharedStyles.lotteriesContainer}>
            {Array.isArray(filteredLotteries || userWonLotteries) &&
            (filteredLotteries || userWonLotteries).length ? (
              <>
                <Filter onFilterChange={handleFilterChange} />
                <VirtualizedList
                  initialNumToRender={10}
                  windowSize={2}
                  maxToRenderPerBatch={10}
                  updateCellsBatchingPeriod={0.0}
                  removeClippedSubviews={true}
                  refreshing={loading}
                  onRefresh={onShowModal}
                  // onEndReachedThreshold={0.3}
                  // onEndReached={onShowModal}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  data={filteredLotteries || userWonLotteries}
                  getItem={getItem}
                  getItemCount={getItemCount}
                  keyExtractor={getItemKey}
                  renderItem={renderListItem}
                />
              </>
            ) : !loading ? (
              <View style={sharedStyles.emptySearchResultsView}>
                <Text style={sharedStyles.emptySearchResultsText}>
                  {activeView === 'received'
                    ? receiveLotteryTexts.noReceivedLotteries
                    : lotteriesTexts.emptyLotteries}
                </Text>
              </View>
            ) : (
              loadingPopup
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ReceiveLotteryModal.propTypes = {
  userWonLotteries: PropTypes.any,
  authUserId: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    userWonLotteries: getUserWonLotteriesSelector(state),
    authUserId: getUserIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserWonLotteries: payload =>
      dispatch(handleFetchUserWonLotteries(payload)),
    handleShowReceiveLotteryModal: payload =>
      dispatch(showReceiveLotteryModal(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceiveLotteryModal);
