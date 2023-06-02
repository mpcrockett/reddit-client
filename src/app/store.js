import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
  persistReducer, 
  FLUSH, 
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import postReducer from '../components/postsContainer/postSlice';
import themeReducer from '../pages/homePage/themeSlice';
import userReducer from '../components/navBar/userSlice';

const persistConfig = {
  key: "root",
  storage,
  version: 1
};

const combinedReducers = combineReducers(
  { posts: postReducer, theme: themeReducer, user: userReducer }
);

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    },
  })
});