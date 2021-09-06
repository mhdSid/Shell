import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {Modal, SafeAreaView} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import FastImage from 'react-native-fast-image';

const ImagesViewer = props => {
  const {uri, imageText} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const cropWidth = Dimensions.get('window').width;
  const cropHeight = Dimensions.get('window').height;

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.fullheightView, sharedStyles.rootSafeAreaView]}>
        <View style={[sharedStyles.fullheightView, sharedStyles.imageViewer]}>
          <Toolbar
            style={{container: sharedStyles.lotteryDetailsToolbarContainer}}
            leftElement="arrow-back"
            centerElement={imageText}
            onLeftElementPress={handleCloseModal}
          />
          <ImageZoom
            cropWidth={cropWidth}
            cropHeight={cropHeight}
            style={sharedStyles.imageViewerZoom}
            imageWidth={300}
            imageHeight={300}>
            <FastImage
              style={sharedStyles.imageViewerImage}
              source={{
                uri,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </ImageZoom>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ImagesViewer.proptTypes = {
  uri: PropTypes.string,
  imageText: PropTypes.string,
  onClose: PropTypes.func,
};

export default ImagesViewer;
