import React, {useState} from 'react';
import {Text, View, Modal, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button, Icon, ActionButton, Drawer} from 'react-native-material-ui';
import {Toolbar} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';

const AdDetails = props => {
  const {item} = props;
  console.log('AdDetailsAdDetailsAdDetailsAdDetailsAdDetails: ', item);
  const {
    name,
    description,
    id,
    category,
    currency,
    price,
    country,
    prefecture,
    publishDate,
    cancelDate,
    status,
    userId,
    cancelled,
    available,
    lotteryUserIds,
    winnerUserId,
    currentCollectedPrice,
    images,
  } = item;
  const [modalVisible, setModalVisible] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleMovePreviousPhoto = () => {
    let index = currentPhotoIndex;
    index = index <= 0 ? images.length - 1 : --index;
    setCurrentPhotoIndex(index);
  };

  const handleMoveNextPhoto = () => {
    let index = currentPhotoIndex;
    index = index >= images.length - 1 ? 0 : ++index;
    setCurrentPhotoIndex(index);
  };

  const onModalDissmiss = () => {
    invoke(props, 'onClose');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleActionPress = value => {
    // alert(value);
  };

  const handleEnterDraw = () => {};

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
          rightElement={
            <Button
              onPress={handleEnterDraw}
              // disabled={loading || !adDataChanged}
              raised
              text="Enter Draw"
              icon="shop"
            />
          }
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
                uri: images[currentPhotoIndex],
                cache: 'force-cache',
                // headers: {
                //   Pragma: 'only-if-cached',
                //   'Cache-Control': 'only-if-cached',
                // },
              }}
              style={sharedStyles.adDetailsImage}
            />
            {images.length > 1 && (
              <>
                <Button
                  text=""
                  // icon="white"
                  icon={
                    <Icon
                      size={50}
                      style={{
                        alignSelf: 'center',
                        marginTop: -6,
                        marginLeft: -5,
                      }}
                      name="chevron-left"
                      color="white"
                    />
                  }
                  size={50}
                  onPress={handleMovePreviousPhoto}
                  style={{
                    container: {
                      position: 'absolute',
                      left: 0,
                      paddingHorizontal: 0,
                      paddingVertical: 0,
                      borderRadius: 0,
                      width: 35,
                      alignSelf: 'center',
                      backgroundColor: 'black',
                    },
                  }}
                />
                <Button
                  text=""
                  icon={
                    <Icon
                      size={50}
                      name="chevron-right"
                      color="white"
                      style={{
                        alignSelf: 'center',
                        marginTop: -6,
                        marginLeft: -2,
                      }}
                    />
                  }
                  onPress={handleMoveNextPhoto}
                  style={{
                    container: {
                      position: 'absolute',
                      right: 0,
                      width: 35,
                      borderRadius: 0,
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: 'black',
                    },
                  }}
                />
              </>
            )}
          </View>
          <View style={sharedStyles.adDetailsContainer}>
            <Drawer
              style={{
                container: {borderRadius: 20, marginBottom: 20},
              }}>
              <Drawer.Section
                title="Total price"
                items={[
                  {
                    icon: 'local-atm',
                    value: `${currency} ${price}`,
                  },
                ]}
              />
              <Drawer.Section
                title="Collected price"
                items={[
                  {
                    icon: 'credit-card',
                    value: `${currency} ${currentCollectedPrice || 0}`,
                  },
                ]}
              />
              <Drawer.Section
                title="Pay to win ithe item in Lottery"
                items={[
                  {
                    icon: 'monetization-on',
                    value: `${currency} ${'1000'}`,
                  },
                ]}
              />
            </Drawer>
            <Drawer style={{container: {borderRadius: 20, marginBottom: 20}}}>
              <Drawer.Section
                title="Name"
                items={[
                  {
                    icon: 'dns',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {name}
                      </Text>
                    ),
                  },
                ]}
              />
              <Drawer.Section
                title="Description"
                items={[
                  {
                    icon: 'description',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {description}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
            </Drawer>

            <Drawer style={{container: {borderRadius: 20, marginBottom: 20}}}>
              <Drawer.Section
                title="Status"
                items={[
                  {
                    icon: 'exposure',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {status}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
              <Drawer.Section
                title="Category"
                items={[
                  {
                    icon: 'class',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {category}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
            </Drawer>

            <Drawer style={{container: {borderRadius: 20, marginBottom: 20}}}>
              <Drawer.Section
                title="Publish date"
                items={[
                  {
                    icon: 'today',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {publishDate}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
              <Drawer.Section
                title="Location"
                items={[
                  {
                    icon: 'pin-drop',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {`${prefecture}, ${country}`}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
            </Drawer>

            <Drawer style={{container: {borderRadius: 20, marginBottom: 20}}}>
              <Drawer.Section
                title="Current lottery users"
                items={[
                  {
                    icon: 'group-add',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {lotteryUserIds}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />

              <Drawer.Section
                title="User"
                items={[
                  {
                    icon: 'person',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {userId}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
            </Drawer>

            <Drawer style={{container: {borderRadius: 20, marginBottom: 20}}}>
              <Drawer.Section
                title="Item ID"
                items={[
                  {
                    icon: 'fingerprint',
                    value: (
                      <Text
                        style={{fontWeight: '500', color: 'rgba(0,0,0,.8)'}}>
                        {id}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
            </Drawer>

            <Text>{cancelled}</Text>
            <Text>{available}</Text>
            <Text>{cancelDate}</Text>
            <Text>{lotteryUserIds}</Text>
            <Text>{winnerUserId}</Text>
            {/* <ActionButton icon="done" /> */}
          </View>
        </ScrollView>
        <ActionButton
          style={{
            container: {
              shadowRadius: 1,
            },
          }}
          onPress={handleActionPress}
          actions={['share', 'favorite', 'shop']}
          icon="more-vert"
          transition="speedDial"
        />
      </SafeAreaView>
    </Modal>
  );
};

AdDetails.propTypes = {
  item: PropTypes.object,
};

const mapStateToProps = ({lotteriesReducer}) => {
  return {
    lotteries: lotteriesReducer.lotteries,
  };
};

const mapDispatchToProps = () => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
