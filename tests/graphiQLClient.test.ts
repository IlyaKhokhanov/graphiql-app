/* eslint-disable no-useless-escape */
import RootLayout from '@/app/[locale]/layout';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, afterEach } from 'vitest';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { GraphQlDocumentation } from '@/components';
import fetchMock from 'fetch-mock';
import { GraphiQLClient } from '@/containers';

const User = {
  email: 'dddd3@gmail.com',
  uid: 'ursX4ltZmdehTKrFl6zLmO8SwtU2',
};

vi.mock('firebase/app', async () => {
  const actual = await vi.importActual('firebase/app');
  return {
    ...actual,
    initializeApp: vi.fn(),
  };
});

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    sendPasswordResetEmail: vi.fn(),
    signOut: vi.fn(),
  };
});

vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    getFirestore: vi.fn(),
    collection: vi.fn(),
    addDoc: vi.fn(),
  };
});

vi.mock('react-firebase-hooks/auth', async () => {
  const actual = await vi.importActual('react-firebase-hooks/auth');
  return {
    ...actual,
    useAuthState: vi.fn(() => [User, false, undefined]),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next-router-mock');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
    notFound: vi.fn(),
  };
});

vi.mock('@/redux/hooks', async () => {
  const actual = await vi.importActual('@/redux/hooks');
  return {
    ...actual,
    useAppDispatch: vi.fn(() => vi.fn()),
    useAppSelector: vi.fn(() => ({
      workUrl: '',
      workMethod: '',
      body: '',
      isFetched: false,
      paramInputs: [],
      headerInputs: [],
      headers: [{ id: 'string', key: 'string', value: 'string' }],
      response: {
        status: null,
        body: {} as JSON,
      },
    })),
  };
});

afterEach(() => {
  fetchMock.restore();
});

fetchMock.mock('*', {
  method: 'POST',
  headers: [{ 'Content-Type': 'application/json' }],
  body: '{"prop1": "val1", "prop2": "val2"}',
});

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useEffect: vi.fn(),
    useState: vi.fn(() => [true, vi.fn()]),
  };
});

describe('GraphQL Client', () => {
  it('GraphQL Client with User login en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: GraphiQLClient({ locale: 'en', method: 'GRAPHQL', url: 'fv', options: '' }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(screen.queryAllByText(/GraphQL Client/i)).toHaveLength(1);
  });
  it('GraphQL Client Send', async () => {
    const graphqlURL = 'https://rickandmortyapi.com/graphql';
    const graphqlQuery = 'query Characters {{characters {{results {{name}} }} }}';
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: GraphiQLClient({ method: 'GRAPHQL', locale: 'en', url: 'fv' }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const submitButton = await screen.findByText('Send query');
    expect(submitButton).toBeInTheDocument();

    const getButton = await screen.findByText('Get schema');
    expect(getButton).toBeInTheDocument();

    const endpointURL = await screen.findByPlaceholderText('Endpoint URL');
    expect(endpointURL).toBeInTheDocument();
    await userEvent.type(endpointURL, graphqlURL);
    expect(endpointURL).toHaveValue(graphqlURL);

    const qlQuery = await screen.findByPlaceholderText('GraphQl query');
    expect(qlQuery).toBeInTheDocument();
    await userEvent.type(qlQuery, graphqlQuery);

    await userEvent.click(submitButton);
    await userEvent.click(getButton);
  });
  it('GraphQL Client Documentation', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: GraphQlDocumentation({
        schema: { types: [{ name: 'name' }] },
        errorMessage: 'errorMessage',
      }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(await screen.findByText('errorMessage')).toBeInTheDocument();
  });
});
