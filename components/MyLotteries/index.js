import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import AdDetails from '../AdDetails';
import {loadingPopup} from '../Loading';
import {myyLotteries} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {handleFetchMyCreatedLotteries} from '../../redux/User/FetchMyLotteries';
import {getUserSelector, getMyLotteriesSelector} from './Selectors';
import ListItemCommon from '../Home/ListItem';

const MyLotteries = props => {
  const {user, myLotteries} = props;
  const [loading, setLoading] = useState(false);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState();

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const callback = () => {
    setLoading(false);
  };
  const updateAdDetails = item => {
    setSelectedLottery(item);
  };
  const fetchMyLotteries = () => {
    setLoading(true);
    invoke(props, 'handleFetchMyLotteries', {
      onSuccess: callback,
      onError: callback,
      userId: user.id,
    });
  };
  const handleItemPress = index => {
    setShowLotteryDetails(true);
    setSelectedLottery(myLotteries[index]);
  };
  const onAdDetailsClose = () => {
    setShowLotteryDetails(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => myLotteries.length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={handleItemPress}
      listLength={myLotteries.length}
    />
  );
  const adDetailsModal = showLotteryDetails && (
    <AdDetails
      updateAdDetails={updateAdDetails}
      onClose={onAdDetailsClose}
      item={selectedLottery}
    />
  );
  return (
    <Modal
      animationType="slide"
      onShow={fetchMyLotteries}
      onRequestClose={handleCloseModal}>
      {adDetailsModal}
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
          {myLotteries && myLotteries.length > 0 ? (
            <VirtualizedList
              initialNumToRender={10}
              windowSize={1}
              removeClippedSubviews={true}
              refreshing={loading}
              onRefresh={fetchMyLotteries}
              showsVerticalScrollIndicator={false}
              data={myLotteries}
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

MyLotteries.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    myLotteries: getMyLotteriesSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchMyLotteries: payload =>
      dispatch(handleFetchMyCreatedLotteries(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyLotteries);
