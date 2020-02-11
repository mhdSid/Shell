import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {ping} from '../../services/auth';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import {Alert} from 'react-native';

const Pinger = props => {
  const onPingSuccess = data => {
    const {error, user: authUser, country} = data;
    if (error) {
      const {message} = error;
      invoke(props, 'logout', {country, loggedIn: false, user: false});
      Alert.alert(message);
    } else {
      invoke(props, 'login', {
        loggedIn: true,
        user: authUser,
        sessionID: authUser.sessionID,
        country,
      });
    }
  };

  const onPingError = () => {
    invoke(props, 'logout', {loggedIn: false, user: false});
  };

  ping().then(onPingSuccess, onPingError);

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
