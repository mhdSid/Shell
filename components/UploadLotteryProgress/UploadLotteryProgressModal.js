import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, Text, View} from 'react-native';
import styles from './uploadLotteryProgressModal.style';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {uploadAdProgress} from '../../constants/Texts';
import {connect} from 'react-redux';
import {getProgressItemsSelector} from './Selectors';
import {VirtualizedList} from 'react-native';
import ListItemCommon from '../Home/ListItem';
import {getLangSelector} from '../Settings/Selectors';
import { loadingPopup } from '../Loading';

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
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={uploadAdProgress[lang].uploading}
            onLeftElementPress={handleCloseModal}
          />
          <VirtualizedList
            initialNumToRender={5}
            windowSize={2}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={0.0}
            removeClippedSubviews={true}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              loading ? (
                loadingPopup
              ) : (
                <View style={styles.emptyListViewContainer}>
                  <Text style={styles.emptyListViewContainerText}>
                    {uploadAdProgress[lang].noItems}
                  </Text>
                </View>
              )
            }
            data={progressItems}
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
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    progressItems: getProgressItemsSelector(state),
    lang: getLangSelector(state),
  };
};

export default connect(mapStateToProps)(UploadLotteryProgressModal);
