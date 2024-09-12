import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get('url') as string;

  try {
    const headers = new Headers();
    req.headers.forEach((value, key) => {
      if (typeof key === 'string' && typeof value === 'string') {
        headers.append(key, value);
      }
    });

    const body = (await req.json()) as Record<string, string>;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type');

    let data: unknown;

    if (contentType && contentType.includes('application/json')) {
      data = (await response.json()) as Record<string, string>;
    } else {
      data = (await response.text()) as unknown as Promise<string>;
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in POST proxy:', error);
    return NextResponse.json({ error: 'Error fetching data from the API' }, { status: 500 });
  }
};
