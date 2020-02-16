import {combineReducers} from 'redux';
import authReducer from './Auth/reducer';
import lotteriesReducer from './Lotteries/reducer';
import adsReducer from './Ads/reducer';
import settingsReducer from './Settings/reducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  lotteriesReducer: lotteriesReducer,
  adsReducer: adsReducer,
  settingsReducer: settingsReducer,
});

export default rootReducer;
