import React, {useState, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, VirtualizedList, Alert} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, ListItem} from 'react-native-material-ui';
import PropTypes from 'prop-types';

import {getMyAds} from '../../services/ads';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import AdDetails from '../AdDetails';
import {Loading} from '../Loading';

const MyAds = props => {
  const {user} = props;
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [selectedAd, setSelectedAd] = useState();
  const [fetchId] = useState(1);
  const [myAds, setMyAds] = useState();

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
  const onGetMyAdsSuccess = data => {
    const {myAds: _myAds, error} = data;
    if (error) {
      return handleError(error);
    }
    setMyAds(_myAds || []);
    setLoading(false);
  };
  const fetchMyAds = () => {
    setLoading(true);
    getMyAds({userId: user.id}).then(onGetMyAdsSuccess, handleError);
  };
  const handleItemPress = item => {
    return () => {
      setShowAdDetails(true);
      setSelectedAd(item);
    };
  };
  const onAdDetailsClose = () => {
    setShowAdDetails(false);
  };

  useEffect(() => {
    fetchMyAds();
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
          centerElement="My Ads"
          onLeftElementPress={handleCloseModal}
        />
        {loading && Loading}
        {myAds && (
          <VirtualizedList
            refreshing={loading}
            onRefresh={fetchMyAds}
            showsVerticalScrollIndicator={false}
            data={myAds}
            getItem={(data, index) => data[index]}
            getItemCount={() => myAds.length}
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
                        cache: 'force-cache',
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
        {showAdDetails && (
          <AdDetails onClose={onAdDetailsClose} item={selectedAd} />
        )}
      </SafeAreaView>
    </Modal>
  );
};

MyAds.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
};

export default MyAds;
