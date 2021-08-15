import React, {useEffect, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {lottteries, profile} from '../../Constants/Texts';
import {connect} from 'react-redux';
import ListItemCommon from '../Home/ListItem';
import {getUserLikedLotteriesSelector} from '../UserJoinedLotteries/Selectors';
import {getUserSelector} from '../Profile/Selectors';
import {Text} from 'react-native';
import {handleFetchUserLikedLotteries} from '../../redux/Lotteries/FetchUserLikedLotteries';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import {showLotteryDetails as handleShowLotteryDetails} from '../../redux/LotteryDetails/actions';

let LotteryDetails = null;

const UserLikedLotteries = props => {
  const {user, userLikedLotteries, lotteryDetails} = props;
  const [loading, setLoading] = useState(true);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState(null);

  const handleCloseModal = () => {
    invoke(props, 'handleShowLotteryDetails', undefined);
    invoke(props, 'onClose');
  };
  const callback = () => {
    setLoading(false);
  };
  const updateLotteryDetails = item => {
    setSelectedLottery(item);
  };
  const fetchUserLikedLotteries = () => {
    setLoading(true);
    invoke(props, 'fetchUserLikedLotteries', {
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
    setSelectedLottery(userLikedLotteries[index]);
  };
  const onLotteryDetailsClose = () => {
    setShowLotteryDetails(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => userLikedLotteries.length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={handleItemPress}
      listLength={userLikedLotteries.length}
    />
  );
  const lotteryDetailsModal = showLotteryDetails && (
    <LotteryDetails
      updateLotteryDetails={updateLotteryDetails}
      onClose={onLotteryDetailsClose}
      item={selectedLottery}
    />
  );
  useEffect(() => {
    console.log('use effect');
    fetchUserLikedLotteries();
  }, [lotteryDetails]);

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
          />
          <View style={sharedStyles.lotteriesContainer}>
            {loading ? loadingPopup : null}
            {(!userLikedLotteries || !userLikedLotteries.length) && !loading ? (
              <Text style={sharedStyles.uploadProgressModalText}>
                {lottteries.emptyLotteries}
              </Text>
            ) : null}
            {!loading && userLikedLotteries && userLikedLotteries.length ? (
              <VirtualizedList
                initialNumToRender={10}
                windowSize={1}
                removeClippedSubviews={true}
                refreshing={loading}
                onRefresh={fetchUserLikedLotteries}
                showsVerticalScrollIndicator={false}
                data={userLikedLotteries}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserLikedLotteries: payload =>
      dispatch(handleFetchUserLikedLotteries(payload)),
    handleShowLotteryDetails: payload =>
      dispatch(handleShowLotteryDetails(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLikedLotteries);
