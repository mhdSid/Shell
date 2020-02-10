// import React from 'react';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {ping} from '../../services/auth';
import {loginAction, logoutAction} from '../../redux/Auth/actions';

const Pinger = props => {
  // CookieManager.clearAll().then(res => {
  //   console.log('CookieManager.clearAll =>', res);
  // });
  ping().then(
    data => {
      const {error, user: authUser, country} = data;
      console.log('pingpingpingpingpingpingpingping: ', data);
      if (error) {
        const {message} = error;
        invoke(props, 'logout', {country, loggedIn: false, user: false});
        alert(message);
      } else {
        invoke(props, 'login', {
          loggedIn: true,
          user: authUser,
          sessionID: authUser.sessionID,
          country,
        });
      }
    },
    () => {
      invoke(props, 'logout', {loggedIn: false, user: false});
    },
  );

  return null;
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Pinger);
