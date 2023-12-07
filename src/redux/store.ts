// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import LoginSlice, { ILoginReduxState } from "../UserApp/Login/LoginSlice";

const rootReducer = combineReducers({
  login: LoginSlice,
});

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["login"], // Define the keys you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
