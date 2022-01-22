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
  scrollViewContainer: {
    marginBottom: 50,
  },
  drawerSectionContainer: {
    marginTop: -10,
    paddingLeft: 20,
  },
  listItemRowViewContainer: {
    flexDirection: 'row',
    display: 'flex',
    textAlignVertical: 'center',
  },
  listItemText: {
    fontWeight: '500',
    color: 'rgba(0,0,0,.85)',
  },
  langIconChecked: {
    marginHorizontal: 10,
  },
});

export default styles;
