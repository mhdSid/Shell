import {StyleSheet} from 'react-native';

const uploadProgressContainer = {
  flexDirection: 'row',
  display: 'flex',
  alignItems: 'flex-start',
  backgroundColor: '#b69cf6',
  alignSelf: 'center',
  borderRadius: 7,
  paddingHorizontal: 5,
  margin: 10,
  zIndex: 100,
};

const styles = StyleSheet.create({
  uploadProgressRelativeContainer: {
    ...uploadProgressContainer,
    position: 'relative',
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
  },
  uploadProgressAbsoluteContainer: {
    ...uploadProgressContainer,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    flexGrow: 1,
    left: 0,
    right: 0,
    width: '95%',
  },
  progressItemViewContainer: {
    backgroundColor: 'white',
    height: 5,
    width: '100%',
    marginVertical: 5,
    borderRadius: 7,
  },
  progressItemInner: {
    backgroundColor: 'lightgrey',
    height: '100%',
    borderRadius: 7,
  },
});

export default styles;
