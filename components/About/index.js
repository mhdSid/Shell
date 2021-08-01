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
    <Modal animationType="fade" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[
          sharedStyles.container,
          sharedStyles.aboutSafeViewContainer,
          sharedStyles.rootSafeAreaView,
        ]}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement={
            <IconToggle onPress={handleCloseModal} name="arrow-back" />
          }
          centerElement={about.howTo}
        />
        <ScrollView
          style={sharedStyles.aboutContainer}
          showsVerticalScrollIndicator={false}>
          <View style={sharedStyles.aboutIconTextContainer}>
            <Icon color="white" name="store" />
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
            <Icon color="white" name="explore" />
            <Text style={sharedStyles.aboutIconText}>{about.browse}</Text>
          </View>
          <View style={sharedStyles.aboutFirstSectionTextContainer}>
            <Text style={sharedStyles.aboutFirstSectionText}>
              {about.howtoUseEigtth}
            </Text>
          </View>
          <View style={sharedStyles.aboutIconTextContainer}>
            <Icon color="white" name="remove-red-eye" />
            <Text style={sharedStyles.aboutIconText}>{about.choose}</Text>
          </View>
          <View style={sharedStyles.aboutFirstSectionTextContainer}>
            <Text style={sharedStyles.aboutFirstSectionText}>
              {about.howToUseNineth}
            </Text>
          </View>
          <View style={sharedStyles.aboutIconTextContainer}>
            <Icon color="white" name="receipt" />
            <Text style={sharedStyles.aboutIconText}>{about.enterLottery}</Text>
          </View>
          <View style={sharedStyles.aboutFirstSectionTextContainer}>
            <Text style={sharedStyles.aboutFirstSectionText}>
              {about.howToUseTenth}
            </Text>
          </View>
          <View style={sharedStyles.aboutIconTextContainer}>
            <Icon color="white" name="star" />
            <Text style={sharedStyles.aboutIconText}>{about.win}</Text>
          </View>
          <View style={sharedStyles.aboutFirstSectionTextContainer}>
            <Text style={sharedStyles.aboutFirstSectionText}>
              {about.howToUseEleventh}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

About.propTypes = {
  onClose: PropTypes.func,
};

export default About;
