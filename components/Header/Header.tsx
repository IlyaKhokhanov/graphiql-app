'use client';

import Link from 'next/link';
import { i18n } from '../../i18n-config';
import { useParams } from 'next/navigation';

export default function Header() {
  const { locales } = i18n;
  const { locale } = useParams();

  return (
    <header>
      <div className="languages">
        {[...locales]
          .sort()
          .filter((localeCurrent) => localeCurrent !== locale)
          .map((localeCurrent) => (
            <Link key={localeCurrent} href={`/${localeCurrent}`}>
              {localeCurrent}
            </Link>
          ))}
      </div>
    </header>
  );
}
