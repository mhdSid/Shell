import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardMoreActionsViewContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconViewContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    marginBottom: 2.5,
  },
  cardItemImageSmall: {
    height: '60%',
    backgroundColor: '#f7f5fe',
  },
  cardItemImage: {
    aspectRatio: 1 / 1,
    backgroundColor: '#f7f5fe',
  },
  cardItemInfoViewContainer: {
    backgroundColor: 'white',
    padding: 7,
    width: '100%',
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: 'rgba(0,0,0,.2)',
  },
  cardItemText: {
    color: 'rgba(0,0,0,.75)',
  },
  cardItemTextMarginLeft: {
    marginLeft: 5,
  },
  sectionBlockContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
