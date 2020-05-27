import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProgressItemsSelector} from './Selectors';
import {uploadProgress} from '../../Constants/Texts';
import {SimpleLoaderDefault} from '../Loading';
import {View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';

const UploadAdProgress = props => {
  const {progressItems, relative} = props;
  if (progressItems.length === 0) {
    return null;
  }
  return (
    <View
      style={
        relative
          ? sharedStyles.uploadProgressRelative
          : sharedStyles.uploadProgressAbsolute
      }>
      {SimpleLoaderDefault}
      <Text style={sharedStyles.uploadProgressText}>
        {uploadProgress.inProgress(progressItems.length)}
      </Text>
    </View>
  );
};

UploadAdProgress.propTypes = {
  progressItems: PropTypes.array,
  relative: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    progressItems: getProgressItemsSelector(state),
  };
};

export default connect(mapStateToProps)(UploadAdProgress);
