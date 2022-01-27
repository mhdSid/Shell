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
    paddingHorizontal: 15,
    ...toolbarStyles,
  },
  scrollViewContainer: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  sectionBlockContainer: {
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#b69cf6',
  },
  loginButtonViewContainer: {
    marginTop: 20,
  },
  loginButtonContainer: {
    borderRadius: 20,
  },
});

export default styles;
