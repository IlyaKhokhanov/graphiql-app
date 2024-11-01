export interface ResponseProps {
  locale: string;
  response: {
    status: number | null;
    body: JSON;
  };
  isFetched: boolean;
  errorMessage?: string;
}
