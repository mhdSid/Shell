import React, {useState, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, ListItem} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import AdDetails from '../AdDetails';
import {Loading} from '../Loading';
import {myyLotteries} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {handleFetchMyLotteries} from '../../redux/User/FetchMyLotteries';
import {getUserSelector, getMyLotteriesSelector} from './Selectors';

const MyLotteries = props => {
  const {user, myLotteries} = props;
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState();

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const onModalDismiss = () => {
    invoke(props, 'onClose');
  };
  const callback = () => {
    setLoading(false);
  };
  const fetchMyLotteries = () => {
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

  useEffect(() => {
    fetchMyLotteries();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onDismiss={onModalDismiss}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          centerElement={myyLotteries.myLotteries}
          onLeftElementPress={handleCloseModal}
        />
        {loading && Loading}
        {myLotteries && (
          <VirtualizedList
            refreshing={loading}
            onRefresh={fetchMyLotteries}
            showsVerticalScrollIndicator={false}
            data={myLotteries}
            getItem={(data, index) => data[index]}
            getItemCount={() => myLotteries.length}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ListItem
                divider
                leftElement={
                  item.images && item.images[0] ? (
                    <CachedImage
                      style={sharedStyles.homeListItemImage}
                      source={{
                        uri: item.images[0],
                      }}
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
            )}
          />
        )}
        {showLotteryDetails && (
          <AdDetails onClose={onAdDetailsClose} item={selectedLottery} />
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
