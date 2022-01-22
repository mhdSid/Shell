import {StyleSheet} from 'react-native';

const toolbarStyles = {
  height: 55,
  zIndex: 1555,
};

const styles = StyleSheet.create({
  chatListViewContainer: {
    width: '100%',
    height: '100%',
  },
  toolbarContainer: {
    ...toolbarStyles,
  },
  emptyChatListViewContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  emptyChatListViewContainerText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
  },
});

export default styles;
