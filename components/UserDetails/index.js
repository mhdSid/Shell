import React, {useState} from 'react';
import {Text, View, Modal, SafeAreaView, ScrollView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import {userDetails} from '../../Constants/Texts';

const UserDetails = props => {
  const {item} = props;
  const {
    firstName,
    lastName,
    email,
    image,
    id,
    country,
    prefecture,
    postalCode,
    cityWard,
    fullAddress,
  } = item;
  const [modalVisible, setModalVisible] = useState(true);

  const onModalDissmiss = () => {
    invoke(props, 'onClose');
  };
  const handleCloseModal = () => {
    setModalVisible(false);
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
          centerElement={`${firstName} ${lastName}`}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={sharedStyles.flexRow}>
            <CachedImage
              source={{
                uri: image,
              }}
              style={sharedStyles.adDetailsImage}
            />
          </View>
          <View style={sharedStyles.adDetailsContainer}>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="person" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.name}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${firstName} ${lastName}`}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="email" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.email}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{email}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.location}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${prefecture}, ${country}`}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.postalCode}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {postalCode}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.cityWard}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{cityWard}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.fullAddress}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {fullAddress}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="fingerprint" />
              <Text style={sharedStyles.userDetailsText}>
                {userDetails.userId}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{id}</Text>
            </View>
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
