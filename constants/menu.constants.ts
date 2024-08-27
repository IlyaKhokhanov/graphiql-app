import { HeaderMenu, Path } from './types';

export const HEADER_MENU: HeaderMenu[] = [
  { name: 'Home', path: Path.Home, isAuth: true },
  { name: 'REST', path: Path.REST, isAuth: true },
  { name: 'GraphQL', path: Path.GraphQL, isAuth: true },
  { name: 'History', path: Path.History, isAuth: true },
  { name: 'Login', path: Path.Login, isAuth: false },
  { name: 'Register', path: Path.Register, isAuth: false },
];
