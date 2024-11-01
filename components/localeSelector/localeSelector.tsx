'use client';

import { usePathname } from 'next/navigation';

import { i18n } from '@/i18n-config';
import { ILocaleSelectorProps } from './localeSelector.props';

import styles from './localeSelector.module.css';
import Link from 'next/link';

export const LocaleSelector = ({ locale }: ILocaleSelectorProps) => {
  const { locales } = i18n;
  const pathName = usePathname() ?? '/';
  const pathNameParts = pathName.split('/');
  const localesLinks = [...locales].sort().map((localeCurrent) => {
    pathNameParts[1] = localeCurrent;
    return {
      locale: localeCurrent,
      link: pathNameParts.join('/'),
      disabled: localeCurrent === locale,
    };
  });

  return (
    <div className={styles.selector}>
      {localesLinks.map((currentLink) => (
        <Link
          key={currentLink.locale}
          href={`${currentLink.link}`}
          className={currentLink.disabled ? styles.disabled : styles.enabled}
        >
          {currentLink.locale}
        </Link>
      ))}
    </div>
  );
};
