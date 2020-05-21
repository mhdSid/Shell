import React, {useState} from 'react';
import {Text, View} from 'react-native';
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

const Lotteries = props => {
  const {loggedIn, user, lotteries} = props;
  const [loading] = useState(false);

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
      <View style={sharedStyles.innerContainer}>
        {loading && loadingPopup}
        {!lotteries && (
          <Text style={sharedStyles.appText}>{lottteries.emptyLotteries}</Text>
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

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lotteries);
