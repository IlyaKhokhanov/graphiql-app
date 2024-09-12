'use client';

import Link from 'next/link';
import { FormattedMessage, IntlProvider } from 'react-intl';
import Image from 'next/image';

import { HomeDeveloperProps } from './homeDeveloper.props';
import { getMessages } from '@/services/intl/wordbook';
import git from '@/public/github-icon.svg';

import styles from './homeDeveloper.module.css';

export const HomeDeveloper = ({ locale, img, name, github, description }: HomeDeveloperProps) => {
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <li className={styles.item}>
        <div className={styles.text}>
          <h2 className={styles.name}>
            <FormattedMessage id={name} />
          </h2>
          <Link
            className={styles.link}
            target="_blank"
            href={`https://github.com/${messages[github]}`}
          >
            <Image
              className={styles.git}
              src={git as string}
              alt="git"
              width={16}
              height={16}
              priority
            />
            <strong>
              <FormattedMessage id={github} />
            </strong>
          </Link>
          <div className={styles.description}>
            <FormattedMessage id={description} />
          </div>
        </div>
        <div className={styles.face}>
          <Image
            className={styles.img}
            src={img}
            fill
            sizes="100%"
            alt="Photo"
            priority
            blurDataURL={img}
          />
          <div className={styles.linkWrapper}>
            <Link
              className={styles.link}
              target="_blank"
              href={`https://github.com/${messages[github]}`}
            >
              <Image
                className={styles.git}
                src={git as string}
                alt="git"
                width={16}
                height={16}
                priority
              />
              <strong>
                <FormattedMessage id={github} />
              </strong>
            </Link>
          </div>
        </div>
      </li>
    </IntlProvider>
  );
};
