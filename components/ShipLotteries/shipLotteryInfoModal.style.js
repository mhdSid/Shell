import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const stepImageWidth = windowWidth / 3 - 30;

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
  topStepsViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topStepsSectionBlockContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: windowWidth / 3,
    padding: 10,
    textAlignVertical: 'top',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topStepsSectionBlockContainerImage: {
    textAlignVertical: 'top',
    width: stepImageWidth,
    height: stepImageWidth,
    borderRadius: stepImageWidth / 2,
  },
  topStepsSectionBlockContainerButton: {
    marginTop: 10,
    borderRadius: 20,
    position: 'absolute',
    top: '110%',
  },
  scrollViewContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 45,
    backgroundColor: 'rgba(0,0,0,.1)',
    ...flex,
  },
  receiveLotteryAnnouncementText: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 30,
  },
  iconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: '500',
    color: 'rgba(0,0,0,.55)',
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
  bottomToolbarViewContainer: {
    ...toolbarStyles,
    textAlign: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,.1)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  markAsShippedButtonContainer: {
    margin: 10,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingLeft: 15,
    paddingRight: 7,
  },
});

export default styles;
export {stepImageWidth};
