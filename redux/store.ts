'use client';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import restClient from './slices/restClientSlice';
import graphQlSlice from './slices/graphQlSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  restClient,
  graphQlSlice,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
