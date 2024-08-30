export const uid = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const base64url_encode = (input: string) => {
  return btoa(input).replaceAll('+', '-').replaceAll('/', '.').replaceAll('=', '_');
};

export const base64url_decode = (input: string) => {
  return atob(input.replaceAll('-', '+').replaceAll('.', '/').replaceAll('_', '='));
};
