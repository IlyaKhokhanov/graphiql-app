'use client';

import { store } from '@/redux/store';

import { Provider } from 'react-redux';

export const ProviderComponent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <Provider store={store}>{children}</Provider>;
};
