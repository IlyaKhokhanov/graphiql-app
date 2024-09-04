'use client';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import restClient from './slices/restClientSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  restClient,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
