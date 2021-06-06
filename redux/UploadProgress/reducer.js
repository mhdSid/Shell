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
      progressItems = progressItems.map(item => {
        if (`${id}` === `${item.id}`) {
          console.log(
            'new Progress: ',
            Number(progress) / Number(progressItemsLength),
          );
        }
        return `${id}` === `${item.id}`
          ? {
              ...item,
              id,
              ...action.payload,
              progressItemsLength,
              progress: Number(progress) / Number(progressItemsLength),
            }
          : item;
      });
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
