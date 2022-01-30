import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './settings.style';
import {Toolbar, Drawer, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {setLang} from '../../redux/Settings/actions';
import {Flag} from 'react-native-svg-flagkit';
import {settings} from '../../constants/Texts';
import pkg from '../../package.json';
import {getLangSelector} from './Selectors';
import {getLoggedInSelector, getUserSelector} from '../Profile/Selectors';

// let FaqModal = null;
let ChangePassword = null;
let ContactUsModal = null;
let TermsAndPrivacyPolicyModal = null;
let UserAgreementModal = null;

const Settings = React.memo(props => {
  const {lang, user, loggedIn} = props;
  const isAuthenticated = user && loggedIn;
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
    //   if (!FaqModal) {
    //     FaqModal = require('./FaqModal').default;
    //   }
    //   return <FaqModal onClose={handleSettingsModalClose} />;
    // },
    contactUs: () => {
      if (!ContactUsModal) {
        ContactUsModal = require('./ContactUsModal').default;
      }
      return <ContactUsModal lang={lang} onClose={handleSettingsModalClose} />;
    },
    userAgreement: () => {
      if (!UserAgreementModal) {
        UserAgreementModal = require('./UserAgreement').default;
      }
      return (
        <UserAgreementModal lang={lang} onClose={handleSettingsModalClose} />
      );
    },
    privacyAndTerms: () => {
      if (!TermsAndPrivacyPolicyModal) {
        TermsAndPrivacyPolicyModal = require('./TermsAndPrivacyPolicyModal')
          .default;
      }
      return (
        <TermsAndPrivacyPolicyModal
          lang={lang}
          onClose={handleSettingsModalClose}
        />
      );
    },
    changePassword: () => {
      if (!ChangePassword) {
        ChangePassword = require('./ChangePassword').default;
      }
      return <ChangePassword lang={lang} onClose={handleSettingsModalClose} />;
    },
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      {settingsModal && settingsModals[settingsModal]()}
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={settings[lang].settings}
            onLeftElementPress={handleCloseModal}
          />
          <ScrollView>
            <View style={styles.scrollViewContainer}>
              <Drawer>
                <Drawer.Section title={settings[lang].language} />
                <Drawer.Section
                  style={{
                    container: styles.drawerSectionContainer,
                  }}
                  items={[
                    {
                      key: settings[lang].en,
                      icon: <Flag id={'US'} width={30} height={30} />,
                      value:
                        lang === settings[lang].en ? (
                          <View style={styles.listItemRowViewContainer}>
                            <Text style={styles.listItemText}>
                              {settings[lang].english}
                            </Text>
                            <Icon
                              style={styles.langIconChecked}
                              color="green"
                              name="check"
                              size={15}
                            />
                          </View>
                        ) : (
                          settings[lang].english
                        ),
                      onPress: handleSetLanguage(settings[lang].en),
                    },
                    {
                      key: settings[lang].jp,
                      icon: <Flag id={'JP'} width={30} height={30} />,
                      value:
                        lang === settings[lang].jp ? (
                          <View style={styles.listItemRowViewContainer}>
                            <Text style={styles.listItemText}>
                              {settings[lang].japanese}
                            </Text>
                            <Icon
                              style={styles.langIconChecked}
                              color="green"
                              name="check"
                              size={15}
                            />
                          </View>
                        ) : (
                          settings[lang].japanese
                        ),
                      onPress: handleSetLanguage(settings[lang].jp),
                    },
                  ]}
                />
                <Drawer.Section title={settings[lang].privacy} />
                <Drawer.Section
                  style={{
                    container: styles.drawerSectionContainer,
                  }}
                  items={[
                    // {
                    //   key: settings[lang].faq,
                    //   icon: 'question-answer',
                    //   value: settings[lang].faq,
                    //   onPress: handleSettingsModalClick('faq'),
                    // },
                    {
                      key: settings[lang].contactUs,
                      icon: 'contact-mail',
                      value: settings[lang].contactUs,
                      onPress: handleSettingsModalClick('contactUs'),
                    },
                    {
                      key: settings[lang].privacyAndTerms,
                      icon: 'security',
                      value: settings[lang].privacyAndTerms,
                      onPress: handleSettingsModalClick('privacyAndTerms'),
                    },
                    {
                      key: settings[lang].userAgreement,
                      icon: 'person',
                      value: settings[lang].userAgreement,
                      onPress: handleSettingsModalClick('userAgreement'),
                    },
                    // {
                    //   key: settings[lang].licenses,
                    //   icon: 'questionsAnswers',
                    //   value: settings[lang].licenses,
                    //   // onPress: handleSetLanguage(settings[lang].en),
                    // },
                  ]}
                />
                {isAuthenticated ? (
                  <>
                    <Drawer.Section title={settings[lang].security} />
                    <Drawer.Section
                      style={{
                        container: styles.drawerSectionContainer,
                      }}
                      items={[
                        {
                          key: settings[lang].faq,
                          icon: 'lock',
                          value: settings[lang].changePassword,
                          onPress: handleSettingsModalClick('changePassword'),
                        },
                        // {
                        //   key: settings[lang].licenses,
                        //   icon: 'questionsAnswers',
                        //   value: settings[lang].licenses,
                        //   // onPress: handleSetLanguage(settings[lang].en),
                        // },
                      ]}
                    />
                  </>
                ) : null}
                <Drawer.Section
                  title={settings[lang].version}
                  items={[
                    {
                      value: (
                        <Text style={styles.listItemText}>{pkg.version}</Text>
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
});

Settings.propTypes = {
  lang: PropTypes.string,
  setLang: PropTypes.func,
  onClose: PropTypes.func,
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    lang: getLangSelector(state),
    loggedIn: getLoggedInSelector(state),
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
