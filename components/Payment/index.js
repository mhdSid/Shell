import React, {useRef, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, Text, ScrollView} from 'react-native';
import styles from './payment.style';
import {Icon, Button, Toolbar} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import {
  payment as paymentTexts,
  about as aboutTexts,
} from '../../constants/Texts';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CreditCardInput} from 'react-native-credit-card-input';
import {getUserSelector, getLoggedInSelector} from './Selectors';
import NoAuth from '../NoAuth';
import {handleEnterLottery} from '../../redux/Payment/EnterLottery';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import {successConfirmationModal as successConfirmationModalTexts} from '../../constants/Texts';
import ListItem from '../Home/ListItem';
import {getLangSelector} from '../Settings/Selectors';

let SuccessConfirmationModal = null;

const Payment = React.memo(props => {
  const {user, loggedIn, lotteryDetails, item, lang} = props;
  const lottery = item || lotteryDetails;
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
    if (item.winnerUserId || lotteryDetails.winnerUserId) {
      return handleCloseModal();
    }
    setDefaultsDataChanged();
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
      text: successConfirmationModalTexts[lang].payment.actions.joinAgain.text,
      icon: successConfirmationModalTexts[lang].payment.actions.joinAgain.icon,
      onPress: handleSuccessConfirmationModalJoinAgain,
    },
    {
      text: successConfirmationModalTexts[lang].payment.actions.goBack.text,
      icon: successConfirmationModalTexts[lang].payment.actions.goBack.icon,
      onPress: handleSuccessConfirmationModalGoBack,
    },
  ];

  if (!loggedIn || !user) {
    return <NoAuth lang={lang} />;
  }

  return (
    <Modal
      animationType="slide"
      onShow={onShowModal}
      onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          {showSuccessConfirmationModal ? (
            <SuccessConfirmationModal
              title={successConfirmationModalTexts[lang].payment.title}
              subtitle={successConfirmationModalTexts[lang].payment.subtitle}
              onClose={handleCloseModal}
              actions={successModalActions}
              lang={lang}
            />
          ) : null}
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={paymentTexts[lang].joinLottery}
            onLeftElementPress={handleCloseModal}
          />
          {loading ? loadingPopup : null}
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.creditCardInputViewContainer}>
              <CreditCardInput
                allowScroll={true}
                inputStyle={styles.creditInputContainer}
                onChange={onCreditChange}
                ref={creditCardInputRef}
              />
            </View>
            <View style={styles.currentCartViewContainer}>
              <View style={styles.lotteryListItemViewContainer}>
                <ListItem
                  item={lottery}
                  disableActions={true}
                  disableBorder={true}
                  rounded={true}
                />
              </View>
              <View
                style={[
                  styles.currentCartInvoiceItemContainer,
                  styles.currentCartInvoiceItemContainerMargin,
                ]}>
                <Text style={styles.currentCartInvoiceItemText}>
                  {paymentTexts[lang].tax}
                </Text>
                <Text style={styles.currentCartInvoiceItemText}>
                  {paymentTexts[lang].taxFee}
                </Text>
              </View>
              <View
                style={[
                  styles.currentCartInvoiceItemContainer,
                  styles.currentCartInvoiceItemContainerMargin,
                ]}>
                <Text style={styles.currentCartInvoiceItemText}>
                  {paymentTexts[lang].joinLottery}
                </Text>
                <Text style={styles.currentCartInvoiceItemText}>
                  {paymentTexts[lang].fee}
                </Text>
              </View>
              <View style={styles.currentCartInvoiceItemContainer}>
                <Text style={styles.currentCartInvoiceItemText}>
                  {paymentTexts[lang].total}
                </Text>
                <Text style={styles.currentCartInvoiceItemText}>
                  {paymentTexts[lang].fee}
                </Text>
              </View>
            </View>
            <View style={styles.paymentButtonViewContainer}>
              <Button
                raised
                primary
                disabled={loading || !isValid}
                icon="payment"
                text={paymentTexts[lang].submit}
                style={{
                  container:
                    loading || !isValid
                      ? styles.paymentButtonContainerDisabled
                      : styles.paymentButtonContainer,
                }}
                onPress={handlePayment}
              />
            </View>
            <View style={styles.iconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="receipt" />
              <Text style={styles.iconText}>
                {aboutTexts[lang].enterLottery}
              </Text>
            </View>
            <View style={styles.sectionBlockContainer}>
              <Text style={styles.sectionBlockContainerText}>
                {aboutTexts[lang].howToUseTenth}
              </Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="star" />
              <Text style={styles.iconText}>
                {aboutTexts[lang].joinLottery}
              </Text>
            </View>
            <View
              style={[
                styles.sectionBlockContainer,
                styles.sectionBlockContainerMargin,
              ]}>
              <Text style={styles.sectionBlockContainerText}>
                {aboutTexts[lang].howToUseEleventh}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
});

Payment.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  onClose: PropTypes.func,
  item: PropTypes.object,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    loggedIn: getLoggedInSelector(state),
    lotteryDetails: getLotteryDetailsSelector(state),
    lang: getLangSelector(state),
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
