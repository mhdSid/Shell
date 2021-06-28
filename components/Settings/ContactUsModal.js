import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {settings} from '../../Constants/Texts';

const ContactUsModal = props => {
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          centerElement={settings.contactUs}
          onLeftElementPress={handleCloseModal}
        />
        <ScrollView showsVerticalScrollIndicator={false} />
      </SafeAreaView>
    </Modal>
  );
};

ContactUsModal.propTypes = {
  onClose: PropTypes.func,
};

export default ContactUsModal;
