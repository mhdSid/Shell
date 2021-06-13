import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {uploadAdProgress} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {getProgressItemsSelector} from './Selectors';
import {VirtualizedList} from 'react-native';
import {ListItem} from 'react-native-material-ui';
import FastImage from 'react-native-fast-image';
import UploadAdProgressItem from './index';

const UploadAdProgressModal = props => {
  const {progressItems} = props;

  const [loading] = useState(false);

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  const getItem = (data, index) => data[index];
  const getItemCount = () => progressItems.length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item}) => (
    <View>
      <ListItem
        divider
        style={{
          container: sharedStyles.uploadProgressModalListItemContainer,
        }}
        leftElement={
          item.images && item.images[0] ? (
            <FastImage
              style={sharedStyles.homeListItemImage}
              source={{
                uri: item.images[0],
                priority: FastImage.priority.low,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : null
        }
        centerElement={{
          primaryText: item.name,
          secondaryText: item.category,
          tertiaryText: `${item.currency} ${item.price}`,
        }}
      />
      <UploadAdProgressItem id={item.id} />
    </View>
  );

  return (
    <Modal animationType="slide">
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          centerElement={uploadAdProgress.uploading}
          onLeftElementPress={handleCloseModal}
        />
        {progressItems && progressItems.length ? (
          <VirtualizedList
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            data={progressItems}
            getItem={getItem}
            getItemCount={getItemCount}
            keyExtractor={getKeyExtractor}
            renderItem={renderItem}
          />
        ) : null}
      </SafeAreaView>
    </Modal>
  );
};

UploadAdProgressModal.propTypes = {
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    progressItems: getProgressItemsSelector(state),
  };
};

export default connect(mapStateToProps)(UploadAdProgressModal);
