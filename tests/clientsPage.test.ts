import RootLayout from '@/app/[locale]/layout';
import RestClientPage from '@/app/[locale]/[method]/[url]/[options]/page';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const urlEmpty = 'IA__';
const optionsEmpty = 'eyJtZXRob2QiOiJHRVQiLCJoZWFkZXJzIjp7ImNvbnRlbnRUeXBlIjoidGV4dC9wbGFpbiJ9fQ__';
const LayoutProps = {
  params: { locale: 'en' },
  children: RestClientPage({
    params: { method: 'GET', url: urlEmpty, options: optionsEmpty, locale: 'en' },
  }),
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
    useAuthState: vi.fn(() => [null, false, undefined]),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: unknown) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Clients page', () => {
  it('renders the Header', async () => {
    await mockRouter.push('/en');
    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(screen.queryByTestId('header-login')).toBeInTheDocument();
  });
  it('renders the page Main', async () => {
    await mockRouter.push('/en');
    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    // screen.debug();
    expect(screen.queryByAltText(/await/i)).toBeInTheDocument();
  });
  it('renders the Footer', async () => {
    await mockRouter.push('/en');
    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(screen.queryByText(/© 2024/i)).toBeInTheDocument();
  });
});
