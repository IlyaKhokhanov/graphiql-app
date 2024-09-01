export interface restClientProps {
  locale: string;
  method: string;
  url?: string;
  options?: string;
}

export interface inputInterface {
  id: string;
  key: string;
  value: string;
}

export interface response {
  status: number | null;
  body: JSON;
}
