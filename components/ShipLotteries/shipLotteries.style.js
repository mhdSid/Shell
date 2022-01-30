import {StyleSheet} from 'react-native';

const fullWidthHeight = {
  width: '100%',
  height: '100%',
};

const flex = {
  ...fullWidthHeight,
  flex: 1,
  flexDirection: 'column',
  display: 'flex',
};

const toolbarStyles = {
  height: 55,
  zIndex: 1555,
};

const styles = StyleSheet.create({
  rootSafeAreaView: {
    backgroundColor: '#b69cf6',
    zIndex: 1000,
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
  },
  innerSafeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  toolbarContainer: {
    ...toolbarStyles,
  },
  tabBarNavigationContainer: {
    padding: 0,
    margin: 0,
    shadowOpacity: 0,
    borderTopWidth: 0.5,
    backgroundColor: '#b69cf6',
    height: 45,
  },
  tabBarNavigationActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingBottom: 12,
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    height: 45,
  },
  emptyListViewContainer: {
    width: '100%',
    height: '100%',
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
  virtualizedListItemContentContainer: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
