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
  confettiViewContainer: {
    zIndex: 9999,
  },
  scrollViewContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,.1)',
    ...flex,
  },
  lotteryResultNoWinnerViewContainer: {
    marginBottom: 20,
  },
  lotteryResultNoWinnerText: {
    fontSize: 24,
    fontWeight: '300',
  },
  congratulationsViewContainer: {
    marginBottom: 10,
  },
  congratulationsText: {
    color: 'green',
    fontSize: 22,
  },
  congratulationsWinnerText: {
    color: 'green',
    fontSize: 26,
    fontWeight: 'bold',
  },
  iconTextViewContainer: {
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
  bottomToolbarActionButtonContainer: {
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
