'use client';

import Link from 'next/link';
import { FormattedMessage, IntlProvider } from 'react-intl';
import Image from 'next/image';

import { developerListT, DeveloperProps } from './homeList.props';
import { getMessages } from '@/services/intl/wordbook';
import git from '@/public/github-icon.svg';

import styles from './homeList.module.css';

const developers: developerListT[] = [
  {
    img: '',
    name: 'developers.ilya.name',
    github: 'developers.ilya.github',
    description: 'developers.ilya.description',
  },
  {
    img: '',
    name: 'developers.sergey.name',
    github: 'developers.sergey.github',
    description: 'developers.sergey.description',
  },
  {
    img: '',
    name: 'developers.andrey.name',
    github: 'developers.andrey.github',
    description: 'developers.andrey.description',
  },
];

export const Developer = ({ locale, img, name, github, description }: DeveloperProps) => {
  const messages = getMessages(locale);
  console.log(img);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <li className={styles.item}>
        <Image
          className={styles.img}
          src={git as string}
          width={150}
          height={150}
          alt="Photo"
          priority
        />
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
      </li>
    </IntlProvider>
  );
};

export const HomeList = ({ locale }: { locale: string }) => {
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ul className={styles.list}>
        {developers.map((el) => (
          <Developer
            locale={locale}
            key={el.name}
            img={el.img}
            name={el.name}
            github={el.github}
            description={el.description}
          />
        ))}
      </ul>
    </IntlProvider>
  );
};
