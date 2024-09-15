'use server';

import { FetchParams, FetchResponse } from './fetcher.types';

export const fetcher = async ({ url, options }: FetchParams): Promise<FetchResponse> => {
  const result: FetchResponse = {
    isError: false,
    isRESTError: true,
    status: 0,
    message: '',
  };

  const resp = await fetch(url, options).catch((error: Error) => {
    result.isError = true;
    result.isRESTError = false;
    result.message = error.message;
  });

  if (!resp) {
    result.isError = true;
    return result;
  }

  if (result.isError) {
    return result;
  }

  result.status = resp.status;
  result.message = resp.statusText;

  if (resp.body)
    result.body = (await resp.json().catch((error: Error) => {
      result.isError = true;
      result.isRESTError = false;
      result.message = error.message;
    })) as JSON;

  return result;
};
