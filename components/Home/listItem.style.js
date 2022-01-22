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
    width: 50,
    height: 50,
    backgroundColor: '#f7f5fe',
  },
  listItemNotReceivedIconContainer: {
    transform: [{rotate: '180deg'}],
  },
});

export default styles;
