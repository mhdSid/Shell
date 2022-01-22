import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  rootSafeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#b69cf6',
    zIndex: 1000,
  },
  innerSafeAreaView: {
    backgroundColor: 'black',
    alignItems: 'flex-start',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  imageViewerBackButtonViewContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  imageViewerButton: {
    width: '50',
    display: 'flex',
    alignSelf: 'flex-start',
    color: 'white',
  },
  imageViewerZoomContainer: {
    marginTop: -100,
    zIndex: -1,
  },
  imageViewerImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    backgroundColor: 'black',
    zIndex: 0,
  },
});

export default styles;
