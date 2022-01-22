import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardMoreActionsViewContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconViewContainer: {
    position: 'absolute',
    top: 2,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardItemLikeIconContainer: {
    padding: 0,
    margin: 0,
  },
  cardItemHorizontalViewContainer: {
    width: 170,
    height: 170,
    marginHorizontal: 10,
  },
  cardItemViewContainer: {
    width: '100%',
    marginBottom: 10,
  },
  cardItemImageSmall: {
    height: '60%',
    backgroundColor: '#f7f5fe',
  },
  cardItemImage: {
    aspectRatio: 4 / 3,
    backgroundColor: '#f7f5fe',
  },
  cardItemInfoViewContainer: {
    backgroundColor: 'rgba(0,0,0,.75)',
    padding: 7,
    width: '100%',
  },
  cardItemText: {
    color: 'white',
  },
});

export default styles;
