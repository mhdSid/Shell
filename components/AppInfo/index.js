import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
// import PropTypes from 'prop-types';
// var pkg = require('./package.json');
import pkg from '../../package.json';

import {loadingPopup} from '../Loading';

const AppInfo = props => {
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);

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
          onLeftElementPress={handleCloseModal}
        />
        {loading && loadingPopup}

        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView>
            <View
              style={[
                sharedStyles.signupView,
                sharedStyles.loginContainer,
                sharedStyles.updateUserContainer,
              ]}>
              <Text>Version: {pkg.version}</Text>
            </View>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// UpdateUser.propTypes = {
//   user: PropTypes.object,
//   onClose: PropTypes.func,
//   updateUserAction: PropTypes.func,
// };

export default AppInfo;
