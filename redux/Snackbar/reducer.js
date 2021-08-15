import {snackbarActions} from './actions';

const initialState = {
  snackbarItems: [],
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case snackbarActions.addSnackbarItem: {
      return {
        ...state,
        snackbarItems: [
          ...state.snackbarItems,
          {
            ...action.payload,
            id: `_${Math.random()
              .toString(36)
              .substr(2, 9)}`,
          },
        ],
      };
    }
    case snackbarActions.removeSnackbarItem: {
      let snackbarItems = [...state.snackbarItems];
      if (Array.isArray(snackbarItems) && snackbarItems.length) {
        snackbarItems = snackbarItems.filter(
          item => item.id !== action.payload,
        );
      }
      return {
        ...state,
        snackbarItems,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default snackbarReducer;
