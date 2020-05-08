import React, {useState} from 'react';
import {Text, View, Modal, SafeAreaView, ScrollView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';

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
      // onShow={handleShowAd}
      onDismiss={onModalDissmiss}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          onLeftElementPress={handleCloseModal}
          centerElement={`${firstName} ${lastName}`}
          //   rightElement={
          //     <Button
          //       onPress={handleEnterDraw}
          //       // disabled={loading || !adDataChanged}
          //       raised
          //       text="Enter Draw"
          //       icon="shop"
          //     />
          //   }
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              // height: '45%',
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: 'center',
              // alignItems: 'center',
              // position: 'absolute',
              // top: 0,
              // left: 0,
              // aspectRatio: 3 / 2,
              // height: 'auto',
            }}>
            <CachedImage
              cache="force-cache"
              source={{
                uri: image,
                cache: 'force-cache',
                // headers: {
                //   Pragma: 'only-if-cached',
                //   'Cache-Control': 'only-if-cached',
                // },
              }}
              style={sharedStyles.adDetailsImage}
            />
          </View>
          <View style={sharedStyles.adDetailsContainer}>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="person" />
              <Text style={sharedStyles.userDetailsText}>Name</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${firstName} ${lastName}`}
              </Text>
            </View>

            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="email" />
              <Text style={sharedStyles.userDetailsText}>Email</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{email}</Text>
            </View>

            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>Location</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${prefecture}, ${country}`}
              </Text>
            </View>

            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>Postal Code</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {postalCode}
              </Text>
            </View>

            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>City / Ward</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{cityWard}</Text>
            </View>

            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>Full Address</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {fullAddress}
              </Text>
            </View>

            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="fingerprint" />
              <Text style={sharedStyles.userDetailsText}>User ID</Text>
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
