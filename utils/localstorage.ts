import { IaddToLS, userLS } from './localstorage.types';

export const uid = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getTime = (time: number): string => {
  const date = new Date(time);
  return (
    String(date.getHours()).padStart(2, '0') +
    ':' +
    String(date.getMinutes()).padStart(2, '0') +
    ':' +
    String(date.getSeconds()).padStart(2, '0')
  );
};

export const base64url_encode = (input: string) => {
  return btoa(input).replaceAll('+', '-').replaceAll('/', '.').replaceAll('=', '_');
};

export const base64url_decode = (input: string) => {
  return atob(input.replaceAll('-', '+').replaceAll('.', '/').replaceAll('_', '='));
};

export const addToLS = ({ id, url, link, title, client }: IaddToLS) => {
  const stringLS = localStorage.getItem(id);
  if (stringLS) {
    const valueLS = JSON.parse(stringLS) as userLS;
    const isValueInLS = valueLS[client].find((el) => el.url === url);
    if (!isValueInLS) {
      valueLS[client].push({ id: Date.now(), url, link, title });
      localStorage.setItem(id, JSON.stringify(valueLS));
    }
  } else {
    const userObj: userLS = {
      rest: [],
      graph: [],
    };
    userObj[client].push({ id: Date.now(), url, link, title });
    localStorage.setItem(id, JSON.stringify(userObj));
  }
};

export const stringifyBody = (body: string, contentType: string, forFetch = false, space = -1) => {
  let spaceActual = space;
  if (spaceActual < 0) spaceActual = forFetch ? 0 : 2;

  let result = body;

  try {
    if (contentType !== 'text/plain') result = JSON.stringify(JSON.parse(body), null, spaceActual);
  } catch {
    null;
  }
  if (forFetch) result = encodeURIComponent(result);

  return result;
};
