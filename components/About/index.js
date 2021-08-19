import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, IconToggle, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {about} from '../../Constants/Texts';

const About = props => {
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
            centerElement={about.howTo}
          />
          <ScrollView
            style={sharedStyles.aboutContainer}
            contentContainerStyle={sharedStyles.aboutScrollViewContainer}
            showsVerticalScrollIndicator={false}>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="store" />
              <Text style={sharedStyles.aboutIconText}>{about.sell}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about.howToUseFirst}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about.howToUseSecond}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about.howToUseThird}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about.howToUseFourth}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about.howToUseFifth}
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                {about.howToUseSixth}
              </Text>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about.howToUseSeventh}
              </Text>
            </View>
            <View style={sharedStyles.aboutSeparatorSection}>
              <Text style={sharedStyles.aboutSeparatorSectionText}>
                {about.or}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="explore" />
              <Text style={sharedStyles.aboutIconText}>{about.browse}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about.howtoUseEigtth}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="remove-red-eye" />
              <Text style={sharedStyles.aboutIconText}>{about.choose}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about.howToUseNineth}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="receipt" />
              <Text style={sharedStyles.aboutIconText}>
                {about.enterLottery}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about.howToUseTenth}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="star" />
              <Text style={sharedStyles.aboutIconText}>
                {about.joinLottery}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about.howToUseEleventh}
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
};

export default About;
