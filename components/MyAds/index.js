import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, VirtualizedList} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, ListItem} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import AdDetails from '../AdDetails';
import {Loading} from '../Loading';
import {myyAds} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {handleFetchMyAds} from '../../redux/User/FetchMyAds';
import {getUserSelector, getMyAdsSelector} from './Selectors';

const MyAds = props => {
  const {user, myAds} = props;
  const [loading, setLoading] = useState(false);
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [selectedAd, setSelectedAd] = useState();

  const handleCloseModal = () => {
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
  const updateAdDetails = item => {
    setSelectedAd(item);
  };
  const onAdDetailsClose = () => {
    setShowAdDetails(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => myAds.length;
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
  const adDetailsModal = showAdDetails && (
    <AdDetails
      updateAdDetails={updateAdDetails}
      onClose={onAdDetailsClose}
      item={selectedAd}
    />
  );

  return (
    <Modal animationType="slide" onShow={fetchMyAds}>
      <SafeAreaView style={sharedStyles.container}>
        {adDetailsModal}
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          centerElement={myyAds.myAds}
          onLeftElementPress={handleCloseModal}
        />
        {loading && Loading}
        {myAds && myAds.length > 0 && (
          <VirtualizedList
            refreshing={loading}
            onRefresh={fetchMyAds}
            showsVerticalScrollIndicator={false}
            data={myAds}
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

MyAds.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    myAds: getMyAdsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchMyAds: payload => dispatch(handleFetchMyAds(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAds);
