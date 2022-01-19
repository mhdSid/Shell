import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {notifications} from '../../constants/Texts';

const Notifications = props => {
  const {lang} = props;
  const [loading] = useState(false);

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
            centerElement={notifications[lang].notifications}
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
        </View>
      </SafeAreaView>
    </Modal>
  );
};

Notifications.propTypes = {
  onClose: PropTypes.func,
  lang: PropTypes.string,
};

export default Notifications;
