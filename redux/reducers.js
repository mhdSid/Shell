import {combineReducers} from 'redux';
import authReducer from './Auth/reducer';
import lotteriesReducer from './Lotteries/reducer';
import adsReducer from './Ads/reducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  lotteriesReducer: lotteriesReducer,
  adsReducer: adsReducer,
});

export default rootReducer;
