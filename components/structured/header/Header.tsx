'use client';

import { auth, logout } from '@/core/services/firebase';
import Link from 'next/link';
import { i18n } from '../../../i18n-config';
import { useParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { locales } = i18n;
  const params = useParams();
  let { locale } = params;
  if (Array.isArray(locale)) locale = locale[0];
  const [user] = useAuthState(auth);

  const pathName = usePathname();
  const pathNameParts = pathName.split('/');
  const localesLinks = [...locales]
    .sort()
    .filter((localeCurrent) => localeCurrent !== locale)
    .map((localeCurrent) => {
      pathNameParts[1] = localeCurrent;
      return { locale: localeCurrent, link: pathNameParts.join('/') };
    });

  return (
    <header>
      <div className="languages">
        {localesLinks.map((currentLink) => (
          <Link key={currentLink.locale} href={`${currentLink.link}`}>
            {currentLink.locale}
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        {user ? (
          <button
            onClick={() => {
              void logout();
            }}
          >
            log out
          </button>
        ) : (
          <>
            <Link href={`/${locale}`}>Home</Link>
            <Link href={`/${locale}/register`}>Register</Link>
            <Link href={`/${locale}/login`}>Login</Link>
          </>
        )}
      </div>
    </header>
  );
}
