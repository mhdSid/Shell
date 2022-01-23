import React, {useMemo, useState} from 'react';
import {View, VirtualizedList, Text, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import styles from './shipLotteries.style';
import {loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {BottomNavigation, Toolbar} from 'react-native-material-ui';
import {lottteries as lotteriesTexts} from '../../constants/Texts';
import invoke from 'lodash/invoke';
import Filter from '../Filter';
import ListItemCommon from '../Home/ListItem';
import cancellableFetch from 'react-native-cancelable-fetch';
import {shipLottery as shipLotteryTexts} from '../../constants/Texts';
import {getUserIdSelector} from '../Profile/Selectors';
import {Modal} from 'react-native';
import ShipLotteryInfoModal from './ShipLotteryInfoModal';
import {getUserCreatedWonLotteriesSelector} from './Selectors';
import {handleFetchUserCreatedWonLotteries} from '../../redux/ShipLottery/FetchUserCreatedWonLotteries';
import {showShipLotteryModal} from '../../redux/ShipLottery/actions';
import {getLangSelector} from '../Settings/Selectors';

let LotteryDetails = null;

const ShipLotteryModal = props => {
  const {userCreatedWonLotteries: lotteries, authUserId, lang} = props;
  const [loading, setLoading] = useState(true);
  const [filteredLotteries, setFilteredLotteries] = useState(null);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState();
  const [cancelHttpTag] = useState(20);
  const [activeView, setActiveView] = useState('shipped');
  const [isShowShipLotteryModal, setIsShowShipLotteryModal] = useState(false);
  const userCreatedWonLotteries = useMemo(() => {
    if (Array.isArray(lotteries) && lotteries.length) {
      return lotteries.filter(lottery =>
        activeView === 'shipped'
          ? lottery.isShipped === true
          : !lottery.isShipped,
      );
    }
  }, [lotteries, activeView]);

  const callback = () => {
    setLoading(false);
  };

  const getItem = (data, index) => data[index];
  const getItemCount = () =>
    (filteredLotteries || userCreatedWonLotteries || []).length;
  const getItemKey = item => item.id;
  const updateLotteryDetails = item => {
    setSelectedLottery(item);
  };
  const onLotteryDetailsClose = () => {
    setShowLotteryDetails(false);
  };
  const lotteryDetailsModal = showLotteryDetails && (
    <LotteryDetails
      updateLotteryDetails={updateLotteryDetails}
      onClose={onLotteryDetailsClose}
      item={selectedLottery}
    />
  );
  const onItemPress = index => {
    if (activeView === 'shipped') {
      if (!LotteryDetails) {
        LotteryDetails = require('../LotteryDetails').default;
      }
      setShowLotteryDetails(true);
      setSelectedLottery((filteredLotteries || userCreatedWonLotteries)[index]);
    } else {
      invoke(props, 'handleShowShipLotteryModal', {
        ...(filteredLotteries || userCreatedWonLotteries)[index],
      });
      setIsShowShipLotteryModal(true);
    }
  };
  const renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={onItemPress}
      listLength={(filteredLotteries || userCreatedWonLotteries || []).length}
      hideMoreActions={true}
      showLotteryResult={true}
      showReceivedTag={true}
      isReceived={item.isReceived}
      isShipped={item.isShipped}
      showShippedTag={true}
      isWinner={`${authUserId}` === `${item.winnerUserId}`}
      isLotteryPoster={`${authUserId}` === `${item.userId}`}
    />
  );
  const handleFilterChange = filterValue => {
    if (
      !filterValue ||
      !userCreatedWonLotteries ||
      userCreatedWonLotteries.length === 0
    ) {
      setFilteredLotteries(null);
      return;
    }
    if (
      filterValue &&
      Array.isArray(userCreatedWonLotteries) &&
      userCreatedWonLotteries.length
    ) {
      const filteredData = userCreatedWonLotteries.filter(
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
    invoke(props, 'fetchUserCreatedWonLotteries', {
      userId: authUserId,
      onSuccess: callback,
      onError: callback,
      cancelTag: cancelHttpTag,
    });
  };
  const handleShipLotteryModalClose = () => {
    setIsShowShipLotteryModal(false);
    invoke(props, 'handleShowShipLotteryModal', undefined);
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
      {lotteryDetailsModal}
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{
              container: styles.toolbarContainer,
            }}
            leftElement="arrow-back"
            centerElement={shipLotteryTexts[lang].shipLottery}
            onLeftElementPress={handleCloseModal}
          />
          {isShowShipLotteryModal ? (
            <ShipLotteryInfoModal onClose={handleShipLotteryModalClose} />
          ) : null}
          <BottomNavigation
            active={activeView}
            style={{
              container: styles.tabBarNavigationContainer,
            }}>
            <BottomNavigation.Action
              style={{
                container: styles.tabBarNavigationActionContainer,
                icon: {
                  display: 'none',
                },
                label: {
                  color: activeView === 'shipped' ? 'white' : '#dacdfa',
                  fontWeight: '700',
                  fontSize: 16,
                },
              }}
              label={shipLotteryTexts[lang].shippedLotteries}
              key="shipped"
              active={activeView === 'shipped'}
              onPress={handleSetActiveView('shipped')}
            />
            <BottomNavigation.Action
              style={{
                container: styles.tabBarNavigationActionContainer,
                icon: {
                  display: 'none',
                },
                label: {
                  color: activeView === 'notShipped' ? 'white' : '#dacdfa',
                  fontWeight: '700',
                  fontSize: 16,
                },
              }}
              key="notShipped"
              label={shipLotteryTexts[lang].notShippedLotteries}
              active={activeView === 'notShipped'}
              onPress={handleSetActiveView('notShipped')}
            />
          </BottomNavigation>
          {(!userCreatedWonLotteries ||
            (userCreatedWonLotteries &&
              userCreatedWonLotteries.length === 0)) &&
          loading
            ? loadingPopup
            : null}
          {userCreatedWonLotteries && userCreatedWonLotteries.length ? (
            <Filter lang={lang} onFilterChange={handleFilterChange} />
          ) : null}
          <VirtualizedList
            initialNumToRender={10}
            windowSize={2}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={0.0}
            removeClippedSubviews={true}
            refreshing={loading}
            onRefresh={onShowModal}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={filteredLotteries || userCreatedWonLotteries}
            getItem={getItem}
            getItemCount={getItemCount}
            keyExtractor={getItemKey}
            renderItem={renderListItem}
            ListEmptyComponent={
              !loading ? (
                <View style={styles.emptyListViewContainer}>
                  <Text style={styles.emptyListViewContainerText}>
                    {activeView === 'shipped'
                      ? shipLotteryTexts[lang].noShippedLotteries
                      : lotteriesTexts[lang].emptyLotteries}
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

ShipLotteryModal.propTypes = {
  userCreatedWonLotteries: PropTypes.any,
  authUserId: PropTypes.string,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    userCreatedWonLotteries: getUserCreatedWonLotteriesSelector(state),
    authUserId: getUserIdSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCreatedWonLotteries: payload =>
      dispatch(handleFetchUserCreatedWonLotteries(payload)),
    handleShowShipLotteryModal: payload =>
      dispatch(showShipLotteryModal(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipLotteryModal);
