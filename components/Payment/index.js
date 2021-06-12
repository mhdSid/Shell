import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, Text, ScrollView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon, Button} from 'react-native-material-ui';
import {SimpleLoaderDefault} from '../Loading';
import {payment, about} from '../../Constants/Texts';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CreditCardInput} from 'react-native-credit-card-input';
import {
  getUserSelector,
  getLoggedInSelector,
  getAdDetailsSelector,
} from './Selectors';
import NoAuth from '../NoAuth';
import {handleEnterLottery} from '../../redux/Payment/EnterLottery';

const Payment = props => {
  const {user, loggedIn, ad} = props;
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const onCreditChange = data => {
    console.log(data);
  };
  const onError = () => {
    setLoading(false);
  };
  const handlePayment = () => {
    setLoading(true);
    invoke(props, 'handleEnterLottery', {
      onSuccess: handleCloseModal,
      onError: onError,
      adId: ad.id,
      userId: user.id,
      email: user.email,
      password: user.password,
    });
  };

  if (!loggedIn || !user) {
    return <NoAuth />;
  }
  return (
    <Modal animationType="slide">
      <SafeAreaView style={sharedStyles.fullheightView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            loading && sharedStyles.paymentSafeViewContentContainer
          }
          style={[
            sharedStyles.aboutContainer,
            sharedStyles.paymentSafeViewContainer,
          ]}>
          {loading && SimpleLoaderDefault}
          {!loading && (
            <>
              <View style={sharedStyles.creditContainer}>
                <CreditCardInput
                  allowScroll={true}
                  inputStyle={sharedStyles.creditInput}
                  onChange={onCreditChange}
                />
              </View>
              <View style={sharedStyles.aboutIconTextContainer}>
                <Icon color="black" name="receipt" />
                <Text
                  style={[
                    sharedStyles.aboutIconText,
                    sharedStyles.paymentText,
                  ]}>
                  {about.enterLottery}
                </Text>
              </View>
              <View style={sharedStyles.aboutFirstSectionTextContainer}>
                <Text style={sharedStyles.aboutFirstSectionText}>
                  {about.howToUseTenth}
                </Text>
              </View>
              <View style={sharedStyles.aboutIconTextContainer}>
                <Icon color="black" name="star" />
                <Text
                  style={[
                    sharedStyles.aboutIconText,
                    sharedStyles.paymentText,
                  ]}>
                  {about.win}
                </Text>
              </View>
              <View style={sharedStyles.aboutFirstSectionTextContainer}>
                <Text style={sharedStyles.aboutFirstSectionText}>
                  {about.howToUseEleventh}
                </Text>
              </View>
              <View style={sharedStyles.btnContainer}>
                <View style={sharedStyles.paymentBtn}>
                  <Button
                    raised
                    primary
                    icon="payment"
                    text={payment.submit}
                    style={{container: sharedStyles.paymentBtnContainer}}
                    onPress={handlePayment}
                  />
                </View>
                <View style={sharedStyles.paymentBtn}>
                  <Button text={payment.cancel} onPress={handleCloseModal} />
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

Payment.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    loggedIn: getLoggedInSelector(state),
    ad: getAdDetailsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleEnterLottery: payload => dispatch(handleEnterLottery(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payment);
