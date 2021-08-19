import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {receiveLottery as receiveLotteryTexts} from '../../Constants/Texts';

const ReceiveLotteryModal = props => {
  const {isWinner, isLotteryPoster} = props;
  console.log(props);
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
            centerElement={receiveLotteryTexts.receiveLottery}
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

ReceiveLotteryModal.propTypes = {
  onClose: PropTypes.func,
  isWinner: PropTypes.bool,
  isLotteryPoster: PropTypes.bool,
};

export default ReceiveLotteryModal;
