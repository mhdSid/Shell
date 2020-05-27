import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, View, Text, ScrollView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Toolbar, Icon, Button} from 'react-native-material-ui';
import {Loading} from '../Loading';
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

const Payment = props => {
  const {user, loggedIn, ad} = props;
  console.log('user: ', user);
  console.log('loggedIn: ', loggedIn);
  console.log('ad: ', ad);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const onCreditChange = data => {
    console.log(data);
  };

  if (!loggedIn || !user) {
    return <NoAuth />;
  }
  return (
    <Modal animationType="slide">
      <SafeAreaView
        style={[sharedStyles.container, sharedStyles.aboutSafeViewContainer]}>
        <Toolbar
          style={{
            container: sharedStyles.toolbarContainer,
          }}
          // leftElement="arrow-back"
          centerElement={
            <Text style={sharedStyles.paymentTitle}>{payment.title}</Text>
          }
          // onLeftElementPress={handleCloseModal}
        />
        {loading && Loading}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={sharedStyles.aboutContainer}>
          <View style={sharedStyles.creditContainer}>
            <CreditCardInput
              inputStyle={sharedStyles.creditInput}
              onChange={onCreditChange}
            />
          </View>
          <View style={sharedStyles.aboutIconTextContainer}>
            <Icon color="white" name="receipt" />
            <Text style={sharedStyles.aboutIconText}>{about.enterLottery}</Text>
          </View>
          <View style={sharedStyles.aboutFirstSectionTextContainer}>
            <Text style={sharedStyles.aboutFirstSectionText}>
              {about.howToUseTenth}
            </Text>
          </View>
          <View style={sharedStyles.aboutIconTextContainer}>
            <Icon color="white" name="star" />
            <Text style={sharedStyles.aboutIconText}>{about.win}</Text>
          </View>
          <View style={sharedStyles.aboutFirstSectionTextContainer}>
            <Text style={sharedStyles.aboutFirstSectionText}>
              {about.howToUseEleventh}
            </Text>
          </View>
          <View style={sharedStyles.btnContainer}>
            <View style={sharedStyles.paymentBtn}>
              <Button
                // disabled={loading || !userDataChanged}
                raised
                primary
                icon="payment"
                text={payment.submit}
                style={{container: sharedStyles.paymentBtnContainer}}
                // onPress={handleSignupPress}
              />
            </View>
            <View style={sharedStyles.paymentBtn}>
              <Button
                // disabled={loading || !userDataChanged}
                // raised={true}
                // icon="close"
                // primary
                // accent
                text={payment.cancel}
                onPress={handleCloseModal}
              />
            </View>
          </View>
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

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payment);
