import React, {useEffect, useState} from 'react';
import {View, VirtualizedList, Text} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {LoadingComponent, loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {Toolbar} from 'react-native-material-ui';
import {
  chat as chatTexts,
  lottteries as lotteriesTexts,
} from '../../Constants/Texts';
import invoke from 'lodash/invoke';
import ListItemCommon from '../Home/ListItem';
import cancellableFetch from 'react-native-cancelable-fetch';
import ChatModal from './index';
import {getUserSelector} from '../UpdateUser/Selectors';
import {getChattableLotteriesSelector} from './Selectors';
import {handleFetchChattableLotteries} from '../../redux/Chat/FetchChattableLotteries';
import { isUndefined } from 'lodash';
import NoAuth from '../NoAuth';

const ChatList = props => {
  const {chattableLotteries, authUser} = props;
  const [loading, setLoading] = useState(true);
  const [cancelHttpTag] = useState(55);
  const [
    isShowChatCOnversationModal,
    setIsShowChatCOnversationModal,
  ] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState(null);

  const getItem = (data, index) => data[index];
  const getItemCount = () => chattableLotteries.length;
  const getItemKey = item => item.id;
  const onItemPress = index => {
    setSelectedLottery({
      isWinner:
        `${authUser.id}` === `${chattableLotteries[index].winnerUserId}`,
      isLotteryPoster:
        `${authUser.id}` === `${chattableLotteries[index].userId}`,
      authUserId: authUser.id,
      lotteryWinner: {
        id: `${chattableLotteries[index].winnerUserId}`,
      },
      lotteryPoster: {
        id: `${chattableLotteries[index].userId}`,
      },
      lottery: chattableLotteries[index],
    });
    setIsShowChatCOnversationModal(true);
  };
  const handleChatModalClose = () => {
    setIsShowChatCOnversationModal(false);
  };
  const renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={onItemPress}
      listLength={chattableLotteries.length}
      hideMoreActions={true}
      showLotteryResult={true}
      showReceivedTag={true}
      isReceived={item.isReceived}
      isShipped={item.isShipped}
      showShippedTag={true}
      isWinner={`${authUser.id}` === `${item.winnerUserId}`}
      isLotteryPoster={`${authUser.id}` === `${item.userId}`}
    />
  );
  const fetchChattableLotteriesCallback = () => {
    setLoading(false);
  };
  const fetchLotteries = () => {
    setLoading(true);
    invoke(props, 'fetchChattableLotteries', {
      userId: authUser.id,
      onSuccess: fetchChattableLotteriesCallback,
      onError: fetchChattableLotteriesCallback,
      cancelTag: cancelHttpTag,
    });
  };
  useEffect(() => {
    if (authUser) {
      fetchLotteries();
      return () => {
        cancellableFetch.abort(cancelHttpTag);
      };
    }
  }, [authUser]);

  if (isUndefined(authUser)) {
    return <LoadingComponent />;
  }

  if (!authUser) {
    return <NoAuth />;
  }

  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        centerElement={chatTexts.chat}
      />
      {isShowChatCOnversationModal ? (
        <ChatModal
          onClose={handleChatModalClose}
          isWinner={selectedLottery.isWinner}
          isLotteryPoster={selectedLottery.isLotteryPoster}
          lotteryWinner={selectedLottery.lotteryWinner}
          lotteryPoster={selectedLottery.lotteryPoster}
          authUserId={selectedLottery.authUserId}
          lottery={selectedLottery.lottery}
        />
      ) : null}
      {(!chattableLotteries ||
        (chattableLotteries && chattableLotteries.length === 0)) &&
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
        showsVerticalScrollIndicator={false}
        data={chattableLotteries}
        contentContainerStyle={sharedStyles.listViewContainer}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={getItemKey}
        renderItem={renderListItem}
        ListEmptyComponent={
          !loading ? (
            <View style={sharedStyles.homeEmptySearchResultsView}>
              <Text style={sharedStyles.emptySearchResultsText}>
                {lotteriesTexts.emptyLotteries}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

ChatList.propTypes = {
  chattableLotteries: PropTypes.array,
  authUser: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    chattableLotteries: getChattableLotteriesSelector(state),
    authUser: getUserSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChattableLotteries: payload =>
      dispatch(handleFetchChattableLotteries(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatList);
