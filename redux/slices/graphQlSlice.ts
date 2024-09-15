import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangeInputI, InitialStateType } from './graphQlSlice.props';
import { HeaderType, SchemaType } from '@/components';

const initialState: InitialStateType = {
  endpoint: '',
  sdlEndpoint: '',
  headers: [],
  query: '',
  variables: '',
  body: {},
  schema: null,
  statusCode: null,
  isFetched: false,
  isFetchedSchema: false,
  errorMessage: '',
  errorMessageResponse: '',
};

const GraphClientSlice = createSlice({
  name: 'graphClient',
  initialState,
  reducers: {
    startPage: (state) => {
      state.endpoint = '';
      state.headers = [];
      state.variables = '';
      state.query = '';
    },

    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },

    setIsFetched: (state, action: PayloadAction<boolean>) => {
      state.isFetched = action.payload;
    },

    setIsFetchedSchema: (state, action: PayloadAction<boolean>) => {
      state.isFetchedSchema = action.payload;
    },

    setSdlEndpoint: (state, action: PayloadAction<string>) => {
      state.sdlEndpoint = action.payload;
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    },

    setBody: (state, action: PayloadAction<Record<string, string>>) => {
      state.body = action.payload;
    },

    setSchema: (state, action: PayloadAction<SchemaType | null>) => {
      state.schema = action.payload;
    },

    setStatusCode: (state, action: PayloadAction<string | null>) => {
      state.statusCode = action.payload;
    },

    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },

    setErrorMessageResponse: (state, action: PayloadAction<string>) => {
      state.errorMessageResponse = action.payload;
    },

    addHeader: (state, action: PayloadAction<HeaderType>) => {
      const { id, key, value } = action.payload;
      state.headers = [...state.headers, { id, key, value }];
    },

    deleteHeader: (state, action: PayloadAction<string>) => {
      state.headers = state.headers.filter((header) => header.id !== action.payload);
    },

    changeHeader(state, action: PayloadAction<ChangeInputI>) {
      const { value, id, field } = action.payload;
      state.headers = state.headers.map((el) => {
        if (el.id == id) {
          return { ...el, [field]: value };
        }
        return el;
      });
    },
  },
});

export const {
  startPage,
  setBody,
  setEndpoint,
  setErrorMessage,
  setQuery,
  setSchema,
  setSdlEndpoint,
  setStatusCode,
  setVariables,
  addHeader,
  deleteHeader,
  changeHeader,
  setIsFetched,
  setIsFetchedSchema,
  setErrorMessageResponse,
} = GraphClientSlice.actions;

export default GraphClientSlice.reducer;
