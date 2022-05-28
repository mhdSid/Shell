import {createSelector} from 'reselect';

const getLang = state => state.settingsReducer.lang;

export const getLangSelector = createSelector(
  [getLang],
  lang => lang,
);
