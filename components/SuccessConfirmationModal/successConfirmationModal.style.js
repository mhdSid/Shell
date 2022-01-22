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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  contentViewContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  successConfirmationIcon: {
    marginBottom: 20,
  },
  successConfirmationTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  successConfirmationSubtitle: {
    marginBottom: 40,
    marginHorizontal: 20,
    fontSize: 16,
  },
  actionButtonContainer: {
    borderRadius: 20,
  },
  actionButtonContainerMarginBottom: {
    marginBottom: 20,
  },
});

export default styles;
