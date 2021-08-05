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
import {
  getUserSelector,
  getLoggedInSelector,
} from './Selectors';
import NoAuth from '../NoAuth';
import {handleEnterLottery} from '../../redux/Payment/EnterLottery';
import { getLotteryDetailsSelector } from '../Pinger/Selectors';

const Payment = props => {
  const {user, loggedIn, lottery} = props;
  const [loading, setLoading] = useState(false);
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
    setIsValid(false);
  };
  const onError = () => {
    setDefaultsDataChanged();
  };
  const handlePayment = () => {
    setLoading(true);
    invoke(props, 'handleEnterLottery', {
      onSuccess: handleCloseModal,
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

  if (!loggedIn || !user) {
    return <NoAuth />;
  }
  return (
    <Modal
      animationType="slide"
      onShow={onShowModal}
      onRequestClose={handleCloseModal}>
      {loading && loadingPopup}
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.fullheightView]}>
        <View style={sharedStyles.innerSafeAreaView}>
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
              <View style={sharedStyles.paymentBtn}>
                <Button text={payment.cancel} onPress={handleCloseModal} />
              </View>
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
