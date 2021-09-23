import React from 'react';
import {Text, View, Modal, SafeAreaView, ScrollView, Image} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {userDetails} from '../../Constants/Texts';
import FastImage from 'react-native-fast-image';

const UserDetails = props => {
  const {item} = props;
  const {
    // firstName,
    // lastName,
    email,
    image,
    // mobile,
    country,
    prefecture,
    city,
    // postalCode,
    // fullAddress,
  } = item;

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          onLeftElementPress={handleCloseModal}
          // centerElement={`${email} ${lastName}`}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={sharedStyles.flexRow}>
            <FastImage
              style={sharedStyles.lotteryDetailsImage}
              source={{
                uri: image,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={sharedStyles.lotteryDetailsContainer}>
            {/* <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="person" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.name}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${firstName} ${lastName}`}
              </Text>
            </View> */}
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="email" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.email}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{email}</Text>
            </View>
            {/* <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="phone" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.mobile}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{mobile}</Text>
            </View> */}
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.location}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${country}, ${prefecture}, ${city}`}
              </Text>
            </View>
            {/* <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.postalCode}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {postalCode}
              </Text>
            </View> */}
            {/* <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.fullAddress}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {fullAddress}
              </Text>
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

UserDetails.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func,
};

export default UserDetails;
