import React from 'react';
import {Dimensions, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {Modal, SafeAreaView} from 'react-native';
import {Button} from 'react-native-material-ui';
import styles from './imageViewer.style';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import FastImage from 'react-native-fast-image';

const ImagesViewer = React.memo(props => {
  const {uri} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const cropWidth = Dimensions.get('window').width;
  const cropHeight = Dimensions.get('window').height;

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <View style={styles.imageViewerBackButtonViewContainer}>
            <Button
              icon="arrow-back"
              color="white"
              onPress={handleCloseModal}
              raised={true}
              primary
              text={''}
              style={{
                container: {
                  backgroundColor: styles.imageViewerButton,
                },
              }}
            />
          </View>
          <ImageZoom
            cropWidth={cropWidth}
            cropHeight={cropHeight}
            style={styles.imageViewerZoomContainer}
            imageWidth={cropWidth - 30}
            imageHeight={cropWidth - 30}>
            <FastImage
              style={styles.imageViewerImage}
              source={{
                uri,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </ImageZoom>
        </View>
      </SafeAreaView>
    </Modal>
  );
});

ImagesViewer.proptTypes = {
  uri: PropTypes.string,
  imageText: PropTypes.string,
  onClose: PropTypes.func,
};

export default ImagesViewer;
