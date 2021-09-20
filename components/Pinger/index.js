import React, {useEffect} from 'react';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {handlePing} from '../../redux/Ping/Ping';
import PropTypes from 'prop-types';
import {showLotteryDetails} from '../../redux/LotteryDetails/actions';
import {getLotteryDetailsSelector} from './Selectors';
import {showLotteryResult} from '../../redux/LotteryResult/actions';
import {getLotteryResultSelector} from '../LotteryResult/Selectors';
import {handleInitChatSocketCommunication} from '../../redux/Chat/actions';

let LotteryDetails = null;
let LotteryResult = null;

const Pinger = props => {
  const {lotteryDetails, lotteryResult} = props;
  const onAdsDetailsClose = () => {
    invoke(props, 'showLotteryDetails', undefined);
  };
  useEffect(() => {
    invoke(props, 'handlePing', {
      onPingSuccess: userId => {
        if (userId) {
          invoke(props, 'initChatSocketCommunication', {
            userId,
          });
        }
      },
    });
  }, []);

  if (lotteryResult) {
    if (!LotteryResult) {
      LotteryResult = require('../LotteryResult').default;
    }
    return <LotteryResult />;
  }
  if (lotteryDetails) {
    if (!LotteryDetails) {
      LotteryDetails = require('../LotteryDetails').default;
    }
    return <LotteryDetails onClose={onAdsDetailsClose} item={lotteryDetails} />;
  }
  return null;
};

const mapStateToProps = state => {
  return {
    lotteryDetails: getLotteryDetailsSelector(state),
    lotteryResult: getLotteryResultSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLotteryDetails: payload => dispatch(showLotteryDetails(payload)),
    handlePing: payload => dispatch(handlePing(payload)),
    showLotteryResult: payload => dispatch(showLotteryResult(payload)),
    initChatSocketCommunication: payload =>
      dispatch(handleInitChatSocketCommunication(payload)),
  };
};

Pinger.propTypes = {
  showLotteryDetails: PropTypes.func,
  handlePing: PropTypes.func,
  showLotteryResult: PropTypes.func,
  lotteryResult: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  lotteryDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pinger);
