export interface RestClientSliceProps {
  workUrl: string;
  workMethod: string;
  paramInputs: RestClientInput[];
  headerInputs: RestClientInput[];
  body: string;
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

export interface ChangeInputI {
  val: string;
  id: string;
  field: string;
}
