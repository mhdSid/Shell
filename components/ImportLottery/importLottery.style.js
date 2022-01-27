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
  importLotteryViewContainer: {
    width: '100%',
    height: '100%',
  },
  toolbarContainer: {
    paddingHorizontal: 15,
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
  dropdownView: {
    marginBottom: 20,
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
  importImageButtonLast: {
    marginRight: 0,
  },
  importImageButtonError: {
    borderColor: 'red',
  },
  importedImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  importButtonContainer: {
    borderRadius: 20,
  },
  bottomToolBarViewContainer: {
    ...toolbarStyles,
    textAlign: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  animatedImage: {
    position: 'absolute',
    right: windowWidth / 2,
    bottom: 100,
    width: 35,
    height: 35,
    backgroundColor: 'red',
    zIndex: 1010,
  },
});

export default styles;
