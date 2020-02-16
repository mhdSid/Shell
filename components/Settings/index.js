import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Drawer} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {setLang} from '../../redux/Settings/actions';

const Settings = props => {
  const {lang} = props;
  // console.log('SettingsSettingsSettingsSettingsSettings: ', lang);

  const [modalVisible, setModalVisible] = useState(true);
  const [showLanguages, setShowLanguages] = useState(false);

  const handleSetLanguage = value => {
    return () => {
      // console.log(value);
      invoke(props, 'setLang', value);
    };
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleShowLanguages = () => {
    let _showLanguages = showLanguages;
    _showLanguages = !_showLanguages;
    setShowLanguages(_showLanguages);
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
                  onPress: handleShowLanguages,
                },
              ]}
            />
            {showLanguages && (
              <Drawer.Section
                style={{
                  container: {
                    marginTop: -20,
                    paddingLeft: 80,
                    // justifyContent: 'center',
                    // alignItems: 'center'
                  },
                  //   item: {
                  //     justifyContent: 'center',
                  //     alignItems: 'center',
                  //   },
                  //   value: {
                  //     justifyContent: 'center',
                  //     alignItems: 'center',
                  //   },
                }}
                items={[
                  showLanguages && {
                    key: 'English',
                    //   icon: 'language',
                    value: 'English',
                    onPress: handleSetLanguage('en'),
                  },
                  showLanguages && {
                    key: 'Japanese',
                    //   icon: 'language',
                    value: 'Japanese',
                    onPress: handleSetLanguage('jp'),
                  },
                ]}
              />
            )}
          </Drawer>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

Settings.propTypes = {
  lang: PropTypes.string,
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
