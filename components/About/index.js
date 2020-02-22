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
        style={[sharedStyles.container, {backgroundColor: '#b69cf6'}]}>
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
                container: {borderRadius: 20, marginBottom: 20},
              }}>
              <Drawer.Section
                title="Sell"
                style={{
                  container: {
                    paddingTop: 70,
                    paddingBottom: 180,
                  },
                }}
                items={[
                  {
                    icon: 'store',
                    value: (
                      <View
                        style={{
                          fontWeight: '500',
                          color: 'rgba(0,0,0,.8)',
                          height: 250,
                          top: 15,
                          lineHeight: 20,
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                        <Text style={{width: '100%', marginBottom: 10}}>
                          Are you having problems selling any item you can think
                          about?
                        </Text>
                        <Text style={{width: '100%', marginBottom: 10}}>
                          It's not about selling anymore!
                        </Text>
                        <Text style={{width: '100%', marginBottom: 10}}>
                          Post an Ad about anything!
                        </Text>
                        <Text style={{width: '100%', marginBottom: 10}}>
                          Users pay a fee to enter a Lottery to have a chance to
                          win the item in your Ad.
                        </Text>
                        <Text style={{width: '100%', marginBottom: 10}}>
                          Once the total amount is collected, our system starts
                          a Lottery and a random user wins the item in your Ad.
                        </Text>
                        <Text style={{width: '100%', marginBottom: 10}}>
                          The winner takes the item and you take the collected
                          cash which is the price that you initially entered.
                        </Text>
                      </View>
                    ),
                  },
                ]}
              />
            </Drawer>

            <View
              style={{
                paddingTop: 20,
                paddingHorizontal: 20,
                paddingBottom: 40,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'rgba(0,0,0,.5)',
                  //   height: 70,
                  //   top: 15,
                  //   lineHeight: 20,
                }}>
                Or
              </Text>
            </View>

            <Drawer
              style={{
                container: {borderRadius: 20, marginBottom: 20},
              }}>
              <Drawer.Section
                title="Browse"
                style={{
                  container: {
                    paddingBottom: 20,
                  },
                }}
                items={[
                  {
                    icon: 'remove-red-eye',
                    value: (
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'rgba(0,0,0,.8)',
                          height: 70,
                          top: 15,
                          lineHeight: 20,
                        }}>
                        {'Browser through a wide variety of uploaded Ads!'}
                      </Text>
                    ),
                  },
                ]}
              />
            </Drawer>

            <Drawer
              style={{
                container: {borderRadius: 20, marginBottom: 20},
              }}>
              <Drawer.Section
                title="Choose"
                style={{
                  container: {
                    paddingBottom: 45,
                  },
                }}
                items={[
                  {
                    icon: 'remove-red-eye',
                    value: (
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'rgba(0,0,0,.8)',
                          height: 110,
                          top: 25,
                          lineHeight: 20,
                        }}>
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
                container: {borderRadius: 20, marginBottom: 20},
              }}>
              <Drawer.Section
                title="Enter Lottery"
                style={{
                  container: {
                    paddingBottom: 30,
                  },
                }}
                items={[
                  {
                    icon: 'receipt',
                    value: (
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'rgba(0,0,0,.8)',
                          height: 100,
                          top: 25,
                          lineHeight: 20,
                        }}>
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
                container: {borderRadius: 20, marginBottom: 20},
              }}>
              <Drawer.Section
                title="Win"
                style={{
                  container: {
                    paddingBottom: 40,
                  },
                }}
                items={[
                  {
                    icon: 'star',

                    value: (
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'rgba(0,0,0,.8)',
                          height: 120,
                          top: 25,
                          lineHeight: 20,
                        }}>
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
