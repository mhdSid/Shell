import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, IconToggle, Drawer} from 'react-native-material-ui';
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
            <Drawer
              style={{
                container: sharedStyles.drawerContainer,
              }}>
              <Drawer.Section
                title="Sell"
                style={{
                  container: sharedStyles.aboutFirstSection,
                }}
                items={[
                  {
                    icon: 'store',
                    value: (
                      <View style={sharedStyles.aboutFirstSectionTextContainer}>
                        <Text style={sharedStyles.aboutFirstSectionText}>
                          Are you having problems selling any item you can think
                          about?
                        </Text>
                        <Text style={sharedStyles.aboutFirstSectionText}>
                          It's not about selling anymore!
                        </Text>
                        <Text style={sharedStyles.aboutFirstSectionText}>
                          Post an Ad about anything!
                        </Text>
                        <Text style={sharedStyles.aboutFirstSectionText}>
                          Users pay a fee to enter a Lottery to have a chance to
                          win the item in your Ad.
                        </Text>
                        <Text style={sharedStyles.aboutFirstSectionText}>
                          Once the total amount is collected, our system starts
                          a Lottery and a random user wins the item in your Ad.
                        </Text>
                        <Text style={sharedStyles.aboutFirstSectionText}>
                          The winner takes the item and you take the collected
                          cash which is the price that you initially entered.
                        </Text>
                      </View>
                    ),
                  },
                ]}
              />
            </Drawer>

            <View style={sharedStyles.aboutSeparatorSection}>
              <Text style={sharedStyles.aboutSeparatorSectionText}>Or</Text>
            </View>

            <Drawer
              style={{
                container: sharedStyles.drawerContainer,
              }}>
              <Drawer.Section
                title="Browse"
                style={{
                  container: sharedStyles.aboutSecondSection,
                }}
                items={[
                  {
                    icon: 'remove-red-eye',
                    value: (
                      <Text style={sharedStyles.aboutSecondSectionText}>
                        {'Browser through a wide variety of uploaded Ads!'}
                      </Text>
                    ),
                  },
                ]}
              />
            </Drawer>

            <Drawer
              style={{
                container: sharedStyles.drawerContainer,
              }}>
              <Drawer.Section
                title="Choose"
                style={{
                  container: sharedStyles.aboutThirdSection,
                }}
                items={[
                  {
                    icon: 'remove-red-eye',
                    value: (
                      <Text style={sharedStyles.aboutThirdSectionText}>
                        {
                          'Make sure you choose any item you love. It can be a Smart Phone, a Laptop, a Car, a House, or anything you can think about.'
                        }
                      </Text>
                    ),
                  },
                ]}
              />
            </Drawer>
            <Drawer
              style={{
                container: sharedStyles.drawerContainer,
              }}>
              <Drawer.Section
                title="Enter Lottery"
                style={{
                  container: sharedStyles.aboutFourthSection,
                }}
                items={[
                  {
                    icon: 'receipt',
                    value: (
                      <Text style={sharedStyles.aboutFourthSectionText}>
                        {
                          'Pay a fee of 1,000 Japanese Yen and enter a lottery to have a chance to win any item of your choice.'
                        }
                      </Text>
                    ),
                  },
                ]}
              />
            </Drawer>
            <Drawer
              style={{
                container: sharedStyles.drawerContainer,
              }}>
              <Drawer.Section
                title="Win"
                style={{
                  container: sharedStyles.aboutFifthSection,
                }}
                items={[
                  {
                    icon: 'star',

                    value: (
                      <Text style={sharedStyles.aboutFifthSectionText}>
                        {
                          'Once the total price of your chosen item has been collected, the lottery will start and a radom user will win the item.'
                        }
                      </Text>
                    ),
                  },
                ]}
              />
            </Drawer>
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
