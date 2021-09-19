import {combineReducers} from 'redux';
import authReducer from './Auth/reducer';
import lotteriesReducer from './Lotteries/reducer';
import settingsReducer from './Settings/reducer';
import lotteryDetailsReducer from './LotteryDetails/reducer';
import searchReducer from './Search/reducer';
import uploadProgressReducer from './UploadProgress/reducer';
import homeReducer from './Home/reducer';
import lotteryResultReducer from './LotteryResult/reducer';
import snackbarReducer from './Snackbar/reducer';
import receiveLotteryReducer from './ReceiveLottery/reducer';
import shipLotteryReducer from './ShipLottery/reducer';
import chatReducer from './Chat/reducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  lotteriesReducer: lotteriesReducer,
  settingsReducer: settingsReducer,
  lotteryDetailsReducer: lotteryDetailsReducer,
  searchReducer: searchReducer,
  uploadProgressReducer: uploadProgressReducer,
  homeReducer: homeReducer,
  lotteryResultReducer: lotteryResultReducer,
  snackbarReducer: snackbarReducer,
  receiveLotteryReducer: receiveLotteryReducer,
  shipLotteryReducer: shipLotteryReducer,
  chatReducer: chatReducer,
});

export default rootReducer;
