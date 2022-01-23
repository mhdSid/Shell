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
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'center',
    backgroundColor: '#b69cf6',
    zIndex: 1000,
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
    paddingHorizontal: 20,
    ...flex,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  scrollViewContentContainer: {
    marginVertical: 20,
    paddingBottom: 50,
  },
  iconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  iconText: {
    color: 'rgba(0,0,0,.55)',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 10,
  },
  sectionBlockContainer: {
    fontWeight: '500',
    color: 'rgba(0,0,0,.8)',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    lineHeight: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sectionBlockContainerText: {
    width: '100%',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: 'rgba(0,0,0,.8)',
  },
  sectionBlockContainerTextMargin: {
    marginBottom: 10,
  },
  sectionSeparatorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  sectionSeparatorText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'rgba(0,0,0,.5)',
  },
});

export default styles;
