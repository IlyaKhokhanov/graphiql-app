import NotFound from '@/app/not-found';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

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

let pathName: string | undefined;
pathName = '/en';
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
    usePathname: vi.fn(() => pathName),
    notFound: vi.fn(),
  };
});

describe('Not found', () => {
  it('404 page en', async () => {
    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(NotFound(), { wrapper: MemoryRouterProvider });

    expect(await screen.findByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
  it('404 page ru', async () => {
    pathName = '/ru';

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(NotFound(), { wrapper: MemoryRouterProvider });

    expect(await screen.findByText(/404 - Страница не найдена/i)).toBeInTheDocument();
  });
  it('404 page lang empty', async () => {
    pathName = '';

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(NotFound(), { wrapper: MemoryRouterProvider });

    expect(await screen.findByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
  it('404 page lang undefined', async () => {
    pathName = undefined;

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(NotFound(), { wrapper: MemoryRouterProvider });

    expect(await screen.findByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});
