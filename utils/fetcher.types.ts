'use server';

export interface FetchParams {
  url: string;
  options: RequestInit;
}

export interface FetchResponse {
  isError: boolean;
  isRESTError: boolean;
  body?: JSON;
  typeBody?: string;
  status: number;
  message: string;
}
