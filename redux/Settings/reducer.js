import {settingsActions} from './actions';

const initialState = {
  lang: 'US',
  isHomeListStyle: false,
  isHomeCardStyle: true,
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
        lang: 'JP',
        isHomeListStyle: false,
        isHomeCardStyle: true,
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
