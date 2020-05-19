import {combineReducers} from 'redux';
import authReducer from './Auth/reducer';
import lotteriesReducer from './Lotteries/reducer';
import adsReducer from './Ads/reducer';
import settingsReducer from './Settings/reducer';
import adDetailsReducer from './AdDetails/reducer';
import searchReducer from './Search/reducer';
import userReducer from './User/reducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  lotteriesReducer: lotteriesReducer,
  adsReducer: adsReducer,
  settingsReducer: settingsReducer,
  adDetailsReducer: adDetailsReducer,
  searchReducer: searchReducer,
  userReducer: userReducer,
});

export default rootReducer;
