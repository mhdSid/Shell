import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  cardListItemRowRootViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardListItemRowViewContainer: {
    display: 'flex',
    width: (windowWidth - 5 - 5) / 3,
    flexDirection: 'column',
    marginRight: 2.5,
  },
  cardListItemRowViewContainerNoMargin: {
    marginRight: 0,
  },
  cardListItemFlexStart: {
    justifyContent: 'flex-start',
    left: 2.5,
  },
});

export default styles;
