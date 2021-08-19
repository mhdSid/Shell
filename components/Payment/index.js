import React, {createRef, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, Text, ScrollView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Icon, Button} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import {payment, about} from '../../Constants/Texts';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CreditCardInput} from 'react-native-credit-card-input';
import {getUserSelector, getLoggedInSelector} from './Selectors';
import NoAuth from '../NoAuth';
import {handleEnterLottery} from '../../redux/Payment/EnterLottery';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import {successConfirmationModal as successConfirmationModalTexts} from '../../Constants/Texts';

let SuccessConfirmationModal = null;

const Payment = props => {
  const {user, loggedIn, lottery} = props;
  const [loading, setLoading] = useState(false);
  const [
    showSuccessConfirmationModal,
    setShowSuccessConfirmationModal,
  ] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [creditCardCVC, setCreditCardCVC] = useState(false);
  const [creditCardExpiryDate, setCreditCardExpiryDate] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState(false);
  const [creditCardType, setCreditCardType] = useState(false);

  const creditCardInputRef = createRef();

  const onShowModal = () => {
    if (
      user.creditCardNumber &&
      user.creditCardExpiryDate &&
      user.creditCardCVC
    ) {
      creditCardInputRef.current.setValues({
        number: user.creditCardNumber,
        expiry: user.creditCardExpiryDate,
        cvc: user.creditCardCVC,
      });
      setIsValid(true);
    }
  };
  const handleCloseModal = () => {
    setDefaultsDataChanged();
    invoke(props, 'onClose');
  };
  const onCreditChange = data => {
    if (data) {
      const {cvc, expiry, type} = data.values;
      const number =
        data.values.number && data.values.number.replace(/\s/g, '');
      setCreditCardCVC(cvc);
      setCreditCardExpiryDate(expiry);
      setCreditCardNumber(number);
      setCreditCardType(type);
      setIsValid(data.valid);
    }
  };
  const setDefaultsDataChanged = () => {
    setLoading(false);
    setIsValid(true);
  };
  const onError = () => {
    setDefaultsDataChanged();
  };
  const handlePaymentSuccess = () => {
    setDefaultsDataChanged();
    // invoke(props, 'onClose');
    if (!SuccessConfirmationModal) {
      SuccessConfirmationModal = require('../SuccessConfirmationModal').default;
    }
    setShowSuccessConfirmationModal(true);
  };
  const handlePayment = () => {
    setLoading(true);
    invoke(props, 'handleEnterLottery', {
      onSuccess: handlePaymentSuccess,
      onError: onError,
      adId: lottery.id,
      userId: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      creditCardNumber,
      creditCardCVC,
      creditCardExpiryDate,
      creditCardType,
    });
  };
  const handleSuccessConfirmationModalJoinAgain = () => {
    setShowSuccessConfirmationModal(false);
  };
  const handleSuccessConfirmationModalGoBack = () => {
    setShowSuccessConfirmationModal(false);
    invoke(props, 'onClose');
  };
  const successModalActions = [
    {
      text: successConfirmationModalTexts.payment.actions.joinAgain.text,
      icon: successConfirmationModalTexts.payment.actions.joinAgain.icon,
      onPress: handleSuccessConfirmationModalJoinAgain,
    },
    {
      text: successConfirmationModalTexts.payment.actions.goBack.text,
      icon: successConfirmationModalTexts.payment.actions.goBack.icon,
      onPress: handleSuccessConfirmationModalGoBack,
    },
  ];

  if (!loggedIn || !user) {
    return <NoAuth />;
  }
  return (
    <Modal
      animationType="slide"
      onShow={onShowModal}
      onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.fullheightView]}>
        <View style={sharedStyles.innerSafeAreaView}>
          {showSuccessConfirmationModal ? (
            <SuccessConfirmationModal
              title={successConfirmationModalTexts.payment.title}
              subtitle={successConfirmationModalTexts.payment.subtitle}
              onClose={handleCloseModal}
              actions={successModalActions}
            />
          ) : null}
          {loading ? loadingPopup : null}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[
              sharedStyles.aboutContainer,
              sharedStyles.paymentSafeViewContainer,
            ]}>
            <View style={sharedStyles.creditContainer}>
              <CreditCardInput
                allowScroll={true}
                autoFocus={true}
                inputStyle={sharedStyles.creditInput}
                onChange={onCreditChange}
                ref={creditCardInputRef}
              />
            </View>
            <View style={sharedStyles.btnContainer}>
              <View style={sharedStyles.paymentBtn}>
                <Button
                  raised
                  primary
                  disabled={loading || !isValid}
                  icon="payment"
                  text={payment.submit}
                  style={{
                    container:
                      loading || !isValid
                        ? sharedStyles.paymentBtnContainerDisabled
                        : sharedStyles.paymentBtnContainer,
                  }}
                  onPress={handlePayment}
                />
              </View>
              <Button text={payment.cancel} onPress={handleCloseModal} />
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="black" name="receipt" />
              <Text
                style={[sharedStyles.aboutIconText, sharedStyles.paymentText]}>
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
                style={[sharedStyles.aboutIconText, sharedStyles.paymentText]}>
                {about.joinLottery}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {about.howToUseEleventh}
              </Text>
            </View>
          </ScrollView>
        </View>
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
    lottery: getLotteryDetailsSelector(state),
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
