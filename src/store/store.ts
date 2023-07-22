import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./itemslice";
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux';
import {createStateSyncMiddleware, initMessageListener} from 'redux-state-sync';
 
const reduxStateSyncConfig = {};

const store = configureStore({
  reducer: {
    appState: itemReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(createStateSyncMiddleware(reduxStateSyncConfig)),
});

initMessageListener(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;