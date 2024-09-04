export class FetchError extends Error {
  private status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  public getStatus = () => this.status;
}

export const fetcher = async (url: string, options: RequestInit) => {
  const resp = await fetch(url, options);
  if (!resp.ok) {
    throw new FetchError('Failed to fetch', resp.status);
  }

  const body = (await resp.json()) as unknown;

  return { body, status: resp.status };
};
