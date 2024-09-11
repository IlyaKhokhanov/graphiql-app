import RootLayout from '@/app/[locale]/layout';
import HistoryPage from '@/app/[locale]/history/page';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const User = {
  email: 'dddd3@gmail.com',
  uid: 'ursX4ltZmdehTKrFl6zLmO8SwtU2',
};

vi.mock('firebase/app', async () => {
  const actual = await vi.importActual('firebase/app');
  return {
    ...actual,
    notFound: vi.fn(),
  };
});

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
    useAuthState: vi.fn(() => [User, true, undefined]),
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

describe('History', () => {
  it('History page in the locale en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: HistoryPage({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(await screen.findByText('Query history')).toBeInTheDocument();
  });
});
