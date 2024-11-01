import { en } from './lang/en';
import { ru } from './lang/ru';

export const wordbook = {
  en: en,
  ru: ru,
};

export const getMessages = (locale: string) => {
  if (locale === 'ru') return wordbook.ru;
  return wordbook.en;
};
