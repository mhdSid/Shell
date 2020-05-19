import React, {useState, useEffect} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, ListItem} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import AdDetails from '../AdDetails';
import {Loading} from '../Loading';
import {myyAds} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {handleFetchMyAds} from '../../redux/User/FetchMyAds';

const MyAds = props => {
  const {user, myAds} = props;
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [selectedAd, setSelectedAd] = useState();
  const [fetchId] = useState(1);

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const onModalDismiss = () => {
    invoke(props, 'onClose');
  };
  const callback = () => {
    setLoading(false);
  };
  const fetchMyAds = () => {
    setLoading(true);
    invoke(props, 'handleFetchMyAds', {
      userId: user.id,
      onSuccess: callback,
      onError: callback,
    });
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
          centerElement={myyAds.myAds}
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

const mapStateToProps = ({authReducer, userReducer}) => {
  return {
    user: authReducer.user,
    myAds: userReducer.myAds,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchMyAds: payload => dispatch(handleFetchMyAds(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MyAds);
