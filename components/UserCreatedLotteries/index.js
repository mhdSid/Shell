import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import LotteryDetails from '../LotteryDetails';
import {loadingPopup} from '../Loading';
import {myyLotteries} from '../../Constants/Texts';
import {connect} from 'react-redux';
import ListItemCommon from '../Home/ListItem';
import {getUserCreatedLotteriesSelector} from '../Lotteries/Selectors';
import {getUserSelector} from '../Profile/Selectors';
import {handleFetchUserCreatedLotteries} from '../../redux/Lotteries/FetchUserCreatedLotteries';

const UserCreatedLotteries = props => {
  const {user, userCreatedLotteries} = props;
  const [loading, setLoading] = useState(false);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState();

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
    setShowLotteryDetails(true);
    setSelectedLottery(userCreatedLotteries[index]);
  };
  const onLotteryDetailsClose = () => {
    setShowLotteryDetails(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => userCreatedLotteries.length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={handleItemPress}
      listLength={userCreatedLotteries.length}
    />
  );
  const lotteryDetailsModal = showLotteryDetails && (
    <LotteryDetails
      updateLotteryDetails={updateLotteryDetails}
      onClose={onLotteryDetailsClose}
      item={selectedLottery}
    />
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
            centerElement={myyLotteries.myLotteries}
            onLeftElementPress={handleCloseModal}
          />
          {loading ? loadingPopup : null}
          {userCreatedLotteries && userCreatedLotteries.length > 0 ? (
            <VirtualizedList
              initialNumToRender={10}
              windowSize={1}
              removeClippedSubviews={true}
              refreshing={loading}
              onRefresh={fetchMyLotteries}
              showsVerticalScrollIndicator={false}
              data={userCreatedLotteries}
              getItem={getItem}
              getItemCount={getItemCount}
              keyExtractor={getKeyExtractor}
              renderItem={renderItem}
            />
          ) : null}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCreatedLotteries: payload =>
      dispatch(handleFetchUserCreatedLotteries(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCreatedLotteries);
