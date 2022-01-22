import React, {useEffect, useRef, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import styles from './paymentInformation.style';
import {Toolbar, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {paymentInformation} from '../../constants/Texts';
import {CreditCardInput} from 'react-native-credit-card-input';
import {handlerUpdateUserData} from '../../redux/Auth/UpdateUser';
import {getUserSelector} from '../UpdateUser/Selectors';
import {connect} from 'react-redux';
import {getLangSelector} from '../Settings/Selectors';

const PaymentInformation = props => {
  const {user, lang} = props;
  const [loading, setLoading] = useState(false);
  const creditCardInputRef = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState(null);
  const [creditCardExpiryDate, setCreditCardExpiryDate] = useState(null);
  const [creditCardCVC, setCreditCardCVC] = useState(null);
  const [creditCardType, setCreditCardType] = useState(null);
  const [creditCardNumberChanged, setCreditCardNumberChanged] = useState(false);
  const [
    creditCardExpiryDateChanged,
    setCreditCardExpiryDateChanged,
  ] = useState(false);
  const [creditCardCVCChanged, setCreditCardCVCChanged] = useState(false);
  const [creditCardTypeChanged, setCreditCardTypeChanged] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);

  const onCreditChange = data => {
    if (data) {
      const {status} = data;
      const {cvc, expiry, type} = data.values;
      const number =
        data.values.number && data.values.number.replace(/\s/g, '');
      setCreditCardCVC(cvc);
      setCreditCardExpiryDate(expiry);
      setCreditCardNumber(number);
      setCreditCardType(type);
      setCreditCardCVCChanged(
        status.cvc === 'valid' && cvc !== user.creditCardCVC,
      );
      setCreditCardExpiryDateChanged(
        status.expiry === 'valid' && expiry !== user.creditCardExpiryDate,
      );
      setCreditCardNumberChanged(
        status.number === 'valid' && number !== user.creditCardNumber,
      );
      setCreditCardTypeChanged(
        status.type === 'valid' && type !== user.creditCardType,
      );
      setIsValid(data.valid);
    }
  };
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const setDefaultsDataChanged = () => {
    setLoading(false);
    setIsValid(false);
    setUserDataChanged(false);
    setCreditCardCVCChanged(false);
    setCreditCardExpiryDateChanged(false);
    setCreditCardNumberChanged(false);
    setCreditCardTypeChanged(false);
  };
  const onSuccessCallback = () => {
    setDefaultsDataChanged();
    handleCloseModal();
  };
  const handleUpdateUserPaymentInfo = () => {
    if ((isValid && userDataChanged) || isValid) {
      const updatedUserData = {
        id: user.id,
        email: user.email,
        creditCardNumber,
        creditCardExpiryDate,
        creditCardCVC,
        creditCardType,
      };
      setLoading(true);
      invoke(props, 'handleUpdateUserData', {
        onError: setDefaultsDataChanged,
        onSuccess: onSuccessCallback,
        updatedUserData,
      });
    }
  };
  const onShowModal = () => {
    if (creditCardInputRef && creditCardInputRef.current && user) {
      creditCardInputRef.current.setValues({
        ...(user.creditCardCVC && {cvc: user.creditCardCVC}),
        ...(user.creditCardExpiryDate && {expiry: user.creditCardExpiryDate}),
        ...(user.creditCardNumber && {number: user.creditCardNumber}),
      });
      setTimeout(() => {
        creditCardInputRef.current.focus('number');
      }, 50);
    }
  };
  useEffect(() => {
    setUserDataChanged(
      creditCardCVCChanged ||
        creditCardExpiryDateChanged ||
        creditCardNumberChanged ||
        creditCardTypeChanged,
    );
  }, [
    creditCardCVCChanged,
    creditCardExpiryDateChanged,
    creditCardNumberChanged,
    creditCardTypeChanged,
    creditCardNumber,
    user,
    creditCardCVC,
    creditCardType,
    creditCardExpiryDate,
  ]);

  return (
    <Modal
      animationType="slide"
      onShow={onShowModal}
      onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{
              container: styles.toolbarContainer,
            }}
            leftElement="arrow-back"
            centerElement={paymentInformation[lang].creditCard}
            onLeftElementPress={handleCloseModal}
          />
          {loading && loadingPopup}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrollViewContainer}>
              <View style={styles.creditCardInputViewContainer}>
                <CreditCardInput
                  ref={creditCardInputRef}
                  allowScroll={true}
                  inputStyle={styles.creditCardInputContainer}
                  onChange={onCreditChange}
                />
              </View>
              <View style={styles.submitButtonViewContainer}>
                <Button
                  disabled={loading || !userDataChanged || !isValid}
                  raised={true}
                  primary
                  style={{container: styles.submitButtonContainer}}
                  text={paymentInformation[lang].submit}
                  onPress={handleUpdateUserPaymentInfo}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

paymentInformation.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
  updateUserAction: PropTypes.func,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdateUserData: payload => dispatch(handlerUpdateUserData(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentInformation);
