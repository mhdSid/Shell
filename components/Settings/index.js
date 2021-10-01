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

// let FaqMofal = null;
let ChangePassword = null;
let ContactUsModal = null;
let TermsAndPrivacyPolicyModal = null;

const Settings = props => {
  const {lang} = props;
  const [settingsModal, setSettingsModal] = useState(false);

  const handleSetLanguage = value => {
    return () => {
      invoke(props, 'setLang', value);
    };
  };
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const handleSettingsModalClick = modalType => {
    return () => {
      setSettingsModal(modalType);
    };
  };
  const handleSettingsModalClose = () => {
    setSettingsModal(null);
  };
  const settingsModals = {
    // faq: () => {
    //   if (!FaqMofal) {
    //     FaqMofal = require('./FaqModal').default;
    //   }
    //   return <FaqMofal onClose={handleSettingsModalClose} />;
    // },
    contactUs: () => {
      if (!ContactUsModal) {
        ContactUsModal = require('./ContactUsModal').default;
      }
      return <ContactUsModal onClose={handleSettingsModalClose} />;
    },
    privacyAndTerms: () => {
      if (!TermsAndPrivacyPolicyModal) {
        TermsAndPrivacyPolicyModal = require('./TermsAndPrivacyPolicyModal')
          .default;
      }
      return <TermsAndPrivacyPolicyModal onClose={handleSettingsModalClose} />;
    },
    changePassword: () => {
      if (!ChangePassword) {
        ChangePassword = require('./ChangePassword').default;
      }
      return <ChangePassword onClose={handleSettingsModalClose} />;
    },
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      {settingsModal && settingsModals[settingsModal]()}
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={settings.settings}
            onLeftElementPress={handleCloseModal}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={sharedStyles.settingsView}>
              <Drawer>
                <Drawer.Section title={settings.language} />
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
                <Drawer.Section title={settings.privacy} />
                <Drawer.Section
                  style={{
                    container: sharedStyles.settingsDrawerLanguageSection,
                    icon: sharedStyles.langIcon,
                  }}
                  items={[
                    // {
                    //   key: settings.faq,
                    //   icon: 'question-answer',
                    //   value: settings.faq,
                    //   onPress: handleSettingsModalClick('faq'),
                    // },
                    {
                      key: settings.contactUs,
                      icon: 'contact-mail',
                      value: settings.contactUs,
                      onPress: handleSettingsModalClick('contactUs'),
                    },
                    {
                      key: settings.privacyAndTerms,
                      icon: 'security',
                      value: settings.privacyAndTerms,
                      onPress: handleSettingsModalClick('privacyAndTerms'),
                    },
                    // {
                    //   key: settings.licenses,
                    //   icon: 'questionsAnswers',
                    //   value: settings.licenses,
                    //   // onPress: handleSetLanguage(settings.en),
                    // },
                  ]}
                />
                <Drawer.Section title={settings.security} />
                <Drawer.Section
                  style={{
                    container: sharedStyles.settingsDrawerLanguageSection,
                    icon: sharedStyles.langIcon,
                  }}
                  items={[
                    {
                      key: settings.faq,
                      icon: 'lock',
                      value: settings.changePassword,
                      onPress: handleSettingsModalClick('changePassword'),
                    },
                    // {
                    //   key: settings.licenses,
                    //   icon: 'questionsAnswers',
                    //   value: settings.licenses,
                    //   // onPress: handleSetLanguage(settings.en),
                    // },
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
            </View>
          </ScrollView>
        </View>
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
