import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
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
  lotteryResultReducer: lotteryResultReducer,
  snackbarReducer: snackbarReducer,
  lotteryDetailsReducer: lotteryDetailsReducer,
  searchReducer: searchReducer,
  uploadProgressReducer: uploadProgressReducer,
  authReducer: persistReducer(
    {
      key: 'root:auth:reducer',
      storage: AsyncStorage,
      whitelist: [
        'loggedIn',
        'user',
        'country',
        'email',
        'passwordHash',
        'verificationCode',
        'showSignup',
      ],
    },
    authReducer,
  ),
  lotteriesReducer: persistReducer(
    {
      key: 'root:lotteries:reducer',
      storage: AsyncStorage,
      whitelist: [
        'userJoinedLotteries',
        'userCreatedLotteries',
        'userLikedLotteries',
        'userJoinedLotteriesPageToken',
        'userCreatedLotteriesPageToken',
        'userLikedLotteriesPageToken',
      ],
    },
    lotteriesReducer,
  ),
  settingsReducer: persistReducer(
    {
      key: 'root:settings:reducer',
      storage: AsyncStorage,
      whitelist: ['lang', 'isHomeListStyle', 'isHomeCardStyle'],
    },
    settingsReducer,
  ),
  homeReducer: persistReducer(
    {
      key: 'root:home:reducer',
      storage: AsyncStorage,
      whitelist: ['lotteries'],
    },
    homeReducer,
  ),
  receiveLotteryReducer: persistReducer(
    {
      key: 'root:receiveLottery:reducer',
      storage: AsyncStorage,
      whitelist: [
        'receiveLotteryDetails',
        'userWonLotteries',
        'lotteryPosterData',
      ],
    },
    receiveLotteryReducer,
  ),
  shipLotteryReducer: persistReducer(
    {
      key: 'root:shipLottery:reducer',
      storage: AsyncStorage,
      whitelist: [
        'shipLotteryDetails',
        'userCreatedWonLotteries',
        'lotteryWinnerData',
      ],
    },
    shipLotteryReducer,
  ),
  chatReducer: persistReducer(
    {
      key: 'root:chat:reducer',
      storage: AsyncStorage,
      whitelist: ['chatList', 'chattableLotteries'],
    },
    chatReducer,
  ),
});

export default rootReducer;
