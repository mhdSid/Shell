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
    width: '100%',
    height: '100%',
    backgroundColor: '#b69cf6',
    zIndex: 1000,
  },
  innerSafeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
  },
  bottomNavigationBarContainer: {
    padding: 0,
    margin: 0,
    shadowOpacity: 0,
    borderTopWidth: 0.5,
    backgroundColor: '#b69cf6',
    height: 45,
  },
  bottomNavigationBarRightActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingBottom: 12,
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    height: 45,
  },
  bottomNavigationBarUserImage: {
    width: 27,
    height: 27,
    borderRadius: 27 / 2,
    backgroundColor: '#f7f5fe',
  },
});

export default styles;
