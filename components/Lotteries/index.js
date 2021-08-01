import React, {useEffect, useState} from 'react';
import {View, VirtualizedList, Text} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import NoAuth from '../NoAuth';
import isUndefined from 'lodash/isUndefined';
import {Loading, loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {Toolbar} from 'react-native-material-ui';
import {lottteries} from '../../Constants/Texts';
import {
  getLoggedInSelector,
  getUserSelector,
  getLotteriesSelector,
} from './Selectors';
import invoke from 'lodash/invoke';
import {handleFetchMyJoinedLotteries} from '../../redux/Lotteries/FetchLotteries';
import {showAdDetails} from '../../redux/AdDetails/actions';
import ListItemCommon from '../Home/ListItem';

const Lotteries = props => {
  const {
    loggedIn,
    lotteries,
    user,
    handleFetchLotteries: _handleFetchLotteries,
  } = props;
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
      userId: user.id,
      onSuccess: callback,
      onError: callback,
    });
  };

  const onItemPress = index => {
    invoke(props, 'showAdDetails', {
      ...lotteries[index],
      disableHeaderActions: true,
    });
  };
  const renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={onItemPress}
      listLength={lotteries.length}
    />
  );
  useEffect(() => {
    if (loggedIn && user) {
      setLoading(true);
      _handleFetchLotteries({
        onSuccess: callback,
        onError: callback,
        userId: user.id,
      });
    }
  }, []);

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
        {loading ? loadingPopup : null}
        {(!lotteries || !lotteries.length) && !loading ? (
          <Text style={sharedStyles.uploadProgressModalText}>
            {lottteries.emptyLotteries}
          </Text>
        ) : null}
        {!loading && lotteries && lotteries.length > 0 ? (
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
        ) : null}
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
    handleFetchLotteries: payload => dispatch(handleFetchMyJoinedLotteries(payload)),
    showAdDetails: payload => dispatch(showAdDetails(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lotteries);
