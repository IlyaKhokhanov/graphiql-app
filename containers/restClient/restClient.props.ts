import { MessageFormatElement } from 'react-intl';

export interface restClientProps {
  locale: string;
  method: string;
  messages: Record<string, MessageFormatElement[]> | Record<string, string>;
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
  body: string;
}
