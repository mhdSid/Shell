import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import NoAuth from '../NoAuth';
import isUndefined from 'lodash/isUndefined';
import Loading from '../Loading';
// import {Toolbar} from 'react-native-material-ui';

const Lotteries = props => {
  const {loggedIn: _loggedIn, user: authUser} = props;

  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    setLoggedIn(_loggedIn);
    setUser(authUser);
  }, [_loggedIn, authUser]);

  if (isUndefined(_loggedIn) && isUndefined(user)) {
    return <Loading />;
  }
  if (!loggedIn && !user) {
    return <NoAuth />;
  }
  return (
    <View style={sharedStyles.innerContainer}>
      <Text>Lotteries</Text>
    </View>
  );
};

const mapStateToProps = ({authReducer}) => {
  return {
    loggedIn: authReducer.loggedIn,
    user: authReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Lotteries);
