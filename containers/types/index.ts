export interface IntlProps {
  locale: string;
  messages: Record<string, string>;
}

export interface IntlParams {
  params: { locale: string };
}