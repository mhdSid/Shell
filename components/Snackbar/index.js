import React, {useEffect} from 'react';
import invoke from 'lodash/invoke';
import {Text, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSnackbarItemsSelector} from './Selectors';
import {removeSnackbarItem} from '../../redux/Snackbar/actions';

const Snackbar = props => {
  const {snackbarItems} = props;
  // useEffect(() => {
  //   if (Array.isArray(snackbarItems) && snackbarItems.length) {
  //     snackbarItems.forEach(snackbarItem => {
  //       setTimeout(() => {
  //         invoke(props, 'removeSnackbarItem', snackbarItem.id);
  //       }, snackbarItem.timeout);
  //     });
  //   }
  // }, [props, snackbarItems]);
  if (
    !snackbarItems ||
    (Array.isArray(snackbarItems) && !snackbarItems.length)
  ) {
    return null;
  }
  return (
    <View style={sharedStyles.snackbarContainer}>
      {snackbarItems.map(snackbarItem => (
        <View style={sharedStyles.snackbarItem}>
          <Text style={sharedStyles.snackbarMessage}>
            {snackbarItem.message}
          </Text>
        </View>
      ))}
    </View>
  );
};

Snackbar.propTypes = {
  snackbarItems: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    snackbarItems: getSnackbarItemsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeSnackbarItem: payload => dispatch(removeSnackbarItem(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar);
