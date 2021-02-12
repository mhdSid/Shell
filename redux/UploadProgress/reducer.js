import {uploadProgressActions} from './actions';

const initialState = {
  progressItems: [],
};

const uploadProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case uploadProgressActions.addNewProgressItem: {
      const {id} = action.payload;
      return {
        progressItems: [...state.progressItems, {id, progress: 0}],
      };
    }
    case uploadProgressActions.removeProgressItem: {
      const {id} = action.payload;
      let {progressItems} = state;
      progressItems = progressItems.filter(item => id !== item.id);
      return {
        progressItems,
      };
    }
    case uploadProgressActions.updateProgressItem: {
      const {progress, id, progressItemsLength} = action.payload;
      let {progressItems} = state;
      progressItems = progressItems
        .map(item => {
          return id === item.id
            ? {
                progress: Math.round(
                  item.progress + progress / progressItemsLength,
                ),
              }
            : item;
        })
        .filter(Boolean);
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
