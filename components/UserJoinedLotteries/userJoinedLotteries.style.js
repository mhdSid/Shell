import {StyleSheet} from 'react-native';

const toolbarStyles = {
  height: 55,
  zIndex: 1555,
};

const styles = StyleSheet.create({
  userJoinedLotteriesViewContainer: {
    width: '100%',
    height: '100%',
  },
  toolbarContainer: {
    ...toolbarStyles,
  },
  emptyListViewContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '45%',
  },
  emptyListViewContainerText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
  },
  virtualizedListCardItemContentContainer: {
    paddingTop: 2.5,
  },
});

export default styles;
