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

const sharedStyles = StyleSheet.create({
  loading: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...fullWidthHeight,
  },
  backdrop: {
    backgroundColor: '#000000',
    opacity: 0.2,
  },
  pickerView: {
    width: '70%',
    alignSelf: 'center',
  },
  // authContainer: {
  //   justifyContent: 'center',
  // },
  // signupScrollContainer: {
  //   // padding: 10,
  //   // paddingRight: 25,
  // },
  importAdView: {
    marginBottom: 100,
  },
  signupView: {
    // marginTop: 80,
    // paddingBottom: 100,
    marginBottom: 20,
  },
  imageBtnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // display: 'flex',
    // display: 'block',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  adPriceTextfieldContainer: {
    width: '40%',
    bottom: 10,
  },
  imageBtn: {
    marginTop: 10,
    marginRight: 10,
    borderColor: '#b69cf6',
    borderWidth: 4,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 4,
    backgroundColor: '#c4aff7',
  },
  adImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  dobContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 190,
    top: 90,
  },
  genderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  mobileContainer: {
    marginBottom: 30,
  },
  nameContainer: {
    marginBottom: 30,
  },
  importAdNoAuthContainer: {
    marginBottom: 100,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#b69cf6',
  },
  currenyLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 20,
  },
  verificationLabel: {
    marginTop: 10,
    fontWeight: '100',
    fontSize: 12,
    color: '#979797',
  },
  dobLabel: {
    flex: 1,
    alignSelf: 'flex-start',
    top: -100,
    justifyContent: 'center',
  },
  dobView: {
    // flex: 1,
    // alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 0,
  },
  genderView: {
    // flex: 1,
    // alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: 0,
    // marginTop: 70,
    // marginBottom: 70,
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nameViewItem: {
    width: '45%',
    // flex: 1,
    margin: 0,
    padding: 0,
  },
  dobViewItem: {
    flex: 1,
    // width: '33.335%',
    margin: 0,
    padding: 0,
    // height: 20,
  },
  // appContainer: {
  //   backgroundColor: '#ffecec',
  // },
  // // isLoading: {
  //   backgroundColor: 'rgba(0, 0, 0, .2)',
  // },
  // loadingIndicator: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   top: 0,
  // },
  innerContainer: {
    ...flex,
    padding: 20,
  },
  // loadingContainer: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   top: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, .2)',
  //   ...fullWidthHeight,
  //   zIndex: 100,
  // },
  importAdContainerNoAuth: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    // justifyContent: 'space-between',
    justifyContent: 'center',
    //
  },
  importAdContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    // justifyContent: 'space-between',
    justifyContent: 'flex-start',
    //
  },
  loggedInContainer: {
    ...flex,
  },
  loginContainer: {
    // flex: 1,
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    ...flex,
    // justifyContent: 'space-between',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  container: {
    // flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    // justifyContent: 'space-between',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  loginBtn: {
    marginTop: 20,
  },
});

export default sharedStyles;
