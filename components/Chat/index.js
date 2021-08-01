import React, {useEffect, useState} from 'react';
import {View, VirtualizedList, Text} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import NoAuth from '../NoAuth';
import isUndefined from 'lodash/isUndefined';
import {Loading, loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {Toolbar} from 'react-native-material-ui';
import {chat, lottteries} from '../../Constants/Texts';
import invoke from 'lodash/invoke';
import {handleFetchLotteries} from '../../redux/Lotteries/FetchLotteries';
import {showAdDetails} from '../../redux/AdDetails/actions';
import ListItemCommon from '../Home/ListItem';

const Chat = props => {
  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        centerElement={chat.chat}
      />
      <View style={sharedStyles.lotteriesContainer}>
        {/* {loading ? loadingPopup : null} */}
        {/* {(!lotteries || !lotteries.length) && !loading ? (
          <Text style={[sharedStyles.label, sharedStyles.noAuthLabel]}>
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
        ) : null} */}
      </View>
    </View>
  );
};

Chat.propTypes = {};

const mapStateToProps = state => {
  return {
    // loggedIn: getLoggedInSelector(state),
    // user: getUserSelector(state),
    // lotteries: getLotteriesSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
