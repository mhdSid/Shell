import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, IconToggle, Icon} from 'react-native-material-ui';
// import PropTypes from 'prop-types';

// import {loadingPopup} from '../Loading';

const About = props => {
  const [modalVisible, setModalVisible] = useState(true);
  //   const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const onModalDismiss = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      onDismiss={onModalDismiss}>
      <SafeAreaView
        style={[sharedStyles.container, sharedStyles.aboutSafeViewContainer]}>
        <Toolbar
          style={{container: sharedStyles.aboutToolbarContainer}}
          leftElement={
            <IconToggle onPress={handleCloseModal} name="arrow-back" />
          }
          centerElement="How To Guide"
          //   onLeftElementPress={handleCloseModal}
        />
        {/* {loading && loadingPopup} */}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={sharedStyles.aboutContainer}>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="white" name="store" />
              <Text style={sharedStyles.aboutIconText}>Sell</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                Are you having problems selling any item you can think about?
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                Do you want to make money if you have something that you don't
                use?
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                It's not about selling anymore!
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                Post an Ad about anything!
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                Users pay a fee to enter a Lottery to have a chance to win the
                item in your Ad.
              </Text>
              <Text
                style={[
                  sharedStyles.aboutFirstSectionText,
                  sharedStyles.aboutFirstSectionTextMargin,
                ]}>
                Once the total amount is collected, our system starts a Lottery
                and a random user wins the item in your Ad.
              </Text>
              <Text style={sharedStyles.aboutFirstSectionText}>
                The winner takes the item and you take the collected cash which
                is the price that you initially entered.
              </Text>
            </View>

            <View style={sharedStyles.aboutSeparatorSection}>
              <Text style={sharedStyles.aboutSeparatorSectionText}>Or</Text>
            </View>

            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="white" name="explore" />
              <Text style={sharedStyles.aboutIconText}>Browse</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {'Browser through a wide variety of uploaded Ads!'}
              </Text>
            </View>

            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="white" name="remove-red-eye" />
              <Text style={sharedStyles.aboutIconText}>Choose</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {
                  'Make sure you choose any item you love. It can be a Smart Phone, a Laptop, a Car, a House, or anything you can think about.'
                }
              </Text>
            </View>

            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="white" name="receipt" />
              <Text style={sharedStyles.aboutIconText}>Enter Lottery</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {
                  'Pay a fee of 1,000 Japanese Yen and enter a lottery to have a chance to win any item of your choice.'
                }
              </Text>
            </View>

            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="white" name="star" />
              <Text style={sharedStyles.aboutIconText}>Win</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {
                  'Once the total price of your chosen item has been collected, the lottery will start and a radom user will win the item.'
                }
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// UpdateUser.propTypes = {
//   user: PropTypes.object,
//   onClose: PropTypes.func,
//   updateUserAction: PropTypes.func,
// };

export default About;
