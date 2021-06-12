import React, {useEffect} from 'react';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import AdDetails from '../AdDetails';
import {handlePing} from '../../redux/Ping/Ping';
import PropTypes from 'prop-types';
import {showAdDetails} from '../../redux/AdDetails/actions';
import {getAdDetailsSelector} from './Selectors';
import {NativeModules} from 'react-native';
import {
  addNewProgressItem,
  removeProgressItem,
  updateProgressItem,
} from '../../redux/UploadProgress/actions';
import {getProgressItemsSelector} from '../UploadAdProgress/Selectors';
const {CalendarModule} = NativeModules;

const Pinger = props => {
  const {adDetails} = props;

  CalendarModule.createCalendarEvent('Party', 'my house').then(data => {
    console.log('createCalendarEvent data: ', data);
  });

  const onAdsDetailsClose = () => {
    invoke(props, 'showAdDetails', undefined);
  };
  useEffect(() => {
    invoke(props, 'handlePing');
  }, []);

  if (adDetails) {
    return <AdDetails onClose={onAdsDetailsClose} item={adDetails} />;
  }
  return null;
};

const mapStateToProps = state => {
  return {
    adDetails: getAdDetailsSelector(state),
    progressItems: getProgressItemsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAdDetails: payload => dispatch(showAdDetails(payload)),
    handlePing: payload => dispatch(handlePing(payload)),
    updateProgressItem: payload => dispatch(updateProgressItem(payload)),
    addNewProgressItem: payload => dispatch(addNewProgressItem(payload)),
    removeProgressItem: payload => dispatch(removeProgressItem(payload)),
  };
};

Pinger.propTypes = {
  showAdDetails: PropTypes.func,
  handlePing: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pinger);
