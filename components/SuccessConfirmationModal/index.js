import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, Text} from 'react-native';
import styles from './successConfirmationModal.style';
import PropTypes from 'prop-types';
import {Button, Icon} from 'react-native-material-ui';

const SuccessConfirmationModal = React.memo(props => {
  const {title, subtitle, actions} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  return (
    <Modal animationType="fade" onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <View style={styles.contentViewContainer}>
            <Icon
              name="check-circle"
              color="green"
              size={100}
              style={styles.successConfirmationIcon}
            />
            <Text style={styles.successConfirmationTitle}>{title}</Text>
            <Text style={styles.successConfirmationSubtitle}>{subtitle}</Text>
            {actions.map((action, index) => (
              <Button
                raised={true}
                primary
                text={action.text}
                icon={action.icon}
                style={{
                  container: [
                    styles.actionButtonContainer,
                    index !== actions.length - 1 &&
                      styles.actionButtonContainerMarginBottom,
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
});

SuccessConfirmationModal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array,
  lang: PropTypes.string,
};

export default SuccessConfirmationModal;
