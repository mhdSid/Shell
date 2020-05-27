import {uploadProgressActions} from './actions';

const initialState = {
  progressItems: [],
};

const uploadProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case uploadProgressActions.ADDNEWPROGRESSITEM: {
      return {
        progressItems: [...state.progressItems, action.payload],
      };
    }
    case uploadProgressActions.REMOVEPROGRESSITEM: {
      const removeProgressId = action.payload;
      let {progressItems} = state;
      progressItems = progressItems.filter(id => removeProgressId !== id);
      return {
        progressItems,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default uploadProgressReducer;
