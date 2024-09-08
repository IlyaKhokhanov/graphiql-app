import { userLS } from './localstorage.types';

export const uid = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const base64url_encode = (input: string) => {
  return btoa(input).replaceAll('+', '-').replaceAll('/', '.').replaceAll('=', '_');
};

export const base64url_decode = (input: string) => {
  return atob(input.replaceAll('-', '+').replaceAll('.', '/').replaceAll('_', '='));
};

export const addToLS = (id: string, url: string, options: string, client: 'rest' | 'graph') => {
  const stringLS = localStorage.getItem(id);
  if (stringLS) {
    const valueLS = JSON.parse(stringLS) as userLS;
    valueLS[client].push({ id: Date.now(), url, options });
    localStorage.setItem(id, JSON.stringify(valueLS));
  } else {
    const userObj: userLS = {
      rest: [],
      graph: [],
    };
    userObj[client].push({ id: Date.now(), url, options });
    localStorage.setItem(id, JSON.stringify(userObj));
  }
};
