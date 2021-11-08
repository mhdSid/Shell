import {settingsActions} from './actions';

const initialState = {
  lang: 'en',
  isHomeListStyle: true,
  isHomeCardStyle: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case settingsActions.setLanguage: {
      return {
        ...state,
        lang: action.payload,
      };
    }
    case settingsActions.setHomeViewStyle: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case settingsActions.resetState: {
      return {
        lang: 'jp',
        isHomeListStyle: true,
        isHomeCardStyle: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default settingsReducer;
