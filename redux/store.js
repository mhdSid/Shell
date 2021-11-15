import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
// import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'authReducer',
    'settingsReducer',
    // 'lotteriesReducer',
    // 'chatReducer',
    // 'homeReducer',
    // 'receiveLotteryReducer',
    // 'shipLotteryReducer',
  ],
  blackList: [
    'lotteriesReducer',
    'chatReducer',
    'homeReducer',
    'receiveLotteryReducer',
    'shipLotteryReducer',
    'lotteryDetailsReducer',
    'searchReducer',
    'uploadProgressReducer',
    'lotteryResultReducer',
  ],
  // Blacklist (Don't Save Specific Reducers)
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk), // createLogger()
);

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

export {store, persistor};
