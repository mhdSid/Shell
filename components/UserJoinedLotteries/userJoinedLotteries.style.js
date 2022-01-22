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
    height: '89%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  emptyListViewContainerText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
  },
  virtualizedListCardItemContentContainer: {
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
