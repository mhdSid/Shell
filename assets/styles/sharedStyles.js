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
  height: 50,
  zIndex: 9999,
};

const sharedStyles = StyleSheet.create({
  /* ToolBar */
  toolbarContainer: {
    ...toolbarStyles,
  },
  toolbarContainerPadding: {
    paddingHorizontal: 15,
    ...toolbarStyles,
  },
  toolbarContainerPaddingRight: {
    paddingRight: 15,
    ...toolbarStyles,
  },
  /* End ToolBar */

  /* Loading */
  loading: {
    // padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...fullWidthHeight,
    zIndex: 1000,
  },
  loadingPopup: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    opacity: 0.9,
    zIndex: 1000,
  },
  /* End Loading */

  fullheightView: {
    width: '100%',
    height: '100%',
  },
  adDetailsImage: {
    flex: 1,
    aspectRatio: 3 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBlur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    top: 0,
    left: 0,
    zIndex: 1,
    opacity: 0.55,
  },

  profileBlurredImage: {
    width: '100%',
    height: '100%',
  },

  pickerView: {
    width: '70%',
    alignSelf: 'center',
  },
  imageBtnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
  },
  userImageBtnContainer: {
    justifyContent: 'center',
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
  updateUserImgBtn: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  adImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  userImage: {
    borderRadius: 100 / 2,
  },
  dobContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 200,
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
  noAuthLabel: {
    fontWeight: 'bold',
    fontSize: 16,

    textAlign: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 0,
  },
  genderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dobViewItem: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  innerContainer: {
    ...flex,
    padding: 20,
  },
  importAdContainerNoAuth: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'center',
  },
  importAdContainer: {
    marginBottom: 50,
  },
  loggedInContainer: {
    ...flex,
  },
  loginContainer: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    ...flex,
    justifyContent: 'flex-start',
  },
  updateUserContainer: {
    paddingTop: 10,
  },
  container: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
  },
  loginBtn: {
    marginTop: 20,
  },
});

export default sharedStyles;
