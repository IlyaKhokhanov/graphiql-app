import RootLayout from '@/app/[locale]/layout';
import HomePage from '@/app/[locale]/page';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const User = {
  accessToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjExYzhiMmRmNGM1NTlkMjhjOWRlNWQ0MTAxNDFiMzBkOWUyYmNlM2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ3JhcGhpcWwtYXBwLWQwMDFhIiwiYXVkIjoiZ3JhcGhpcWwtYXBwLWQwMDFhIiwiYXV0aF90aW1lIjoxNzI1MDUyODY2LCJ1c2VyX2lkIjoidXJzWDRsdFptZGVoVEtyRmw2ekxtTzhTd3RVMiIsInN1YiI6InVyc1g0bHRabWRlaFRLckZsNnpMbU84U3d0VTIiLCJpYXQiOjE3MjUwNTI4NjYsImV4cCI6MTcyNTA1NjQ2NiwiZW1haWwiOiJkZGRkM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZGRkZDNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.peHS3L7WR9K92GJZAvWPQDo2qAB51D9A0_gccrahLwJKG4vOxXJrhmDkUEhzxKulE0KhQNIGYQB-4TN06xi7-sUn0bf-hDGi6kBVaAkMR7rN9P132kM9ebOTjzw0LEsE9ZiJBwLMbyQbAfr4Wd54uIApE7MsiazLe2bOfTE_Hjv36V1aigADwjhJJhwtKtME6rfZYsC0ONgPDceiTiuFJui_hSheyqodflCtp2U00kEmtaqWtB98c5wsWxzMaoxEM9t6Qb3PAokW8uTrVsisU-cL5zFxFx4BS2X6WTlr5qQfZYu5oZJKhgwzmN0i7zhzfQ2wnptY4p5KCxW-o4qt8A',
  auth: {
    AuthImpl: {
      app: 'FirebaseAppImpl',
      heartbeatServiceProvider: 'Provider',
      appCheckServiceProvider: 'Provider',
      currentUser: 'UserImpl',
    },
  },
  displayName: null,
  email: 'dddd3@gmail.com',
  emailVerified: false,
  isAnonymous: false,
  metadata: {
    UserMetadata: {
      createdAt: '1724764940299',
      lastLoginAt: '1725052866673',
      lastSignInTime: 'Fri, 30 Aug 2024 21:21:06 GMT',
      creationTime: 'Tue, 27 Aug 2024 13:22:20 GMT',
    },
  },
  phoneNumber: null,
  photoURL: null,
  proactiveRefresh: {
    ProactiveRefresh: {
      user: 'UserImpl',
      isRunning: false,
      timerId: null,
      errorBackoff: 30000,
    },
  },
  providerData: [
    {
      displayName: null,
      email: 'dddd3@gmail.com',
      phoneNumber: null,
      photoURL: null,
      providerId: 'password',
      uid: 'dddd3@gmail.com',
    },
  ],
  providerId: 'firebase',
  reloadListener: null,
  reloadUserInfo: {
    localId: 'ursX4ltZmdehTKrFl6zLmO8SwtU2',
    email: 'dddd3@gmail.com',
    passwordHash: 'UkVEQUNURUQ=',
    emailVerified: false,
    passwordUpdatedAt: 1724764940299,
  },
  stsTokenManager: {
    StsTokenManager: {
      refreshToken:
        'AMf-vBzOwgTFwcRRUXXLtMcbp0CjYm1Myv105ibJnJKA2rlHVU…PH8aPaXtE-6A21raBxQ4FHzkQmyc2syHfeY6tsWqKZnYfIcuQ',
      accessToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjExYzhiMmRmNGM1NTlkMj…Tlr5qQfZYu5oZJKhgwzmN0i7zhzfQ2wnptY4p5KCxW-o4qt8A',
      expirationTime: 1725056464873,
    },
  },
  tenantId: null,
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

describe('User', () => {
  it('Main page with User login en', async () => {
    await mockRouter.push('/en');
    const LayoutProps = {
      params: { locale: 'en' },
      children: HomePage({ params: { locale: 'en' } }),
    };

    const nextApp = document.createElement('div');
    document.body.appendChild(nextApp);
    render(RootLayout(LayoutProps), { wrapper: MemoryRouterProvider });

    expect(await screen.findByText(/Log out/i)).toBeInTheDocument();
  });
});
