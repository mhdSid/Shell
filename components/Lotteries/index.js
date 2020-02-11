import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import NoAuth from '../NoAuth';
import isUndefined from 'lodash/isUndefined';
import {LoadingComponent} from '../Loading';
import PropTypes from 'prop-types';

const Lotteries = props => {
  const {loggedIn: _loggedIn, user: authUser, lotteries} = props;

  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    setLoggedIn(_loggedIn);
    setUser(authUser);
  }, [_loggedIn, authUser]);

  if (isUndefined(_loggedIn) && isUndefined(user)) {
    return <LoadingComponent />;
  }

  if (!loggedIn && !user) {
    return <NoAuth />;
  }

  return (
    <View style={sharedStyles.innerContainer}>
      <Text>{!lotteries && 'No Lotteries available'}</Text>
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
