import RootLayout from '@/app/[locale]/layout';
import ResetPage from '@/app/[locale]/auth/reset/page';
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

describe('Form Reset', () => {
  it('page in locale en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: ResetPage({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const inputEmail = await screen.findByTestId('input-email');
    expect(inputEmail).toBeInTheDocument();

    const submitButton = await screen.findByTestId('button-submit');
    expect(submitButton).toBeInTheDocument();
  });
  it('email check error en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: ResetPage({ params: { locale: 'en' } }),
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
      children: ResetPage({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    const inputEmail = await screen.findByTestId('input-email');
    await userEvent.type(inputEmail, 'test@test.test');
    expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument();
  });
  it('button submit click', async () => {
    window.alert = vi.fn();
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: ResetPage({ params: { locale: 'en' } }),
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

    await userEvent.setup().click(submitButton);
  });
});
