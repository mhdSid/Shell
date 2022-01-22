import {StyleSheet} from 'react-native';

const fullWidthHeight = {
  width: '100%',
  height: '100%',
};

const flex = {
  ...fullWidthHeight,
  flex: 1,
  flexDirection: 'column',
  display: 'flex',
};

const toolbarStyles = {
  height: 55,
  zIndex: 1555,
};

const styles = StyleSheet.create({
  rootSafeAreaView: {
    backgroundColor: '#b69cf6',
    zIndex: 1000,
    width: '100%',
    height: '100%',
  },
  innerSafeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  toolbarContainer: {
    ...toolbarStyles,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    ...flex,
    backgroundColor: 'rgba(0,0,0,.1)',
    paddingTop: 20,
  },
  creditCardInputViewContainer: {
    marginTop: 15,
    marginBottom: 30,
    flex: 1,
    alignSelf: 'center',
  },
  creditInputContainer: {
    width: '70%',
    margin: 0,
  },
  currentCartViewContainer: {
    fontWeight: '500',
    color: 'rgba(0,0,0,.8)',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    lineHeight: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotteryListItemViewContainer: {
    marginBottom: 30,
    width: '100%',
  },
  currentCartInvoiceItemContainer: {
    width: '100%%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  currentCartInvoiceItemContainerMargin: {
    marginBottom: 10,
  },
  currentCartInvoiceItemText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: 'rgba(0,0,0,.8)',
  },
  paymentButtonViewContainer: {
    marginVertical: 30,
    marginBottom: 20,
  },
  paymentButtonContainerDisabled: {
    height: 50,
    fontWeight: 'bold',
  },
  paymentButtonContainer: {
    backgroundColor: '#5014e5',
    color: 'white',
    height: 50,
    fontWeight: 'bold',
  },
  iconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  iconText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 10,
  },
  sectionBlockContainer: {
    fontWeight: '500',
    color: 'rgba(0,0,0,.8)',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    lineHeight: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sectionBlockContainerText: {
    width: '100%',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: 'rgba(0,0,0,.8)',
  },
});

export default styles;
