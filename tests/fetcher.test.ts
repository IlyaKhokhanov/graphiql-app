import { describe, it, expect, afterEach } from 'vitest';
import fetchMock from 'fetch-mock';

import { NextRequest } from 'next/server';
import { fetcher } from '@/utils/fetcher';

afterEach(() => {
  fetchMock.restore();
});

fetchMock.mock('*', {
  method: 'GET',
  headers: [{ 'Content-Type': 'application/json' }],
  body: '{"prop1": "val1", "prop2": "val2"}',
});

describe('Rest fetcher', () => {
  it('Fetcher fetching', async () => {
    const url = 'http://localhost:3000/api/graphQlProxy?url=https%3A%2F%2Frickandmortyapi.com%2Fgraphql';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    } as unknown as NextRequest;
    const result = await fetcher({url, options});
    expect(result.status).toBe(200);
  });
});
