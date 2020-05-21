import {createSelector} from 'reselect';

const getLang = state => state.settingsReducer.lang;

const getLangSelector = createSelector(
  [getLang],
  lang => lang,
);

export {getLangSelector};
