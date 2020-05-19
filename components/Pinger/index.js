import React from 'react';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import AdDetails from '../AdDetails';
import {handlePing} from '../../redux/Ping/Ping';
import PropTypes from 'prop-types';
import {showAdDetails} from '../../redux/AdDetails/actions';

const Pinger = props => {
  const {adDetails} = props;

  const onAdsDetailsClose = () => {
    invoke(props, 'showAdDetails', undefined);
  };

  invoke(props, 'handlePing');

  if (adDetails) {
    return <AdDetails onClose={onAdsDetailsClose} item={adDetails} />;
  }
  return null;
};

const mapStateToProps = ({adDetailsReducer}) => {
  return {
    adDetails: adDetailsReducer.adDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAdDetails: payload => dispatch(showAdDetails(payload)),
    handlePing: payload => dispatch(handlePing(payload)),
  };
};

Pinger.propTypes = {
  showAdDetails: PropTypes.func,
  handlePing: PropTypes.func,
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Pinger);
