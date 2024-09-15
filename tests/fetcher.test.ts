import { describe, it, expect, afterEach } from 'vitest';
import fetchMock from 'fetch-mock';

import { NextRequest } from 'next/server';
import { fetcher } from '@/utils/fetcher';

const url = 'http://localhost:3000';
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
} as unknown as NextRequest;

afterEach(() => {
  fetchMock.restore();
});

describe('Rest fetcher', () => {
  it('Fetcher fetching 200', async () => {
    fetchMock.mock('*', {
      method: 'GET',
      headers: [{ 'Content-Type': 'application/json' }],
      body: '{"prop1": "val1", "prop2": "val2"}',
    });

    const result = await fetcher({ url, options });
    expect(result.status).toBe(200);
  });
  it('Fetcher fetching 404', async () => {
    fetchMock.mock('*', 404);

    const result = await fetcher({ url, options });
    expect(result.status).toBe(404);
  });
  it('Fetcher fetching body not json', async () => {
    fetchMock.mock('*', 'prop1');

    const result = await fetcher({ url, options });
    expect(result.isError).toBe(true);
  });
  it('Fetcher fetching no response', async () => {
    fetchMock.mock('*', 500);

    const result = await fetcher({ url, options });
    expect(result.message).toBe('Internal Server Error');
  });
});
