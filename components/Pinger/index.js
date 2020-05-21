import React, {useEffect} from 'react';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import AdDetails from '../AdDetails';
import {handlePing} from '../../redux/Ping/Ping';
import PropTypes from 'prop-types';
import {showAdDetails} from '../../redux/AdDetails/actions';
import {getAdDetailsSelector} from './Selectors';

const Pinger = props => {
  const {adDetails} = props;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pinger);
