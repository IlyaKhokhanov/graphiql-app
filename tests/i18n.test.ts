import RootLayout from '@/app/[locale]/layout';
import HomePage from '@/app/[locale]/page';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import userEvent from '@testing-library/user-event';

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
    redirect: vi.fn(() => mockRouter.push('/en')),
  };
});

describe('i18n', () => {
  it('Main page in locale en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: HomePage({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(await screen.findByTestId('header-login')).toBeInTheDocument();
    expect(await screen.findByText(/Welcome to REST/i)).toBeInTheDocument();
  });
  it('Main page in locale ru', async () => {
    await mockRouter.push('/ru');
    const LayoutProps = {
      params: { locale: 'ru' },
      children: HomePage({ params: { locale: 'ru' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(await screen.findByTestId('header-login')).toBeInTheDocument();
    expect(await screen.findByText(/Добро пожаловать в REST/i)).toBeInTheDocument();
  });
  it('Main page correct wrong locale', async () => {
    await mockRouter.push('/de');
    const LayoutProps = {
      params: { locale: 'de' },
      children: HomePage({ params: { locale: 'de' } }),
    };

    expect(mockRouter.asPath).toEqual('/de');

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(mockRouter.asPath).toEqual('/en');

    expect(await screen.findByTestId('header-login')).toBeInTheDocument();
    expect(await screen.findByText(/Welcome to REST/i)).toBeInTheDocument();

    await userEvent.setup().click(screen.getByText('ru'));
    expect(mockRouter.asPath).toEqual('/ru');
  });
});
