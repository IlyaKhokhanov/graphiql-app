import RootLayout from '@/app/[locale]/layout';
import SignIn from '@/app/[locale]/auth/signin/page';
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

describe('Form Login', () => {
  it('page in locale en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: SignIn({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const inputEmail = await screen.findByTestId('input-email');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = await screen.findByTestId('input-password');
    expect(inputPassword).toBeInTheDocument();

    const submitButton = await screen.findByTestId('button-submit');
    expect(submitButton).toBeInTheDocument();
  });
  it('email check error en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: SignIn({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const inputEmail = await screen.findByTestId('input-email');
    await userEvent.type(inputEmail, 'test@test');
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
  });
  it('email check no error en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: SignIn({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const inputEmail = await screen.findByTestId('input-email');
    await userEvent.type(inputEmail, 'test@test.test');
    expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument();
  });
  it('password check error en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: SignIn({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const inputPassword = await screen.findByTestId('input-password');
    await userEvent.type(inputPassword, 'Symb.7');
    expect(await screen.findByText(/password complexity/i)).toBeInTheDocument();
  });
  it('password check no error en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: SignIn({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const inputPassword = await screen.findByTestId('input-password');
    await userEvent.type(inputPassword, 'Symbols8!');
    expect(screen.queryByText(/password complexity/i)).not.toBeInTheDocument();
  });
  it('button submit click', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: SignIn({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const submitButton = await screen.findByTestId('button-submit');
    expect(submitButton).toBeInTheDocument();

    const inputEmail = await screen.findByTestId('input-email');
    expect(inputEmail).toBeInTheDocument();
    await userEvent.type(inputEmail, 'test@test.com');
    expect(inputEmail).toHaveValue('test@test.com');

    const inputPassword = await screen.findByTestId('input-password');
    expect(inputPassword).toBeInTheDocument();
    await userEvent.type(inputPassword, 'Test1@test.com');
    expect(inputPassword).toHaveValue('Test1@test.com');

    await userEvent.setup().click(submitButton);
  });
});
