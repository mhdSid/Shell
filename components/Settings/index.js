import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Drawer, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {setLang} from '../../redux/Settings/actions';
import {Flag} from 'react-native-svg-flagkit';

const Settings = props => {
  const {lang} = props;
  const [modalVisible, setModalVisible] = useState(true);

  const handleSetLanguage = value => {
    return () => {
      invoke(props, 'setLang', value);
    };
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const onModalDissmiss = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onDismiss={onModalDissmiss}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          onLeftElementPress={handleCloseModal}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Drawer>
            <Drawer.Section
              title="Settings"
              items={[
                {
                  icon: 'language',
                  value: 'Language',
                },
              ]}
            />
            <Drawer.Section
              style={{
                container: sharedStyles.settingsDrawerLanguageSection,
                icon: sharedStyles.langIcon,
              }}
              items={[
                {
                  key: 'US',
                  icon: <Flag id={'US'} width={30} height={30} />,
                  value:
                    lang === 'US' ? (
                      <View
                        style={[
                          sharedStyles.flexRow,
                          sharedStyles.textAlignVertical,
                        ]}>
                        <Text style={sharedStyles.appText}>English</Text>
                        <Icon
                          style={sharedStyles.langChecked}
                          color="green"
                          name="check"
                          size={15}
                        />
                      </View>
                    ) : (
                      'English'
                    ),
                  onPress: handleSetLanguage('US'),
                },
                {
                  key: 'JP',
                  icon: <Flag id={'JP'} width={30} height={30} />,
                  value:
                    lang === 'JP' ? (
                      <View style={sharedStyles.flexRow}>
                        <Text style={sharedStyles.appText}>Japanese</Text>
                        <Icon
                          style={sharedStyles.langChecked}
                          color="green"
                          name="check"
                          size={15}
                        />
                      </View>
                    ) : (
                      'Japanese'
                    ),
                  onPress: handleSetLanguage('JP'),
                },
              ]}
            />
          </Drawer>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

Settings.propTypes = {
  lang: PropTypes.string,
  setLang: PropTypes.func,
  onClose: PropTypes.func,
};

const mapStateToProps = ({settingsReducer}) => {
  return {
    lang: settingsReducer.lang,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLang: payload => dispatch(setLang(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
