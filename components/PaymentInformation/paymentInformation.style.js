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
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
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
    height: '100%',
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
    paddingTop: 10,
    marginBottom: 50,
  },
  creditCardInputViewContainer: {
    marginTop: 15,
    marginBottom: 30,
    flex: 1,
    alignSelf: 'center',
  },
  creditCardInputContainer: {
    width: '70%',
    margin: 0,
  },
  submitButtonViewContainer: {
    marginTop: 20,
  },
  submitButtonContainer: {
    borderRadius: 20,
  },
});

export default styles;
