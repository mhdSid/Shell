import React, {useState} from 'react';
import sharedStyles from '../../assets/styles/sharedStyles';
import {loadingPopup} from '../Loading';
import {Button} from 'react-native-material-ui';
import {Text, View} from 'react-native';
import {profile} from '../../Constants/Texts';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {logoutAction, loginAction} from '../../redux/Auth/actions';
import {handleVerifyUser} from '../../redux/Auth/VerifyUser';
import {
  getEmailSelector,
  getPasswordSelector,
  getVerificationIdSelector,
} from './Selectors';

const VerifyUser = props => {
  const {email, password, verificationId} = props;
  const [loading, setLoading] = useState(false);

  const callback = () => {
    setLoading(false);
  };
  const handleVerifyUserPress = () => {
    if (email && password && verificationId) {
      setLoading(true);
      invoke(props, 'handleVerifyUser', {
        onSuccess: callback,
        onError: callback,
        email,
        password,
        verificationId,
      });
    }
  };

  return (
    <View style={sharedStyles.fullheightView}>
      {loading && loadingPopup}
      <View style={sharedStyles.loginContainer}>
        <View style={sharedStyles.loginBtn}>
          <Button
            raised={true}
            primary
            text={profile.verify}
            onPress={handleVerifyUserPress}
            disabled={loading}
          />
        </View>
        <Text style={sharedStyles.verificationLabel}>
          {profile.checkYourInbox}
        </Text>
      </View>
    </View>
  );
};

VerifyUser.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  verificationId: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  logout: PropTypes.func,
  login: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    email: getEmailSelector(state),
    password: getPasswordSelector(state),
    verificationId: getVerificationIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: payload => dispatch(logoutAction(payload)),
    login: payload => dispatch(loginAction(payload)),
    handleVerifyUser: payload => dispatch(handleVerifyUser(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyUser);
