import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import PropTypes from 'prop-types';
import {Button, Icon} from 'react-native-material-ui';

const SuccessConfirmationModal = props => {
  const {title, subtitle, actions, lang} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  return (
    <Modal animationType="fade" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.container, sharedStyles.rootSafeAreaView]}>
        <View style={sharedStyles.successConfirmationContainer}>
          <View style={sharedStyles.successConfirmationContent}>
            <Icon
              name="check-circle"
              color="green"
              size={100}
              style={sharedStyles.successConfirmationIcon}
            />
            <Text style={sharedStyles.successConfirmationTitle}>{title}</Text>
            <Text style={sharedStyles.successConfirmationSubtitle}>
              {subtitle}
            </Text>
            {actions.map((action, index) => (
              <Button
                raised={true}
                primary
                text={action.text}
                icon={action.icon}
                style={{
                  container: [
                    sharedStyles.mainButtonContainer,
                    index !== actions.length - 1 &&
                      sharedStyles.successConfirmationActionContainer,
                  ],
                }}
                onPress={action.onPress}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

SuccessConfirmationModal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array,
  lang: PropTypes.string,
};

export default SuccessConfirmationModal;
