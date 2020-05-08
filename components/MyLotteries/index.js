import React, {useState, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, VirtualizedList, Alert} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, ListItem} from 'react-native-material-ui';
import PropTypes from 'prop-types';

import {getMyLotteries} from '../../services/ads';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import AdDetails from '../AdDetails';
import {Loading} from '../Loading';

const MyLotteries = props => {
  const {user} = props;

  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showLotteryDetails, setShowLotteryDetails] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState();
  const [fetchId] = useState(1);
  const [myLotteries, setMyLotteries] = useState();

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const onModalDismiss = () => {
    invoke(props, 'onClose');
  };

  const handleError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    setLoading(false);

    if (message) {
      Alert.alert(message);
    }
    return;
  };

  const onGetMyLotteriesSuccess = data => {
    const {myLotteries: _myLotteries, error} = data;
    if (error) {
      return handleError(error);
    }
    setMyLotteries(_myLotteries || []);
  };

  const fetchMyLotteries = () => {
    getMyLotteries({userId: user.id}).then(
      onGetMyLotteriesSuccess,
      handleError,
    );
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
  }, [fetchId]);

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
          centerElement="My Lotteries"
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
                      cache="force-cache"
                      source={{
                        uri: item.images[0],
                        cache: 'force-cache',
                        // headers: {
                        //   Pragma: 'only-if-cached',
                        //   'Cache-Control': 'only-if-cached',
                        // },
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

export default MyLotteries;
