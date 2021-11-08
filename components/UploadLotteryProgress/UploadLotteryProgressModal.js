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
import { getLangSelector } from '../Settings/Selectors';

const UploadLotteryProgressModal = props => {
  const {progressItems, lang} = props;

  const [loading] = useState(false);

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  const getItem = (data, index) => data[index];
  const getItemCount = () => progressItems.length;
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
            centerElement={uploadAdProgress[lang].uploading}
            onLeftElementPress={handleCloseModal}
          />
          {Array.isArray(progressItems) && progressItems.length ? (
            <VirtualizedList
              initialNumToRender={5}
              windowSize={2}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={0.0}
              removeClippedSubviews={true}
              refreshing={loading}
              showsVerticalScrollIndicator={false}
              data={progressItems}
              getItem={getItem}
              getItemCount={getItemCount}
              keyExtractor={getKeyExtractor}
              renderItem={renderItem}
            />
          ) : (
            <View style={sharedStyles.homeEmptySearchResultsView}>
              <Text style={sharedStyles.uploadProgressModalText}>
                {uploadAdProgress[lang].noItems}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

UploadLotteryProgressModal.propTypes = {
  onClose: PropTypes.func,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    progressItems: getProgressItemsSelector(state),
    lang: getLangSelector(state),
  };
};

export default connect(mapStateToProps)(UploadLotteryProgressModal);
