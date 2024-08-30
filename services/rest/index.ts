export const fetcher = async (url: string, options: RequestInit) => {
  const resp = await fetch(url, options);
  if (resp.status === 500) {
    return resp.text();
  }
  return resp.json();
};
