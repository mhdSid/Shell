import {combineReducers} from 'redux';
import authReducer from './Auth/reducer';
import lotteriesReducer from './Lotteries/reducer';
import settingsReducer from './Settings/reducer';
import lotteryDetailsReducer from './LotteryDetails/reducer';
import searchReducer from './Search/reducer';
import uploadProgressReducer from './UploadProgress/reducer';
import homeReducer from './Home/reducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  lotteriesReducer: lotteriesReducer,
  settingsReducer: settingsReducer,
  lotteryDetailsReducer: lotteryDetailsReducer,
  searchReducer: searchReducer,
  uploadProgressReducer: uploadProgressReducer,
  homeReducer: homeReducer,
});

export default rootReducer;
