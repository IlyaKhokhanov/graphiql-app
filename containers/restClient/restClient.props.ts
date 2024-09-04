export interface RestClientProps {
  locale: string;
  method: string;
  url?: string;
  options?: string;
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
