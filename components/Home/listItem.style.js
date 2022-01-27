import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listItemViewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  listItemViewContainerMargin: {
    marginBottom: 20,
  },
  listItemContainerRounded: {
    borderRadius: 20,
  },
  listItemImage: {
    width: 75,
    height: 75,
    borderRadius: 15,
    backgroundColor: '#f7f5fe',
  },
  listItemNotReceivedIconContainer: {
    transform: [{rotate: '180deg'}],
  },
});

export default styles;
