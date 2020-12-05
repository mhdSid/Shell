import {settingsActions} from './actions';

const initialState = {
  lang: 'US',
  isHomeListStyle: false,
  isHomeCardStyle: true,
  // isHomeCarouselStyle: false,
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
    default: {
      return {
        ...state,
      };
    }
  }
};

export default settingsReducer;
