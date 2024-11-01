import { describe, it, expect, afterEach } from 'vitest';
import fetchMock from 'fetch-mock';

import { POST } from '@/app/api/graphQlProxy/route';
import { NextRequest } from 'next/server';

afterEach(() => {
  fetchMock.restore();
});

fetchMock.mock('*', {
  method: 'POST',
  headers: [{ 'Content-Type': 'application/json' }],
  body: '{"prop1": "val1", "prop2": "val2"}',
});

describe('GraphQL proxy', () => {
  it('GraphQL proxy', async () => {
    const req = {
      url: 'http://localhost:3000/api/graphQlProxy?url=https%3A%2F%2Frickandmortyapi.com%2Fgraphql',
      headers: [{ 'Content-Type': 'application/json' }],
      json: () =>
        Promise.resolve({
          prop1: 'val1',
          prop2: 'val2',
        }),
    } as unknown as NextRequest;
    const result = await POST(req);
    expect(result.status).toBe(200);
  });
});
