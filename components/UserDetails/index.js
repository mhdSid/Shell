import React, {useState} from 'react';
import {Text, View, Modal, SafeAreaView, ScrollView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
// import {Drawer} from 'react-native-material-ui';
import {Toolbar, Icon} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
// import {
//   // AdMobBanner,
//   AdMobInterstitial,
//   // PublisherBanner,
//   // AdMobRewarded,
// } from 'react-native-admob';

const UserDetails = props => {
  const {item} = props;
  console.log('UserDetails: ', item);
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
            {/* <Drawer
              style={{
                container: sharedStyles.drawerContainer,
              }}>
              <Drawer.Section
                title="Name"
                items={[
                  {
                    icon: 'person',
                    value: `${firstName} ${lastName}`,
                  },
                ]}
              />
            </Drawer> */}
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="person" />
              <Text style={sharedStyles.userDetailsText}>Name</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${firstName} ${lastName}`}
              </Text>
            </View>

            {/* <Drawer style={{container: sharedStyles.drawerContainer}}>
              <Drawer.Section
                title="Email"
                items={[
                  {
                    icon: 'email',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>{email}</Text>
                    ),
                  },
                ]}
              />
            </Drawer> */}
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

            {/* <Drawer style={{container: sharedStyles.drawerContainer}}> */}
            {/* <Drawer.Section
                title="Location"
                items={[
                  {
                    icon: 'pin-drop',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>
                        {`${prefecture}, ${country}`}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              /> */}
            {/* <Drawer.Section
                title="Postal Code"
                items={[
                  {
                    icon: 'pin-drop',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>
                        {postalCode}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              /> */}
            {/* <Drawer.Section
                title="City / Ward"
                items={[
                  {
                    icon: 'pin-drop',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>{cityWard}</Text>
                    ),
                    // description,
                  },
                ]}
              /> */}
            {/* <Drawer.Section
                title="Full Address"
                items={[
                  {
                    icon: 'pin-drop',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>
                        {fullAddress}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              /> */}
            {/* </Drawer> */}

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
