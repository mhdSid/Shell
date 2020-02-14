import React, {useState} from 'react';
import {Text, View, Modal, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';

const AdDetails = props => {
  const {item} = props;
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onDismiss={() => {
        invoke(props, 'onClose');
      }}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{
            container: {
              height: 55,
              borderBottomColor: 'black',
              borderBottomWidth: 2,
            },
          }}
          leftElement="arrow-back"
          onLeftElementPress={() => {
            setModalVisible(false);
          }}
        />

        <View style={sharedStyles.innerContainer}>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>{item.id}</Text>
          <Text>{item.category}</Text>
          <Text>{item.image}</Text>
          <Text>{`${item.currency} ${item.price}`}</Text>
          <Text>{item.country}</Text>
          <Text>{item.perfecture}</Text>
          <Text>{item.publishDate}</Text>
          <Text>{item.status}</Text>
          <Text>{item.userId}</Text>
        </View>
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
