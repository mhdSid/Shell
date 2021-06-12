import React from 'react';
import {Dimensions, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {Modal, SafeAreaView} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import invoke from 'lodash/invoke';

const ImagesViewer = props => {
  const {uri, imageText} = props;
  const onModalDissmiss = () => {
    invoke(props, 'onClose');
  };
  const cropWidth = Dimensions.get('window').width;
  const cropHeight = Dimensions.get('window').height;

  return (
    <Modal animationType="slide">
      <SafeAreaView style={sharedStyles.fullheightView}>
        <View style={[sharedStyles.fullheightView, sharedStyles.imageViewer]}>
          <Toolbar
            style={{container: sharedStyles.adDetailsToolbarContainer}}
            leftElement="arrow-back"
            centerElement={imageText}
            onLeftElementPress={onModalDissmiss}
          />
          <ImageZoom
            cropWidth={cropWidth}
            cropHeight={cropHeight}
            style={sharedStyles.imageViewerZoom}
            imageWidth={200}
            imageHeight={200}>
            <FastImage
              style={sharedStyles.imageViewerImage}
              source={{
                uri,
                priority: FastImage.priority.low,
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
