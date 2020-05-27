import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import Pinger from './components/Pinger';
import MainContainer from './components/MainContainer';
import {ThemeContext, getTheme} from 'react-native-material-ui'; // COLOR,
import {Loading} from './components/Loading';

const uiTheme = {
  palette: {
    primaryColor: '#b69cf6', //'#b30000',
    // accentColor: '#cc0000',
    activeIcon: '#b69cf6',
    inactiveIcon: '#111111',
    // disabledIcon: '#000000',
    // borderColor: '#ff0000',
    // primaryTextColor: '#660000',
    // secondaryTextColor: '#7f0000',
    // accentColor: COLOR.r

    /*
       // main theme colors
    primaryColor: blue500,
    accentColor: red500,
    // text color palette
    primaryTextColor: Color(black)
      .alpha(0.87)
      .toString(),
    secondaryTextColor: Color(black)
      .alpha(0.54)
      .toString(),
    alternateTextColor: white,
    // backgournds and borders
    canvasColor: white,
    borderColor: Color(black)
      .alpha(0.12)
      .toString(),
    // https://material.google.com/style/color.html#color-text-background-colors
    disabledColor: Color(black)
      .alpha(0.38)
      .toString(),
    disabledTextColor: Color(black)
      .alpha(0.26)
      .toString(),
    activeIcon: Color(black)
      .alpha(0.54)
      .toString(),
    inactiveIcon: Color(black)
      .alpha(0.38)
      .toString(),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: faintBlack,
    // shadowColor: fullBlack,*/
  },
  toolbar: {
    container: {
      height: 40,
    },
  },
  headerAccount: {
    container: {
      backgroundColor: '#b69cf6',
      color: '#b69cf6',
    },
  },
  iconSet: 'MaterialIcons',
  fontFamily: 'Roboto-Light',
  typography: {
    fontFamily: 'Roboto-Light',
  },
};

const App = () => {
  return (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
      <Provider store={store}>
        <PersistGate loading={Loading} persistor={persistor}>
          <Pinger />
          <MainContainer />
        </PersistGate>
      </Provider>
    </ThemeContext.Provider>
  );
};

export default App;
