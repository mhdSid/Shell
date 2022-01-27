import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

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
  scrollViewContainer: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
    marginTop: 75,
  },
  toolbarContainer: {
    paddingHorizontal: 15,
    ...toolbarStyles,
  },
  innerSafeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  rootSafeAreaView: {
    backgroundColor: '#b69cf6',
    zIndex: 1000,
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
  },
  verificationCodeCell: {
    width: windowWidth / 6 - 20,
    height: windowWidth / 6 - 20,
    lineHeight: windowWidth / 6 - 20 - 2,
    color: 'rgba(0,0,0,.6)',
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.1)',
    textAlign: 'center',
    marginBottom: 20,
  },
  resendButtonViewContainer: {
    marginTop: 20,
  },
  resendCodeButtonText: {
    color: 'rgba(0,0,0,.6)',
  },
  resendCodeButtonContainer: {
    borderRadius: 20,
  },
  verificationTitleSubTitle: {
    fontWeight: '400',
    fontSize: 16,
    color: 'rgba(0,0,0,.6)',
    marginVertical: 30,
  },
  verificationIcon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default styles;
