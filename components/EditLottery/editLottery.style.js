import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

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
    ...flex,
    marginTop: 40,
    paddingHorizontal: 20,
    marginBottom: 50,
    justifyContent: 'flex-start',
  },
  sectionBlockContainer: {
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#b69cf6',
  },
  sectionBlockPriceViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 20,
    color: 'rgba(0,0,0,.5)',
    textAlignVertical: 'top',
  },
  priceTextFieldViewContainer: {
    width: '40%',
    bottom: 10,
  },
  importImageButtonsViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  importImageButton: {
    marginTop: 15,
    marginRight: 10,
    borderColor: '#b69cf6',
    borderWidth: 4,
    width: (windowWidth - 20 - 20 - 40) / 5,
    height: (windowWidth - 20 - 20 - 40) / 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 4,
    backgroundColor: '#c4aff7',
  },
  importImageButtonListItem: {
    marginRight: 0,
  },
  importedImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  dropdownView: {
    marginBottom: 20,
  },
  editLotteryBottomToolBarViewContainer: {
    ...toolbarStyles,
    textAlign: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 999,
  },
  editLotteryButtonContainer: {
    borderRadius: 20,
  },
});

export default styles;
