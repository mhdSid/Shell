import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import styles from './termsAndPrivacyPolicyModal.style';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {settings} from '../../constants/Texts';

const TermsAndPrivacyPolicyModal = props => {
  const {lang} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={settings[lang].privacyAndTerms}
            onLeftElementPress={handleCloseModal}
          />
          <ScrollView />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

TermsAndPrivacyPolicyModal.propTypes = {
  onClose: PropTypes.func,
  lang: PropTypes.string,
};

export default TermsAndPrivacyPolicyModal;
