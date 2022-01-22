import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProgressItemsSelector} from './Selectors';
import {View} from 'react-native';
import styles from './uploadLotteryProgress.style';

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
          ? styles.uploadProgressRelativeContainer
          : styles.uploadProgressAbsoluteContainer
      }>
      <View style={styles.progressItemViewContainer}>
        <View
          style={[
            styles.progressItemInner,
            {width: `${progressItem.totalProgress}%`},
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
