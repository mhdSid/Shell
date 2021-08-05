import React, {useEffect} from 'react';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import LotteryDetails from '../LotteryDetails';
import {handlePing} from '../../redux/Ping/Ping';
import PropTypes from 'prop-types';
import {showLotteryDetails} from '../../redux/LotteryDetails/actions';
import {getLotteryDetailsSelector} from './Selectors';
import {NativeModules} from 'react-native';
import {
  addNewProgressItem,
  removeProgressItem,
  updateProgressItem,
} from '../../redux/UploadProgress/actions';
import {getProgressItemsSelector} from '../UploadAdProgress/Selectors';
const {CalendarModule} = NativeModules;

const Pinger = props => {
  const {lotteryDetails} = props;

  CalendarModule.createCalendarEvent('Party', 'my house').then(data => {
    console.log('createCalendarEvent data: ', data);
  });

  const onAdsDetailsClose = () => {
    invoke(props, 'showLotteryDetails', undefined);
  };
  useEffect(() => {
    invoke(props, 'handlePing');
  }, [props]);

  if (lotteryDetails) {
    return <LotteryDetails onClose={onAdsDetailsClose} item={lotteryDetails} />;
  }
  return null;
};

const mapStateToProps = state => {
  return {
    lotteryDetails: getLotteryDetailsSelector(state),
    progressItems: getProgressItemsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLotteryDetails: payload => dispatch(showLotteryDetails(payload)),
    handlePing: payload => dispatch(handlePing(payload)),
    updateProgressItem: payload => dispatch(updateProgressItem(payload)),
    addNewProgressItem: payload => dispatch(addNewProgressItem(payload)),
    removeProgressItem: payload => dispatch(removeProgressItem(payload)),
  };
};

Pinger.propTypes = {
  showLotteryDetails: PropTypes.func,
  handlePing: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pinger);
