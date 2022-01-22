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
    width: (windowWidth - 20 - 20) / 3,
    flexDirection: 'column',
    marginRight: 10,
  },
  cardListItemRowViewContainerNoMargin: {
    marginRight: 0,
  },
});

export default styles;
