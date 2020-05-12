import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';

import {loadingPopup} from '../Loading';

const Notifications = props => {
  const [modalVisible, setModalVisible] = useState(true);
  const [loading] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const onModalDismiss = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onDismiss={onModalDismiss}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          centerElement="Notifications"
          onLeftElementPress={handleCloseModal}
        />
        {loading && loadingPopup}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              sharedStyles.signupView,
              sharedStyles.loginContainer,
              sharedStyles.updateUserContainer,
            ]}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

Notifications.propTypes = {
  onClose: PropTypes.func,
};

export default Notifications;
