import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  simpleLoaderAlignedCenter: {
    alignSelf: 'center',
  },
  loadingSafeAreaView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  loadingPopupViewContainer: {
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
    zIndex: 1111,
  },
});

export default styles;
