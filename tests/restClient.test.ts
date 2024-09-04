import RootLayout from '@/app/[locale]/layout';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import mockRouter from 'next-router-mock';

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import RestClientPage from '@/app/[locale]/rest/[method]/page';

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
      response: {
        status: null,
        body: {} as JSON,
      },
    })),
  };
});

describe('Rest Client', () => {
  it('Rest Client with User login en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: RestClientPage({ params: { locale: 'en', method: 'GET' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(screen.queryAllByText(/REST Client/i)).toHaveLength(2);
  });
});
