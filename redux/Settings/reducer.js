import {settingsActions} from './actions';

const initialState = {
  lang: 'en',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case settingsActions.setLang: {
      return {
        ...state,
        lang: action.payload,
      };
    }
    default: {
      return (
        state || {
          ...initialState,
        }
      );
    }
  }
};

export default settingsReducer;
