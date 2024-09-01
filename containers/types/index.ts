export interface IntlMessages {
  messages: Record<string, string>;
}

export interface IntlProps {
  locale: string;
}

export interface IntlParams {
  params: { locale: string };
}
