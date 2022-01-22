import {StyleSheet} from 'react-native';

const toolbarStyles = {
  height: 55,
  zIndex: 1555,
};

const styles = StyleSheet.create({
  homeViewContainer: {
    width: '100%',
    height: '100%',
  },
  toolbarContainer: {
    ...toolbarStyles,
  },
  resetSearchButtonContainer: {
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  homeListEmptyViewContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  homeListEmptyViewContainerText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
  },
  virtualizedListCardContentContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default styles;
