import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  searchBoxAnimatedViewContainer: {
    position: 'absolute',
    top: 55,
    left: 10,
    zIndex: 100,
    display: 'flex',
    width: windowWidth - 20,
    flexDirection: 'column',
  },
  searchBoxOverlayViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#b69cf6',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    opacity: 1,
  },
  searchBoxInnerViewContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'relative',
    zIndex: 100,
    width: '100%',
  },
  searchBoxSectionBlockContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
  },
  searchBoxSectionBlockDivision: {
    display: 'flex',
    flex: 1,
  },
  searchBoxSectionBlockDivisionMarginRight: {
    marginRight: 10,
  },
  searchBoxSectionBlockDivisionMarginLeft: {
    marginLeft: 10,
  },
  searchBoxBottomButtonViewContainer: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonContainer: {
    borderRadius: 20,
  },
});

export default styles;
