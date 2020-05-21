import {createSelector} from 'reselect';

const getAdDetails = state => state.adDetailsReducer.adDetails;

const getAdDetailsSelector = createSelector(
  [getAdDetails],
  adDetails => adDetails,
);

export {getAdDetailsSelector};
