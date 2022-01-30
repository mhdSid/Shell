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
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
    paddingTop: 10,
    marginBottom: 50,
  },
  sectionBlockContainer: {
    marginBottom: 30,
  },
  userImageButtonViewContainer: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  userImageButtonContainer: {
    marginTop: 15,
    marginRight: 10,
    borderColor: '#b69cf6',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#c4aff7',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  userImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 100 / 2,
  },
  chooseProfileImageText: {
    fontWeight: '500',
    fontSize: 14,
    color: 'rgba(0,0,0,.5)',
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#b69cf6',
  },
  dropdownView: {
    marginBottom: 20,
  },
  updateUserButtonViewContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  updateUserButtonContainer: {
    borderRadius: 20,
  },
});

export default styles;
