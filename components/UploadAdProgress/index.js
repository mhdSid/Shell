import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProgressItemsSelector} from './Selectors';
import {View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';

const UploadAdProgress = props => {
  const {progressItems, relative, id} = props;
  if (progressItems.length === 0) {
    return null;
  }
  const progressItem = progressItems.find(item => `${item.id}` === `${id}`);
  if (!progressItem) {
    return null;
  }
  return (
    <View
      style={
        relative
          ? sharedStyles.uploadProgressRelative
          : sharedStyles.uploadProgressAbsolute
      }>
      <View style={sharedStyles.progressItem}>
        <View
          style={[
            sharedStyles.progressItemInner,
            {width: `${progressItem.progress}%`},
          ]}
        />
      </View>
    </View>
  );
};

UploadAdProgress.propTypes = {
  progressItems: PropTypes.array,
  relative: PropTypes.bool,
  id: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    progressItems: getProgressItemsSelector(state),
  };
};

export default connect(mapStateToProps)(UploadAdProgress);
