import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {about} from '../../Constants/Texts';

const About = props => {
  const {lang} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[
          sharedStyles.container,
          sharedStyles.aboutSafeViewContainer,
          sharedStyles.rootSafeAreaView,
        ]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement={'arrow-back'}
            onLeftElementPress={handleCloseModal}
            centerElement={about[lang].howTo}
          />
          <ScrollView
            style={sharedStyles.aboutContainer}
            contentContainerStyle={sharedStyles.aboutScrollViewContainer}
            showsVerticalScrollIndicator={false}>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="store" />
              <Text style={sharedStyles.aboutIconText}>{about[lang].sell}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about[lang].howToUseFirst}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about[lang].howToUseSecond}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about[lang].howToUseThird}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about[lang].howToUseFourth}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about[lang].howToUseFifth}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about[lang].howToUseSixth}
              </Text>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about[lang].howToUseSeventh}
              </Text>
            </View>
            <View style={sharedStyles.aboutSeparatorSection}>
              <Text style={sharedStyles.aboutSeparatorSectionText}>
                {about[lang].or}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="explore" />
              <Text style={sharedStyles.aboutIconText}>{about[lang].browse}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about[lang].howtoUseEigtth}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="remove-red-eye" />
              <Text style={sharedStyles.aboutIconText}>{about[lang].choose}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about[lang].howToUseNineth}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="receipt" />
              <Text style={sharedStyles.aboutIconText}>
                {about[lang].enterLottery}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about[lang].howToUseTenth}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="star" />
              <Text style={sharedStyles.aboutIconText}>
                {about[lang].joinLottery}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about[lang].howToUseEleventh}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

About.propTypes = {
  onClose: PropTypes.func,
  lang: PropTypes.string,
};

export default About;
