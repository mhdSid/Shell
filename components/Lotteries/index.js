import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, VirtualizedList} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import NoAuth from '../NoAuth';
import isUndefined from 'lodash/isUndefined';
import {Loading, loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {ListItem, Toolbar} from 'react-native-material-ui';
import {lottteries} from '../../Constants/Texts';
import {
  getLoggedInSelector,
  getUserSelector,
  getLotteriesSelector,
} from './Selectors';
import invoke from 'lodash/invoke';
import FastImage from 'react-native-fast-image';
import {handleFetchLotteries} from '../../redux/Lotteries/FetchLotteries';
import {showAdDetails} from '../../redux/AdDetails/actions';

const Lotteries = props => {
  const {loggedIn, lotteries, user} = props;
  const [loading, setLoading] = useState(false);
  const callback = () => {
    setLoading(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => lotteries.length;
  const getItemKey = item => item.id;
  const fetchLotteries = () => {
    setLoading(true);
    invoke(props, 'handleFetchLotteries', {
      onSuccess: callback,
      onError: callback,
    });
  };
  const handleShowAdDetails = item => {
    return () => {
      invoke(props, 'showAdDetails', item);
    };
  };
  const renderListItem = ({item, index}) => (
    <View
      style={index === lotteries.length - 1 && sharedStyles.homeListItemMargin}>
      <ListItem
        divider
        leftElement={
          item.images && item.images[0] ? (
            <FastImage
              style={sharedStyles.homeListItemImage}
              source={{
                uri: item.images[0],
                priority: FastImage.priority.high,
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
        onPress={handleShowAdDetails(item)}
      />
    </View>
  );
  useEffect(() => {
    if (loggedIn && user) {
      fetchLotteries();
    }
  }, [loggedIn, user]);
  if (isUndefined(loggedIn) && isUndefined(user)) {
    return Loading;
  }

  if (!loggedIn && !user) {
    return <NoAuth />;
  }

  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        centerElement={lottteries.lotteries}
      />
      <View style={sharedStyles.lotteriesContainer}>
        {loading && loadingPopup}
        {/* {!lotteries && (
          <Text style={sharedStyles.appText}>{lottteries.emptyLotteries}</Text>
        )} */}
        {lotteries && lotteries.length > 0 && (
          <VirtualizedList
            removeClippedSubviews={true}
            windowSize={2}
            initialNumToRender={2}
            refreshing={loading}
            onRefresh={fetchLotteries}
            showsVerticalScrollIndicator={false}
            data={lotteries}
            getItem={getItem}
            getItemCount={getItemCount}
            keyExtractor={getItemKey}
            renderItem={renderListItem}
          />
        )}
      </View>
    </View>
  );
};

Lotteries.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.any,
  lotteries: PropTypes.any,
};

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
    lotteries: getLotteriesSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchLotteries: payload => dispatch(handleFetchLotteries(payload)),
    showAdDetails: payload => dispatch(showAdDetails(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lotteries);
