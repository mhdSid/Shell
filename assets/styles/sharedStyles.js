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
  zIndex: 9999,
};

const sharedStyles = StyleSheet.create({
  /* ToolBar */
  toolbarContainer: {
    ...toolbarStyles,
  },
  aboutToolbarContainer: {
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
    justifyContent: 'center',
    alignItems: 'center',
    ...fullWidthHeight,
    zIndex: 1000,
  },
  simpleLoader: {
    alignSelf: 'center',
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
    width: 55,
    height: 55,
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
  signUpLabel: {
    fontWeight: 'bold',
    fontSize: 14,
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
  adDetailsContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,.1)',
    ...flex,
  },
  aboutContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    ...flex,
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
  homeAdsContainer: {
    paddingTop: 20,
    paddingHorizontal: 5,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  adDetailsUsersListContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  adDetailsUsersListItemContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adDetailsUsersListItemImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  adDetailsUsersListItemText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '100',
    color: 'rgba(0,0,0,.55)',
    width: 80,
    alignSelf: 'center',
    textAlign: 'center',
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
  homeCardItem: {
    width: '100%',
    flexGrow: 1,
    marginBottom: 5,
    // borderWidth: 2,
    // borderRadius: 4,
    // borderColor: '#b69cf6',
  },
  homeCardItemImage: {
    aspectRatio: 3 / 3,
    // borderRadius: 2,
  },
  homeCardItemTextContainer: {
    backgroundColor: 'rgba(0,0,0,.75)',
    position: 'absolute',
    bottom: 0,
    padding: 7,
    left: 0,
    width: '100%',
  },
  homeCardItemText: {
    color: 'white',
  },
  adMobBanner: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  homeListItemImage: {
    width: 50,
    height: 50,
  },
  listItemUserImage: {
    borderRadius: 50 / 2,
  },
  aboutSafeViewContainer: {
    backgroundColor: '#b69cf6',
  },
  drawerContainer: {
    borderRadius: 20,
    marginBottom: 20,
  },
  aboutFirstSection: {
    paddingTop: 70,
    paddingBottom: 220,
  },
  aboutSeparatorSection: {
    padding: 20,
    // paddingHorizontal: 20,
    // paddingBottom: 40,
    alignItems: 'center',
  },
  aboutSeparatorSectionText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'rgba(0,0,0,.5)',
  },
  aboutFirstSectionTextContainer: {
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
  aboutIconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  userDetailsIconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // paddingHorizontal: 20,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  aboutIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 10,
  },
  userDetailsText: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: '500',
    color: 'rgba(0,0,0,.55)',
  },
  aboutFirstSectionText: {
    width: '100%',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: 'rgba(0,0,0,.8)',
  },
  aboutFirstSectionTextMargin: {
    marginBottom: 10,
  },
  appText: {
    fontWeight: '500',
    color: 'rgba(0,0,0,.85)',
  },
  adDetailsImageArrowIconLeft: {
    alignSelf: 'center',
    marginTop: -6,
    marginLeft: -5,
  },
  adDetailsImageArrowIconLeftContainer: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    width: 35,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  adDetailsImageArrowIconRightContainer: {
    position: 'absolute',
    right: 0,
    width: 35,
    borderRadius: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  adDetailsImageArrowIconRight: {
    alignSelf: 'center',
    marginTop: -6,
    marginLeft: -2,
  },
  bottomNavigationContainer: {
    padding: 0,
    margin: 0,
    shadowOpacity: 0,
    borderTopWidth: 0.5,
  },
  bottomNavigationLeftActionContainer: {
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 0,
  },
  bottomNavigationMiddleActionContainer: {
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 0,
    paddingRight: 0,
  },
  bottomNavigationRightActionContainer: {
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 0,
    paddingRight: 10,
  },
  profileUserText: {
    color: '#d9d9d9',
  },
  profileAvatarContainer: {
    marginBottom: 0,
  },
  profileHeaderContainer: {
    zIndex: 100,
  },
  profileHeaderContentContainer: {
    paddingTop: 20,
  },
  settingsDrawerLanguageSection: {
    marginTop: -10,
    paddingLeft: 20,
  },
  flexRow: {
    flexDirection: 'row',
    display: 'flex',
  },
  textAlignVertical: {
    textAlignVertical: 'center',
  },
  langChecked: {
    marginHorizontal: 10,
  },
  homeLoading: {
    bottom: 70,
  },
});

export default sharedStyles;
