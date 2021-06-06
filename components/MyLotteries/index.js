import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, ListItem} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import AdDetails from '../AdDetails';
import {Loading} from '../Loading';
import {myyLotteries} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {handleFetchMyLotteries} from '../../redux/User/FetchMyLotteries';
import {getUserSelector, getMyLotteriesSelector} from './Selectors';
import FastImage from 'react-native-fast-image';

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
  const handleItemPress = item => {
    return () => {
      setShowLotteryDetails(true);
      setSelectedLottery(item);
    };
  };
  const onAdDetailsClose = () => {
    setShowLotteryDetails(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => myLotteries.length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item}) => (
    <ListItem
      divider
      leftElement={
        item.images && item.images[0] ? (
          <FastImage
            style={sharedStyles.homeListItemImage}
            source={{
              uri: item.images[0],
              priority: FastImage.priority.low,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : null
      }
      centerElement={{
        primaryText: item.name,
        secondaryText: item.category,
        tertiaryText: `${item.currency} ${item.price}`,
      }}
      onPress={handleItemPress(item)}
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
    <Modal animationType="slide" onShow={fetchMyLotteries}>
      {adDetailsModal}
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          centerElement={myyLotteries.myLotteries}
          onLeftElementPress={handleCloseModal}
        />
        {loading && Loading}
        {myLotteries && myLotteries.length > 0 && (
          <VirtualizedList
            refreshing={loading}
            onRefresh={fetchMyLotteries}
            showsVerticalScrollIndicator={false}
            data={myLotteries}
            getItem={getItem}
            getItemCount={getItemCount}
            keyExtractor={getKeyExtractor}
            renderItem={renderItem}
          />
        )}
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
      dispatch(handleFetchMyLotteries(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyLotteries);
