import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertDialogReducer from './confirmAlert';

const persistConfig = {
  // localStorage 에 저장
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  alert: alertDialogReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer,
  // middleware: [...getDefaultMiddleware(), logger]
});

export const persistor = persistStore(store);
