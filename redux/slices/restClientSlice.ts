import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  RestClientSliceProps,
  RestClientInput,
  RestClientResponse,
  ChangeInputI,
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
  contentType: '',
};

const RestClientSlice = createSlice({
  name: 'restClient',
  initialState,
  reducers: {
    startPage(state, action: PayloadAction<string>) {
      state.workUrl = '';
      state.body = '';
      state.response = {
        status: null,
        body: {} as JSON,
      };
      state.headerInputs = [];
      state.paramInputs = [];
      state.workMethod = action.payload;
    },
    setWorkUrl(state, action: PayloadAction<string>) {
      state.workUrl = action.payload;
    },
    setWorkMethod(state, action: PayloadAction<string>) {
      state.workMethod = action.payload;
    },
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setIsFetched(state, action: PayloadAction<boolean>) {
      state.isFetched = action.payload;
    },
    addHeader(state, action: PayloadAction<RestClientInput>) {
      const { id, key, value } = action.payload;
      state.headerInputs = [...state.headerInputs, { id, key, value }];
    },
    deleteHeader(state, action: PayloadAction<string>) {
      state.headerInputs = state.headerInputs.filter((el) => el.id !== action.payload);
    },
    changeHeader(state, action: PayloadAction<ChangeInputI>) {
      const { value, id, field } = action.payload;
      state.headerInputs = state.headerInputs.map((el) => {
        if (el.id == id) {
          return { ...el, [field]: value };
        }
        return el;
      });
    },
    addParam(state, action: PayloadAction<RestClientInput>) {
      const { id, key, value } = action.payload;
      state.paramInputs = [...state.paramInputs, { id, key, value }];
    },
    deleteParam(state, action: PayloadAction<string>) {
      state.paramInputs = state.paramInputs.filter((el) => el.id !== action.payload);
    },
    changeParam(state, action: PayloadAction<ChangeInputI>) {
      const { value, id, field } = action.payload;
      state.paramInputs = state.paramInputs.map((el) => {
        if (el.id == id) {
          return { ...el, [field]: value };
        }
        return el;
      });
    },
    setResponse(state, action: PayloadAction<RestClientResponse>) {
      const { status, body } = action.payload;
      state.response = { status, body };
    },
    setContentType(state, action: PayloadAction<string>) {
      state.contentType = action.payload;
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
  setContentType,
} = RestClientSlice.actions;

export default RestClientSlice.reducer;
