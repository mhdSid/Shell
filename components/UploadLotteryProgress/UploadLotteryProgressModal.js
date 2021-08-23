import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, Text, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {uploadAdProgress} from '../../Constants/Texts';
import {connect} from 'react-redux';
import {getProgressItemsSelector} from './Selectors';
import {VirtualizedList} from 'react-native';
import ListItemCommon from '../Home/ListItem';

const UploadLotteryProgressModal = props => {
  const {progressItems} = props;

  const [loading] = useState(false);

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  const getItem = (data, index) => data[index];
  const getItemCount = () => (progressItems || []).length;
  const getKeyExtractor = item => item.id;
  const renderItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      listLength={progressItems.length}
      showLotteryResult={false}
      showUploadProgress={true}
    />
  );

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={uploadAdProgress.uploading}
            onLeftElementPress={handleCloseModal}
          />
          <VirtualizedList
            ListEmptyComponent={
              <Text style={sharedStyles.uploadProgressModalText}>
                {uploadAdProgress.noItems}
              </Text>
            }
            initialNumToRender={10}
            windowSize={1}
            removeClippedSubviews={true}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            data={progressItems || []}
            getItem={getItem}
            getItemCount={getItemCount}
            keyExtractor={getKeyExtractor}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

UploadLotteryProgressModal.propTypes = {
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    progressItems: getProgressItemsSelector(state),
  };
};

export default connect(mapStateToProps)(UploadLotteryProgressModal);
