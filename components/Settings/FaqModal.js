import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {settings} from '../../Constants/Texts';

const FaqModal = props => {
  const {lang} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={settings[lang].faq}
            onLeftElementPress={handleCloseModal}
          />
          <ScrollView showsVerticalScrollIndicator={false} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

FaqModal.propTypes = {
  onClose: PropTypes.func,
  lang: PropTypes.string,
};

export default FaqModal;
