import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import NoAuth from '../NoAuth';
import isUndefined from 'lodash/isUndefined';
import {Loading, loadingPopup} from '../Loading';
import PropTypes from 'prop-types';
import {Toolbar} from 'react-native-material-ui';

const Lotteries = props => {
  const {loggedIn: _loggedIn, user: authUser, lotteries} = props;

  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [user, setUser] = useState(authUser);
  const [loading] = useState(false);

  useEffect(() => {
    setLoggedIn(_loggedIn);
    setUser(authUser);
  }, [_loggedIn, authUser]);

  if (isUndefined(_loggedIn) && isUndefined(user)) {
    return Loading;
  }

  if (!loggedIn && !user) {
    return <NoAuth />;
  }

  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        centerElement="Lotteries"
      />

      <View style={sharedStyles.innerContainer}>
        {loading && loadingPopup}

        <Text>{!lotteries && 'No Lotteries available'}</Text>
      </View>
    </View>
  );
};

Lotteries.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.any,
  lotteries: PropTypes.any,
};

const mapStateToProps = ({authReducer, lotteriesReducer}) => {
  return {
    loggedIn: authReducer.loggedIn,
    user: authReducer.user,
    lotteries: lotteriesReducer.lotteries,
  };
};

const mapDispatchToProps = () => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Lotteries);
