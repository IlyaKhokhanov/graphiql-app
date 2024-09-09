export interface RestClientSliceProps {
  workUrl: string;
  workMethod: string;
  paramInputs: RestClientInput[];
  headerInputs: RestClientInput[];
  body: string | JSON;
  response: RestClientResponse;
  isFetched: boolean;
  contentType: string;
}

export interface RestClientInput {
  id: string;
  key: string;
  value: string;
}

export interface RestClientResponse {
  status: number | null;
  body: JSON;
}

export interface ActionString {
  payload: string;
  type: string;
}

export interface ActionBoolean {
  payload: boolean;
  type: string;
}

export interface ActionBody {
  payload: string | JSON;
  type: string;
}

export interface ActionInput {
  payload: RestClientInput;
  type: string;
}

export interface ActionInputHandler {
  payload: { val: string; id: string; field: string };
  type: string;
}

export interface ActionResponse {
  payload: RestClientResponse;
  type: string;
}
