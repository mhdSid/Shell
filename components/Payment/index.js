import React, {createRef, useRef, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, Text, ScrollView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Icon, Button, Toolbar} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import {
  payment as paymentTexts,
  about as aboutTexts,
} from '../../Constants/Texts';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CreditCardInput} from 'react-native-credit-card-input';
import {getUserSelector, getLoggedInSelector} from './Selectors';
import NoAuth from '../NoAuth';
import {handleEnterLottery} from '../../redux/Payment/EnterLottery';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import {successConfirmationModal as successConfirmationModalTexts} from '../../Constants/Texts';
import ListItem from '../Home/ListItem';

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

  const creditCardInputRef = useRef();

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
      setTimeout(() => {
        creditCardInputRef.current.focus('number');
      }, 200);
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
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={paymentTexts.joinLottery}
            onLeftElementPress={handleCloseModal}
          />
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
                // autoFocus={true}
                inputStyle={sharedStyles.creditInput}
                onChange={onCreditChange}
                ref={creditCardInputRef}
              />
            </View>
            <View style={sharedStyles.paymentCurrentCartContainer}>
              <View style={sharedStyles.paymentLotteryListItem}>
                <ListItem
                  item={lottery}
                  disableActions={true}
                  disableBorder={true}
                  rounded={true}
                />
              </View>
              <View
                style={[
                  sharedStyles.paymentCurrentCartInvoiceItem,
                  sharedStyles.paymentCurrentCartInvoiceItemMargin,
                ]}>
                <Text style={sharedStyles.paymentCurrentCartInvoiceText}>
                  {paymentTexts.tax}
                </Text>
                <Text style={sharedStyles.paymentCurrentCartInvoiceText}>
                  {paymentTexts.taxFee}
                </Text>
              </View>
              <View
                style={[
                  sharedStyles.paymentCurrentCartInvoiceItem,
                  sharedStyles.paymentCurrentCartInvoiceItemMargin,
                ]}>
                <Text style={sharedStyles.paymentCurrentCartInvoiceText}>
                  {paymentTexts.joinLottery}
                </Text>
                <Text style={sharedStyles.paymentCurrentCartInvoiceText}>
                  {paymentTexts.fee}
                </Text>
              </View>
              <View style={sharedStyles.paymentCurrentCartInvoiceItem}>
                <Text style={sharedStyles.paymentCurrentCartInvoiceText}>
                  {paymentTexts.total}
                </Text>
                <Text style={sharedStyles.paymentCurrentCartInvoiceText}>
                  {paymentTexts.fee}
                </Text>
              </View>
            </View>
            <View style={sharedStyles.btnContainer}>
              <Button
                raised
                primary
                disabled={loading || !isValid}
                icon="payment"
                text={paymentTexts.submit}
                style={{
                  container:
                    loading || !isValid
                      ? sharedStyles.paymentBtnContainerDisabled
                      : sharedStyles.paymentBtnContainer,
                }}
                onPress={handlePayment}
              />
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="black" name="receipt" />
              <Text
                style={[sharedStyles.aboutIconText, sharedStyles.paymentText]}>
                {aboutTexts.enterLottery}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {aboutTexts.howToUseTenth}
              </Text>
            </View>
            <View style={sharedStyles.aboutIconTextContainer}>
              <Icon color="black" name="star" />
              <Text
                style={[sharedStyles.aboutIconText, sharedStyles.paymentText]}>
                {aboutTexts.joinLottery}
              </Text>
            </View>
            <View
              style={[
                sharedStyles.aboutFirstSectionTextContainer,
                sharedStyles.paymentSectionMarginBottom,
              ]}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {aboutTexts.howToUseEleventh}
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
