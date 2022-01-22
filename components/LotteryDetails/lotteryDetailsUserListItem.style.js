import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  userListItemViewContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 68,
    height: 68,
  },
  userListItemLargeViewContainer: {
    width: 128,
    height: 128,
  },
  userListItemWinnerImageViewContainer: {
    borderColor: 'green',
    borderWidth: 4,
    borderStyle: 'solid',
  },
  userListItemLargeImageViewContainer: {
    width: 128,
    height: 128,
    borderRadius: 128 / 2,
  },
  userListItemImageViewContainer: {
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
  },
  userListItemLargeImage: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: '#f7f5fe',
  },
  userListItemImage: {
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    backgroundColor: '#f7f5fe',
  },
});

export default styles;
