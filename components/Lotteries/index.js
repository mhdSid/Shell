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
  getUserJoinedLotteriesSelector,
} from './Selectors';
import invoke from 'lodash/invoke';
import {handleFetchUserJoinedLotteries} from '../../redux/Lotteries/FetchUserJoinedLotteries';
import {showLotteryDetails} from '../../redux/LotteryDetails/actions';
import ListItemCommon from '../Home/ListItem';

const Lotteries = props => {
  const {
    loggedIn,
    userJoinedLotteries,
    user
  } = props;
  const [loading, setLoading] = useState(false);
  const callback = () => {
    setLoading(false);
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => userJoinedLotteries.length;
  const getItemKey = item => item.id;
  const fetchLotteries = () => {
    setLoading(true);
    invoke(props, 'fetchUserJoinedLotteries', {
      userId: user.id,
      onSuccess: callback,
      onError: callback,
    });
  };

  const onItemPress = index => {
    invoke(props, 'showLotteryDetails', {
      ...userJoinedLotteries[index],
      // disableHeaderActions: true,
    });
  };
  const renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={onItemPress}
      listLength={userJoinedLotteries.length}
    />
  );
  useEffect(() => {
    if (loggedIn && user) {
      fetchLotteries();
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
        {(!userJoinedLotteries || !userJoinedLotteries.length) && !loading ? (
          <Text style={sharedStyles.uploadProgressModalText}>
            {lottteries.emptyLotteries}
          </Text>
        ) : null}
        {!loading && userJoinedLotteries && userJoinedLotteries.length > 0 ? (
          <VirtualizedList
            removeClippedSubviews={true}
            windowSize={2}
            initialNumToRender={2}
            refreshing={loading}
            onRefresh={fetchLotteries}
            showsVerticalScrollIndicator={false}
            data={userJoinedLotteries}
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
  userJoinedLotteries: PropTypes.any,
};

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
    userJoinedLotteries: getUserJoinedLotteriesSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserJoinedLotteries: payload =>
      dispatch(handleFetchUserJoinedLotteries(payload)),
      showLotteryDetails: payload => dispatch(showLotteryDetails(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lotteries);
