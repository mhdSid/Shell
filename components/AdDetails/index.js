import React, {useState} from 'react';
import {Text, View, Modal, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button, Icon} from 'react-native-material-ui';
import {Toolbar} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {CachedImage} from 'react-native-cached-image';

const AdDetails = props => {
  const {item} = props;
  const {
    name,
    description,
    id,
    category,
    currency,
    price,
    country,
    perfecture,
    publishDate,
    cancelDate,
    status,
    userId,
    cancelled,
    available,
    lotteryUserIds,
    winnerUserId,
    currentCollectedPrice,
  } = item;
  let {images} = item;
  images = images.filter(Boolean);
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
          <View style={sharedStyles.innerContainer}>
            <Text>{`${currency} ${price}`}</Text>
            <Text>
              Current Collected Price:
              {` ${currency} ${currentCollectedPrice || 0}`}
            </Text>

            <Text>{name}</Text>
            <Text>{description}</Text>
            <Text>{id}</Text>
            <Text>{category}</Text>
            {images &&
              images.map((image, index) => <Text key={index}>{image}</Text>)}
            <Text>{country}</Text>
            <Text>{perfecture}</Text>
            <Text>{publishDate}</Text>
            <Text>{status}</Text>
            <Text>{userId}</Text>
            <Text>{cancelled}</Text>
            <Text>{available}</Text>
            <Text>{cancelDate}</Text>
            <Text>{lotteryUserIds}</Text>
            <Text>{winnerUserId}</Text>
          </View>
        </ScrollView>
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
