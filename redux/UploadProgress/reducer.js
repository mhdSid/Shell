import {uploadProgressActions} from './actions';

const initialState = {
  progressItems: [],
};

const uploadProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case uploadProgressActions.addNewProgressItem: {
      return {
        progressItems: [
          ...state.progressItems,
          {...action.payload, progress: 0},
        ],
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
    case uploadProgressActions.updateProgressItem: {
      const {progress, id, progressItemsLength} = action.payload;
      let {progressItems} = state;
      let updatedProgress;
      progressItems = progressItems.map(item => {
        if (`${id}` === `${item.id}`) {
          updatedProgress =
            (item.progress || 0) +
            Number(progress) / Number(progressItemsLength);
          if (updatedProgress < 100) {
            return {
              ...item,
              id,
              ...action.payload,
              progressItemsLength,
              progress: updatedProgress,
            };
          }
        } else {
          return item;
        }
      });
      if (updatedProgress > 100) {
        return {
          ...state,
        };
      }
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
