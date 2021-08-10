import {uploadProgressActions} from './actions';

const initialState = {
  progressItems: [],
};

const uploadProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case uploadProgressActions.addNewProgressItem: {
      return {
        progressItems: [...state.progressItems, action.payload],
      };
    }
    case uploadProgressActions.removeProgressItem: {
      const {id} = action.payload;
      let {progressItems} = state;
      progressItems = progressItems.filter(item => `${id}` !== `${item.id}`);
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
