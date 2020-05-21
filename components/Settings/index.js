import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Drawer, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {setLang} from '../../redux/Settings/actions';
import {Flag} from 'react-native-svg-flagkit';
import {settings} from '../../Constants/Texts';
import pkg from '../../package.json';
import {getLangSelector} from './Selectors';

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
              title={settings.settings}
              items={[
                {
                  icon: 'language',
                  value: settings.language,
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
                  key: settings.en,
                  icon: <Flag id={settings.en} width={30} height={30} />,
                  value:
                    lang === settings.en ? (
                      <View
                        style={[
                          sharedStyles.flexRow,
                          sharedStyles.textAlignVertical,
                        ]}>
                        <Text style={sharedStyles.appText}>
                          {settings.english}
                        </Text>
                        <Icon
                          style={sharedStyles.langChecked}
                          color="green"
                          name="check"
                          size={15}
                        />
                      </View>
                    ) : (
                      settings.english
                    ),
                  onPress: handleSetLanguage(settings.en),
                },
                {
                  key: settings.jp,
                  icon: <Flag id={settings.jp} width={30} height={30} />,
                  value:
                    lang === settings.jp ? (
                      <View style={sharedStyles.flexRow}>
                        <Text style={sharedStyles.appText}>
                          {settings.japanese}
                        </Text>
                        <Icon
                          style={sharedStyles.langChecked}
                          color="green"
                          name="check"
                          size={15}
                        />
                      </View>
                    ) : (
                      settings.japanese
                    ),
                  onPress: handleSetLanguage(settings.jp),
                },
              ]}
            />
            <Drawer.Section
              title={settings.version}
              items={[
                {
                  value: (
                    <Text style={sharedStyles.appText}>{pkg.version}</Text>
                  ),
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

const mapStateToProps = state => {
  return {
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLang: payload => dispatch(setLang(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
