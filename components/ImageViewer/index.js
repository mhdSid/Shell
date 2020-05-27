import React from 'react';
import {Dimensions, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {Modal, SafeAreaView} from 'react-native';
import {Button} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import PropTypes from 'prop-types';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import invoke from 'lodash/invoke';

const ImagesViewer = props => {
  const {uri} = props;
  const onModalDissmiss = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide">
      <SafeAreaView style={sharedStyles.fullheightView}>
        <View style={[sharedStyles.fullheightView, sharedStyles.imageViewer]}>
          <Button
            icon="close"
            primary
            onPress={onModalDissmiss}
            color="white"
            text=""
            style={{container: sharedStyles.closeModalBtn}}
          />
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            style={sharedStyles.imageViewerZoom}
            imageWidth={200}
            imageHeight={200}>
            <CachedImage style={sharedStyles.imageViewerImage} source={{uri}} />
          </ImageZoom>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ImagesViewer.proptTypes = {
  uri: PropTypes.string,
  onClose: PropTypes.func,
};

export default ImagesViewer;
