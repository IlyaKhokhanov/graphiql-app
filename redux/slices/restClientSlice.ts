import { createSlice } from '@reduxjs/toolkit';

import {
  RestClientSliceProps,
  ActionString,
  ActionBoolean,
  ActionInput,
  ActionInputHandler,
  ActionResponse,
} from './restClientSlice.props';

const initialState: RestClientSliceProps = {
  workUrl: '',
  workMethod: '',
  body: '',
  isFetched: false,
  paramInputs: [],
  headerInputs: [],
  response: {
    status: null,
    body: {} as JSON,
  },
};

const RestClientSlice = createSlice({
  name: 'restClient',
  initialState,
  reducers: {
    startPage(state, action: ActionString) {
      state.headerInputs = [];
      state.paramInputs = [];
      state.workMethod = action.payload;
    },
    setWorkUrl(state, action: ActionString) {
      state.workUrl = action.payload;
    },
    setWorkMethod(state, action: ActionString) {
      state.workMethod = action.payload;
    },
    setBody(state, action: ActionString) {
      state.body = action.payload;
    },
    setIsFetched(state, action: ActionBoolean) {
      state.isFetched = action.payload;
    },
    addHeader(state, action: ActionInput) {
      const { id, key, value } = action.payload;
      state.headerInputs = [...state.headerInputs, { id, key, value }];
    },
    deleteHeader(state, action: ActionString) {
      state.headerInputs = state.headerInputs.filter((el) => el.id !== action.payload);
    },
    changeHeader(state, action: ActionInputHandler) {
      const { e, id, field } = action.payload;
      state.headerInputs = state.headerInputs.map((el) => {
        if (el.id == id) {
          return { ...el, [field]: e.target.value };
        }
        return el;
      });
    },
    addParam(state, action: ActionInput) {
      const { id, key, value } = action.payload;
      state.paramInputs = [...state.paramInputs, { id, key, value }];
    },
    deleteParam(state, action: ActionString) {
      state.paramInputs = state.paramInputs.filter((el) => el.id !== action.payload);
    },
    changeParam(state, action: ActionInputHandler) {
      const { e, id, field } = action.payload;
      state.paramInputs = state.paramInputs.map((el) => {
        if (el.id == id) {
          return { ...el, [field]: e.target.value };
        }
        return el;
      });
    },
    setResponse(state, action: ActionResponse) {
      const { status, body } = action.payload;
      state.response = { status, body };
    },
  },
});

export const {
  startPage,
  setWorkUrl,
  setWorkMethod,
  setBody,
  setIsFetched,
  addHeader,
  deleteHeader,
  changeHeader,
  addParam,
  deleteParam,
  changeParam,
  setResponse,
} = RestClientSlice.actions;

export default RestClientSlice.reducer;
