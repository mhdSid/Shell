import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import styles from './about.style';
import {Toolbar, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {about} from '../../constants/Texts';

const About = props => {
  const {lang} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement={'arrow-back'}
            onLeftElementPress={handleCloseModal}
            centerElement={about[lang].howTo}
          />
          <ScrollView
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.scrollViewContentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.iconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="store" />
              <Text style={styles.iconText}>{about[lang].sell}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionText, styles.sectionTextMargin]}>
                {about[lang].howToUseFirst}
              </Text>
              <Text style={[styles.sectionText, styles.sectionTextMargin]}>
                {about[lang].howToUseSecond}
              </Text>
              <Text style={[styles.sectionText, styles.sectionTextMargin]}>
                {about[lang].howToUseThird}
              </Text>
              <Text style={[styles.sectionText, styles.sectionTextMargin]}>
                {about[lang].howToUseFourth}
              </Text>
              <Text style={[styles.sectionText, styles.sectionTextMargin]}>
                {about[lang].howToUseFifth}
              </Text>
              <Text style={[styles.sectionText, styles.sectionTextMargin]}>
                {about[lang].howToUseSixth}
              </Text>
              <Text style={styles.sectionText}>
                {about[lang].howToUseSeventh}
              </Text>
            </View>
            <View style={styles.sectionSeparatorContainer}>
              <Text style={styles.sectionSeparatorText}>{about[lang].or}</Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="explore" />
              <Text style={styles.iconText}>{about[lang].browse}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>
                {about[lang].howtoUseEigtth}
              </Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="remove-red-eye" />
              <Text style={styles.iconText}>{about[lang].choose}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>
                {about[lang].howToUseNineth}
              </Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="receipt" />
              <Text style={styles.iconText}>{about[lang].enterLottery}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>
                {about[lang].howToUseTenth}
              </Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="star" />
              <Text style={styles.iconText}>{about[lang].joinLottery}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>
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
