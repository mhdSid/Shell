import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {ping} from '../../services/auth';
import {loginAction, logoutAction} from '../../redux/Auth/actions';
import {Alert} from 'react-native';
import {updateAd, importAd} from '../../services/ads';
import AdDetails from '../AdDetails';
import {addAd, updateCurrentAd} from '../../redux/Ads/actions';
import PropTypes from 'prop-types';

export let rootUpdateAd;
export let rootUploadAd;
export let setRootSelectedAd;
export let rootHandleShowAdsDetails;
export let rootUpdateCurrentAdToStore;
export let rootAddAdToStore;

const Pinger = props => {
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [selectedAd, setSelectedAd] = useState(undefined);

  const handleShowAdsDetails = item => {
    setSelectedAd(item);
    setShowAdDetails(true);
  };
  const onAdsDetailsClose = () => {
    setShowAdDetails(false);
    setSelectedAd();
  };
  const update = (data, callback, errorCallback) => {
    updateAd(data).then(callback, errorCallback);
  };
  const uploadAd = (data, callback, errorCallback) => {
    importAd(data).then(callback, errorCallback);
  };
  const updateCurrentAdToStore = data => {
    invoke(props, 'updateCurrentAd', data);
  };
  const addAdToStore = data => {
    invoke(props, 'addAd', data);
  };

  setRootSelectedAd = selectedAd;
  rootAddAdToStore = addAdToStore;
  rootUpdateCurrentAdToStore = updateCurrentAdToStore;
  rootUpdateAd = update;
  rootUploadAd = uploadAd;
  rootHandleShowAdsDetails = handleShowAdsDetails;

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

  if (showAdDetails) {
    return <AdDetails onClose={onAdsDetailsClose} item={selectedAd} />;
  }
  return null;
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    addAd: payload => dispatch(addAd(payload)),
    updateCurrentAd: payload => dispatch(updateCurrentAd(payload)),
  };
};

Pinger.propTypes = {
  logout: PropTypes.func,
  login: PropTypes.func,
  updateCurrentAd: PropTypes.func,
  addAd: PropTypes.func,
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Pinger);
