export const enum Path {
  Home = '/',
  REST = '/rest/GET/json',
  GraphQL = '/graphql/query',
  History = '/history',
  Login = '/auth/signin',
  Register = '/auth/signup',
}

export type HeaderMenu = {
  path: Path;
  name: string;
  isAuth: boolean;
};
